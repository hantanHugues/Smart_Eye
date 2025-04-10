import { useState } from "react";
import { 
  RefreshIcon, CalendarIcon, FilterIcon, 
  FileDownloadIcon, SearchIcon
} from "@/lib/icons";

export default function History() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data - would come from API in real implementation
  const historyData = [
    { id: 1, type: "Incendie", location: "Place Principale", date: "2023-05-15 14:32", status: "Résolu", response: "Rapide" },
    { id: 2, type: "Bagarre", location: "Entrée Est", date: "2023-05-14 22:17", status: "Résolu", response: "Normal" },
    { id: 3, type: "Accident", location: "Parking Nord", date: "2023-05-13 16:45", status: "Résolu", response: "Rapide" },
    { id: 4, type: "Intrusion", location: "Zone Sécurisée", date: "2023-05-12 03:22", status: "Résolu", response: "Lent" },
    { id: 5, type: "Incendie", location: "Bâtiment B", date: "2023-05-10 09:58", status: "Résolu", response: "Rapide" },
    { id: 6, type: "Chute", location: "Escalier Central", date: "2023-05-08 13:05", status: "Résolu", response: "Normal" },
    { id: 7, type: "Bagarre", location: "Place Centrale", date: "2023-05-07 23:47", status: "Résolu", response: "Rapide" },
    { id: 8, type: "Intrusion", location: "Local Technique", date: "2023-05-05 04:33", status: "Résolu", response: "Normal" },
  ];
  
  // Filter data based on search term and dates
  const filteredData = historyData.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const itemDate = new Date(item.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    const isAfterStart = start ? itemDate >= start : true;
    const isBeforeEnd = end ? itemDate <= end : true;
    
    return matchesSearch && isAfterStart && isBeforeEnd;
  });
  
  // Get the appropriate color for response time
  const getResponseColor = (response: string) => {
    switch (response) {
      case "Rapide":
        return "text-success";
      case "Normal":
        return "text-info";
      case "Lent":
        return "text-warning";
      default:
        return "text-gray-400";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-white">Historique des incidents</h1>
        <div className="flex space-x-2">
          <button className="bg-dark-light px-3 py-2 rounded-md text-sm flex items-center hover:bg-dark-lighter transition-colors">
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
        <div className="p-4 border-b border-dark-lighter">
          <h3 className="font-heading font-semibold text-white">Incidents résolus</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-dark-darker text-gray-400 text-xs uppercase">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Emplacement</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-center">Statut</th>
                <th className="py-3 px-4 text-center">Temps de réponse</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="border-b border-dark-darker hover:bg-dark-lighter transition-colors">
                    <td className="py-3 px-4 text-white">{item.id}</td>
                    <td className="py-3 px-4 text-white">{item.type}</td>
                    <td className="py-3 px-4 text-gray-300">{item.location}</td>
                    <td className="py-3 px-4 text-gray-300">{item.date}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="bg-success/20 text-success px-2 py-0.5 rounded-full text-xs">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`${getResponseColor(item.response)}`}>
                        {item.response}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <button className="bg-primary-light hover:bg-primary text-white px-2 py-1 rounded text-xs">
                          Détails
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-400">
                    Aucun résultat ne correspond à vos critères de recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-dark-lighter flex justify-between items-center">
          <p className="text-sm text-gray-400">Affichage de {filteredData.length} incidents</p>
          <div className="flex space-x-1">
            <button className="bg-dark-darker text-gray-300 hover:text-white px-3 py-1 rounded text-sm">
              Précédent
            </button>
            <button className="bg-primary text-white px-3 py-1 rounded text-sm">
              1
            </button>
            <button className="bg-dark-darker text-gray-300 hover:text-white px-3 py-1 rounded text-sm">
              2
            </button>
            <button className="bg-dark-darker text-gray-300 hover:text-white px-3 py-1 rounded text-sm">
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
