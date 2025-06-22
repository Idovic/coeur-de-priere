
import React, { useState } from 'react';
import { prayerTopics, categoryLabels } from '../data/prayers';
import PrayerCard from '../components/PrayerCard';
import PrayerReader from '../components/PrayerReader';
import StatsOverview from '../components/StatsOverview';
import PrayerHistory from '../components/PrayerHistory';
import NavigationBar from '../components/NavigationBar';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { PrayerTopic } from '../types/prayer';
import { Heart, Sparkles } from 'lucide-react';

const Index = () => {
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerTopic | null>(null);
  const [activeTab, setActiveTab] = useState<'prayers' | 'stats' | 'history'>('prayers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [prayers, setPrayers] = useState(prayerTopics);

  // Filtrer les prières
  const filteredPrayers = prayers.filter(prayer => {
    const matchesSearch = prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prayer.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || prayer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Grouper par catégorie
  const groupedPrayers = filteredPrayers.reduce((acc, prayer) => {
    const category = prayer.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(prayer);
    return acc;
  }, {} as Record<string, PrayerTopic[]>);

  const handlePrayerClick = (prayer: PrayerTopic) => {
    // Incrémenter le compteur de lecture
    setPrayers(prev => prev.map(p => 
      p.id === prayer.id 
        ? { ...p, readCount: p.readCount + 1 }
        : p
    ));
    
    setSelectedPrayer({
      ...prayer,
      readCount: prayer.readCount + 1
    });
  };

  const handlePrayerComplete = (prayerId: number) => {
    setPrayers(prev => prev.map(p => 
      p.id === prayerId 
        ? { ...p, isCompleted: true, completedAt: new Date() }
        : p
    ));
  };

  const handleBackFromReader = () => {
    setSelectedPrayer(null);
  };

  // Obtenir les catégories disponibles
  const availableCategories = Object.keys(categoryLabels);

  if (selectedPrayer) {
    return (
      <PrayerReader
        prayer={selectedPrayer}
        onBack={handleBackFromReader}
        onComplete={handlePrayerComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-prayer-50 via-harmony-50 to-mystic-50 relative overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-prayer-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-mystic-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-harmony-300/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-6 pb-24 max-w-6xl relative z-10">
        
        {/* Header avec titre amélioré */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="floating mb-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-prayer-gradient rounded-full blur-xl opacity-50"></div>
              <div className="relative w-20 h-20 bg-prayer-gradient rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-prayer">
                <Heart className="w-10 h-10" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-3 font-nunito">
            Cœur de Prière
          </h1>
          <p className="text-serenity-600 text-xl font-medium mb-2 font-inter">
            Cultivez votre relation avec Dieu au quotidien
          </p>
          <div className="flex items-center justify-center gap-2 text-prayer-500">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Votre sanctuaire spirituel personnel</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Contenu selon l'onglet actif */}
        {activeTab === 'prayers' && (
          <div className="space-y-8">
            {/* Barre de recherche et filtres améliorée */}
            <Card className="glass-card border-white/30 animate-fade-in shadow-soft">
              <div className="p-6 space-y-6">
                <Input
                  placeholder="🔍 Rechercher une prière..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/40 border-white/50 focus:border-prayer-300 focus:ring-prayer-200 rounded-xl h-12 text-base backdrop-blur-sm"
                />
                
                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant={selectedCategory === null ? "default" : "secondary"}
                    className={`cursor-pointer transition-all duration-300 px-4 py-2 rounded-xl font-medium ${
                      selectedCategory === null 
                        ? 'bg-prayer-gradient text-white hover:shadow-glow scale-105 shadow-prayer' 
                        : 'glass text-prayer-700 hover:glass-strong hover:scale-105 border-white/30'
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    ✨ Toutes les catégories
                  </Badge>
                  
                  {availableCategories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "secondary"}
                      className={`cursor-pointer transition-all duration-300 px-4 py-2 rounded-xl font-medium ${
                        selectedCategory === category 
                          ? 'bg-prayer-gradient text-white hover:shadow-glow scale-105 shadow-prayer' 
                          : 'glass text-prayer-700 hover:glass-strong hover:scale-105 border-white/30'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Liste des prières par catégorie */}
            {Object.entries(groupedPrayers).map(([category, categoryPrayers]) => (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-prayer-gradient rounded-full shadow-glow"></div>
                    <h2 className="text-2xl font-bold text-prayer-800 font-nunito">
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </h2>
                  </div>
                  <Badge className="modern-badge text-prayer-700 bg-prayer-100/50">
                    {categoryPrayers.length} prière{categoryPrayers.length > 1 ? 's' : ''}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryPrayers.map((prayer, index) => (
                    <div 
                      key={prayer.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <PrayerCard
                        prayer={prayer}
                        onClick={() => handlePrayerClick(prayer)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {filteredPrayers.length === 0 && (
              <Card className="glass-card border-white/30 text-center py-16">
                <div className="floating mb-6">
                  <span className="text-6xl opacity-50">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-prayer-800 mb-3 font-nunito">
                  Aucune prière trouvée
                </h3>
                <p className="text-serenity-600 text-base max-w-md mx-auto font-inter">
                  Essayez avec d'autres mots-clés ou explorez d'autres catégories pour découvrir de nouveaux sujets de prière
                </p>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'stats' && <StatsOverview />}
        {activeTab === 'history' && <PrayerHistory />}
      </div>

      {/* Barre de navigation améliorée */}
      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
