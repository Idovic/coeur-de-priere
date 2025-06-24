
import React from 'react';
import { Card } from './ui/card';
import { Heart, MapPin, Code } from 'lucide-react';

const AboutSection = () => {
  return (
    <Card className="glass-card border-white/40 bg-white/60 backdrop-blur-xl shadow-lg animate-fade-in">
      <div className="p-6">
        <div className="text-center">
          <div className="floating mb-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-prayer-gradient rounded-full blur-lg opacity-50"></div>
              <div className="relative w-16 h-16 bg-prayer-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-prayer">
                <Heart className="w-8 h-8" />
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-prayer-900 mb-3 font-nunito">
            À propos de cette application
          </h3>
          
          <div className="space-y-3 text-prayer-800">
            <div className="flex items-center justify-center gap-2">
              <Code className="w-4 h-4 text-prayer-600" />
              <span className="font-medium">Développé avec ❤️ par</span>
            </div>
            
            <div className="text-lg font-bold text-prayer-900">
              Sayon Idovic Loua
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-harmony-600" />
              <span className="text-harmony-700 font-medium">Guinée 🇬🇳</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gradient-to-r from-prayer-50 to-harmony-50 rounded-xl border border-prayer-200/50">
            <p className="text-sm text-prayer-700 font-inter leading-relaxed">
              Cette application a été créée pour enrichir votre vie spirituelle 
              et vous accompagner dans vos moments de prière quotidiens.
            </p>
          </div>
          
          <div className="mt-4 text-xs text-prayer-600 font-inter">
            Version 1.0 • Cœur de Prière
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AboutSection;
