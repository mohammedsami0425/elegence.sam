import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Portfolio/Dresses table
export const portfolioItems = pgTable("portfolio", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description"),
  featured: boolean("featured").default(false),
});

export const insertPortfolioSchema = createInsertSchema(portfolioItems).pick({
  name: true,
  category: true,
  imageUrl: true,
  description: true,
  featured: true,
});

export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type Portfolio = typeof portfolioItems.$inferSelect;

// Custom Order form table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  serviceType: text("service_type").notNull(),
  budget: text("budget").notNull(),
  timeframe: text("timeframe").notNull(),
  measurements: jsonb("measurements").notNull(),
  specialRequirements: text("special_requirements"),
  referralSource: text("referral_source"),
  createdAt: text("created_at").notNull(),
  status: text("status").notNull().default("pending"),
});

export const insertOrderSchema = createInsertSchema(orders)
  .pick({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    serviceType: true,
    budget: true,
    timeframe: true,
    specialRequirements: true,
    referralSource: true,
  })
  .extend({
    measurements: z.object({
      bust: z.string(),
      waist: z.string(),
      hips: z.string(),
      height: z.string(),
      shoulderToWaist: z.string(),
      waistToHem: z.string(),
    }),
  });

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Freelancer signup form table
export const freelancers = pgTable("freelancers", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  specialization: text("specialization").notNull(),
  experience: text("experience").notNull(),
  location: text("location").notNull(),
  portfolioUrl: text("portfolio_url"),
  bio: text("bio").notNull(),
  availability: text("availability").notNull(),
  createdAt: text("created_at").notNull(),
  status: text("status").notNull().default("pending"),
});

export const insertFreelancerSchema = createInsertSchema(freelancers)
  .pick({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    specialization: true,
    experience: true,
    location: true,
    portfolioUrl: true,
    bio: true,
    availability: true,
  });

export type InsertFreelancer = z.infer<typeof insertFreelancerSchema>;
export type Freelancer = typeof freelancers.$inferSelect;

// Contact form table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
  read: boolean("read").default(false),
});

export const insertContactSchema = createInsertSchema(contactMessages)
  .pick({
    name: true,
    email: true,
    subject: true,
    message: true,
  });

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Newsletter subscribers table
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").notNull(),
});

export const insertNewsletterSchema = createInsertSchema(newsletterSubscribers)
  .pick({
    email: true,
  });

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
