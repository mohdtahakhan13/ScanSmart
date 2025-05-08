import React from 'react';
import { Button } from '@/components/ui/button';
import QRScanner from '@/components/ui/qr-scanner';

interface QRScanScreenProps {
  onScan: (qrData: string) => void;
  onCancel: () => void;
}

const QRScanScreen: React.FC<QRScanScreenProps> = ({ onScan, onCancel }) => {
  return (
    <div className="fixed inset-0 z-40 bg-dark">
      <QRScanner onScan={onScan} onClose={onCancel} />
      
      <div className="absolute inset-x-0 top-12 flex justify-center text-center">
        <div className="bg-black/50 text-white px-6 py-3 rounded-full backdrop-blur-sm">
          <h2 className="font-medium">Scan Store QR Code</h2>
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-24 flex justify-center">
        <div className="bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-lg max-w-xs text-center">
          <p className="text-sm">Point your camera at the QR code located at the store entrance</p>
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

export default QRScanScreen;
