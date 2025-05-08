import React, { useRef, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        setLoading(true);
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setLoading(false);
          };
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        toast({
          title: 'Camera access error',
          description: 'Unable to access your camera. Please check permissions.',
          variant: 'destructive',
        });
        onClose();
      }
    };

    startCamera();

    // Simulate barcode detection
    const simulateBarcodeDetection = () => {
      // Random barcode generation for demo purposes
      const randomBarcodes = [
        '7896080900021', // Banana barcode
        '7891234567890', // Cereal barcode
        '7893210987654', // Yogurt barcode
        '7897890123456', // Bread barcode
        '7899876543210'  // Apple barcode
      ];
      
      const randomBarcode = randomBarcodes[Math.floor(Math.random() * randomBarcodes.length)];
      
      setTimeout(() => {
        if (!loading) {
          toast({
            title: 'Product detected',
            description: `Scanned barcode: ${randomBarcode}`,
          });
          onScan(randomBarcode);
        }
      }, 2000);
    };

    const barcodeDetection = setTimeout(simulateBarcodeDetection, 2000);

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      clearTimeout(barcodeDetection);
    };
  }, [onScan, onClose, toast, loading]);

  return (
    <div className="relative h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
      )}
      
      <video 
        ref={videoRef} 
        className="h-full w-full object-cover"
        autoPlay 
        playsInline
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-16 border-2 border-white/70 rounded-lg relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-1 bg-secondary opacity-70 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
