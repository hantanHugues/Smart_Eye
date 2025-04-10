
# Guardian AI - Système de Surveillance Intelligent 🛡️

## Description
Guardian AI est une application d'intelligence artificielle conçue pour la surveillance urbaine en temps réel. Le système analyse automatiquement les flux vidéo des caméras de surveillance pour détecter des situations anormales ou dangereuses (incendies, bagarres, accidents, chutes, intrusions, etc.) et notifie immédiatement les services d'urgence concernés.

## Fonctionnalités Principales 🔍

### 1. Surveillance et Détection IA
- Analyse en temps réel des flux vidéo
- Détection automatique d'événements anormaux via YOLOv8
- Classification intelligente des incidents
- Définition de zones prioritaires

### 2. Gestion des Alertes
- Notification instantanée multi-canaux :
  - Email
  - WhatsApp
  - Telegram
  - SMS
- Informations détaillées :
  - Captures d'écran
  - Localisation GPS
  - Horodatage
  - Classification de l'incident

### 3. Interface d'Administration
- Dashboard temps réel
- Gestion des incidents
- Configuration des services d'urgence
- Monitoring système
- Paramétrage de l'IA

## Architecture Technique 🔧

### Frontend
- React.js avec TypeScript
- TailwindCSS pour le styling
- Composants UI Radix/Shadcn
- React Query pour la gestion d'état
- Leaflet pour la cartographie

### Backend
- Node.js avec Express
- TypeScript
- WebSocket pour les communications temps réel
- Drizzle ORM pour la gestion de base de données

## Installation et Démarrage 🚀

1. Installation des dépendances :
```bash
npm install
```

2. Démarrage en développement :
```bash
npm run dev
```

3. Build pour production :
```bash
npm run build
```

4. Démarrage en production :
```bash
npm start
```

## Structure du Projet 📁

```
GuardianInterface/
├── client/           # Frontend React
│   ├── src/
│   │   ├── components/  # Composants réutilisables
│   │   ├── pages/      # Pages de l'application
│   │   ├── lib/        # Utilitaires et configurations
│   │   └── hooks/      # Hooks React personnalisés
├── server/           # Backend Express
│   ├── routes/      # Routes API
│   └── services/    # Services métier
└── shared/          # Code partagé front/back
```

## Modules Principaux 📊

1. **Module IA**
   - Formation et amélioration continue
   - Configuration des paramètres de détection
   - Gestion des modèles

2. **Module Services d'Urgence**
   - Gestion des contacts
   - Configuration des canaux de communication
   - Zones d'intervention

3. **Module Configuration**
   - Paramètres système
   - Gestion des caméras
   - Seuils de détection

## Sécurité 🔒
- Authentification sécurisée
- Chiffrement des données sensibles
- Journalisation des actions
- Conformité RGPD

## Support Technique 💬
Pour toute question ou assistance, contactez l'équipe Guardian AI via le système de tickets intégré.
