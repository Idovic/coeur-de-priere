
import React from 'react';
import { PrayerTopic } from '../types/prayer';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Check, Heart, Share2 } from 'lucide-react';

interface PrayerCardProps {
  prayer: PrayerTopic;
  onClick: () => void;
  onToggleFavorite?: (prayerId: number) => void;
  isFavorite?: boolean;
  onShare?: () => void;
}

const PrayerCard: React.FC<PrayerCardProps> = ({ 
  prayer, 
  onClick, 
  onToggleFavorite, 
  isFavorite = false,
  onShare 
}) => {
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      'foi': 'prayer-500',
      'famille': 'mystic-500',
      'sagesse': 'harmony-500',
      'amour': 'serenity-500',
      'pardon': 'prayer-500',
      'reconnaissance': 'mystic-500',
      'protection': 'harmony-500',
      'direction': 'serenity-500',
      'paix': 'prayer-500',
      'healing-comfort': 'emerald-500',
      'wisdom-guidance': 'blue-500',
      'family-relationship': 'rose-500',
      'protection-deliverance': 'purple-500',
      'spiritual-growth': 'green-500',
      'church-community': 'orange-500',
      'provision-blessing': 'yellow-500',
      'societal-global': 'indigo-500'
    };
    return categoryColors[category] || 'prayer-500';
  };

  // Extract first 150 characters for preview
  const getPreviewText = (content: string) => {
    const preview = content.substring(0, 150);
    return preview + (content.length > 150 ? '...' : '');
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher l'ouverture de la prière
    if (onToggleFavorite) {
      onToggleFavorite(prayer.id);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher l'ouverture de la prière
    if (onShare) {
      onShare();
    }
  };

  return (
    <Card 
      className="prayer-card group border-white/30 hover:border-white/50 cursor-pointer relative"
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
            {/* Boutons d'action */}
            <div className="flex gap-1">
              {/* Bouton Partage */}
              {onShare && (
                <button
                  onClick={handleShareClick}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-blue-100 hover:bg-blue-200"
                  title="Partager cette prière"
                >
                  <Share2 className="w-4 h-4 text-blue-600" />
                </button>
              )}

              {/* Bouton Favori */}
              <button
                onClick={handleFavoriteClick}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                  isFavorite 
                    ? 'bg-red-100 hover:bg-red-200' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <Heart 
                  className={`w-4 h-4 transition-colors ${
                    isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-500'
                  }`} 
                />
              </button>
            </div>

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
        
        <p className="text-serenity-600 text-sm leading-relaxed line-clamp-4">
          {getPreviewText(prayer.content)}
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
