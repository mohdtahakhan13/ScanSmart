import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Scale } from 'lucide-react';
import { CartItem } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface CheckoutModalProps {
  cartItems: CartItem[];
  totalPrice: number;
  totalTax: number;
  totalSavings: number;
  totalWeight: number;
  storeName: string;
  storeBranch: string;
  onClose: () => void;
  onCompletePayment: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  cartItems,
  totalPrice,
  totalTax,
  totalSavings,
  totalWeight,
  storeName,
  storeBranch,
  onClose,
  onCompletePayment
}) => {
  const [verificationStep, setVerificationStep] = useState<'waiting' | 'verifying' | 'verified'>('waiting');
  const [currentWeight, setCurrentWeight] = useState(0);
  const finalTotal = totalPrice + totalTax - totalSavings;
  
  useEffect(() => {
    const simulateWeightVerification = () => {
      setVerificationStep('verifying');
      
      // Simulate weight increasing gradually
      let weight = 0;
      const interval = setInterval(() => {
        weight += 0.2;
        setCurrentWeight(parseFloat(weight.toFixed(1)));
        
        if (weight >= totalWeight) {
          clearInterval(interval);
          setTimeout(() => {
            setVerificationStep('verified');
          }, 1000);
        }
      }, 500);
      
      return () => clearInterval(interval);
    };
    
    // Start simulation after 2 seconds
    const timeout = setTimeout(simulateWeightVerification, 2000);
    
    return () => clearTimeout(timeout);
  }, [totalWeight]);
  
  const getWeightStatusText = () => {
    if (verificationStep === 'waiting') return 'Waiting...';
    if (verificationStep === 'verifying') return `${currentWeight.toFixed(1)} lb`;
    return `${totalWeight.toFixed(1)} lb (Verified)`;
  };
  
  const getWeightStatusColor = () => {
    if (verificationStep === 'waiting') return 'text-warning';
    if (verificationStep === 'verifying') return 'text-warning';
    return 'text-success';
  };
  
  const getProgressBarWidth = () => {
    if (verificationStep === 'waiting') return 'w-1/4';
    if (verificationStep === 'verifying') return `w-[${(currentWeight / totalWeight) * 100}%]`;
    return 'w-full';
  };
  
  const getProgressBarColor = () => {
    if (verificationStep === 'waiting') return 'bg-warning';
    if (verificationStep === 'verifying') return 'bg-warning';
    return 'bg-success';
  };
  
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div className="absolute inset-x-0 bottom-0 top-16 bg-white rounded-t-3xl shadow-lg slide-up overflow-y-auto">
        <div className="sticky top-0 bg-white pt-6 px-4 pb-4 border-b border-gray-200 z-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-montserrat font-semibold text-xl">Checkout</h2>
            <button onClick={onClose} className="p-1">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <ShoppingCart className="text-primary h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{storeName}</h3>
                <p className="text-gray-500 text-xs">{storeBranch}</p>
              </div>
            </div>
            <p className="font-semibold text-lg">${finalTotal.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="p-4">
          {/* Verification steps */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Weight Verification</h3>
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center mr-3 mt-1">
                  <Scale className="text-warning h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Place your cart on the scale</h4>
                  <p className="text-sm text-gray-600">Please place all items on the weight verification platform</p>
                </div>
              </div>
              
              {/* Weight verification visualization */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Expected Weight</span>
                  <span className="font-medium">{totalWeight.toFixed(1)} lbs</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm text-gray-600">Current Weight</span>
                  <span className={`font-medium ${getWeightStatusColor()}`}>
                    {getWeightStatusText()}
                  </span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getProgressBarColor()} ${
                      verificationStep === 'verifying' 
                        ? `w-[${Math.round((currentWeight / totalWeight) * 100)}%]` 
                        : verificationStep === 'verified' 
                          ? 'w-full' 
                          : 'w-1/4 animate-pulse'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment method */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Payment Method</h3>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-500 h-5 w-5"
                    >
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Credit Card</h4>
                    <p className="text-sm text-gray-600">**** **** **** 5412</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="border border-gray-300 text-gray-700 rounded-lg py-2 w-full flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Payment Method
              </Button>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Order Summary</h3>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
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
          </div>
          
          {/* Complete checkout button */}
          <Button
            onClick={onCompletePayment}
            disabled={verificationStep !== 'verified'}
            className={`w-full py-3 rounded-xl shadow-md mb-6 ${
              verificationStep === 'verified' 
                ? 'bg-primary text-white font-semibold' 
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Confirm and Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
