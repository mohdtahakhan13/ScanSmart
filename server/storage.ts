import { 
  User, InsertUser, 
  Store, InsertStore,
  Product, InsertProduct,
  Order, InsertOrder,
  OrderItem, InsertOrderItem
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Store methods
  getStore(id: number): Promise<Store | undefined>;
  getStoreByQRCode(qrCode: string): Promise<Store | undefined>;
  getAllStores(): Promise<Store[]>;
  createStore(store: InsertStore): Promise<Store>;
  
  // Product methods
  getProduct(id: number): Promise<Product | undefined>;
  getProductByBarcode(barcode: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getRecommendedProducts(storeId: number): Promise<Product[]>;
  getRelatedProducts(productId: number): Promise<Product[]>;
  getAllProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Order methods
  getOrder(id: number): Promise<Order | undefined>;
  getOrderByOrderNumber(orderNumber: string): Promise<Order | undefined>;
  getUserOrders(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  
  // Order item methods
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stores: Map<number, Store>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  
  private userIdCounter: number;
  private storeIdCounter: number;
  private productIdCounter: number;
  private orderIdCounter: number;
  private orderItemIdCounter: number;
  
  constructor() {
    this.users = new Map();
    this.stores = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    
    this.userIdCounter = 1;
    this.storeIdCounter = 1;
    this.productIdCounter = 1;
    this.orderIdCounter = 1;
    this.orderItemIdCounter = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }
  
  private initSampleData() {
    // Sample store
    const storeLayout = {
      sections: [
        { id: "produce", name: "Produce", color: "bg-green-100", position: { x: 0, y: 0, width: 33, height: 67 } },
        { id: "bakery", name: "Bakery", color: "bg-yellow-100", position: { x: 33, y: 0, width: 33, height: 67 } },
        { id: "dairy", name: "Dairy", color: "bg-blue-100", position: { x: 67, y: 0, width: 33, height: 67 } },
        { id: "beverages", name: "Beverages", color: "bg-purple-100", position: { x: 0, y: 67, width: 50, height: 33 } },
        { id: "snacks", name: "Snacks", color: "bg-red-100", position: { x: 50, y: 67, width: 50, height: 33 } }
      ]
    };
    
    this.createStore({
      name: "GreenMart",
      branch: "Downtown Branch",
      qrCode: "store:1:GreenMart:Downtown",
      layout: JSON.stringify(storeLayout)
    });
    
    // Sample products
    const sampleProducts = [
      {
        name: "Organic Broccoli",
        description: "Fresh organic broccoli, locally sourced",
        price: 2.49,
        pricePerUnit: "$2.49/lb",
        unit: "lb",
        weight: 1.0,
        imageUrl: "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        discount: 0,
        category: "produce",
        barcode: "7896080900021"
      },
      {
        name: "Whole Grain Bread",
        description: "Freshly baked whole grain bread",
        price: 3.99,
        pricePerUnit: "$3.99",
        unit: "loaf",
        weight: 0.8,
        imageUrl: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        discount: 10,
        category: "bakery",
        barcode: "7891234567890"
      },
      {
        name: "Organic Milk",
        description: "Organic whole milk from grass-fed cows",
        price: 4.29,
        pricePerUnit: "$4.29",
        unit: "gallon",
        weight: 8.6,
        imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        discount: 0,
        category: "dairy",
        barcode: "7893210987654"
      },
      {
        name: "Organic Apples",
        description: "Fresh organic apples",
        price: 2.49,
        pricePerUnit: "$2.49/lb",
        unit: "lb",
        weight: 0.4,
        imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        discount: 15,
        category: "produce",
        barcode: "7899876543210"
      },
      {
        name: "Greek Yogurt",
        description: "Plain Greek yogurt, high in protein",
        price: 4.99,
        pricePerUnit: "$4.99",
        unit: "32 oz",
        weight: 2.0,
        imageUrl: "https://images.unsplash.com/photo-1556881286-fc6915169721?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        discount: 0,
        category: "dairy",
        barcode: "7895432109876"
      },
      {
        name: "Organic Bananas",
        description: "Organic fair-trade bananas",
        price: 0.79,
        pricePerUnit: "$0.79/lb",
        unit: "lb",
        weight: 0.8,
        imageUrl: "https://images.unsplash.com/photo-1575224300306-1b8da36134ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        discount: 15,
        category: "produce",
        barcode: "7897890123456"
      },
      {
        name: "Strawberries",
        description: "Fresh strawberries, locally grown",
        price: 4.99,
        pricePerUnit: "$4.99",
        unit: "16 oz",
        weight: 1.0,
        imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        discount: 0,
        category: "produce",
        barcode: "7895678901234"
      },
      {
        name: "Organic Honey",
        description: "Raw, unfiltered organic honey",
        price: 6.49,
        pricePerUnit: "$6.49",
        unit: "12 oz",
        weight: 0.75,
        imageUrl: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        discount: 0,
        category: "grocery",
        barcode: "7891212343456"
      }
    ];
    
    for (const product of sampleProducts) {
      this.createProduct(product);
    }
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Store methods
  async getStore(id: number): Promise<Store | undefined> {
    return this.stores.get(id);
  }
  
  async getStoreByQRCode(qrCode: string): Promise<Store | undefined> {
    return Array.from(this.stores.values()).find(
      (store) => store.qrCode === qrCode,
    );
  }
  
  async getAllStores(): Promise<Store[]> {
    return Array.from(this.stores.values());
  }
  
  async createStore(insertStore: InsertStore): Promise<Store> {
    const id = this.storeIdCounter++;
    const store: Store = { ...insertStore, id };
    this.stores.set(id, store);
    return store;
  }
  
  // Product methods
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductByBarcode(barcode: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.barcode === barcode,
    );
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category,
    );
  }
  
  async getRecommendedProducts(storeId: number): Promise<Product[]> {
    // Just return some products for demo purposes
    return Array.from(this.products.values()).slice(0, 3);
  }
  
  async getRelatedProducts(productId: number): Promise<Product[]> {
    const product = await this.getProduct(productId);
    if (!product) return [];
    
    // Return products in the same category except the current one
    return Array.from(this.products.values())
      .filter(p => p.category === product.category && p.id !== productId)
      .slice(0, 3);
  }
  
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  
  // Order methods
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async getOrderByOrderNumber(orderNumber: string): Promise<Order | undefined> {
    return Array.from(this.orders.values()).find(
      (order) => order.orderNumber === orderNumber,
    );
  }
  
  async getUserOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId,
    );
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderIdCounter++;
    const order: Order = { ...insertOrder, id };
    this.orders.set(id, order);
    return order;
  }
  
  // Order item methods
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (item) => item.orderId === orderId,
    );
  }
  
  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.orderItemIdCounter++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }
}

export const storage = new MemStorage();
