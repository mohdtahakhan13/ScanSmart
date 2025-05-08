import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Image as ImageIcon, Camera, Barcode } from 'lucide-react';
import jsQR from 'jsqr';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
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
        // In a real app, we would use a barcode detection library here
        // For this demo, we'll simulate barcode detection with a delay
        setTimeout(() => {
          // Release object URL
          URL.revokeObjectURL(objectUrl);
          
          // Simulate successful barcode detection
          const randomBarcodes = [
            '7896080900021', // Banana barcode
            '7891234567890', // Cereal barcode
            '7893210987654', // Yogurt barcode
            '7897890123456', // Bread barcode
            '7899876543210'  // Apple barcode
          ];
          
          const randomBarcode = randomBarcodes[Math.floor(Math.random() * randomBarcodes.length)];
          
          toast({
            title: 'Barcode Detected',
            description: `Product barcode: ${randomBarcode}`,
          });
          
          onScan(randomBarcode);
          setLoading(false);
        }, 1500);
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
  
  // For simulating a barcode detection for demo purposes
  const simulateBarcodeDetection = () => {
    setLoading(true);
    
    setTimeout(() => {
      // Random barcode selection
      const randomBarcodes = [
        '7896080900021', // Banana barcode
        '7891234567890', // Cereal barcode
        '7893210987654', // Yogurt barcode
        '7897890123456', // Bread barcode
        '7899876543210'  // Apple barcode
      ];
      
      const randomBarcode = randomBarcodes[Math.floor(Math.random() * randomBarcodes.length)];
      
      toast({
        title: 'Product detected',
        description: `Scanned barcode: ${randomBarcode}`,
      });
      onScan(randomBarcode);
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
          dragActive ? 'bg-secondary/20' : ''
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
          dragActive ? 'border-2 border-secondary' : 'border border-gray-600'
        }`}>
          <Barcode className="h-16 w-16 text-secondary mb-4" />
          
          <h3 className="text-white font-semibold text-xl mb-1">Upload Product Image</h3>
          <p className="text-gray-300 text-center mb-6">
            Upload an image containing a product barcode
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
            className="bg-secondary text-white py-3 px-6 rounded-lg flex items-center justify-center w-full mb-4"
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
            onClick={simulateBarcodeDetection}
            className="bg-secondary/20 text-secondary border border-secondary/30 py-3 px-6 rounded-lg flex items-center justify-center w-full"
          >
            <Camera className="h-5 w-5 mr-2" />
            Demo Mode (Simulate)
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
