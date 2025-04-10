import { useQuery } from "@tanstack/react-query";
import { 
  MoreIcon, FireIcon, UserVoiceIcon, CarCrashIcon, 
  UserFollowIcon, ArrowRightIcon
} from "@/lib/icons";
import { Incident } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const formatTimestamp = (timestamp: string) => {
  return formatDistanceToNow(new Date(timestamp), { 
    addSuffix: true,
    locale: fr
  }).replace("environ ", "");
};

const getIncidentTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "incendie":
      return <FireIcon />;
    case "bagarre":
      return <UserVoiceIcon />;
    case "accident":
      return <CarCrashIcon />;
    case "intrusion":
      return <UserFollowIcon />;
    default:
      return <FireIcon />;
  }
};

const getSeverityClass = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "critique":
      return "bg-danger";
    case "urgent":
      return "bg-warning";
    case "modéré":
      return "bg-info";
    default:
      return "bg-info";
  }
};

export default function RecentIncidents() {
  const { data: incidents, isLoading } = useQuery({
    queryKey: ['/api/incidents/recent'],
  });

  const pendingIncidents = incidents?.filter(
    (incident: Incident) => incident.status === 'pending'
  ).length || 0;

  return (
    <div className="bg-dark-light rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-dark-lighter flex justify-between items-center">
        <h3 className="font-heading font-semibold text-white">Incidents récents</h3>
        <div className="flex items-center">
          {pendingIncidents > 0 && (
            <span className="text-xs text-danger mr-2">
              {pendingIncidents} non traité{pendingIncidents > 1 ? 's' : ''}
            </span>
          )}
          <button className="text-gray-400 hover:text-white">
            <MoreIcon />
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-dark-lighter overflow-y-auto" style={{ maxHeight: "380px" }}>
        {isLoading ? (
          <div className="p-4 text-center text-gray-400">
            Chargement des incidents...
          </div>
        ) : incidents && incidents.length > 0 ? (
          incidents.map((incident: Incident) => (
            <div key={incident.id} className="p-4 hover:bg-dark-lighter transition-colors cursor-pointer">
              <div className="flex items-start">
                <div className={`bg-${incident.severity.toLowerCase()}/20 rounded-full p-1.5 mr-3`}>
                  {getIncidentTypeIcon(incident.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white">Détection de {incident.type}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{incident.location}</p>
                    </div>
                    <span className={`${getSeverityClass(incident.severity)} text-white text-xs rounded-full px-2 py-0.5`}>
                      {incident.severity}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {formatTimestamp(incident.timestamp)}
                    </span>
                    <div className="flex items-center">
                      {incident.status === 'resolved' && (
                        <span className="text-xs text-success mr-2">Résolu</span>
                      )}
                      <button className="text-xs bg-primary px-2 py-1 rounded text-white">
                        Voir détails
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-400">
            Aucun incident récent
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-dark-lighter">
        <button className="w-full bg-dark-lighter text-gray-300 hover:text-white py-2 rounded-md flex items-center justify-center">
          <span>Voir tous les incidents</span>
          <ArrowRightIcon className="ml-2" />
        </button>
      </div>
    </div>
  );
}
