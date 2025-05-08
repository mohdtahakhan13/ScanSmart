import React from 'react';
import { Button } from '@/components/ui/button';
import BarcodeScanner from '@/components/ui/barcode-scanner';

interface ProductScanModalProps {
  onScan: (barcode: string) => void;
  onCancel: () => void;
}

const ProductScanModal: React.FC<ProductScanModalProps> = ({ onScan, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 bg-dark">
      <BarcodeScanner onScan={onScan} onClose={onCancel} />
      
      <div className="absolute inset-x-0 top-12 flex justify-center text-center">
        <div className="bg-black/50 text-white px-6 py-3 rounded-full backdrop-blur-sm">
          <h2 className="font-medium">Scan Product Barcode</h2>
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-24 flex justify-center">
        <div className="bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-lg max-w-xs text-center">
          <p className="text-sm">Center the barcode in the box</p>
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-10 flex justify-center">
        <Button
          onClick={onCancel}
          variant="outline"
          className="bg-white text-dark font-medium"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ProductScanModal;
