
# Smart Eye - Système de Surveillance Intelligent 🛡️

## Description
Smart Eye est une solution de surveillance intelligente qui utilise l'intelligence artificielle pour analyser en temps réel les flux vidéo. Le système détecte automatiquement les situations anormales ou dangereuses et alerte instantanément les services d'urgence appropriés.

## Table des matières
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [API](#api)
- [Sécurité](#sécurité)

## Fonctionnalités

### 1. Analyse Vidéo en Temps Réel
- Détection d'incidents via YOLOv8
- Classification automatique des événements
- Traitement parallèle des flux
- Définition de zones prioritaires

### 2. Gestion des Alertes
- Notifications multicanaux :
  - Email
  - WhatsApp
  - Telegram
  - SMS
- Données incluses :
  - Captures d'écran
  - Coordonnées GPS
  - Horodatage
  - Type d'incident

### 3. Interface d'Administration
- Tableau de bord en temps réel
- Gestion centralisée des incidents
- Configuration des services d'urgence
- Monitoring système
- Paramétrage des modèles IA

## Technologies

### Frontend
- React.js + TypeScript
- TailwindCSS
- Radix UI / Shadcn
- React Query
- Leaflet (cartographie)

### Backend
- FastAPI (API Python)
- MongoDB
- WebSocket
- Node.js + Express

## Installation

1. Cloner le projet :
```bash
git clone [url-du-projet]
```

2. Installer les dépendances frontend :
```bash
cd GuardianInterface
npm install
```

3. Installer les dépendances backend :
```bash
cd server/api
pip install -r requirements.txt
```

4. Démarrer le projet :
```bash
npm run dev
```

## Configuration

### Variables d'Environnement
```env
MONGODB_URI=votre_uri_mongodb
API_KEY=votre_clé_api
PORT=5000
```

### Services de Notification
1. Email : Configuration SMTP
2. WhatsApp : Clé API WhatsApp Business
3. Telegram : Token Bot Telegram
4. SMS : Identifiants du service SMS

## Architecture

### Structure du Projet
```
GuardianInterface/
├── client/           # Frontend React
│   ├── src/
│   │   ├── components/  # Composants UI
│   │   ├── pages/      # Pages
│   │   ├── lib/        # Utilitaires
│   │   └── hooks/      # Hooks React
├── server/           # Backend
│   ├── api/         # API FastAPI
│   └── services/    # Services métier
└── shared/          # Code partagé
```

### Modules Principaux

#### Module IA
- Détection d'objets et de situations
- Classification des incidents
- Apprentissage continu

#### Module Services d'Urgence
- Gestion des contacts
- Routage des alertes
- Zones d'intervention

#### Module Configuration
- Paramètres système
- Gestion des caméras
- Seuils de détection

## API

### Points d'Entrée Principaux

```typescript
// Incidents
GET    /api/incidents      // Liste des incidents
POST   /api/incidents      // Créer un incident
GET    /api/incidents/:id  // Détails d'un incident

// Caméras
GET    /api/cameras        // Liste des caméras
POST   /api/cameras        // Ajouter une caméra
PUT    /api/cameras/:id    // Mettre à jour une caméra

// Services d'urgence
GET    /api/services       // Liste des services
POST   /api/services       // Ajouter un service
```

## Sécurité

### Authentification
- JWT pour l'authentification API
- Sessions sécurisées pour l'interface admin
- Droits d'accès par rôle

### Protection des Données
- Chiffrement des données sensibles
- Conformité RGPD
- Journalisation des accès

## Support et Contact

Pour toute assistance technique :
- Email : support@smarteye.com
- Documentation API : /api/docs
- Base de connaissances : /docs

## Licence
Smart Eye est sous licence propriétaire. Tous droits réservés.
