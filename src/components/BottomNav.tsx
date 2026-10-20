import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentTab: ScreenType;
  onSelectTab: (tab: ScreenType) => void;
  unreadChatCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  unreadChatCount = 2,
}) => {
  const tabs = [
    { id: 'explore' as ScreenType, label: 'Explore', icon: 'spa' },
    { id: 'sessions' as ScreenType, label: 'Sessions', icon: 'event_available' },
    { id: 'chat' as ScreenType, label: 'Chat & Rooms', icon: 'forum', badge: unreadChatCount },
    { id: 'account' as ScreenType, label: 'Account', icon: 'person_outline' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(46,125,91,0.06)] border-t border-surface-container/60">
      <div className="max-w-md mx-auto h-18 px-2 flex items-center justify-around">
        {tabs.map(tab => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] flex-1 py-1 transition-all ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[23px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {tab.icon}
                </span>
                {tab.badge && tab.badge > 0 && !isActive && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-tertiary text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight ${isActive ? 'font-semibold' : 'font-normal'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
