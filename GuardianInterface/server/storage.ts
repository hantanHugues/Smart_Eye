import {
  users, 
  cameras, 
  incidentTypes, 
  incidents, 
  emergencyServices, 
  serviceIncidentTypes,
  contactChannels,
  alerts,
  systemStatus,
  type User, 
  type InsertUser,
  type Camera,
  type InsertCamera,
  type IncidentType,
  type InsertIncidentType,
  type Incident,
  type InsertIncident,
  type EmergencyService,
  type InsertEmergencyService,
  type ServiceIncidentType,
  type InsertServiceIncidentType,
  type ContactChannel,
  type InsertContactChannel,
  type Alert,
  type InsertAlert,
  type SystemStatus,
  type InsertSystemStatus
} from "@shared/schema";

// Interface de stockage pour toutes les opérations CRUD
export interface IStorage {
  // Utilisateurs
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Caméras
  getAllCameras(): Promise<Camera[]>;
  getCamera(id: number): Promise<Camera | undefined>;
  createCamera(camera: InsertCamera): Promise<Camera>;
  
  // Types d'incidents
  getAllIncidentTypes(): Promise<IncidentType[]>;
  getIncidentType(id: number): Promise<IncidentType | undefined>;
  createIncidentType(incidentType: InsertIncidentType): Promise<IncidentType>;
  
  // Incidents
  getAllIncidents(): Promise<Incident[]>;
  getRecentIncidents(limit?: number): Promise<Incident[]>;
  getIncident(id: number): Promise<Incident | undefined>;
  createIncident(incident: InsertIncident): Promise<Incident>;
  
  // Services d'urgence
  getAllEmergencyServices(): Promise<EmergencyService[]>;
  getEmergencyService(id: number): Promise<EmergencyService | undefined>;
  createEmergencyService(service: InsertEmergencyService): Promise<EmergencyService>;
  
  // Relations entre services et types d'incidents
  createServiceIncidentType(relation: InsertServiceIncidentType): Promise<ServiceIncidentType>;
  
  // Canaux de contact
  getContactChannelsByService(serviceId: number): Promise<ContactChannel[]>;
  createContactChannel(channel: InsertContactChannel): Promise<ContactChannel>;
  
  // Alertes
  getAllAlerts(): Promise<Alert[]>;
  getAlert(id: number): Promise<Alert | undefined>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  
  // Statut système
  getSystemStatus(): Promise<SystemStatus[]>;
  updateSystemStatus(status: InsertSystemStatus): Promise<SystemStatus>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cameras: Map<number, Camera>;
  private incidentTypes: Map<number, IncidentType>;
  private incidents: Map<number, Incident>;
  private emergencyServices: Map<number, EmergencyService>;
  private serviceIncidentTypes: Map<number, ServiceIncidentType>;
  private contactChannels: Map<number, ContactChannel>;
  private alerts: Map<number, Alert>;
  private systemStatusMap: Map<number, SystemStatus>;
  
  // ID pour chaque entité
  private userIdCounter: number;
  private cameraIdCounter: number;
  private incidentTypeIdCounter: number;
  private incidentIdCounter: number;
  private emergencyServiceIdCounter: number;
  private serviceIncidentTypeIdCounter: number;
  private contactChannelIdCounter: number;
  private alertIdCounter: number;
  private systemStatusIdCounter: number;

  constructor() {
    // Initialisation des maps
    this.users = new Map();
    this.cameras = new Map();
    this.incidentTypes = new Map();
    this.incidents = new Map();
    this.emergencyServices = new Map();
    this.serviceIncidentTypes = new Map();
    this.contactChannels = new Map();
    this.alerts = new Map();
    this.systemStatusMap = new Map();
    
    // Initialisation des compteurs
    this.userIdCounter = 1;
    this.cameraIdCounter = 1;
    this.incidentTypeIdCounter = 1;
    this.incidentIdCounter = 1;
    this.emergencyServiceIdCounter = 1;
    this.serviceIncidentTypeIdCounter = 1;
    this.contactChannelIdCounter = 1;
    this.alertIdCounter = 1;
    this.systemStatusIdCounter = 1;
    
    // Ajout de données initiales
    this.seedInitialData();
  }

  private seedInitialData() {
    // Ajouter quelques types d'incidents
    this.createIncidentType({
      name: "Incendie",
      description: "Détection de feu ou de fumée",
      severity: "critique",
      icon: "fire"
    });
    
    this.createIncidentType({
      name: "Agression",
      description: "Détection de violence physique entre personnes",
      severity: "urgent",
      icon: "user-voice"
    });
    
    this.createIncidentType({
      name: "Accident",
      description: "Accident impliquant des véhicules",
      severity: "urgent",
      icon: "car-crash"
    });
    
    this.createIncidentType({
      name: "Intrusion",
      description: "Personne détectée dans une zone restreinte",
      severity: "modéré",
      icon: "user-follow"
    });
    
    this.createIncidentType({
      name: "Chute",
      description: "Personne tombée nécessitant potentiellement une assistance",
      severity: "modéré",
      icon: "heart-pulse" 
    });
    
    // Ajouter quelques caméras
    this.createCamera({
      name: "Caméra Entrée Nord",
      location: "48.8566,2.3522",
      streamUrl: "rtsp://example.com/stream1",
      status: "active"
    });
    
    this.createCamera({
      name: "Caméra Place Centrale",
      location: "48.8584,2.3548",
      streamUrl: "rtsp://example.com/stream2",
      status: "active"
    });
    
    this.createCamera({
      name: "Caméra Parking Sud",
      location: "48.8550,2.3500",
      streamUrl: "rtsp://example.com/stream3",
      status: "maintenance"
    });
    
    this.createCamera({
      name: "Caméra Entrée Ouest",
      location: "48.8570,2.3510",
      streamUrl: "rtsp://example.com/stream4",
      status: "active"
    });
    
    // Ajouter des services d'urgence
    this.createEmergencyService({
      name: "Pompiers",
      priorityLevel: "haute",
      icon: "fire",
      status: "active"
    });
    
    this.createEmergencyService({
      name: "Police",
      priorityLevel: "haute",
      icon: "shield",
      status: "active"
    });
    
    this.createEmergencyService({
      name: "SAMU",
      priorityLevel: "haute",
      icon: "heart-pulse",
      status: "active"
    });
    
    // Ajouter des incidents
    this.createIncident({
      typeId: 1, // Incendie
      cameraId: 1,
      timestamp: new Date().toISOString(),
      location: "48.8566,2.3522",
      status: "pending",
      notes: "Feu détecté près de l'entrée du bâtiment"
    });
    
    this.createIncident({
      typeId: 2, // Agression
      cameraId: 2,
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
      location: "48.8584,2.3548",
      status: "pending",
      notes: "Altercation détectée entre deux individus"
    });
    
    this.createIncident({
      typeId: 3, // Accident 
      cameraId: 4,
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(), // 45 minutes ago
      location: "48.8570,2.3510",
      status: "resolved",
      notes: "Accident mineur, intervention terminée"
    });
    
    // Ajouter des canaux de contact
    this.createContactChannel({
      serviceId: 1, // Pompiers
      channelType: "email",
      contactValue: "pompiers@example.com",
      isActive: true
    });
    
    this.createContactChannel({
      serviceId: 1, // Pompiers
      channelType: "telegram",
      contactValue: "@FireDept",
      isActive: true
    });
    
    this.createContactChannel({
      serviceId: 2, // Police
      channelType: "email",
      contactValue: "police@example.com",
      isActive: true
    });
    
    this.createContactChannel({
      serviceId: 2, // Police
      channelType: "whatsapp",
      contactValue: "+33123456789",
      isActive: true
    });
    
    this.createContactChannel({
      serviceId: 3, // SAMU
      channelType: "sms",
      contactValue: "+33987654321",
      isActive: true
    });
    
    // Ajouter des relations entre services et types d'incidents
    
    // Pompiers (id: 1) gèrent les incendies (id: 1)
    this.createServiceIncidentType({
      serviceId: 1,
      incidentTypeId: 1
    });
    
    // Police (id: 2) gère les agressions (id: 2) et les intrusions (id: 4)
    this.createServiceIncidentType({
      serviceId: 2,
      incidentTypeId: 2
    });
    
    this.createServiceIncidentType({
      serviceId: 2,
      incidentTypeId: 4
    });
    
    // SAMU (id: 3) gère les accidents (id: 3) et les chutes (id: 5)
    this.createServiceIncidentType({
      serviceId: 3,
      incidentTypeId: 3
    });
    
    this.createServiceIncidentType({
      serviceId: 3,
      incidentTypeId: 5
    });
    
    // Ajouter statut système
    this.updateSystemStatus({
      serviceName: "Détection IA",
      status: "active",
      metrics: {
        cpuUsage: 32,
        memoryUsage: 1.2,
        detectionSpeed: 45
      }
    });
    
    this.updateSystemStatus({
      serviceName: "Système d'alerte",
      status: "active",
      metrics: {
        queueSize: 0,
        avgDeliveryTime: 1.5,
        successRate: 98.5
      }
    });
    
    this.updateSystemStatus({
      serviceName: "Base de données",
      status: "active",
      metrics: {
        size: 120,
        queries: 246,
        responseTime: 12
      }
    });
  }

  // Implémentation des méthodes pour les utilisateurs
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
  
  // Implémentation des méthodes pour les caméras
  async getAllCameras(): Promise<Camera[]> {
    return Array.from(this.cameras.values());
  }
  
  async getCamera(id: number): Promise<Camera | undefined> {
    return this.cameras.get(id);
  }
  
  async createCamera(camera: InsertCamera): Promise<Camera> {
    const id = this.cameraIdCounter++;
    const newCamera: Camera = { 
      ...camera, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.cameras.set(id, newCamera);
    return newCamera;
  }
  
  // Implémentation des méthodes pour les types d'incidents
  async getAllIncidentTypes(): Promise<IncidentType[]> {
    return Array.from(this.incidentTypes.values());
  }
  
  async getIncidentType(id: number): Promise<IncidentType | undefined> {
    return this.incidentTypes.get(id);
  }
  
  async createIncidentType(incidentType: InsertIncidentType): Promise<IncidentType> {
    const id = this.incidentTypeIdCounter++;
    const newIncidentType: IncidentType = { ...incidentType, id };
    this.incidentTypes.set(id, newIncidentType);
    return newIncidentType;
  }
  
  // Implémentation des méthodes pour les incidents
  async getAllIncidents(): Promise<(Incident & { type: string, severity: string })[]> {
    return Array.from(this.incidents.values()).map(incident => {
      const incidentType = this.incidentTypes.get(incident.typeId);
      return {
        ...incident,
        type: incidentType?.name || "Inconnu",
        severity: incidentType?.severity || "modéré"
      };
    });
  }
  
  async getRecentIncidents(limit: number = 10): Promise<(Incident & { type: string, severity: string })[]> {
    return Array.from(this.incidents.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .map(incident => {
        const incidentType = this.incidentTypes.get(incident.typeId);
        return {
          ...incident,
          type: incidentType?.name || "Inconnu",
          severity: incidentType?.severity || "modéré"
        };
      })
      .slice(0, limit);
  }
  
  async getIncident(id: number): Promise<(Incident & { type: string, severity: string }) | undefined> {
    const incident = this.incidents.get(id);
    if (!incident) return undefined;
    
    const incidentType = this.incidentTypes.get(incident.typeId);
    return {
      ...incident,
      type: incidentType?.name || "Inconnu",
      severity: incidentType?.severity || "modéré"
    };
  }
  
  async createIncident(incident: InsertIncident): Promise<Incident> {
    const id = this.incidentIdCounter++;
    const newIncident: Incident = { ...incident, id };
    this.incidents.set(id, newIncident);
    return newIncident;
  }
  
  // Implémentation des méthodes pour les services d'urgence
  async getAllEmergencyServices(): Promise<(EmergencyService & { incidentTypes: string[], contactChannels: string[] })[]> {
    // Obtenir tous les types d'incidents par service
    const serviceToIncidentTypes = new Map<number, string[]>();
    
    Array.from(this.serviceIncidentTypes.values()).forEach(relation => {
      const serviceId = relation.serviceId;
      const incidentType = this.incidentTypes.get(relation.incidentTypeId);
      
      if (incidentType) {
        if (!serviceToIncidentTypes.has(serviceId)) {
          serviceToIncidentTypes.set(serviceId, []);
        }
        serviceToIncidentTypes.get(serviceId)?.push(incidentType.name);
      }
    });
    
    // Obtenir tous les canaux de contact par service
    const serviceToChannels = new Map<number, string[]>();
    
    Array.from(this.contactChannels.values()).forEach(channel => {
      const serviceId = channel.serviceId;
      
      if (!serviceToChannels.has(serviceId)) {
        serviceToChannels.set(serviceId, []);
      }
      serviceToChannels.get(serviceId)?.push(channel.channelType);
    });
    
    // Enrichir les services avec les données
    return Array.from(this.emergencyServices.values()).map(service => {
      return {
        ...service,
        incidentTypes: serviceToIncidentTypes.get(service.id) || [],
        contactChannels: serviceToChannels.get(service.id) || []
      };
    });
  }
  
  async getEmergencyService(id: number): Promise<(EmergencyService & { incidentTypes: string[], contactChannels: string[] }) | undefined> {
    const service = this.emergencyServices.get(id);
    if (!service) return undefined;
    
    // Obtenir les types d'incidents associés à ce service
    const incidentTypes = Array.from(this.serviceIncidentTypes.values())
      .filter(relation => relation.serviceId === id)
      .map(relation => {
        const incidentType = this.incidentTypes.get(relation.incidentTypeId);
        return incidentType ? incidentType.name : "";
      })
      .filter(name => name !== "");
    
    // Obtenir les canaux de contact associés à ce service
    const contactChannels = Array.from(this.contactChannels.values())
      .filter(channel => channel.serviceId === id)
      .map(channel => channel.channelType);
    
    return {
      ...service,
      incidentTypes,
      contactChannels
    };
  }
  
  async createEmergencyService(service: InsertEmergencyService): Promise<EmergencyService> {
    const id = this.emergencyServiceIdCounter++;
    const newService: EmergencyService = { ...service, id };
    this.emergencyServices.set(id, newService);
    return newService;
  }
  
  // Implémentation des méthodes pour les relations entre services et types d'incidents
  async createServiceIncidentType(relation: InsertServiceIncidentType): Promise<ServiceIncidentType> {
    const id = this.serviceIncidentTypeIdCounter++;
    const newRelation: ServiceIncidentType = { ...relation, id };
    this.serviceIncidentTypes.set(id, newRelation);
    return newRelation;
  }
  
  // Implémentation des méthodes pour les canaux de contact
  async getContactChannelsByService(serviceId: number): Promise<ContactChannel[]> {
    return Array.from(this.contactChannels.values())
      .filter(channel => channel.serviceId === serviceId);
  }
  
  async createContactChannel(channel: InsertContactChannel): Promise<ContactChannel> {
    const id = this.contactChannelIdCounter++;
    const newChannel: ContactChannel = { ...channel, id };
    this.contactChannels.set(id, newChannel);
    return newChannel;
  }
  
  // Implémentation des méthodes pour les alertes
  async getAllAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values());
  }
  
  async getAlert(id: number): Promise<Alert | undefined> {
    return this.alerts.get(id);
  }
  
  async createAlert(alert: InsertAlert): Promise<Alert> {
    const id = this.alertIdCounter++;
    const newAlert: Alert = { ...alert, id };
    this.alerts.set(id, newAlert);
    return newAlert;
  }
  
  // Implémentation des méthodes pour le statut système
  async getSystemStatus(): Promise<SystemStatus[]> {
    return Array.from(this.systemStatusMap.values());
  }
  
  async updateSystemStatus(status: InsertSystemStatus): Promise<SystemStatus> {
    // Vérifier si un statut existe déjà pour ce service
    const existingStatus = Array.from(this.systemStatusMap.values())
      .find(s => s.serviceName === status.serviceName);
    
    if (existingStatus) {
      // Mettre à jour le statut existant
      const updatedStatus: SystemStatus = {
        ...existingStatus,
        status: status.status,
        lastUpdated: new Date().toISOString(),
        metrics: status.metrics || existingStatus.metrics
      };
      this.systemStatusMap.set(existingStatus.id, updatedStatus);
      return updatedStatus;
    } else {
      // Créer un nouveau statut
      const id = this.systemStatusIdCounter++;
      const newStatus: SystemStatus = {
        ...status,
        id,
        lastUpdated: new Date().toISOString()
      };
      this.systemStatusMap.set(id, newStatus);
      return newStatus;
    }
  }
}

export const storage = new MemStorage();
