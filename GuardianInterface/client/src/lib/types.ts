export interface Camera {
  id: number;
  name: string;
  location: string;
  streamUrl: string;
  status: string;
  createdAt: string;
}

export interface IncidentType {
  id: number;
  name: string;
  description: string;
  severity: string;
  icon: string;
}

export interface Incident {
  id: number;
  type: string;
  typeId: number;
  cameraId: number;
  location: string;
  timestamp: string;
  screenshot?: string;
  status: string;
  severity: string;
  notes?: string;
}

export interface EmergencyService {
  id: number;
  name: string;
  priorityLevel: string;
  icon: string;
  status: string;
  incidentTypes: string[];
  contactChannels: string[];
}

export interface ContactChannel {
  id: number;
  serviceId: number;
  channelType: string;
  contactValue: string;
  isActive: boolean;
}

export interface Alert {
  id: number;
  incidentId: number;
  serviceId: number;
  channelId: number;
  timestamp: string;
  status: string;
  details: Record<string, any>;
}

export interface SystemService {
  name: string;
  status: string;
}

export interface SystemMetric {
  name: string;
  value: number;
}

export interface SystemStatus {
  services: SystemService[];
  metrics: SystemMetric[];
  lastUpdated: string;
}
