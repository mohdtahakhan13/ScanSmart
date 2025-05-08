import React from 'react';
import { Button } from '@/components/ui/button';
import BarcodeScanner from '@/components/ui/barcode-scanner';
import { X } from 'lucide-react';

interface ProductScanModalProps {
  onScan: (barcode: string) => void;
  onCancel: () => void;
}

const ProductScanModal: React.FC<ProductScanModalProps> = ({ onScan, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 bg-dark">
      <div className="absolute inset-x-0 top-0 z-50 flex justify-between items-center py-4 px-6 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <h2 className="text-white font-semibold text-lg">Product Barcode</h2>
          <p className="text-white/70 text-sm">Upload image or use demo mode</p>
        </div>
        <Button
          onClick={onCancel}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      <BarcodeScanner onScan={onScan} onClose={onCancel} />
    </div>
  );
};

export default ProductScanModal;
