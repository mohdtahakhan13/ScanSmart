import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Store endpoints
  app.get("/api/store/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
    
    const store = await storage.getStore(id);
    if (!store) return res.status(404).json({ message: "Store not found" });
    
    // Parse layout from JSON string
    const parsedStore = {
      ...store,
      layout: JSON.parse(store.layout)
    };
    
    res.json(parsedStore);
  });
  
  app.get("/api/store/qr/:qrCode", async (req, res) => {
    const { qrCode } = req.params;
    const store = await storage.getStoreByQRCode(qrCode);
    
    if (!store) return res.status(404).json({ message: "Store not found" });
    
    // Parse layout from JSON string
    const parsedStore = {
      ...store,
      layout: JSON.parse(store.layout)
    };
    
    res.json(parsedStore);
  });
  
  // Product endpoints
  app.get("/api/products", async (req, res) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });
  
  app.get("/api/products/barcode/:barcode", async (req, res) => {
    const { barcode } = req.params;
    const product = await storage.getProductByBarcode(barcode);
    
    if (!product) return res.status(404).json({ message: "Product not found" });
    
    res.json(product);
  });
  
  app.get("/api/products/category/:category", async (req, res) => {
    const { category } = req.params;
    const products = await storage.getProductsByCategory(category);
    res.json(products);
  });
  
  app.get("/api/products/recommended/:storeId", async (req, res) => {
    const storeId = parseInt(req.params.storeId);
    if (isNaN(storeId)) return res.status(400).json({ message: "Invalid store ID" });
    
    const products = await storage.getRecommendedProducts(storeId);
    res.json(products);
  });
  
  app.get("/api/products/related/:productId", async (req, res) => {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) return res.status(400).json({ message: "Invalid product ID" });
    
    const products = await storage.getRelatedProducts(productId);
    res.json(products);
  });
  
  // Order endpoints
  app.post("/api/orders", async (req, res) => {
    try {
      const orderSchema = z.object({
        userId: z.number().optional(),
        storeId: z.number(),
        orderNumber: z.string(),
        totalAmount: z.number(),
        totalTax: z.number(),
        totalSavings: z.number(),
        totalWeight: z.number(),
        orderDate: z.string(),
        status: z.enum(["pending", "completed", "cancelled"]),
        items: z.array(z.object({
          productId: z.number(),
          quantity: z.number(),
          price: z.number()
        }))
      });
      
      const orderData = orderSchema.parse(req.body);
      
      // Create order
      const order = await storage.createOrder({
        userId: orderData.userId,
        storeId: orderData.storeId,
        orderNumber: orderData.orderNumber,
        totalAmount: orderData.totalAmount,
        totalTax: orderData.totalTax,
        totalSavings: orderData.totalSavings,
        totalWeight: orderData.totalWeight,
        orderDate: orderData.orderDate,
        status: orderData.status
      });
      
      // Create order items
      for (const item of orderData.items) {
        await storage.createOrderItem({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        });
      }
      
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: "Invalid order data", error });
    }
  });
  
  app.get("/api/orders/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
    
    const order = await storage.getOrder(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    
    const items = await storage.getOrderItems(order.id);
    
    res.json({ ...order, items });
  });
  
  app.get("/api/orders/user/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) return res.status(400).json({ message: "Invalid user ID" });
    
    const orders = await storage.getUserOrders(userId);
    res.json(orders);
  });

  const httpServer = createServer(app);

  return httpServer;
}
