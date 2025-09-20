import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.png";
import gLogo from "@/assets/g-logo-new.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url(${logoImage})`,
          backgroundSize: 'min(60vw, 40vh)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-center mb-4 relative">
            {/* Logo that moves from right to left */}
            <img
              src={gLogo}
              alt="G Logo"
              className="absolute animate-[logo-move_2s_ease-out_0.5s_forwards] z-10"
              style={{
                width: 'clamp(94px, 12vw, 126px)',
                height: 'clamp(94px, 12vw, 126px)',
                filter: 'hue-rotate(0deg)',
                right: 'calc(-50% - clamp(47px, 6vw, 63px))',
                transform: 'translateY(-50%)',
                top: '50%'
              }}
            />
            {/* Final position for logo (invisible) */}
            <div className="mr-2" style={{
              width: 'clamp(94px, 12vw, 126px)',
              height: 'clamp(94px, 12vw, 126px)'
            }} />
            {/* Letters that appear as logo passes */}
            <h1
              className="font-bold tracking-tight flex"
              style={{
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                color: 'hsl(var(--color-primary))',
                lineHeight: '0.9'
              }}
            >
              <span className="opacity-0 animate-[fade-in_0.3s_ease-out_0.8s_forwards]">R</span>
              <span className="opacity-0 animate-[fade-in_0.3s_ease-out_1.0s_forwards]">A</span>
              <span className="opacity-0 animate-[fade-in_0.3s_ease-out_1.2s_forwards]">N</span>
              <span className="opacity-0 animate-[fade-in_0.3s_ease-out_1.4s_forwards]">T</span>
              <span className="opacity-0 animate-[fade-in_0.3s_ease-out_1.6s_forwards]">E</span>
              <span className="opacity-0 animate-[fade-in_0.3s_ease-out_1.8s_forwards]">D</span>
              <span className="opacity-0 animate-[fade-in_0.3s_ease-out_2.0s_forwards]">.</span>
            </h1>
          </div>

          <p className="text-black font-medium mb-8"
            style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)' }}>
            The one you need
          </p>

          <Link to="/application">
            <Button
              size="lg"
              className="text-lg px-12 py-6 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200"
            >
              Start Application
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;