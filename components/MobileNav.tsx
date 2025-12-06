import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, CheckSquare, MessageSquareText, BookOpen } from 'lucide-react';

interface MobileNavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'checklist', label: 'Tasks', icon: CheckSquare },
    { id: 'assistant', label: 'Mentor', icon: MessageSquareText },
    { id: 'resources', label: 'Files', icon: BookOpen },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewState)}
            className={`flex flex-col items-center space-y-1 ${
              isActive ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileNav;
