import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPortfolioSchema, insertOrderSchema, insertFreelancerSchema, insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Portfolio routes
  app.get("/api/portfolio", async (req: Request, res: Response) => {
    try {
      const portfolioItems = await storage.getPortfolioItems();
      res.json(portfolioItems);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
      res.status(500).json({ message: "Failed to fetch portfolio items" });
    }
  });

  app.get("/api/portfolio/featured", async (req: Request, res: Response) => {
    try {
      const featuredItems = await storage.getFeaturedPortfolioItems();
      res.json(featuredItems);
    } catch (error) {
      console.error("Error fetching featured portfolio items:", error);
      res.status(500).json({ message: "Failed to fetch featured portfolio items" });
    }
  });

  app.get("/api/portfolio/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const item = await storage.getPortfolioItemById(id);
      if (!item) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }

      res.json(item);
    } catch (error) {
      console.error("Error fetching portfolio item:", error);
      res.status(500).json({ message: "Failed to fetch portfolio item" });
    }
  });

  app.get("/api/portfolio/category/:category", async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const items = await storage.getPortfolioItemsByCategory(category);
      res.json(items);
    } catch (error) {
      console.error("Error fetching portfolio items by category:", error);
      res.status(500).json({ message: "Failed to fetch portfolio items" });
    }
  });

  // Order routes
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      const validationResult = insertOrderSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errorMessage = fromZodError(validationResult.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const order = await storage.createOrder(validationResult.data);
      res.status(201).json({ success: true, orderId: order.id });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Freelancer routes
  app.post("/api/freelancers", async (req: Request, res: Response) => {
    try {
      const validationResult = insertFreelancerSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errorMessage = fromZodError(validationResult.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const freelancer = await storage.createFreelancer(validationResult.data);
      res.status(201).json({ success: true, freelancerId: freelancer.id });
    } catch (error) {
      console.error("Error creating freelancer application:", error);
      res.status(500).json({ message: "Failed to submit freelancer application" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validationResult = insertContactSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errorMessage = fromZodError(validationResult.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const message = await storage.createContactMessage(validationResult.data);
      res.status(201).json({ success: true, messageId: message.id });
    } catch (error) {
      console.error("Error creating contact message:", error);
      res.status(500).json({ message: "Failed to submit contact message" });
    }
  });

  // Newsletter routes
  app.post("/api/newsletter", async (req: Request, res: Response) => {
    try {
      const emailSchema = insertNewsletterSchema.pick({ email: true });
      const validationResult = emailSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errorMessage = fromZodError(validationResult.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      // Check if email is already subscribed
      const isSubscribed = await storage.isEmailSubscribed(validationResult.data.email);
      if (isSubscribed) {
        return res.status(200).json({ success: true, message: "Already subscribed" });
      }
      
      const subscriber = await storage.createNewsletterSubscriber(validationResult.data);
      res.status(201).json({ success: true, subscriberId: subscriber.id });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  return httpServer;
}
