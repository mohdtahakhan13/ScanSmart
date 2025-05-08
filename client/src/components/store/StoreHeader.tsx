import React from 'react';
import { ShoppingCart, Bell, User } from 'lucide-react';
import { Store } from '@/lib/types';

interface StoreHeaderProps {
  store: Store;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({ store }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-4 flex items-center justify-between z-10">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
          <ShoppingCart className="text-primary" />
        </div>
        <div>
          <h1 className="font-montserrat font-semibold text-lg">{store.name}</h1>
          <p className="text-gray-500 text-xs">{store.branch}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
        <button className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
          <User className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default StoreHeader;
