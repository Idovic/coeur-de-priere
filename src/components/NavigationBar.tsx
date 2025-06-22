
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-white/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 min-h-[60px] ${
                activeTab === id
                  ? 'text-prayer-600 bg-prayer-50'
                  : 'text-serenity-600 hover:text-prayer-500 hover:bg-prayer-25'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
