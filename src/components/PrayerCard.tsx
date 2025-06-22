
import React from 'react';
import { PrayerTopic, categoryColors } from '../data/prayers';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Check, Heart } from 'lucide-react';

interface PrayerCardProps {
  prayer: PrayerTopic;
  onClick: () => void;
}

const PrayerCard: React.FC<PrayerCardProps> = ({ prayer, onClick }) => {
  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || 'prayer-500';
  };

  return (
    <Card 
      className="glass hover:glass-strong transition-all duration-300 cursor-pointer group border-white/30 hover:border-white/50 hover:shadow-prayer transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-prayer-800 group-hover:text-prayer-900 transition-colors mb-2 leading-relaxed">
              {prayer.title}
            </h3>
            <div className="flex items-center gap-2">
              <Badge 
                variant="secondary" 
                className={`bg-${getCategoryColor(prayer.category)}/10 text-${getCategoryColor(prayer.category)} border-${getCategoryColor(prayer.category)}/20 hover:bg-${getCategoryColor(prayer.category)}/20 transition-colors`}
              >
                {prayer.category.charAt(0).toUpperCase() + prayer.category.slice(1)}
              </Badge>
            </div>
          </div>
          
          <div className="ml-4 flex flex-col items-center gap-2">
            {prayer.isCompleted && (
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-emerald-600" />
              </div>
            )}
            
            {prayer.readCount > 0 && (
              <div className="flex items-center gap-1 text-xs text-serenity-600">
                <Heart className="w-3 h-3" />
                <span>{prayer.readCount}</span>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-serenity-600 text-sm leading-relaxed line-clamp-3">
          {prayer.content.substring(0, 150)}...
        </p>
        
        <div className="mt-4 pt-4 border-t border-white/20">
          <span className="text-xs text-serenity-500 font-medium">
            Touchez pour lire en entier
          </span>
        </div>
      </div>
    </Card>
  );
};

export default PrayerCard;
