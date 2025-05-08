import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

// Components
import OnboardingScreen from '@/components/onboarding/OnboardingScreen';
import QRScanScreen from '@/components/scanning/QRScanScreen';
import ProductScanModal from '@/components/scanning/ProductScanModal';
import StoreHeader from '@/components/store/StoreHeader';
import StoreMap from '@/components/store/StoreMap';
import RecommendedProducts from '@/components/store/RecommendedProducts';
import BottomNavigation from '@/components/store/BottomNavigation';
import CartSummaryBar from '@/components/cart/CartSummaryBar';
import CartPanel from '@/components/cart/CartPanel';
import ProductDetailModal from '@/components/products/ProductDetailModal';
import CheckoutModal from '@/components/checkout/CheckoutModal';
import SuccessModal from '@/components/checkout/SuccessModal';

// Types
import { Store, Product } from '@/lib/types';

export default function HomePage() {
  const app = useApp();
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'lists' | 'history'>('home');
  const [orderNumber, setOrderNumber] = useState('');
  
  // Fetch store data when QR code is scanned
  const { data: storeData, isLoading: storeLoading } = useQuery<Store>({
    queryKey: ['/api/store', app.currentStore?.id],
    enabled: app.currentStore !== null,
  });
  
  // Fetch recommended products
  const { data: recommendedProducts = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/recommended', app.currentStore?.id],
    enabled: app.currentStore !== null,
  });
  
  // Fetch related products when a product is scanned
  const { data: relatedProducts = [], isLoading: relatedLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/related', app.currentProduct?.id],
    enabled: app.currentProduct !== null,
  });
  
  // Handle QR code scanning
  const handleQRScan = (qrData: string) => {
    // Parse QR data format: "store:id:name:branch"
    const parts = qrData.split(':');
    if (parts[0] === 'store' && parts.length >= 4) {
      const storeId = parseInt(parts[1]);
      const storeName = parts[2];
      const storeBranch = parts[3];
      
      app.setCurrentStore({
        id: storeId,
        name: storeName,
        branch: storeBranch,
        qrCode: qrData,
        layout: { sections: [] } // Will be populated from API
      });
      
      app.setShowQRScanner(false);
    }
  };
  
  // Handle product barcode scanning
  const handleProductScan = async (barcode: string) => {
    try {
      const response = await fetch(`/api/products/barcode/${barcode}`);
      if (!response.ok) throw new Error('Product not found');
      
      const product: Product = await response.json();
      app.setCurrentProduct(product);
      app.setShowProductScanner(false);
      app.setShowProductDetail(true);
    } catch (error) {
      console.error('Error scanning product:', error);
      app.setShowProductScanner(false);
    }
  };
  
  // Handle checkout completion
  const handleCompletePayment = () => {
    // Generate order number
    const randomOrderNumber = `#${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    setOrderNumber(randomOrderNumber);
    
    app.setShowCheckout(false);
    app.setShowSuccess(true);
  };
  
  // Calculate cart metrics
  const totalSavings = app.cart.reduce(
    (total, item) => total + ((item.discount || 0) / 100) * item.price * item.quantity, 
    0
  );
  
  const totalTax = app.cartTotal * 0.055; // 5.5% tax rate
  
  // Reset app state when closing success modal
  const handleSuccessClose = () => {
    app.setShowSuccess(false);
    app.clearCart();
  };
  
  // Start with onboarding
  useEffect(() => {
    app.setShowOnboarding(true);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Onboarding Screen */}
      {app.showOnboarding && (
        <OnboardingScreen 
          onGetStarted={() => {
            app.setShowOnboarding(false);
            app.setShowQRScanner(true);
          }} 
        />
      )}
      
      {/* QR Scan Screen */}
      {app.showQRScanner && (
        <QRScanScreen 
          onScan={handleQRScan}
          onCancel={() => app.setShowQRScanner(false)} 
        />
      )}
      
      {/* Main App Interface - only shown after store is set */}
      {app.currentStore && (
        <>
          <StoreHeader store={app.currentStore} />
          
          <div className="flex-1 pb-32">
            {storeData && <StoreMap layout={storeData.layout} />}
            
            <RecommendedProducts 
              products={recommendedProducts}
              onAddToCart={(product) => {
                app.setCurrentProduct(product);
                app.setShowProductDetail(true);
              }}
            />
          </div>
          
          {/* Scan Button */}
          <div className="fixed bottom-24 inset-x-0 flex justify-center items-center z-20">
            <button 
              onClick={() => app.setShowProductScanner(true)}
              className="scan-btn bg-primary text-white h-16 w-16 rounded-full flex items-center justify-center shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="3" y1="5" x2="21" y2="5" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="19" x2="21" y2="19" />
              </svg>
            </button>
          </div>
          
          {/* Bottom Navigation Bar */}
          <BottomNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          {/* Cart Summary Bar - only shown when cart has items */}
          {app.cart.length > 0 && (
            <CartSummaryBar 
              items={app.cart}
              totalPrice={app.cartTotal}
              totalWeight={app.cartWeight}
              savings={totalSavings}
              onViewCart={() => app.setShowCartPanel(true)}
            />
          )}
        </>
      )}
      
      {/* Product Scan Modal */}
      {app.showProductScanner && (
        <ProductScanModal 
          onScan={handleProductScan}
          onCancel={() => app.setShowProductScanner(false)}
        />
      )}
      
      {/* Cart Panel */}
      {app.showCartPanel && (
        <CartPanel 
          cartItems={app.cart}
          totalPrice={app.cartTotal}
          totalTax={totalTax}
          totalSavings={totalSavings}
          totalWeight={app.cartWeight}
          onClose={() => app.setShowCartPanel(false)}
          onUpdateQuantity={app.updateCartItemQuantity}
          onRemoveItem={app.removeFromCart}
          onCheckout={() => {
            app.setShowCartPanel(false);
            app.setShowCheckout(true);
          }}
        />
      )}
      
      {/* Product Detail Modal */}
      {app.showProductDetail && app.currentProduct && (
        <ProductDetailModal 
          product={app.currentProduct}
          recommended={relatedProducts}
          onClose={() => app.setShowProductDetail(false)}
          onAddToCart={app.addToCart}
        />
      )}
      
      {/* Checkout Modal */}
      {app.showCheckout && app.currentStore && (
        <CheckoutModal 
          cartItems={app.cart}
          totalPrice={app.cartTotal}
          totalTax={totalTax}
          totalSavings={totalSavings}
          totalWeight={app.cartWeight}
          storeName={app.currentStore.name}
          storeBranch={app.currentStore.branch}
          onClose={() => app.setShowCheckout(false)}
          onCompletePayment={handleCompletePayment}
        />
      )}
      
      {/* Success Modal */}
      {app.showSuccess && (
        <SuccessModal 
          orderNumber={orderNumber}
          orderDate={format(new Date(), 'MMMM d, yyyy')}
          totalAmount={app.cartTotal + totalTax - totalSavings}
          onViewReceipt={() => {
            // Future functionality
          }}
          onClose={handleSuccessClose}
        />
      )}
    </div>
  );
}
