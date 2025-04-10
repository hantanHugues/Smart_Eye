import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  PlusIcon, EditIcon, DeleteIcon, 
  RefreshIcon, PhoneIcon, MessageCircleIcon
} from "@/lib/icons";
import { EmergencyService } from "@/lib/types";
import ServiceForm from "@/components/emergencyServices/ServiceForm";
import ContactChannelForm from "@/components/emergencyServices/ContactChannelForm";

export default function EmergencyServices() {
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<EmergencyService | null>(null);
  
  const { data: services = [], isLoading, refetch } = useQuery<EmergencyService[]>({
    queryKey: ['/api/emergency-services'],
  });

  // Helper pour obtenir l'icône d'un service
  const getServiceIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "pompiers":
        return <i className="ri-fire-fill text-danger text-2xl"></i>;
      case "police nationale":
      case "police":
        return <i className="ri-police-car-fill text-info text-2xl"></i>;
      case "samu":
        return <i className="ri-hearts-fill text-danger text-2xl"></i>;
      default:
        return <i className="ri-heart-pulse-fill text-info text-2xl"></i>;
    }
  };

  // Helper pour obtenir l'icône d'un canal de communication
  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case "email":
        return <i className="ri-mail-line text-primary-light"></i>;
      case "whatsapp":
        return <i className="ri-whatsapp-line text-success"></i>;
      case "sms":
        return <i className="ri-message-2-line text-info"></i>;
      case "telegram":
        return <i className="ri-telegram-line text-info"></i>;
      default:
        return <i className="ri-notification-line text-primary-light"></i>;
    }
  };
  
  const openAddServiceForm = () => {
    setSelectedService(null);
    setIsServiceFormOpen(true);
  };
  
  const openEditServiceForm = (service: EmergencyService) => {
    setSelectedService(service);
    setIsServiceFormOpen(true);
  };
  
  const openAddContactForm = (service: EmergencyService) => {
    setSelectedService(service);
    setIsContactFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-white">Services d'urgence</h1>
        <div className="flex space-x-2">
          <button 
            className="bg-dark-light px-3 py-2 rounded-md text-sm flex items-center hover:bg-dark-lighter transition-colors"
            onClick={() => refetch()}
          >
            <RefreshIcon className="mr-2" />
            <span>Actualiser</span>
          </button>
          <button 
            className="bg-primary text-white px-3 py-2 rounded-md text-sm flex items-center hover:bg-primary-light transition-colors"
            onClick={openAddServiceForm}
          >
            <PlusIcon className="mr-2" />
            <span>Ajouter un service</span>
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="bg-dark-light rounded-lg p-8 text-center text-gray-400">
          Chargement des services d'urgence...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-dark-light rounded-lg shadow-lg overflow-hidden">
              <div className="p-5 flex items-center">
                <div className="w-12 h-12 rounded-full bg-dark-darker flex items-center justify-center mr-4">
                  {getServiceIcon(service.name)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white">{service.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`bg-${service.status === 'active' ? 'success' : 'warning'}/20 text-${service.status === 'active' ? 'success' : 'warning'} px-2 py-0.5 rounded-full text-xs mr-2`}>
                      {service.status === 'active' ? 'Actif' : 'En configuration'}
                    </span>
                    <span className="text-xs text-gray-400">Priorité: {service.priorityLevel === 'high' ? 'Haute' : service.priorityLevel === 'medium' ? 'Moyenne' : 'Basse'}</span>
                  </div>
                </div>
                <div className="flex">
                  <button 
                    className="text-gray-400 hover:text-white p-1"
                    onClick={() => openEditServiceForm(service)}
                  >
                    <EditIcon />
                  </button>
                  <button className="text-gray-400 hover:text-danger p-1">
                    <DeleteIcon />
                  </button>
                </div>
              </div>
              
              <div className="px-5 py-3 border-t border-b border-dark-darker bg-dark">
                <h4 className="text-sm text-gray-300 mb-2">Types d'incidents associés</h4>
                <div className="flex flex-wrap">
                  {service.incidentTypes && service.incidentTypes.length > 0 ? (
                    service.incidentTypes.map((type, index) => (
                      <span key={index} className="bg-dark-darker text-gray-300 px-2 py-0.5 text-xs rounded mr-1 mb-1">
                        {type}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">Aucun type d'incident associé</span>
                  )}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm text-gray-300">Canaux de contact</h4>
                  <button 
                    className="text-xs bg-dark-darker text-primary hover:bg-dark hover:text-primary-light px-2 py-1 rounded flex items-center"
                    onClick={() => openAddContactForm(service)}
                  >
                    <PhoneIcon className="h-3 w-3 mr-1" />
                    <span>Ajouter</span>
                  </button>
                </div>
                
                <div className="flex flex-wrap">
                  {service.contactChannels && service.contactChannels.length > 0 ? (
                    service.contactChannels.map((channel, index) => (
                      <div 
                        key={index}
                        className="mr-2 mb-2 bg-dark-darker rounded-full px-3 py-1 text-gray-300 text-xs flex items-center" 
                        title={channel}
                      >
                        <span className="mr-1.5">{getChannelIcon(channel)}</span>
                        <span>{channel}</span>
                      </div>
                    ))
                  ) : (
                    <div className="w-full text-center py-3 border border-dashed border-dark-darker rounded-md">
                      <MessageCircleIcon className="mx-auto text-gray-600 mb-1" />
                      <p className="text-xs text-gray-400">Aucun canal de contact configuré</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {services.length === 0 && (
            <div className="col-span-full bg-dark-light rounded-lg p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-dark-darker flex items-center justify-center mx-auto mb-4">
                <MessageCircleIcon className="text-gray-500 text-2xl" />
              </div>
              <h3 className="text-lg text-white mb-2">Aucun service d'urgence configuré</h3>
              <p className="text-gray-400 mb-4">Ajoutez des services d'urgence pour les associer à des incidents détectés par le système.</p>
              <button 
                className="bg-primary text-white px-4 py-2 rounded-md text-sm inline-flex items-center hover:bg-primary-light transition-colors"
                onClick={openAddServiceForm}
              >
                <PlusIcon className="mr-2" />
                <span>Ajouter un service</span>
              </button>
            </div>
          )}
        </div>
      )}
      
      <ServiceForm 
        open={isServiceFormOpen} 
        setOpen={setIsServiceFormOpen} 
        service={selectedService} 
      />
      
      <ContactChannelForm 
        open={isContactFormOpen} 
        setOpen={setIsContactFormOpen} 
        service={selectedService} 
      />
    </div>
  );
}