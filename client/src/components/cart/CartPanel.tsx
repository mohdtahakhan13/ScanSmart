import React from 'react';
import { X, Trash2, Minus, Plus } from 'lucide-react';
import { CartItem } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface CartPanelProps {
  cartItems: CartItem[];
  totalPrice: number;
  totalTax: number;
  totalSavings: number;
  totalWeight: number;
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({
  cartItems,
  totalPrice,
  totalTax,
  totalSavings,
  totalWeight,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const finalTotal = totalPrice + totalTax - totalSavings;
  
  return (
    <div className="fixed inset-0 z-50 pt-16">
      <div className="absolute inset-0 bg-black/20" onClick={onClose}></div>
      <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-lg h-5/6 slide-up">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-montserrat font-semibold text-lg">Your Cart</h2>
          <button onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-65px)]">
          <div className="p-4">
            {/* Cart items list */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-3 flex items-center">
                  <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 mr-3">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      {item.pricePerUnit} - {item.weight * item.quantity} lb
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center bg-gray-100 rounded-full">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax (5.5%)</span>
                <span>${totalTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-success text-sm mb-3">
                <span>Savings</span>
                <span>-${totalSavings.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-200 mb-3"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Estimated weight */}
            <div className="bg-primary/5 rounded-xl p-4 mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-5 w-5"
                  >
                    <circle cx="12" cy="12" r="8" />
                    <line x1="3" y1="3" x2="6" y2="6" />
                    <line x1="21" y1="3" x2="18" y2="6" />
                    <line x1="3" y1="21" x2="6" y2="18" />
                    <line x1="21" y1="21" x2="18" y2="18" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Estimated Weight</h4>
                  <p className="text-sm text-gray-600">Your cart weight will be verified at checkout</p>
                </div>
              </div>
              <div className="mt-3 bg-white rounded-lg p-3 flex justify-between items-center">
                <span className="font-medium">Total Weight</span>
                <span className="font-semibold">{totalWeight.toFixed(1)} lbs</span>
              </div>
            </div>
            
            {/* Checkout button */}
            <Button
              onClick={onCheckout}
              className="bg-primary text-white font-semibold w-full py-6 rounded-xl shadow-md mb-8"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
