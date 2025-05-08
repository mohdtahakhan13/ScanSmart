import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Image as ImageIcon, Camera } from 'lucide-react';
import jsQR from 'jsqr';

interface QRScannerProps {
  onScan: (qrData: string) => void;
  onClose: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const processImage = async (file: File) => {
    setLoading(true);
    
    try {
      // Create image from file
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        // Create canvas to process the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }
        
        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image to canvas
        ctx.drawImage(img, 0, 0);
        
        // Get image data for QR code processing
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Process with jsQR
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        // Release object URL
        URL.revokeObjectURL(objectUrl);
        
        if (code) {
          // QR code found
          toast({
            title: 'QR Code Detected',
            description: 'Successfully read QR code from image'
          });
          
          // Parse QR data
          if (code.data.startsWith('store:')) {
            onScan(code.data);
          } else {
            toast({
              title: 'Invalid QR Code',
              description: 'This is not a valid store QR code',
              variant: 'destructive'
            });
          }
        } else {
          // No QR code found
          toast({
            title: 'No QR Code Found',
            description: 'Could not detect a QR code in this image',
            variant: 'destructive'
          });
        }
        
        setLoading(false);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        throw new Error('Failed to load image');
      };
      
      img.src = objectUrl;
      
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: 'Processing Error',
        description: 'Failed to process the image',
        variant: 'destructive'
      });
      setLoading(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processImage(files[0]);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processImage(e.dataTransfer.files[0]);
    }
  };
  
  // For simulating a store QR for demo purposes
  const simulateQRDetection = () => {
    setLoading(true);
    
    setTimeout(() => {
      const storeQRData = 'store:1:GreenMart:Downtown';
      toast({
        title: 'Store QR detected',
        description: 'Welcome to GreenMart - Downtown Branch',
      });
      onScan(storeQRData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="relative h-full bg-gray-900">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
      )}
      
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 z-10 ${
          dragActive ? 'bg-primary/20' : ''
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
        }}
        onDrop={handleDrop}
      >
        <div className={`bg-black/30 rounded-xl p-8 backdrop-blur-md w-full max-w-sm flex flex-col items-center ${
          dragActive ? 'border-2 border-primary' : 'border border-gray-600'
        }`}>
          <ImageIcon className="h-16 w-16 text-primary mb-4" />
          
          <h3 className="text-white font-semibold text-xl mb-1">Upload QR Code</h3>
          <p className="text-gray-300 text-center mb-6">
            Upload an image containing a store QR code
          </p>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary text-white py-3 px-6 rounded-lg flex items-center justify-center w-full mb-4"
          >
            <Upload className="h-5 w-5 mr-2" />
            Select Image
          </button>
          
          <div className="w-full flex items-center my-4">
            <div className="h-px bg-gray-600 flex-1"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="h-px bg-gray-600 flex-1"></div>
          </div>
          
          <button
            onClick={simulateQRDetection}
            className="bg-primary/20 text-primary border border-primary/30 py-3 px-6 rounded-lg flex items-center justify-center w-full"
          >
            <Camera className="h-5 w-5 mr-2" />
            Demo Mode (Simulate)
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
