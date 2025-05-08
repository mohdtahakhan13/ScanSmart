import React from 'react';
import { CartItem } from '@/lib/types';
import { ShoppingBasket, ChevronUp } from 'lucide-react';

interface CartSummaryBarProps {
  items: CartItem[];
  totalPrice: number;
  totalWeight: number;
  savings: number;
  onViewCart: () => void;
}

const CartSummaryBar: React.FC<CartSummaryBarProps> = ({
  items,
  totalPrice,
  totalWeight,
  savings,
  onViewCart
}) => {
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <div className="fixed bottom-16 inset-x-0 bg-white shadow-md border-t border-gray-200 py-3 px-4 z-10 flex justify-between items-center">
      <div className="flex items-center">
        <div className="bg-primary/10 rounded-full p-2 mr-3">
          <ShoppingBasket className="text-primary h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium">{itemCount} items</p>
          <p className="text-xs text-gray-500">Est. weight: {totalWeight.toFixed(1)} lbs</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="mr-3 text-right">
          <p className="font-semibold">${totalPrice.toFixed(2)}</p>
          {savings > 0 && (
            <p className="text-xs text-success">Save ${savings.toFixed(2)}</p>
          )}
        </div>
        <button 
          onClick={onViewCart}
          className="bg-primary text-white flex items-center justify-center h-10 w-10 rounded-full"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartSummaryBar;
