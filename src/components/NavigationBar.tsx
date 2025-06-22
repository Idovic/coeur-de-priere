
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-navbar">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`nav-button ${activeTab === id ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
