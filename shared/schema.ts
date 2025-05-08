import { pgTable, text, serial, integer, decimal, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Stores table
export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  branch: text("branch").notNull(),
  qrCode: text("qr_code").notNull().unique(),
  layout: text("layout").notNull(), // JSON string of store layout
});

export const insertStoreSchema = createInsertSchema(stores).pick({
  name: true,
  branch: true,
  qrCode: true,
  layout: true,
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  pricePerUnit: text("price_per_unit"),
  unit: text("unit"),
  weight: decimal("weight", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  discount: integer("discount"), // Percentage discount
  category: text("category").notNull(),
  barcode: varchar("barcode", { length: 30 }).notNull().unique(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  pricePerUnit: true,
  unit: true,
  weight: true,
  imageUrl: true,
  discount: true,
  category: true,
  barcode: true,
});

// Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  storeId: integer("store_id").references(() => stores.id).notNull(),
  orderNumber: text("order_number").notNull().unique(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  totalTax: decimal("total_tax", { precision: 10, scale: 2 }).notNull(),
  totalSavings: decimal("total_savings", { precision: 10, scale: 2 }).notNull(),
  totalWeight: decimal("total_weight", { precision: 10, scale: 2 }).notNull(),
  orderDate: text("order_date").notNull(), // ISO date string
  status: text("status").notNull(), // pending, completed, cancelled
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  userId: true,
  storeId: true,
  orderNumber: true,
  totalAmount: true,
  totalTax: true,
  totalSavings: true,
  totalWeight: true,
  orderDate: true,
  status: true,
});

// Order items table
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(), // Price at time of purchase
});

export const insertOrderItemSchema = createInsertSchema(orderItems).pick({
  orderId: true,
  productId: true,
  quantity: true,
  price: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Store = typeof stores.$inferSelect;
export type InsertStore = z.infer<typeof insertStoreSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
