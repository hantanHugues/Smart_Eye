import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  ShieldIcon, DashboardIcon, CctvIcon, AlertTriangleIcon, 
  ContactsIcon, NotificationIcon, SettingsIcon, 
  HistoryIcon, BrainIcon, LogoutIcon
} from "@/lib/icons";

export default function Sidebar() {
  const [location] = useLocation();
  
  const menuItems = [
    { name: "Tableau de bord", icon: <DashboardIcon />, path: "/", count: 0 },
    { name: "Caméras", icon: <CctvIcon />, path: "/cameras", count: 0 },
    { name: "Incidents", icon: <AlertTriangleIcon />, path: "/incidents", count: 3 },
    { name: "Services de secours", icon: <ContactsIcon />, path: "/emergency-services", count: 0 },
    { name: "Notifications", icon: <NotificationIcon />, path: "/notifications", count: 0 },
    { name: "Configuration", icon: <SettingsIcon />, path: "/configuration", count: 0 },
    { name: "Historique", icon: <HistoryIcon />, path: "/history", count: 0 },
    { name: "Module IA", icon: <BrainIcon />, path: "/ai-module", count: 0 },
  ];

  return (
    <div className="bg-dark-light w-64 flex-shrink-0 hidden md:flex flex-col shadow-lg z-10">
      {/* Logo and Title */}
      <div className="px-6 py-5 flex items-center border-b border-dark-lighter">
        <div className="bg-primary rounded-lg p-2 mr-3">
          <ShieldIcon className="text-white text-xl" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-white text-lg">Smart Eye</h1>
          <p className="text-xs text-gray-400">Système de surveillance</p>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto scrollbar-dark">
        <ul className="py-4">
          {menuItems.map((item) => (
            <li key={item.path} className="mb-1 px-2">
              <Link href={item.path}>
                <a className={cn(
                  "menu-item flex items-center px-4 py-3 rounded-md",
                  location === item.path 
                    ? "active text-white" 
                    : "text-gray-300"
                )}>
                  <span className={cn(
                    "mr-3 text-lg", 
                    location === item.path ? "text-secondary" : ""
                  )}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  {item.count > 0 && (
                    <span className="ml-auto bg-danger text-white text-xs px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* User Profile */}
      <div className="border-t border-dark-lighter p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
            <span className="text-white font-medium">AD</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin Système</p>
            <p className="text-xs text-gray-400">admin@guardian-ai.fr</p>
          </div>
          <button className="ml-auto text-gray-400 hover:text-white">
            <LogoutIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
