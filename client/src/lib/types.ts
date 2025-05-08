export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pricePerUnit?: string;
  unit?: string;
  weight: number;
  imageUrl: string;
  discount?: number;
  category: string;
  barcode: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Store {
  id: number;
  name: string;
  branch: string;
  qrCode: string;
  layout: StoreLayout;
}

export interface StoreLayout {
  sections: StoreSection[];
}

export interface StoreSection {
  id: string;
  name: string;
  color: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface StoreMapProps {
  layout: StoreLayout;
  userPosition?: { x: number; y: number };
  targetProduct?: { x: number; y: number; name: string };
}
