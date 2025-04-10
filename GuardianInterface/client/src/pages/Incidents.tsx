import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  RefreshIcon, PlusIcon, EditIcon, DeleteIcon, 
  EyeIcon, ChartIcon, MessageCircleIcon
} from "@/lib/icons";
import { Incident, IncidentType } from "@/lib/types";
import IncidentTypeForm from "@/components/incidents/IncidentTypeForm";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";

export default function Incidents() {
  const [isIncidentTypeFormOpen, setIsIncidentTypeFormOpen] = useState(false);
  const [selectedIncidentType, setSelectedIncidentType] = useState<IncidentType | null>(null);
  
  const { data: incidents = [], isLoading: incidentsLoading, refetch: refetchIncidents } = useQuery<Incident[]>({
    queryKey: ['/api/incidents'],
  });
  
  const { data: incidentTypes = [], isLoading: typesLoading, refetch: refetchTypes } = useQuery<IncidentType[]>({
    queryKey: ['/api/incident-types'],
  });
  
  const openAddIncidentTypeForm = () => {
    setSelectedIncidentType(null);
    setIsIncidentTypeFormOpen(true);
  };
  
  const openEditIncidentTypeForm = (incidentType: IncidentType) => {
    setSelectedIncidentType(incidentType);
    setIsIncidentTypeFormOpen(true);
  };
  
  // Helper pour obtenir l'icône du type d'incident
  const getIncidentTypeIcon = (incidentType: string) => {
    switch (incidentType.toLowerCase()) {
      case "incendie":
        return <i className="ri-fire-fill text-danger text-lg mr-2"></i>;
      case "intrusion":
        return <i className="ri-door-open-fill text-warning text-lg mr-2"></i>;
      case "chute de personne":
        return <i className="ri-user-heart-fill text-danger text-lg mr-2"></i>;
      default:
        return <i className="ri-alert-fill text-warning text-lg mr-2"></i>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-white">Gestion des incidents</h1>
        <div className="flex space-x-2">
          <button 
            className="bg-dark-light px-3 py-2 rounded-md text-sm flex items-center hover:bg-dark-lighter transition-colors"
            onClick={() => {
              refetchIncidents();
              refetchTypes();
            }}
          >
            <RefreshIcon className="mr-2" />
            <span>Actualiser</span>
          </button>
          <button 
            className="bg-primary text-white px-3 py-2 rounded-md text-sm flex items-center hover:bg-primary-light transition-colors"
            onClick={openAddIncidentTypeForm}
          >
            <PlusIcon className="mr-2" />
            <span>Ajouter un type d'incident</span>
          </button>
        </div>
      </div>
      
      <Tabs defaultValue="types" className="w-full">
        <TabsList className="mb-6 bg-dark-light">
          <TabsTrigger value="types" className="data-[state=active]:bg-dark-darker">Types d'incidents</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-dark-darker">Historique des incidents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="types" className="space-y-6">
          {typesLoading ? (
            <div className="bg-dark-light rounded-lg p-8 text-center text-gray-400">
              Chargement des types d'incidents...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {incidentTypes.map((type) => (
                <div key={type.id} className="bg-dark-light rounded-lg shadow-lg overflow-hidden">
                  <div className="p-5 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-dark-darker flex items-center justify-center mr-4">
                      {getIncidentTypeIcon(type.name)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white">{type.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className={`bg-${type.severity === 'high' ? 'danger' : type.severity === 'medium' ? 'warning' : 'success'}/20 text-${type.severity === 'high' ? 'danger' : type.severity === 'medium' ? 'warning' : 'success'} px-2 py-0.5 rounded-full text-xs`}>
                          {type.severity === 'high' ? 'Haute' : type.severity === 'medium' ? 'Moyenne' : 'Basse'}
                        </span>
                      </div>
                    </div>
                    <div className="flex">
                      <button 
                        className="text-gray-400 hover:text-white p-1"
                        onClick={() => openEditIncidentTypeForm(type)}
                      >
                        <EditIcon />
                      </button>
                      <button className="text-gray-400 hover:text-danger p-1">
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                  
                  <div className="px-5 py-3 border-t border-dark-darker">
                    <p className="text-sm text-gray-400">
                      {type.description || "Aucune description fournie."}
                    </p>
                  </div>
                </div>
              ))}
              
              {incidentTypes.length === 0 && (
                <div className="col-span-full bg-dark-light rounded-lg p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-dark-darker flex items-center justify-center mx-auto mb-4">
                    <MessageCircleIcon className="text-gray-500 text-2xl" />
                  </div>
                  <h3 className="text-lg text-white mb-2">Aucun type d'incident configuré</h3>
                  <p className="text-gray-400 mb-4">Ajoutez des types d'incidents pour permettre à l'IA de classifier les événements détectés.</p>
                  <button 
                    className="bg-primary text-white px-4 py-2 rounded-md text-sm inline-flex items-center hover:bg-primary-light transition-colors"
                    onClick={openAddIncidentTypeForm}
                  >
                    <PlusIcon className="mr-2" />
                    <span>Ajouter un type d'incident</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          {incidentsLoading ? (
            <div className="bg-dark-light rounded-lg p-8 text-center text-gray-400">
              Chargement de l'historique des incidents...
            </div>
          ) : (
            <>
              <div className="bg-dark-light rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 border-b border-dark-lighter flex justify-between items-center">
                  <h3 className="font-heading font-semibold text-white">Historique des incidents</h3>
                  <div className="flex space-x-2">
                    <button className="bg-dark-darker text-gray-300 px-2 py-1 rounded-md text-xs flex items-center hover:bg-dark hover:text-white transition-colors">
                      <ChartIcon className="mr-1 h-3 w-3" />
                      <span>Statistiques</span>
                    </button>
                    <input
                      type="text"
                      placeholder="Rechercher un incident..."
                      className="bg-dark-darker text-gray-300 pl-3 pr-3 py-1 rounded-md text-sm border border-gray-700 focus:outline-none focus:border-primary-light w-48"
                    />
                  </div>
                </div>
                
                <div className="overflow-x-auto scrollbar-dark">
                  {incidents.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-dark-darker text-gray-400 text-xs uppercase">
                          <th className="py-3 px-4 text-left">Type</th>
                          <th className="py-3 px-4 text-left">Date et heure</th>
                          <th className="py-3 px-4 text-left">Caméra</th>
                          <th className="py-3 px-4 text-left">Localisation</th>
                          <th className="py-3 px-4 text-center">Statut</th>
                          <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {incidents.map((incident) => (
                          <tr key={incident.id} className="border-b border-dark-darker hover:bg-dark-lighter transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                {getIncidentTypeIcon(incident.type)}
                                <span className="text-white">{incident.type}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-300">
                              {new Date(incident.timestamp).toLocaleString('fr-FR')}
                            </td>
                            <td className="py-3 px-4 text-gray-300">
                              Caméra #{incident.cameraId}
                            </td>
                            <td className="py-3 px-4 text-gray-300">
                              {incident.location}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className={`bg-${incident.status === 'resolved' ? 'success' : incident.status === 'processing' ? 'warning' : 'danger'}/20 text-${incident.status === 'resolved' ? 'success' : incident.status === 'processing' ? 'warning' : 'danger'} px-2 py-0.5 rounded-full text-xs`}>
                                {incident.status === 'resolved' ? 'Résolu' : incident.status === 'processing' ? 'En cours' : 'Non traité'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center space-x-2">
                                <button className="text-gray-400 hover:text-white p-1" title="Voir les détails">
                                  <EyeIcon />
                                </button>
                                <button className="text-gray-400 hover:text-danger p-1" title="Supprimer">
                                  <DeleteIcon />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-8 text-center text-gray-400">
                      Aucun incident enregistré dans l'historique.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
      
      <IncidentTypeForm 
        open={isIncidentTypeFormOpen} 
        setOpen={setIsIncidentTypeFormOpen} 
        incidentType={selectedIncidentType} 
      />
    </div>
  );
}