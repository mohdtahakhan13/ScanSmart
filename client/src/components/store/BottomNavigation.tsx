import React from 'react';
import { Home, Search, ListChecks, Receipt } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'home' | 'search' | 'lists' | 'history';
  onTabChange: (tab: 'home' | 'search' | 'lists' | 'history') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab,
  onTabChange
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 py-2 px-6 z-20">
      <div className="flex justify-between items-center">
        <button 
          className="flex flex-col items-center w-16"
          onClick={() => onTabChange('home')}
        >
          <Home 
            className={activeTab === 'home' ? "text-primary" : "text-gray-400"} 
            size={20}
          />
          <span 
            className={`text-xs mt-1 ${
              activeTab === 'home' ? "text-primary font-medium" : "text-gray-500"
            }`}
          >
            Home
          </span>
        </button>
        
        <button 
          className="flex flex-col items-center w-16"
          onClick={() => onTabChange('search')}
        >
          <Search 
            className={activeTab === 'search' ? "text-primary" : "text-gray-400"} 
            size={20}
          />
          <span 
            className={`text-xs mt-1 ${
              activeTab === 'search' ? "text-primary font-medium" : "text-gray-500"
            }`}
          >
            Search
          </span>
        </button>
        
        <button 
          className="flex flex-col items-center w-16"
          onClick={() => onTabChange('lists')}
        >
          <ListChecks 
            className={activeTab === 'lists' ? "text-primary" : "text-gray-400"} 
            size={20}
          />
          <span 
            className={`text-xs mt-1 ${
              activeTab === 'lists' ? "text-primary font-medium" : "text-gray-500"
            }`}
          >
            Lists
          </span>
        </button>
        
        <button 
          className="flex flex-col items-center w-16"
          onClick={() => onTabChange('history')}
        >
          <Receipt 
            className={activeTab === 'history' ? "text-primary" : "text-gray-400"} 
            size={20}
          />
          <span 
            className={`text-xs mt-1 ${
              activeTab === 'history' ? "text-primary font-medium" : "text-gray-500"
            }`}
          >
            History
          </span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
