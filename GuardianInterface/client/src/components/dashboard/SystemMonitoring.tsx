import { useQuery } from "@tanstack/react-query";
import { RefreshIcon, SettingsIcon } from "@/lib/icons";
import { SystemStatus } from "@/lib/types";

export default function SystemMonitoring() {
  const { data: status, isLoading, refetch } = useQuery({
    queryKey: ['/api/system-status'],
  });

  // Get the appropriate color for a status
  const getMetricColor = (value: number) => {
    if (value < 50) return "success";
    if (value < 80) return "warning";
    return "danger";
  };

  // Get the appropriate icon for a service
  const getServiceIcon = (service: string) => {
    switch (service.toLowerCase()) {
      case "module vidéo":
        return <i className="ri-vidicon-line text-success mr-2"></i>;
      case "base de données":
        return <i className="ri-database-2-line text-success mr-2"></i>;
      case "ai engine":
        return <i className="ri-brain-line text-success mr-2"></i>;
      case "service d'alertes":
        return <i className="ri-notification-line text-warning mr-2"></i>;
      default:
        return <i className="ri-settings-line text-success mr-2"></i>;
    }
  };

  const getServiceStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "ok":
        return "success";
      case "ralenti":
        return "warning";
      case "erreur":
        return "danger";
      default:
        return "info";
    }
  };

  return (
    <div className="bg-dark-light rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-dark-lighter flex justify-between items-center">
        <h3 className="font-heading font-semibold text-white">État du système</h3>
        <button 
          className="text-gray-400 hover:text-white"
          onClick={() => refetch()}
        >
          <RefreshIcon />
        </button>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="text-center p-4">
            <p className="text-gray-400">Chargement des métriques...</p>
          </div>
        ) : status ? (
          <>
            {/* CPU & Memory Usage */}
            {status.metrics && status.metrics.map((metric: any) => (
              <div key={metric.name} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm">{metric.name}</p>
                  <p className={`text-sm text-${getMetricColor(metric.value)}`}>{metric.value}%</p>
                </div>
                <div className="w-full bg-dark-darker rounded-full h-2">
                  <div 
                    className={`bg-${getMetricColor(metric.value)} rounded-full h-2`} 
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
            
            {/* Service Status */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Services actifs</h4>
              <div className="space-y-3">
                {status.services && status.services.map((service: any) => (
                  <div key={service.name} className="flex justify-between items-center p-2 bg-dark-darker rounded">
                    <div className="flex items-center">
                      {getServiceIcon(service.name)}
                      <span className="text-sm">{service.name}</span>
                    </div>
                    <span className={`text-xs bg-${getServiceStatus(service.status)}/20 text-${getServiceStatus(service.status)} px-2 py-0.5 rounded-full`}>
                      {service.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Last Update */}
            <div className="mt-6 text-center text-xs text-gray-400">
              Dernière mise à jour: {new Date(status.lastUpdated).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <p className="text-gray-400">Aucune donnée système disponible</p>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-dark-lighter">
        <button className="w-full bg-primary text-white py-2 rounded-md flex items-center justify-center hover:bg-primary-light transition-colors">
          <SettingsIcon className="mr-2" />
          <span>Paramètres système</span>
        </button>
      </div>
    </div>
  );
}
