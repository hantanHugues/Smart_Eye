import { useState } from "react";
import { 
  SaveIcon, RefreshIcon, SettingsIcon,
  LayersIcon, DatabaseIcon, ToggleLeftIcon, ToggleRightIcon
} from "@/lib/icons";

export default function Configuration() {
  const [aiSensitivity, setAiSensitivity] = useState(75);
  const [dataRetention, setDataRetention] = useState(30);
  const [autoRetraining, setAutoRetraining] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  
  const handleSensitivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAiSensitivity(parseInt(e.target.value));
  };
  
  const handleDataRetentionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDataRetention(parseInt(e.target.value));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-white">Configuration du système</h1>
        <div className="flex space-x-2">
          <button className="bg-dark-light px-3 py-2 rounded-md text-sm flex items-center hover:bg-dark-lighter transition-colors">
            <RefreshIcon className="mr-2" />
            <span>Réinitialiser</span>
          </button>
          <button className="bg-primary text-white px-3 py-2 rounded-md text-sm flex items-center hover:bg-primary-light transition-colors">
            <SaveIcon className="mr-2" />
            <span>Enregistrer</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Configuration */}
        <div className="bg-dark-light rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-dark-lighter">
            <h3 className="font-heading font-semibold text-white flex items-center">
              <LayersIcon className="mr-2" />
              Configuration de l'IA
            </h3>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-white mb-2">Sensibilité de détection</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={aiSensitivity}
                  onChange={handleSensitivityChange}
                  className="w-full h-2 rounded-lg appearance-none bg-dark-darker"
                />
                <span className="ml-3 bg-primary/20 text-primary-light px-2 py-1 rounded text-sm min-w-[40px] text-center">
                  {aiSensitivity}%
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Une sensibilité plus élevée détectera plus d'incidents mais pourrait augmenter les faux positifs.
              </p>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-dark-darker rounded">
              <div>
                <p className="text-white">Réentraînement automatique</p>
                <p className="text-xs text-gray-400">
                  Ré-entraînement périodique du modèle avec les nouvelles données
                </p>
              </div>
              <button 
                className="text-2xl" 
                onClick={() => setAutoRetraining(!autoRetraining)}
              >
                {autoRetraining ? (
                  <ToggleRightIcon className="text-success" />
                ) : (
                  <ToggleLeftIcon className="text-gray-500" />
                )}
              </button>
            </div>
            
            <div>
              <label className="block text-white mb-2">Types d'incidents activés</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center bg-dark-darker p-2 rounded">
                  <input type="checkbox" checked={true} className="mr-2" />
                  <span className="text-white text-sm">Incendie</span>
                </div>
                <div className="flex items-center bg-dark-darker p-2 rounded">
                  <input type="checkbox" checked={true} className="mr-2" />
                  <span className="text-white text-sm">Agression</span>
                </div>
                <div className="flex items-center bg-dark-darker p-2 rounded">
                  <input type="checkbox" checked={true} className="mr-2" />
                  <span className="text-white text-sm">Accidents</span>
                </div>
                <div className="flex items-center bg-dark-darker p-2 rounded">
                  <input type="checkbox" checked={true} className="mr-2" />
                  <span className="text-white text-sm">Intrusion</span>
                </div>
                <div className="flex items-center bg-dark-darker p-2 rounded">
                  <input type="checkbox" checked={false} className="mr-2" />
                  <span className="text-white text-sm">Vandalisme</span>
                </div>
                <div className="flex items-center bg-dark-darker p-2 rounded">
                  <input type="checkbox" checked={true} className="mr-2" />
                  <span className="text-white text-sm">Chute</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* System Configuration */}
        <div className="bg-dark-light rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-dark-lighter">
            <h3 className="font-heading font-semibold text-white flex items-center">
              <SettingsIcon className="mr-2" />
              Configuration système
            </h3>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-white mb-2">Conservation des données</label>
              <select 
                className="bg-dark-darker text-white px-3 py-2 rounded-md w-full border border-gray-700"
                value={dataRetention}
                onChange={handleDataRetentionChange}
              >
                <option value="7">7 jours</option>
                <option value="14">14 jours</option>
                <option value="30">30 jours</option>
                <option value="90">3 mois</option>
                <option value="180">6 mois</option>
                <option value="365">1 an</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">
                Période durant laquelle les données (incidents, alertes) sont conservées avant suppression automatique.
              </p>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-dark-darker rounded">
              <div>
                <p className="text-white">Mode sombre</p>
                <p className="text-xs text-gray-400">
                  Utiliser l'interface en mode sombre
                </p>
              </div>
              <button 
                className="text-2xl" 
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? (
                  <ToggleRightIcon className="text-success" />
                ) : (
                  <ToggleLeftIcon className="text-gray-500" />
                )}
              </button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-dark-darker rounded">
              <div>
                <p className="text-white">Mode débogage</p>
                <p className="text-xs text-gray-400">
                  Activer les logs détaillés pour le dépannage
                </p>
              </div>
              <button 
                className="text-2xl" 
                onClick={() => setDebugMode(!debugMode)}
              >
                {debugMode ? (
                  <ToggleRightIcon className="text-success" />
                ) : (
                  <ToggleLeftIcon className="text-gray-500" />
                )}
              </button>
            </div>
            
            <div>
              <label className="block text-white mb-2">Base de données</label>
              <div className="bg-dark-darker p-3 rounded flex items-center">
                <DatabaseIcon className="text-primary-light mr-2" />
                <div>
                  <p className="text-white text-sm">Statut: <span className="text-success">Connecté</span></p>
                  <p className="text-xs text-gray-400">Type: PostgreSQL</p>
                </div>
                <button className="ml-auto bg-primary/20 hover:bg-primary/30 text-primary-light px-2 py-1 rounded text-xs">
                  Configurer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
