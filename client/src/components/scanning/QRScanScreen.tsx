import React from 'react';
import { Button } from '@/components/ui/button';
import QRScanner from '@/components/ui/qr-scanner';
import { X } from 'lucide-react';

interface QRScanScreenProps {
  onScan: (qrData: string) => void;
  onCancel: () => void;
}

const QRScanScreen: React.FC<QRScanScreenProps> = ({ onScan, onCancel }) => {
  return (
    <div className="fixed inset-0 z-40 bg-dark">
      <div className="absolute inset-x-0 top-0 z-50 flex justify-between items-center py-4 px-6 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <h2 className="text-white font-semibold text-lg">Store QR Code</h2>
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
      
      <QRScanner onScan={onScan} onClose={onCancel} />
    </div>
  );
};

export default QRScanScreen;
