# uploadfile.py
import sys, subprocess, importlib
from pathlib import Path
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename

# ---- auto-install helpful deps (optional) ----
REQUIRED = {
    "flask": "flask",
    "docx": "python-docx",
    "PyPDF2": "PyPDF2",
    "flask_cors": "flask-cors",
}
missing = []
for mod, pip_name in REQUIRED.items():
    try:
        importlib.import_module(mod)
    except ImportError:
        missing.append(pip_name)
if missing:
    subprocess.check_call([sys.executable, "-m", "pip", "install", *missing])

from docx import Document
from PyPDF2 import PdfReader
from flask_cors import CORS

app = Flask(__name__)

# Allow all origins in dev; lock this down in prod
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=False, max_age=86400)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

def unique_path(p: Path) -> Path:
    if not p.exists():
        return p
    i = 1
    while True:
        q = p.with_name(f"{p.stem} ({i}){p.suffix}")
        if not q.exists():
            return q
        i += 1

def extract_docx(p: Path) -> str:
    doc = Document(str(p))
    return "\n\n".join(par.text for par in doc.paragraphs)

def extract_pdf(p: Path) -> str:
    reader = PdfReader(str(p))
    return "\n\n".join((pg.extract_text() or "") for pg in reader.pages)

# ---- Friendly root page so GET / works ----
@app.get("/")
def home():
    return """
<!doctype html>
<title>Upload tester</title>
<h1>Convert .docx/.pdf → .txt</h1>
<form method="post" action="/api/upload" enctype="multipart/form-data">
  <input type="file" name="file" accept=".docx,.pdf" required>
  <button type="submit">Upload</button>
</form>
<p>Health: <a href="/ping">/ping</a></p>
"""

@app.get("/ping")
def ping():
    return jsonify(ok=True, msg="pong")

# ---- Upload & convert ----
@app.post("/api/upload")
def api_upload():
    try:
        f = request.files.get("file")
        if not f or f.filename == "":
            return jsonify(ok=False, message="No file provided"), 400

        ext = f.filename.rsplit(".", 1)[-1].lower() if "." in f.filename else ""
        if ext not in {"docx", "pdf"}:
            return jsonify(ok=False, message="Only .docx and .pdf allowed"), 400

        safe = secure_filename(f.filename)
        temp_path = unique_path(UPLOAD_DIR / safe)
        f.save(temp_path)

        text = extract_docx(temp_path) if temp_path.suffix.lower() == ".docx" else extract_pdf(temp_path)
        out_path = unique_path(temp_path.with_suffix(".txt"))
        out_path.write_text(text, encoding="utf-8", errors="replace")

        temp_path.unlink(missing_ok=True)  # delete original

        # Return the download URL so the frontend can link to it
        return jsonify(
            ok=True,
            filename=out_path.name,
            download_url=f"/api/files/{out_path.name}",
            message="Converted to .txt and original removed"
        )
    except Exception as e:
        import traceback; traceback.print_exc()
        return jsonify(ok=False, message=str(e)), 500

# ---- Serve converted files for download ----
@app.get("/api/files/<path:name>")
def get_file(name):
    return send_from_directory(UPLOAD_DIR, name, as_attachment=True)

if __name__ == "__main__":
    # Run on 127.0.0.1:5000 to match the Vite proxy below
    app.run(host="127.0.0.1", port=5000, debug=True)
