
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
    <div className="min-h-screen bg-gradient-to-br from-prayer-50 via-serenity-50 to-purple-50">
      <div className="container mx-auto px-4 py-6 pb-24 max-w-6xl">
        
        {/* Header avec titre */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="floating mb-4">
            <span className="text-5xl">🙏</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            Cœur de Prière
          </h1>
          <p className="text-serenity-600 text-lg">
            Cultivez votre relation avec Dieu au quotidien
          </p>
        </div>

        {/* Contenu selon l'onglet actif */}
        {activeTab === 'prayers' && (
          <div className="space-y-6">
            {/* Barre de recherche et filtres */}
            <Card className="glass border-white/30 animate-fade-in">
              <div className="p-6 space-y-4">
                <Input
                  placeholder="Rechercher une prière..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/50 border-white/50 focus:border-prayer-300 focus:ring-prayer-200"
                />
                
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedCategory === null ? "default" : "secondary"}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedCategory === null 
                        ? 'bg-prayer-500 text-white hover:bg-prayer-600' 
                        : 'bg-white/50 text-prayer-600 hover:bg-white/70'
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    Toutes les catégories
                  </Badge>
                  
                  {availableCategories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "secondary"}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedCategory === category 
                          ? 'bg-prayer-500 text-white hover:bg-prayer-600' 
                          : 'bg-white/50 text-prayer-600 hover:bg-white/70'
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
              <div key={category} className="space-y-4">
                <h2 className="text-xl font-semibold text-prayer-800 flex items-center gap-2">
                  <span className="w-1 h-6 bg-prayer-500 rounded-full"></span>
                  {categoryLabels[category as keyof typeof categoryLabels]}
                  <Badge variant="secondary" className="ml-2 bg-prayer-100 text-prayer-700">
                    {categoryPrayers.length}
                  </Badge>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Card className="glass border-white/30 text-center py-12">
                <div className="floating mb-4">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-prayer-800 mb-2">
                  Aucune prière trouvée
                </h3>
                <p className="text-serenity-600 text-sm">
                  Essayez avec d'autres mots-clés ou explorez d'autres catégories
                </p>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'stats' && <StatsOverview />}
        {activeTab === 'history' && <PrayerHistory />}
      </div>

      {/* Barre de navigation */}
      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
