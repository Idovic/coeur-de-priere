
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
        relative overflow-hidden cursor-pointer group transition-all duration-500 border-2 border-white/40 shadow-xl
        ${isActive ? 'scale-105 shadow-2xl border-white/60' : 'hover:scale-105 hover:shadow-2xl hover:border-white/50'}
        bg-white/80 backdrop-blur-lg
      `}
      onClick={onClick}
    >
      <div className={`absolute inset-0 ${gradient} opacity-20`} />
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10" />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-3xl flex items-center justify-center backdrop-blur-sm border-2 border-white/50 shadow-lg ${gradient.replace('bg-gradient-to-br', 'bg-gradient-to-r')}`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          
          <Badge className="bg-white/30 text-prayer-800 border-white/40 backdrop-blur-sm font-bold px-3 py-1">
            {prayerCount}
          </Badge>
        </div>
        
        <h3 className="text-xl font-bold mb-3 font-nunito text-prayer-900">
          {title}
        </h3>
        
        <p className="text-prayer-700 text-sm font-inter leading-relaxed mb-4">
          {description}
        </p>
        
        <div className="pt-3 border-t border-white/30">
          <span className="text-xs text-prayer-600 font-semibold">
            Touchez pour explorer →
          </span>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </Card>
  );
};

export default ThemeCard;
