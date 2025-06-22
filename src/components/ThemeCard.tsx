
import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { LucideIcon } from 'lucide-react';

interface ThemeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  prayerCount: number;
  onClick: () => void;
  isActive?: boolean;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  gradient, 
  prayerCount, 
  onClick,
  isActive = false
}) => {
  return (
    <Card 
      className={`
        relative overflow-hidden cursor-pointer group transition-all duration-500 border-white/20
        ${isActive ? 'scale-105 shadow-2xl' : 'hover:scale-105 hover:shadow-xl'}
      `}
      onClick={onClick}
    >
      <div className={`absolute inset-0 ${gradient} opacity-60`} />
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm" />
      
      <div className="relative p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
            <Icon className="w-6 h-6" />
          </div>
          
          <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
            {prayerCount}
          </Badge>
        </div>
        
        <h3 className="text-xl font-bold mb-2 font-nunito">
          {title}
        </h3>
        
        <p className="text-white/80 text-sm font-inter leading-relaxed">
          {description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-white/20">
          <span className="text-xs text-white/70 font-medium">
            Touchez pour explorer →
          </span>
        </div>
      </div>
      
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </Card>
  );
};

export default ThemeCard;
