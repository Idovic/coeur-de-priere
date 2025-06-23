
import React, { useState, useEffect } from 'react';
import { allPrayers } from '../data/prayers';
import { themes } from '../data/themes';
import PrayerCard from '../components/PrayerCard';
import PrayerReader from '../components/PrayerReader';
import StatsOverview from '../components/StatsOverview';
import PrayerHistory from '../components/PrayerHistory';
import NavigationBar from '../components/NavigationBar';
import ThemeCard from '../components/ThemeCard';
import SplashScreen from '../components/SplashScreen';
import NotificationSettings from '../components/NotificationSettings';
import PrayerStreak from '../components/PrayerStreak';
import QuickActions from '../components/QuickActions';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { PrayerTopic } from '../types/prayer';
import { Heart, Sparkles, Search, Filter, Settings, Shuffle, Share2 } from 'lucide-react';

const Index = () => {
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerTopic | null>(null);
  const [activeTab, setActiveTab] = useState<'prayers' | 'stats' | 'history' | 'settings'>('prayers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [prayersList, setPrayersList] = useState(allPrayers);
  const [showSplash, setShowSplash] = useState(true);
  const [viewMode, setViewMode] = useState<'themes' | 'list'>('themes');
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);

  // PWA installation
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // @ts-ignore
      window.deferredPrompt = e;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Gestion du splash screen
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Filtrer les prières selon le thème sélectionné et la recherche
  const filteredPrayers = prayersList.filter(prayer => {
    const matchesSearch = searchTerm === '' || 
      prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prayer.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTheme = !selectedTheme || prayer.category === selectedTheme;
    return matchesSearch && matchesTheme;
  });

  // DIAGNOSTIC COMPLET CORRIGÉ - Compte toutes les catégories
  console.log(`=== DIAGNOSTIC COMPLET CORRIGÉ ===`);
  console.log(`1. Données sources:`);
  console.log(`   - allPrayers.length: ${allPrayers.length}`);
  console.log(`   - prayersList.length: ${prayersList.length}`);
  
  console.log(`2. État du filtrage:`);
  console.log(`   - searchTerm: "${searchTerm}"`);
  console.log(`   - selectedTheme: ${selectedTheme}`);
  console.log(`   - viewMode: ${viewMode}`);
  console.log(`   - filteredPrayers.length: ${filteredPrayers.length}`);
  
  console.log(`3. Vérification COMPLÈTE par catégorie:`);
  // Obtenir toutes les catégories uniques présentes dans les données
  const allCategories = [...new Set(prayersList.map(p => p.category))];
  let totalPrayersInCategories = 0;
  
  allCategories.forEach(category => {
    const categoryCount = prayersList.filter(p => p.category === category).length;
    totalPrayersInCategories += categoryCount;
    const themeInfo = themes.find(t => t.category === category);
    const themeName = themeInfo ? themeInfo.title : `Catégorie inconnue (${category})`;
    console.log(`   - ${themeName}: ${categoryCount} prières`);
  });
  
  console.log(`4. Vérification totale:`);
  console.log(`   - Catégories trouvées: ${allCategories.length}`);
  console.log(`   - Total prières dans catégories: ${totalPrayersInCategories}`);
  console.log(`   - Correspond au total? ${totalPrayersInCategories === allPrayers.length ? '✅ OUI' : '❌ NON'}`);
  
  console.log(`5. État de rendu:`);
  console.log(`   - activeTab: ${activeTab}`);
  console.log(`   - Prières à rendre: ${activeTab === 'prayers' && viewMode === 'list' ? filteredPrayers.length : 'N/A (mode thèmes)'}`);
  console.log(`=== FIN DU DIAGNOSTIC CORRIGÉ ===`);

  const handlePrayerClick = (prayer: PrayerTopic) => {
    setPrayersList(prev => prev.map(p => 
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
    setPrayersList(prev => prev.map(p => 
      p.id === prayerId 
        ? { ...p, isCompleted: true, completedAt: new Date() }
        : p
    ));
  };

  const handleThemeClick = (themeId: string) => {
    console.log(`=== SÉLECTION THÈME ===`);
    console.log(`Thème sélectionné: ${themeId}`);
    const themePrayers = prayersList.filter(p => p.category === themeId);
    console.log(`Prières dans ce thème: ${themePrayers.length}`);
    console.log(`IDs des prières du thème:`, themePrayers.map(p => p.id).sort((a,b) => a-b));
    
    setSelectedTheme(themeId);
    setViewMode('list');
  };

  const backToThemes = () => {
    setSelectedTheme(null);
    setViewMode('themes');
    setSearchTerm('');
  };

  const handleRandomPrayer = () => {
    const randomIndex = Math.floor(Math.random() * prayersList.length);
    const randomPrayer = prayersList[randomIndex];
    handlePrayerClick(randomPrayer);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cœur de Prière',
          text: 'Découvrez cette application de prière qui transforme ma vie spirituelle',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erreur lors du partage:', error);
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-prayer-100 via-harmony-100 to-mystic-100 relative overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-prayer-400/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-mystic-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-harmony-400/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-6 pb-24 max-w-6xl relative z-10">
        
        {/* Enhanced Header */}
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
          <p className="text-prayer-800 text-xl font-medium mb-2 font-inter">
            Votre compagnon spirituuel au quotidien
          </p>
          <p className="text-prayer-700 text-sm font-inter max-w-md mx-auto">
            Découvrez {prayersList.length} prières organisées par thèmes pour enrichir votre relation avec Dieu
          </p>
        </div>

        {/* Content selon l'onglet actif */}
        {activeTab === 'prayers' && (
          <div className="space-y-8">
            
            {/* Quick Actions and Streak */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <QuickActions
                  onRandomPrayer={handleRandomPrayer}
                  onFavorites={() => setViewMode('list')}
                  onDailyReading={handleRandomPrayer}
                  onShare={handleShare}
                  prayers={prayersList}
                />
              </div>
              <PrayerStreak />
            </div>

            {/* Vue thématique moderne */}
            {viewMode === 'themes' && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-prayer-900 mb-4 font-nunito">
                    Découvrez nos Thématiques Spirituelles
                  </h2>
                  <p className="text-prayer-700 font-inter max-w-2xl mx-auto">
                    Chaque thème contient des prières soigneusement sélectionnées pour vous accompagner 
                    dans vos différents besoins spirituels et moments de vie
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {themes.map((theme, index) => {
                    const themePrayerCount = prayersList.filter(p => p.category === theme.category).length;
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
                          prayerCount={themePrayerCount}
                          onClick={() => handleThemeClick(theme.category)}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Enhanced statistics */}
                <Card className="glass-card border-white/40 bg-white/60 backdrop-blur-xl animate-fade-in shadow-xl">
                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-prayer-600" />
                      <h3 className="text-lg font-semibold text-prayer-900 font-nunito">Votre Parcours Spirituel</h3>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <div className="text-2xl font-bold text-prayer-700 mb-1">
                          {prayersList.filter(p => p.isCompleted).length}
                        </div>
                        <div className="text-sm text-prayer-600">Prières explorées</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-mystic-700 mb-1">
                          {prayersList.reduce((sum, p) => sum + p.readCount, 0)}
                        </div>
                        <div className="text-sm text-prayer-600">Moments de prière</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-harmony-700 mb-1">
                          {themes.length}
                        </div>
                        <div className="text-sm text-prayer-600">Thématiques</div>
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
                    className="btn-glass text-prayer-800 hover:text-prayer-900 bg-white/50 border border-white/40"
                  >
                    ← Retour aux thématiques
                  </button>
                  
                  {selectedTheme && (
                    <div className="flex items-center gap-4">
                      <Badge className="bg-prayer-gradient text-white border-white/40">
                        {themes.find(t => t.category === selectedTheme)?.title}
                      </Badge>
                      <div className="text-sm text-prayer-700 font-medium">
                        {filteredPrayers.length} prière{filteredPrayers.length > 1 ? 's' : ''}
                      </div>
                    </div>
                  )}
                </div>

                {/* Barre de recherche */}
                <Card className="glass-card border-white/40 bg-white/60 backdrop-blur-xl shadow-lg">
                  <div className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-prayer-600" />
                      <Input
                        placeholder="Rechercher dans cette thématique..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/60 border-white/60 focus:border-prayer-400 focus:ring-prayer-300 rounded-xl text-prayer-800"
                      />
                    </div>
                  </div>
                </Card>

                {/* Affichage des prières */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPrayers.map((prayer, index) => (
                      <div 
                        key={`prayer-${prayer.id}`}
                        className="animate-fade-in"
                        style={{ animationDelay: `${Math.min(index * 50, 2000)}ms` }}
                      >
                        <PrayerCard
                          prayer={prayer}
                          onClick={() => handlePrayerClick(prayer)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {filteredPrayers.length === 0 && (
                  <Card className="glass-card border-white/40 bg-white/60 backdrop-blur-xl text-center py-16 shadow-lg">
                    <div className="floating mb-6">
                      <span className="text-6xl opacity-50">🔍</span>
                    </div>
                    <h3 className="text-xl font-semibold text-prayer-900 mb-3 font-nunito">
                      Aucune prière trouvée
                    </h3>
                    <p className="text-prayer-700 max-w-md mx-auto font-inter">
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
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <NotificationSettings />
          </div>
        )}
      </div>

      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
