import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, Store, CartItem } from "../lib/types";

interface AppContextType {
  // Application view states
  showOnboarding: boolean;
  showQRScanner: boolean;
  showProductScanner: boolean;
  showCartPanel: boolean;
  showProductDetail: boolean;
  showCheckout: boolean;
  showSuccess: boolean;

  // Store and product data
  currentStore: Store | null;
  currentProduct: Product | null;
  cart: CartItem[];
  cartTotal: number;
  cartWeight: number;
  
  // Methods for changing state
  setShowOnboarding: (show: boolean) => void;
  setShowQRScanner: (show: boolean) => void;
  setShowProductScanner: (show: boolean) => void;
  setShowCartPanel: (show: boolean) => void;
  setShowProductDetail: (show: boolean) => void;
  setShowCheckout: (show: boolean) => void;
  setShowSuccess: (show: boolean) => void;
  setCurrentStore: (store: Store | null) => void;
  setCurrentProduct: (product: Product | null) => void;
  
  // Cart methods
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Application view states
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showProductScanner, setShowProductScanner] = useState(false);
  const [showCartPanel, setShowCartPanel] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Store and product data
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Calculate cart totals
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  const cartWeight = cart.reduce(
    (total, item) => total + (item.weight * item.quantity), 
    0
  );
  
  // Cart methods
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prev, { 
          ...product, 
          quantity 
        }];
      }
    });
  };
  
  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };
  
  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const value = {
    showOnboarding,
    showQRScanner,
    showProductScanner,
    showCartPanel,
    showProductDetail,
    showCheckout,
    showSuccess,
    currentStore,
    currentProduct,
    cart,
    cartTotal,
    cartWeight,
    setShowOnboarding,
    setShowQRScanner,
    setShowProductScanner,
    setShowCartPanel,
    setShowProductDetail,
    setShowCheckout,
    setShowSuccess,
    setCurrentStore,
    setCurrentProduct,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
