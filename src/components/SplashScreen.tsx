
import React, { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-prayer-600 via-mystic-600 to-harmony-600 flex items-center justify-center">
      {/* Éléments décoratifs animés */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/8 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="text-center z-10 px-8">
        {/* Logo animé */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-150 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-6 flex items-center justify-center border border-white/30">
            <Heart className="w-12 h-12 text-white animate-pulse" />
          </div>
        </div>

        {/* Titre */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-nunito">
          Cœur de Prière
        </h1>
        
        <div className="flex items-center justify-center gap-2 text-white/80 mb-8">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="text-lg font-medium">Votre sanctuaire spirituel</span>
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>

        {/* Barre de progression */}
        <div className="w-64 mx-auto mb-4">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <p className="text-white/60 text-sm">
          Chargement de votre expérience spirituelle...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
