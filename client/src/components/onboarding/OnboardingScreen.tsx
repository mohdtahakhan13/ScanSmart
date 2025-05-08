import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, QrCode, ShoppingBasket, Unlock } from 'lucide-react';

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="fixed inset-0 z-50 bg-light flex flex-col items-center justify-center p-6 fade-in">
      <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-8 shadow-lg">
        <ShoppingBasket size={48} className="text-primary" />
      </div>
      
      <h1 className="font-montserrat font-bold text-3xl mb-2 text-center">ScanSmart</h1>
      <p className="text-gray-600 text-center mb-8">Smart in-store shopping experience</p>
      
      <div className="space-y-6 w-full max-w-sm">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
          <div className="bg-primary/10 p-2 rounded-full mr-4">
            <QrCode className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Scan Store QR</h3>
            <p className="text-sm text-gray-600">Scan the QR code at store entrance</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
          <div className="bg-primary/10 p-2 rounded-full mr-4">
            <ShoppingBasket className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Scan Products</h3>
            <p className="text-sm text-gray-600">Scan items as you shop</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
          <div className="bg-primary/10 p-2 rounded-full mr-4">
            <Unlock className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Smart Checkout</h3>
            <p className="text-sm text-gray-600">Skip the line with weight verification</p>
          </div>
        </div>
      </div>
      
      <Button
        onClick={onGetStarted}
        className="mt-10 bg-primary text-white font-semibold py-3 px-8 rounded-full shadow-lg"
      >
        Start Shopping <ArrowRight className="ml-2" size={16} />
      </Button>
    </div>
  );
};

export default OnboardingScreen;
