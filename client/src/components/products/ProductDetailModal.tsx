import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface ProductDetailModalProps {
  product: Product;
  recommended: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  recommended,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 pt-16">
      <div className="absolute inset-0 bg-black/20" onClick={onClose}></div>
      <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-lg slide-up max-h-4/5">
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h2 className="font-montserrat font-semibold text-lg">Product Added</h2>
            <button onClick={onClose} className="p-1">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex mb-4">
            <div className="h-24 w-24 rounded-lg overflow-hidden bg-gray-100 mr-4">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-1">{product.pricePerUnit}</p>
              
              {product.discount && product.discount > 0 && (
                <div className="flex items-center mb-2">
                  <div className="text-sm bg-success/10 text-success px-2 py-0.5 rounded-full">
                    Save {product.discount}%
                  </div>
                </div>
              )}
              
              <div className="flex items-center bg-gray-100 rounded-full inline-flex">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-gray-500"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <h4 className="font-medium mb-2">Weight Information</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500 h-4 w-4 mr-2"
                >
                  <circle cx="12" cy="12" r="8" />
                  <line x1="3" y1="3" x2="6" y2="6" />
                  <line x1="21" y1="3" x2="18" y2="6" />
                  <line x1="3" y1="21" x2="6" y2="18" />
                  <line x1="21" y1="21" x2="18" y2="18" />
                </svg>
                <span className="text-sm">Estimated Weight</span>
              </div>
              <span className="font-medium">{(product.weight * quantity).toFixed(1)} lb</span>
            </div>
          </div>
          
          <div className="flex space-x-3 mb-4">
            <Button
              variant="outline"
              className="flex-1 bg-gray-100 text-gray-700 font-medium"
            >
              View Details
            </Button>
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white font-medium"
            >
              Add to Cart
            </Button>
          </div>
          
          {recommended && recommended.length > 0 && (
            <div className="bg-primary/5 rounded-xl p-4">
              <h4 className="font-medium mb-2">You might also like</h4>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {recommended.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm p-2 min-w-[100px]">
                    <div className="h-14 w-14 rounded-lg overflow-hidden bg-gray-100 mb-2">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <h5 className="text-xs font-medium">{item.name}</h5>
                    <p className="text-gray-600 text-xs">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
