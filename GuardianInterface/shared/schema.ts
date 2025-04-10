import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  fullName: text("full_name"),
  role: text("role").default("user").notNull(),
});

export const cameras = pgTable("cameras", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  streamUrl: text("stream_url").notNull(),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const incidentTypes = pgTable("incident_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  severity: text("severity").notNull(),
  icon: text("icon"),
});

export const incidents = pgTable("incidents", {
  id: serial("id").primaryKey(),
  typeId: integer("type_id").references(() => incidentTypes.id).notNull(),
  cameraId: integer("camera_id").references(() => cameras.id).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  screenshot: text("screenshot"),
  location: text("location").notNull(),
  status: text("status").default("pending").notNull(),
  notes: text("notes"),
});

export const emergencyServices = pgTable("emergency_services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  priorityLevel: text("priority_level").notNull(),
  icon: text("icon"),
  status: text("status").default("active").notNull(),
});

export const serviceIncidentTypes = pgTable("service_incident_types", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").references(() => emergencyServices.id).notNull(),
  incidentTypeId: integer("incident_type_id").references(() => incidentTypes.id).notNull(),
});

export const contactChannels = pgTable("contact_channels", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").references(() => emergencyServices.id).notNull(),
  channelType: text("channel_type").notNull(), // email, whatsapp, telegram, sms
  contactValue: text("contact_value").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  incidentId: integer("incident_id").references(() => incidents.id).notNull(),
  serviceId: integer("service_id").references(() => emergencyServices.id).notNull(),
  channelId: integer("channel_id").references(() => contactChannels.id).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  status: text("status").default("pending").notNull(),
  details: jsonb("details"),
});

export const systemStatus = pgTable("system_status", {
  id: serial("id").primaryKey(),
  serviceName: text("service_name").notNull().unique(),
  status: text("status").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
  metrics: jsonb("metrics"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertCameraSchema = createInsertSchema(cameras).omit({ id: true, createdAt: true });
export const insertIncidentTypeSchema = createInsertSchema(incidentTypes).omit({ id: true });
export const insertIncidentSchema = createInsertSchema(incidents).omit({ id: true });
export const insertEmergencyServiceSchema = createInsertSchema(emergencyServices).omit({ id: true });
export const insertServiceIncidentTypeSchema = createInsertSchema(serviceIncidentTypes).omit({ id: true });
export const insertContactChannelSchema = createInsertSchema(contactChannels).omit({ id: true });
export const insertAlertSchema = createInsertSchema(alerts).omit({ id: true });
export const insertSystemStatusSchema = createInsertSchema(systemStatus).omit({ id: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Camera = typeof cameras.$inferSelect;
export type InsertCamera = z.infer<typeof insertCameraSchema>;

export type IncidentType = typeof incidentTypes.$inferSelect;
export type InsertIncidentType = z.infer<typeof insertIncidentTypeSchema>;

export type Incident = typeof incidents.$inferSelect;
export type InsertIncident = z.infer<typeof insertIncidentSchema>;

export type EmergencyService = typeof emergencyServices.$inferSelect;
export type InsertEmergencyService = z.infer<typeof insertEmergencyServiceSchema>;

export type ServiceIncidentType = typeof serviceIncidentTypes.$inferSelect;
export type InsertServiceIncidentType = z.infer<typeof insertServiceIncidentTypeSchema>;

export type ContactChannel = typeof contactChannels.$inferSelect;
export type InsertContactChannel = z.infer<typeof insertContactChannelSchema>;

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;

export type SystemStatus = typeof systemStatus.$inferSelect;
export type InsertSystemStatus = z.infer<typeof insertSystemStatusSchema>;
