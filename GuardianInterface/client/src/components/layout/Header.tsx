import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { 
  MenuIcon, SearchIcon, NotificationAlertIcon, 
  QuestionIcon, SettingsIcon 
} from "@/lib/icons";

export default function Header() {
  const [location] = useLocation();
  const [title, setTitle] = useState("Tableau de bord");
  
  // Update title based on current path
  useEffect(() => {
    switch(location) {
      case "/":
        setTitle("Tableau de bord");
        break;
      case "/cameras":
        setTitle("Caméras");
        break;
      case "/incidents":
        setTitle("Incidents");
        break;
      case "/emergency-services":
        setTitle("Services de secours");
        break;
      case "/notifications":
        setTitle("Notifications");
        break;
      case "/configuration":
        setTitle("Configuration");
        break;
      case "/history":
        setTitle("Historique");
        break;
      case "/ai-module":
        setTitle("Module IA");
        break;
      default:
        setTitle("Guardian AI");
    }
  }, [location]);

  return (
    <header className="bg-dark-light shadow-md py-3 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button className="text-gray-300 md:hidden mr-4">
          <MenuIcon className="text-xl" />
        </button>
        <h2 className="font-heading font-medium text-lg text-white">{title}</h2>
      </div>
      
      <div className="flex items-center">
        {/* Search */}
        <div className="relative mr-4 hidden sm:block">
          <Input 
            type="text" 
            placeholder="Rechercher..." 
            className="bg-dark-lighter text-gray-300 pl-10 pr-4 py-2 rounded-md text-sm border border-gray-700 focus:outline-none focus:border-primary-light w-48"
          />
          <SearchIcon className="absolute left-3 top-2.5 text-gray-500" />
        </div>
        
        {/* Alert Button */}
        <button className="relative mr-3 p-2 text-gray-300 hover:text-white rounded-full hover:bg-dark-lighter">
          <NotificationAlertIcon className="text-xl" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-danger rounded-full text-white text-xs flex items-center justify-center">3</span>
        </button>
        
        {/* Help Button */}
        <button className="mr-3 p-2 text-gray-300 hover:text-white rounded-full hover:bg-dark-lighter">
          <QuestionIcon className="text-xl" />
        </button>
        
        {/* Settings Button */}
        <button className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-dark-lighter">
          <SettingsIcon className="text-xl" />
        </button>
      </div>
    </header>
  );
}
