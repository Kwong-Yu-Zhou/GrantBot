import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Australian Grant Applications Made Simple
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            AI-powered assistance for Australian businesses seeking grant funding
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/application">
              <Button size="lg" className="text-lg px-12 py-8 w-full sm:w-auto">
                <Plus className="mr-3 h-6 w-6" />
                Start Application
              </Button>
            </Link>
            <Link to="/past-applications">
              <Button variant="outline" size="lg" className="text-lg px-12 py-8 w-full sm:w-auto">
                <FileText className="mr-3 h-6 w-6" />
                Past Applications
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;