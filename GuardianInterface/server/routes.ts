import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCameraSchema, insertIncidentTypeSchema, insertEmergencyServiceSchema, insertContactChannelSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix

  // Cameras routes
  app.get("/api/cameras", async (req, res) => {
    try {
      const cameras = await storage.getAllCameras();
      res.json(cameras);
    } catch (error) {
      console.error("Error fetching cameras:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des caméras" });
    }
  });

  app.post("/api/cameras", async (req, res) => {
    try {
      const validated = insertCameraSchema.parse(req.body);
      const camera = await storage.createCamera(validated);
      res.status(201).json(camera);
    } catch (error) {
      console.error("Error creating camera:", error);
      res.status(400).json({ message: "Données de caméra invalides" });
    }
  });

  // Incidents routes
  app.get("/api/incidents", async (req, res) => {
    try {
      const incidents = await storage.getAllIncidents();
      res.json(incidents);
    } catch (error) {
      console.error("Error fetching incidents:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des incidents" });
    }
  });

  app.get("/api/incidents/recent", async (req, res) => {
    try {
      const incidents = await storage.getRecentIncidents();
      res.json(incidents);
    } catch (error) {
      console.error("Error fetching recent incidents:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des incidents récents" });
    }
  });

  // Incident types routes
  app.get("/api/incident-types", async (req, res) => {
    try {
      const incidentTypes = await storage.getAllIncidentTypes();
      res.json(incidentTypes);
    } catch (error) {
      console.error("Error fetching incident types:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des types d'incidents" });
    }
  });

  app.post("/api/incident-types", async (req, res) => {
    try {
      const validated = insertIncidentTypeSchema.parse(req.body);
      const incidentType = await storage.createIncidentType(validated);
      res.status(201).json(incidentType);
    } catch (error) {
      console.error("Error creating incident type:", error);
      res.status(400).json({ message: "Données de type d'incident invalides" });
    }
  });

  // Emergency services routes
  app.get("/api/emergency-services", async (req, res) => {
    try {
      const services = await storage.getAllEmergencyServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching emergency services:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des services d'urgence" });
    }
  });

  app.post("/api/emergency-services", async (req, res) => {
    try {
      const validated = insertEmergencyServiceSchema.parse(req.body);
      const service = await storage.createEmergencyService(validated);
      res.status(201).json(service);
    } catch (error) {
      console.error("Error creating emergency service:", error);
      res.status(400).json({ message: "Données de service d'urgence invalides" });
    }
  });

  // Contact channels routes
  app.post("/api/contact-channels", async (req, res) => {
    try {
      const validated = insertContactChannelSchema.parse(req.body);
      const channel = await storage.createContactChannel(validated);
      res.status(201).json(channel);
    } catch (error) {
      console.error("Error creating contact channel:", error);
      res.status(400).json({ message: "Données de canal de contact invalides" });
    }
  });

  // System status route
  app.get("/api/system-status", async (req, res) => {
    try {
      const status = await storage.getSystemStatus();
      res.json(status);
    } catch (error) {
      console.error("Error fetching system status:", error);
      res.status(500).json({ message: "Erreur lors de la récupération du statut système" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
