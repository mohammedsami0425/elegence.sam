import { 
  User, InsertUser, 
  Portfolio, InsertPortfolio,
  Order, InsertOrder, 
  Freelancer, InsertFreelancer,
  ContactMessage, InsertContact,
  NewsletterSubscriber, InsertNewsletter,
  users, portfolioItems, orders, freelancers, contactMessages, newsletterSubscribers
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Portfolio methods
  getPortfolioItems(): Promise<Portfolio[]>;
  getPortfolioItemById(id: number): Promise<Portfolio | undefined>;
  getPortfolioItemsByCategory(category: string): Promise<Portfolio[]>;
  getFeaturedPortfolioItems(): Promise<Portfolio[]>;
  createPortfolioItem(item: InsertPortfolio): Promise<Portfolio>;
  updatePortfolioItem(id: number, item: Partial<InsertPortfolio>): Promise<Portfolio | undefined>;
  deletePortfolioItem(id: number): Promise<boolean>;

  // Order methods
  getOrders(): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;

  // Freelancer methods
  getFreelancers(): Promise<Freelancer[]>;
  getFreelancerById(id: number): Promise<Freelancer | undefined>;
  createFreelancer(freelancer: InsertFreelancer): Promise<Freelancer>;
  updateFreelancerStatus(id: number, status: string): Promise<Freelancer | undefined>;

  // Contact methods
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessageById(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContact): Promise<ContactMessage>;
  markContactMessageAsRead(id: number): Promise<ContactMessage | undefined>;

  // Newsletter methods
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  createNewsletterSubscriber(subscriber: InsertNewsletter): Promise<NewsletterSubscriber>;
  isEmailSubscribed(email: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolioItems: Map<number, Portfolio>;
  private orders: Map<number, Order>;
  private freelancers: Map<number, Freelancer>;
  private contactMessages: Map<number, ContactMessage>;
  private newsletterSubscribers: Map<number, NewsletterSubscriber>;
  
  private userIdCounter: number;
  private portfolioIdCounter: number;
  private orderIdCounter: number;
  private freelancerIdCounter: number;
  private contactMessageIdCounter: number;
  private newsletterSubscriberIdCounter: number;

  constructor() {
    this.users = new Map();
    this.portfolioItems = new Map();
    this.orders = new Map();
    this.freelancers = new Map();
    this.contactMessages = new Map();
    this.newsletterSubscribers = new Map();
    
    this.userIdCounter = 1;
    this.portfolioIdCounter = 1;
    this.orderIdCounter = 1;
    this.freelancerIdCounter = 1;
    this.contactMessageIdCounter = 1;
    this.newsletterSubscriberIdCounter = 1;

    // Initialize with some sample portfolio data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const portfolioSamples: InsertPortfolio[] = [
      {
        name: "Evening Elegance",
        category: "Formal",
        imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        description: "A stunning evening gown designed for red carpet events.",
        featured: true
      },
      {
        name: "Urban Chic",
        category: "Cocktail",
        imageUrl: "https://images.unsplash.com/photo-1575351881847-b3bf188d9d0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        description: "Modern cocktail dress perfect for urban social events.",
        featured: true
      },
      {
        name: "Summer Breeze",
        category: "Casual",
        imageUrl: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
        description: "Light and airy summer dress for casual outings.",
        featured: true
      },
      {
        name: "Ethereal Dreams",
        category: "Bridal",
        imageUrl: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80",
        description: "Romantic bridal gown with delicate lace details.",
        featured: true
      },
      {
        name: "Ruby Silk Gown",
        category: "Formal",
        imageUrl: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=434&q=80",
        description: "Elegant red silk gown for formal occasions.",
        featured: false
      },
      {
        name: "Floral Day Dress",
        category: "Casual",
        imageUrl: "https://images.unsplash.com/photo-1499939667766-4afceb292d05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
        description: "Charming floral print dress for daytime events.",
        featured: false
      },
      {
        name: "Classic Lace Wedding Dress",
        category: "Bridal",
        imageUrl: "https://images.unsplash.com/photo-1594612076467-8e9a8d6d6825?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        description: "Traditional lace wedding gown with classic silhouette.",
        featured: false
      }
    ];

    // Add sample portfolio items
    portfolioSamples.forEach(item => {
      this.createPortfolioItem(item);
    });
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

  // Portfolio methods
  async getPortfolioItems(): Promise<Portfolio[]> {
    return Array.from(this.portfolioItems.values());
  }

  async getPortfolioItemById(id: number): Promise<Portfolio | undefined> {
    return this.portfolioItems.get(id);
  }

  async getPortfolioItemsByCategory(category: string): Promise<Portfolio[]> {
    return Array.from(this.portfolioItems.values()).filter(
      item => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getFeaturedPortfolioItems(): Promise<Portfolio[]> {
    return Array.from(this.portfolioItems.values()).filter(
      item => item.featured
    );
  }

  async createPortfolioItem(insertItem: InsertPortfolio): Promise<Portfolio> {
    const id = this.portfolioIdCounter++;
    const item: Portfolio = { ...insertItem, id };
    this.portfolioItems.set(id, item);
    return item;
  }

  async updatePortfolioItem(id: number, updatedFields: Partial<InsertPortfolio>): Promise<Portfolio | undefined> {
    const item = this.portfolioItems.get(id);
    if (!item) return undefined;
    
    const updatedItem = { ...item, ...updatedFields };
    this.portfolioItems.set(id, updatedItem);
    return updatedItem;
  }

  async deletePortfolioItem(id: number): Promise<boolean> {
    return this.portfolioItems.delete(id);
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderIdCounter++;
    const createdAt = new Date().toISOString();
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt,
      status: "pending"
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Freelancer methods
  async getFreelancers(): Promise<Freelancer[]> {
    return Array.from(this.freelancers.values());
  }

  async getFreelancerById(id: number): Promise<Freelancer | undefined> {
    return this.freelancers.get(id);
  }

  async createFreelancer(insertFreelancer: InsertFreelancer): Promise<Freelancer> {
    const id = this.freelancerIdCounter++;
    const createdAt = new Date().toISOString();
    const freelancer: Freelancer = { 
      ...insertFreelancer, 
      id, 
      createdAt,
      status: "pending"
    };
    this.freelancers.set(id, freelancer);
    return freelancer;
  }

  async updateFreelancerStatus(id: number, status: string): Promise<Freelancer | undefined> {
    const freelancer = this.freelancers.get(id);
    if (!freelancer) return undefined;
    
    const updatedFreelancer = { ...freelancer, status };
    this.freelancers.set(id, updatedFreelancer);
    return updatedFreelancer;
  }

  // Contact methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getContactMessageById(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async createContactMessage(insertMessage: InsertContact): Promise<ContactMessage> {
    const id = this.contactMessageIdCounter++;
    const createdAt = new Date().toISOString();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt,
      read: false
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, read: true };
    this.contactMessages.set(id, updatedMessage);
    return updatedMessage;
  }

  // Newsletter methods
  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return Array.from(this.newsletterSubscribers.values());
  }

  async createNewsletterSubscriber(insertSubscriber: InsertNewsletter): Promise<NewsletterSubscriber> {
    // Check if email already exists
    const exists = await this.isEmailSubscribed(insertSubscriber.email);
    if (exists) {
      // Return the existing subscriber
      const existingSubscriber = Array.from(this.newsletterSubscribers.values()).find(
        sub => sub.email === insertSubscriber.email
      );
      if (existingSubscriber) return existingSubscriber;
    }
    
    const id = this.newsletterSubscriberIdCounter++;
    const createdAt = new Date().toISOString();
    const subscriber: NewsletterSubscriber = { 
      ...insertSubscriber, 
      id, 
      createdAt
    };
    this.newsletterSubscribers.set(id, subscriber);
    return subscriber;
  }

  async isEmailSubscribed(email: string): Promise<boolean> {
    return Array.from(this.newsletterSubscribers.values()).some(
      subscriber => subscriber.email === email
    );
  }
}

import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Portfolio methods
  async getPortfolioItems(): Promise<Portfolio[]> {
    return await db.select().from(portfolioItems);
  }

  async getPortfolioItemById(id: number): Promise<Portfolio | undefined> {
    const [item] = await db.select().from(portfolioItems).where(eq(portfolioItems.id, id));
    return item || undefined;
  }

  async getPortfolioItemsByCategory(category: string): Promise<Portfolio[]> {
    return await db
      .select()
      .from(portfolioItems)
      .where(eq(portfolioItems.category, category));
  }

  async getFeaturedPortfolioItems(): Promise<Portfolio[]> {
    return await db
      .select()
      .from(portfolioItems)
      .where(eq(portfolioItems.featured, true));
  }

  async createPortfolioItem(insertItem: InsertPortfolio): Promise<Portfolio> {
    const [item] = await db
      .insert(portfolioItems)
      .values({
        ...insertItem,
        description: insertItem.description || null,
        featured: insertItem.featured !== undefined ? insertItem.featured : false
      })
      .returning();
    return item;
  }

  async updatePortfolioItem(id: number, updatedFields: Partial<InsertPortfolio>): Promise<Portfolio | undefined> {
    const [updatedItem] = await db
      .update(portfolioItems)
      .set(updatedFields)
      .where(eq(portfolioItems.id, id))
      .returning();
    return updatedItem || undefined;
  }

  async deletePortfolioItem(id: number): Promise<boolean> {
    const [deletedItem] = await db
      .delete(portfolioItems)
      .where(eq(portfolioItems.id, id))
      .returning();
    return !!deletedItem;
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt));
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const createdAt = new Date().toISOString();
    const [order] = await db
      .insert(orders)
      .values({
        ...insertOrder,
        createdAt,
        status: "pending",
        phone: insertOrder.phone || null,
        specialRequirements: insertOrder.specialRequirements || null,
        referralSource: insertOrder.referralSource || null,
      })
      .returning();
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const [updatedOrder] = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder || undefined;
  }

  // Freelancer methods
  async getFreelancers(): Promise<Freelancer[]> {
    return await db
      .select()
      .from(freelancers)
      .orderBy(desc(freelancers.createdAt));
  }

  async getFreelancerById(id: number): Promise<Freelancer | undefined> {
    const [freelancer] = await db.select().from(freelancers).where(eq(freelancers.id, id));
    return freelancer || undefined;
  }

  async createFreelancer(insertFreelancer: InsertFreelancer): Promise<Freelancer> {
    const createdAt = new Date().toISOString();
    const [freelancer] = await db
      .insert(freelancers)
      .values({
        ...insertFreelancer,
        createdAt,
        status: "pending",
        portfolioUrl: insertFreelancer.portfolioUrl || null,
      })
      .returning();
    return freelancer;
  }

  async updateFreelancerStatus(id: number, status: string): Promise<Freelancer | undefined> {
    const [updatedFreelancer] = await db
      .update(freelancers)
      .set({ status })
      .where(eq(freelancers.id, id))
      .returning();
    return updatedFreelancer || undefined;
  }

  // Contact methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
  }

  async getContactMessageById(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message || undefined;
  }

  async createContactMessage(insertMessage: InsertContact): Promise<ContactMessage> {
    const createdAt = new Date().toISOString();
    const [message] = await db
      .insert(contactMessages)
      .values({
        ...insertMessage,
        createdAt,
        read: false,
      })
      .returning();
    return message;
  }

  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const [updatedMessage] = await db
      .update(contactMessages)
      .set({ read: true })
      .where(eq(contactMessages.id, id))
      .returning();
    return updatedMessage || undefined;
  }

  // Newsletter methods
  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return await db
      .select()
      .from(newsletterSubscribers)
      .orderBy(desc(newsletterSubscribers.createdAt));
  }

  async createNewsletterSubscriber(insertSubscriber: InsertNewsletter): Promise<NewsletterSubscriber> {
    // Check if email already exists
    const isSubscribed = await this.isEmailSubscribed(insertSubscriber.email);
    if (isSubscribed) {
      const [existingSubscriber] = await db
        .select()
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.email, insertSubscriber.email));
      
      if (existingSubscriber) return existingSubscriber;
    }
    
    const createdAt = new Date().toISOString();
    const [subscriber] = await db
      .insert(newsletterSubscribers)
      .values({
        ...insertSubscriber,
        createdAt,
      })
      .returning();
    return subscriber;
  }

  async isEmailSubscribed(email: string): Promise<boolean> {
    const [subscriber] = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email));
    return !!subscriber;
  }
}

// Use either MemStorage or DatabaseStorage based on environment
// For development with no database, use:
// export const storage = new MemStorage();

// For production with database, use:
export const storage = new DatabaseStorage();
