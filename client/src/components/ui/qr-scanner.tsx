import React, { useRef, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface QRScannerProps {
  onScan: (qrData: string) => void;
  onClose: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
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

    // Simulate QR code detection
    const simulateQRDetection = () => {
      const storeQRData = 'store:1:GreenMart:Downtown';
      
      setTimeout(() => {
        if (!loading) {
          toast({
            title: 'Store QR detected',
            description: 'Welcome to GreenMart - Downtown Branch',
          });
          onScan(storeQRData);
        }
      }, 3000);
    };

    const qrDetection = setTimeout(simulateQRDetection, 3000);

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      clearTimeout(qrDetection);
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
        <div className="w-64 h-64 border-2 border-white/70 rounded-lg relative">
          <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-white"></div>
          <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-white"></div>
          <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-white"></div>
          <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-white"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-1 bg-primary opacity-70 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
