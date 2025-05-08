import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessModalProps {
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  onViewReceipt: () => void;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  orderNumber,
  orderDate,
  totalAmount,
  onViewReceipt,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div className="bg-white rounded-2xl shadow-xl p-6 m-4 relative z-10 w-full max-w-sm fade-in">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-4">
            <Check className="h-10 w-10 text-success" />
          </div>
          
          <h2 className="font-montserrat font-semibold text-xl mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your purchase was successful! The gate will now unlock automatically.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-4 w-full mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order number</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Date</span>
              <span>{orderDate}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total</span>
              <span className="font-semibold">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex w-full space-x-3">
            <Button 
              onClick={onViewReceipt}
              variant="outline"
              className="flex-1 border border-gray-300 text-dark font-medium"
            >
              View Receipt
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-primary text-white font-medium"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
