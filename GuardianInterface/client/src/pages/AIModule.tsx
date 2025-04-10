import { useState } from "react";
import { 
  RefreshIcon, PlayIcon, BrainIcon, 
  SaveIcon, DatabaseIcon, LayersIcon, ChartIcon
} from "@/lib/icons";

export default function AIModule() {
  const [isTraining, setIsTraining] = useState(false);
  
  const startTraining = () => {
    setIsTraining(true);
    // Simulate a training process
    setTimeout(() => setIsTraining(false), 5000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-white">Module d'Intelligence Artificielle</h1>
        <button className="bg-primary text-white px-3 py-2 rounded-md text-sm flex items-center hover:bg-primary-light transition-colors">
          <SaveIcon className="mr-2" />
          <span>Enregistrer la configuration</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Model Status */}
        <div className="lg:col-span-2 bg-dark-light rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-dark-lighter flex justify-between items-center">
            <h3 className="font-heading font-semibold text-white flex items-center">
              <BrainIcon className="mr-2" />
              État du modèle IA
            </h3>
            <button className="text-gray-400 hover:text-white">
              <RefreshIcon />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-dark-darker p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-1">Version du modèle</h4>
                <p className="text-white font-medium">YOLOv8 (2.3.1)</p>
                <p className="text-xs text-success mt-2">Actif et opérationnel</p>
              </div>
              
              <div className="bg-dark-darker p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-1">Dernière mise à jour</h4>
                <p className="text-white font-medium">Il y a 3 jours</p>
                <p className="text-xs text-gray-400 mt-2">15/05/2023 à 10:23</p>
              </div>
              
              <div className="bg-dark-darker p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-1">Score de précision</h4>
                <p className="text-white font-medium">92.4%</p>
                <p className="text-xs text-success mt-2">+2.1% depuis mise à jour</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-white font-medium mb-2">Précision par type d'incident</h4>
              <div className="bg-dark-darker p-4 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Incendie</p>
                    <div className="flex items-center mt-1">
                      <div className="w-full bg-dark h-2 rounded-full mr-2">
                        <div className="bg-danger rounded-full h-2" style={{ width: "96%" }}></div>
                      </div>
                      <span className="text-xs text-white">96%</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Bagarre</p>
                    <div className="flex items-center mt-1">
                      <div className="w-full bg-dark h-2 rounded-full mr-2">
                        <div className="bg-warning rounded-full h-2" style={{ width: "87%" }}></div>
                      </div>
                      <span className="text-xs text-white">87%</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Accident</p>
                    <div className="flex items-center mt-1">
                      <div className="w-full bg-dark h-2 rounded-full mr-2">
                        <div className="bg-info rounded-full h-2" style={{ width: "91%" }}></div>
                      </div>
                      <span className="text-xs text-white">91%</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Intrusion</p>
                    <div className="flex items-center mt-1">
                      <div className="w-full bg-dark h-2 rounded-full mr-2">
                        <div className="bg-primary-light rounded-full h-2" style={{ width: "94%" }}></div>
                      </div>
                      <span className="text-xs text-white">94%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-2">Statistiques de détection (30 derniers jours)</h4>
              <div className="bg-dark-darker p-4 rounded-lg h-48 flex items-center justify-center">
                <ChartIcon className="text-6xl text-gray-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Training Controls */}
        <div className="bg-dark-light rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-dark-lighter">
            <h3 className="font-heading font-semibold text-white flex items-center">
              <LayersIcon className="mr-2" />
              Entraînement du modèle
            </h3>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="bg-dark-darker p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-white">Données d'entraînement</h4>
                <span className="text-xs bg-info/20 text-info px-2 py-0.5 rounded-full">
                  1.2K incidents
                </span>
              </div>
              <div className="flex items-center">
                <DatabaseIcon className="text-primary-light mr-2" />
                <div className="text-sm">
                  <p className="text-gray-300">Incidents classifiés</p>
                  <p className="text-xs text-gray-400">Dernière mise à jour: hier</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-white mb-2">Options d'entraînement</label>
              <div className="space-y-2">
                <div className="flex items-center bg-dark-darker p-2 rounded">
                  <input type="checkbox" checked={true} className="mr-2" />
                  <span className="text-white text-sm">Utiliser données récentes uniquement</span>
                </div>
                <div className="flex items-center bg-dark-darker p-2 rounded">
                  <input type="checkbox" checked={true} className="mr-2" />
                  <span className="text-white text-sm">Optimisation GPU</span>
                </div>
                <div className="flex items-center bg-dark-darker p-2 rounded">
                  <input type="checkbox" checked={false} className="mr-2" />
                  <span className="text-white text-sm">Entraînement étendu (8h+)</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-white mb-2">Époques d'entraînement</label>
              <select className="bg-dark-darker text-white px-3 py-2 rounded-md w-full border border-gray-700">
                <option value="50">50 époques (rapide)</option>
                <option value="100" selected>100 époques (recommandé)</option>
                <option value="200">200 époques (précision améliorée)</option>
                <option value="500">500 époques (maximum)</option>
              </select>
            </div>
            
            <button 
              className={`w-full py-3 rounded-md flex items-center justify-center transition-colors ${
                isTraining 
                  ? "bg-warning text-white" 
                  : "bg-primary text-white hover:bg-primary-light"
              }`}
              onClick={startTraining}
              disabled={isTraining}
            >
              {isTraining ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                  <span>Entraînement en cours...</span>
                </>
              ) : (
                <>
                  <PlayIcon className="mr-2" />
                  <span>Démarrer l'entraînement</span>
                </>
              )}
            </button>
            
            <div className="text-center text-xs text-gray-400">
              L'entraînement peut prendre plusieurs heures selon les options choisies.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
