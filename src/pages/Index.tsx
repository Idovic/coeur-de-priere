
import React, { useState, useEffect } from 'react';
import { prayerTopics } from '../data/prayers';
import { themes } from '../data/themes';
import PrayerCard from '../components/PrayerCard';
import PrayerReader from '../components/PrayerReader';
import StatsOverview from '../components/StatsOverview';
import PrayerHistory from '../components/PrayerHistory';
import NavigationBar from '../components/NavigationBar';
import ThemeCard from '../components/ThemeCard';
import SplashScreen from '../components/SplashScreen';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { PrayerTopic } from '../types/prayer';
import { Heart, Sparkles, Search, Filter } from 'lucide-react';

const Index = () => {
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerTopic | null>(null);
  const [activeTab, setActiveTab] = useState<'prayers' | 'stats' | 'history'>('prayers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [prayers, setPrayers] = useState(prayerTopics);
  const [showSplash, setShowSplash] = useState(true);
  const [viewMode, setViewMode] = useState<'themes' | 'list'>('themes');

  // Gestion du splash screen
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Filtrer les prières selon le thème sélectionné et la recherche
  const filteredPrayers = prayers.filter(prayer => {
    const matchesSearch = searchTerm === '' || 
      prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prayer.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTheme = !selectedTheme || prayer.category === selectedTheme;
    return matchesSearch && matchesTheme;
  });

  const handlePrayerClick = (prayer: PrayerTopic) => {
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

  const handleThemeClick = (themeId: string) => {
    setSelectedTheme(themeId);
    setViewMode('list');
  };

  const backToThemes = () => {
    setSelectedTheme(null);
    setViewMode('themes');
    setSearchTerm('');
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (selectedPrayer) {
    return (
      <PrayerReader
        prayer={selectedPrayer}
        onBack={() => setSelectedPrayer(null)}
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
        
        {/* Header */}
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
            Votre parcours spirituel personnalisé
          </p>
        </div>

        {/* Contenu selon l'onglet actif */}
        {activeTab === 'prayers' && (
          <div className="space-y-8">
            
            {/* Vue thématique moderne */}
            {viewMode === 'themes' && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-prayer-800 mb-4 font-nunito">
                    Explorez par Thématiques
                  </h2>
                  <p className="text-serenity-600 font-inter">
                    Choisissez le domaine qui correspond à vos besoins spirituels du moment
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {themes.map((theme, index) => {
                    const themeePrayerCount = prayers.filter(p => p.category === theme.category).length;
                    return (
                      <div 
                        key={theme.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <ThemeCard
                          title={theme.title}
                          description={theme.description}
                          icon={theme.icon}
                          gradient={theme.gradient}
                          prayerCount={themeePrayerCount}
                          onClick={() => handleThemeClick(theme.category)}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Statistiques rapides */}
                <Card className="glass-card border-white/30 animate-fade-in">
                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-prayer-500" />
                      <h3 className="text-lg font-semibold text-prayer-800 font-nunito">Votre Progression</h3>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <div className="text-2xl font-bold text-prayer-600 mb-1">
                          {prayers.filter(p => p.isCompleted).length}
                        </div>
                        <div className="text-sm text-serenity-600">Prières complétées</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-mystic-600 mb-1">
                          {prayers.reduce((sum, p) => sum + p.readCount, 0)}
                        </div>
                        <div className="text-sm text-serenity-600">Lectures totales</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-harmony-600 mb-1">
                          {themes.length}
                        </div>
                        <div className="text-sm text-serenity-600">Thématiques</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Vue liste filtrée */}
            {viewMode === 'list' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={backToThemes}
                    className="btn-glass text-prayer-700 hover:text-prayer-800"
                  >
                    ← Retour aux thématiques
                  </button>
                  
                  {selectedTheme && (
                    <Badge className="bg-prayer-gradient text-white">
                      {themes.find(t => t.category === selectedTheme)?.title}
                    </Badge>
                  )}
                </div>

                {/* Barre de recherche simplifiée */}
                <Card className="glass-card border-white/30">
                  <div className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-serenity-500" />
                      <Input
                        placeholder="Rechercher dans cette thématique..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/40 border-white/50 focus:border-prayer-300 focus:ring-prayer-200 rounded-xl"
                      />
                    </div>
                  </div>
                </Card>

                {/* Liste des prières */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrayers.map((prayer, index) => (
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

                {filteredPrayers.length === 0 && (
                  <Card className="glass-card border-white/30 text-center py-16">
                    <div className="floating mb-6">
                      <span className="text-6xl opacity-50">🔍</span>
                    </div>
                    <h3 className="text-xl font-semibold text-prayer-800 mb-3 font-nunito">
                      Aucune prière trouvée
                    </h3>
                    <p className="text-serenity-600 max-w-md mx-auto font-inter">
                      Essayez avec d'autres mots-clés ou retournez aux thématiques
                    </p>
                  </Card>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'stats' && <StatsOverview />}
        {activeTab === 'history' && <PrayerHistory />}
      </div>

      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
