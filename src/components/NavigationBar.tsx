
import React from 'react';
import { Book, BarChart3, History, Settings } from 'lucide-react';

interface NavigationBarProps {
  activeTab: 'prayers' | 'stats' | 'history' | 'settings';
  onTabChange: (tab: 'prayers' | 'stats' | 'history' | 'settings') => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'prayers' as const, icon: Book, label: 'Prières' },
    { id: 'stats' as const, icon: BarChart3, label: 'Progrès' },
    { id: 'history' as const, icon: History, label: 'Historique' },
    { id: 'settings' as const, icon: Settings, label: 'Paramètres' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-prayer-600/95 to-mystic-600/95 backdrop-blur-xl border-t border-white/30 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center justify-center px-4 py-3 rounded-2xl transition-all duration-300 min-h-[70px] ${
                activeTab === id
                  ? 'text-white bg-white/25 shadow-lg scale-105 border-2 border-white/40'
                  : 'text-white/70 hover:text-white hover:bg-white/15 hover:scale-102'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
