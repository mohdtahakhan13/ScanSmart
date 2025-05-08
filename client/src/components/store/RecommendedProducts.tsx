import React from 'react';
import { Product } from '@/lib/types';
import { Plus } from 'lucide-react';

interface RecommendedProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ 
  products, 
  onAddToCart 
}) => {
  return (
    <div className="px-4 mb-4">
      <h2 className="font-montserrat font-semibold text-lg mb-3">Recommendations</h2>
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-3">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-sm p-3 min-w-[140px] flex flex-col"
            >
              <div className="h-20 rounded-lg overflow-hidden bg-gray-100 mb-2">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-gray-600 text-xs mb-2">
                {product.pricePerUnit || `$${product.price.toFixed(2)}`}
              </p>
              <button 
                onClick={() => onAddToCart(product)}
                className="mt-auto bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded flex items-center justify-center"
              >
                <Plus className="h-3 w-3 mr-1" /> Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;
