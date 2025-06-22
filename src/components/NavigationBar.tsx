
import React from 'react';
import { Heart, Check, Clock } from 'lucide-react';

interface NavigationBarProps {
  activeTab: 'prayers' | 'stats' | 'history';
  onTabChange: (tab: 'prayers' | 'stats' | 'history') => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'prayers' as const,
      label: 'Prières',
      icon: Heart
    },
    {
      id: 'stats' as const,
      label: 'Progression',
      icon: Check
    },
    {
      id: 'history' as const,
      label: 'Historique',
      icon: Clock
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-strong border-t border-white/30 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-300
                  ${isActive 
                    ? 'bg-prayer-500 text-white shadow-lg transform scale-105' 
                    : 'text-prayer-600 hover:bg-white/30 hover:text-prayer-700'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-medium">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
