
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  RefreshIcon, CalendarIcon, FilterIcon, 
  FileDownloadIcon, SearchIcon, EyeIcon
} from "@/lib/icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Incident {
  _id: string;
  timestamp: string;
  incident_type: string;
  location: string;
  image_name: string;
  image_data: string;
  message: string;
}

export default function History() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  
  const { data: incidents = [], isLoading, refetch } = useQuery<Incident[]>({
    queryKey: ['/api/incidents'],
  });
  
  // Filter data based on search term and dates
  const filteredData = incidents.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.incident_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const itemDate = new Date(item.timestamp);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    const isAfterStart = start ? itemDate >= start : true;
    const isBeforeEnd = end ? itemDate <= end : true;
    
    return matchesSearch && isAfterStart && isBeforeEnd;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-white">Historique des incidents</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => refetch()}
            className="bg-dark-light px-3 py-2 rounded-md text-sm flex items-center hover:bg-dark-lighter transition-colors"
          >
            <RefreshIcon className="mr-2" />
            <span>Actualiser</span>
          </button>
          <button className="bg-primary text-white px-3 py-2 rounded-md text-sm flex items-center hover:bg-primary-light transition-colors">
            <FileDownloadIcon className="mr-2" />
            <span>Exporter</span>
          </button>
        </div>
      </div>
      
      {/* Filter Controls */}
      <div className="bg-dark-light rounded-lg shadow-lg p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-auto flex items-center">
            <FilterIcon className="text-gray-400 mr-2" />
            <span className="text-white mr-2">Filtres:</span>
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="text-gray-400" />
              </div>
              <input
                type="date"
                className="bg-dark-darker text-white pl-10 pr-3 py-2 rounded-md w-full border border-gray-700"
                placeholder="Date début"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="text-gray-400" />
              </div>
              <input
                type="date"
                className="bg-dark-darker text-white pl-10 pr-3 py-2 rounded-md w-full border border-gray-700"
                placeholder="Date fin"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-dark-darker text-white pl-10 pr-3 py-2 rounded-md w-full border border-gray-700"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* History Table */}
      <div className="bg-dark-light rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-dark-darker text-gray-400 text-xs uppercase">
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Date et heure</th>
                <th className="py-3 px-4 text-left">Localisation</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">
                    Chargement des incidents...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((incident) => (
                  <tr key={incident._id} className="border-b border-dark-darker hover:bg-dark-lighter transition-colors">
                    <td className="py-3 px-4 text-white">{incident.incident_type}</td>
                    <td className="py-3 px-4 text-gray-300">
                      {format(new Date(incident.timestamp), "dd/MM/yyyy HH:mm", { locale: fr })}
                    </td>
                    <td className="py-3 px-4 text-gray-300">{incident.location}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <button 
                          onClick={() => setSelectedIncident(incident)}
                          className="bg-primary/20 hover:bg-primary/30 text-primary px-2 py-1 rounded flex items-center"
                        >
                          <EyeIcon className="w-4 h-4 mr-1" />
                          Détails
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">
                    Aucun incident trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Details Dialog */}
      <Dialog open={!!selectedIncident} onOpenChange={() => setSelectedIncident(null)}>
        <DialogContent className="bg-dark-light text-white border-dark-lighter">
          <DialogHeader>
            <DialogTitle>Détails de l'incident</DialogTitle>
          </DialogHeader>
          
          {selectedIncident && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Type</p>
                  <p className="font-medium">{selectedIncident.incident_type}</p>
                </div>
                <div>
                  <p className="text-gray-400">Date et heure</p>
                  <p className="font-medium">
                    {format(new Date(selectedIncident.timestamp), "dd/MM/yyyy HH:mm", { locale: fr })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Localisation</p>
                  <p className="font-medium">{selectedIncident.location}</p>
                </div>
              </div>
              
              <div>
                <p className="text-gray-400 mb-2">Message</p>
                <p className="bg-dark-darker p-3 rounded-md">{selectedIncident.message}</p>
              </div>
              
              {selectedIncident.image_data && (
                <div>
                  <p className="text-gray-400 mb-2">Image</p>
                  <img 
                    src={`data:image/jpeg;base64,${selectedIncident.image_data}`}
                    alt="Incident"
                    className="w-full h-auto rounded-md"
                  />
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
