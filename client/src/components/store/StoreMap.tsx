import React from 'react';
import { Expand, MapPin } from 'lucide-react';
import { StoreLayout } from '@/lib/types';

interface StoreMapProps {
  layout: StoreLayout;
  currentSection?: string;
}

const StoreMap: React.FC<StoreMapProps> = ({ layout, currentSection }) => {
  const getBgColor = (sectionId: string) => {
    const section = layout.sections.find((s) => s.id === sectionId);
    return section?.color || 'bg-gray-100';
  };
  
  return (
    <div className="bg-white p-4 m-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-montserrat font-semibold text-lg">Store Map</h2>
        <button className="text-primary text-sm font-medium flex items-center">
          <Expand className="h-4 w-4 mr-1" /> Expand
        </button>
      </div>
      
      <div className="bg-gray-100 rounded-lg h-48 overflow-hidden relative">
        <div className="absolute inset-0 p-3">
          <div className="bg-white/80 h-full rounded-lg p-2 flex flex-col">
            <div className="flex h-2/3 mb-1">
              <div className="w-1/3 bg-green-100 rounded mr-1 text-xs font-medium flex items-center justify-center">Produce</div>
              <div className="w-1/3 bg-yellow-100 rounded mr-1 text-xs font-medium flex items-center justify-center">Bakery</div>
              <div className="w-1/3 bg-blue-100 rounded text-xs font-medium flex items-center justify-center">Dairy</div>
            </div>
            <div className="flex h-1/4">
              <div className="w-1/2 bg-purple-100 rounded mr-1 text-xs font-medium flex items-center justify-center">Beverages</div>
              <div className="w-1/2 bg-red-100 rounded text-xs font-medium flex items-center justify-center">Snacks</div>
            </div>
            
            {/* User location */}
            <div className="absolute bottom-5 right-8 w-4 h-4 bg-primary rounded-full pulse-animation border-2 border-white"></div>
            
            {/* Path to recommended product */}
            <div className="absolute top-12 right-16 flex flex-col items-center">
              <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs">!</div>
              <div className="mt-1 bg-white text-xs px-1 py-0.5 rounded shadow-sm">Your item</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex items-center">
        <div className="bg-primary/10 p-1.5 rounded-full mr-2">
          <MapPin className="text-primary h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium">
            Currently in: <span className="text-primary">Produce Section</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreMap;
