import { useQuery } from "@tanstack/react-query";
import { PlusIcon, EditIcon, DeleteIcon } from "@/lib/icons";
import { EmergencyService } from "@/lib/types";

export default function EmergencyServices() {
  const { data: services = [], isLoading } = useQuery<EmergencyService[]>({
    queryKey: ['/api/emergency-services'],
  });

  // Helper to get the icon for a service
  const getServiceIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "sapeurs-pompiers":
        return <i className="ri-fire-fill text-danger text-lg mr-2"></i>;
      case "police nationale":
        return <i className="ri-police-car-fill text-info text-lg mr-2"></i>;
      case "samu":
        return <i className="ri-hearts-fill text-danger text-lg mr-2"></i>;
      default:
        return <i className="ri-heart-pulse-fill text-info text-lg mr-2"></i>;
    }
  };

  // Helper to get the icon for a communication channel
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

  return (
    <div className="xl:col-span-2 bg-dark-light rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-dark-lighter flex justify-between items-center">
        <h3 className="font-heading font-semibold text-white">Services de secours configurés</h3>
        <button className="bg-primary text-white px-3 py-1 rounded-md text-sm flex items-center hover:bg-primary-light transition-colors">
          <PlusIcon className="mr-1" />
          <span>Ajouter</span>
        </button>
      </div>
      
      <div className="overflow-x-auto scrollbar-dark">
        {isLoading ? (
          <div className="p-4 text-center text-gray-400">
            Chargement des services de secours...
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-dark-darker text-gray-400 text-xs uppercase">
                <th className="py-3 px-4 text-left">Service</th>
                <th className="py-3 px-4 text-left">Types d'incidents</th>
                <th className="py-3 px-4 text-left">Canaux de contact</th>
                <th className="py-3 px-4 text-center">Statut</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {services.map((service) => (
                <tr key={service.id} className="border-b border-dark-darker hover:bg-dark-lighter transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {getServiceIcon(service.name)}
                      <div>
                        <p className="text-white font-medium">{service.name}</p>
                        <p className="text-xs text-gray-400">Urgence: {service.priorityLevel}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap">
                      {service.incidentTypes && service.incidentTypes.length > 0 ? (
                        service.incidentTypes.map((type: string, index: number) => (
                          <span key={index} className="bg-dark-darker text-gray-300 px-2 py-0.5 text-xs rounded mr-1 mb-1">
                            {type}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">Aucun type d'incident associé</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      {service.contactChannels && service.contactChannels.length > 0 ? (
                        service.contactChannels.map((channel: string, index: number) => (
                          <span 
                            key={index}
                            className="w-7 h-7 rounded bg-dark-darker flex items-center justify-center" 
                            title={channel}
                          >
                            {getChannelIcon(channel)}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">Aucun canal configuré</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`bg-${service.status === 'active' ? 'success' : 'warning'}/20 text-${service.status === 'active' ? 'success' : 'warning'} px-2 py-0.5 rounded-full text-xs`}>
                      {service.status === 'active' ? 'Actif' : 'Configuration'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-2">
                      <button className="text-gray-400 hover:text-white p-1">
                        <EditIcon />
                      </button>
                      <button className="text-gray-400 hover:text-danger p-1">
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
