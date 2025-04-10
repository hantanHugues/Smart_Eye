import { useState } from "react";
import { 
  RefreshIcon, ToggleLeftIcon, ToggleRightIcon,
  CheckboxIcon, MailIcon, PhoneIcon, MessageCircleIcon
} from "@/lib/icons";

export default function Notifications() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [telegramEnabled, setTelegramEnabled] = useState(false);
  
  const [criticalNotifs, setCriticalNotifs] = useState(true);
  const [urgentNotifs, setUrgentNotifs] = useState(true);
  const [moderateNotifs, setModerateNotifs] = useState(false);
  
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [desktopNotifs, setDesktopNotifs] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-white">Configuration des notifications</h1>
        <button className="bg-primary text-white px-3 py-2 rounded-md text-sm flex items-center hover:bg-primary-light transition-colors">
          <CheckboxIcon className="mr-2" />
          <span>Enregistrer les modifications</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Channels */}
        <div className="bg-dark-light rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-dark-lighter flex justify-between items-center">
            <h3 className="font-heading font-semibold text-white">Canaux de notification</h3>
            <button className="text-gray-400 hover:text-white">
              <RefreshIcon />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center p-3 bg-dark-darker rounded">
              <div className="flex items-center">
                <div className="bg-primary/20 p-2 rounded-full mr-3">
                  <MailIcon className="text-primary-light" />
                </div>
                <div>
                  <p className="text-white">Email</p>
                  <p className="text-xs text-gray-400">Envoi d'alertes par email</p>
                </div>
              </div>
              <button 
                className="text-2xl" 
                onClick={() => setEmailEnabled(!emailEnabled)}
              >
                {emailEnabled ? (
                  <ToggleRightIcon className="text-success" />
                ) : (
                  <ToggleLeftIcon className="text-gray-500" />
                )}
              </button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-dark-darker rounded">
              <div className="flex items-center">
                <div className="bg-success/20 p-2 rounded-full mr-3">
                  <i className="ri-whatsapp-line text-success"></i>
                </div>
                <div>
                  <p className="text-white">WhatsApp</p>
                  <p className="text-xs text-gray-400">Alertes via WhatsApp Business API</p>
                </div>
              </div>
              <button 
                className="text-2xl" 
                onClick={() => setWhatsappEnabled(!whatsappEnabled)}
              >
                {whatsappEnabled ? (
                  <ToggleRightIcon className="text-success" />
                ) : (
                  <ToggleLeftIcon className="text-gray-500" />
                )}
              </button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-dark-darker rounded">
              <div className="flex items-center">
                <div className="bg-info/20 p-2 rounded-full mr-3">
                  <i className="ri-telegram-line text-info"></i>
                </div>
                <div>
                  <p className="text-white">Telegram</p>
                  <p className="text-xs text-gray-400">Alertes via Bot Telegram</p>
                </div>
              </div>
              <button 
                className="text-2xl" 
                onClick={() => setTelegramEnabled(!telegramEnabled)}
              >
                {telegramEnabled ? (
                  <ToggleRightIcon className="text-success" />
                ) : (
                  <ToggleLeftIcon className="text-gray-500" />
                )}
              </button>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-dark-darker rounded">
              <div className="flex items-center">
                <div className="bg-warning/20 p-2 rounded-full mr-3">
                  <MessageCircleIcon className="text-warning" />
                </div>
                <div>
                  <p className="text-white">SMS</p>
                  <p className="text-xs text-gray-400">Alertes par message texte</p>
                </div>
              </div>
              <button 
                className="text-2xl" 
                onClick={() => setSmsEnabled(!smsEnabled)}
              >
                {smsEnabled ? (
                  <ToggleRightIcon className="text-success" />
                ) : (
                  <ToggleLeftIcon className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Notification Settings */}
        <div className="bg-dark-light rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-dark-lighter">
            <h3 className="font-heading font-semibold text-white">Paramètres de notification</h3>
          </div>
          
          <div className="p-6">
            <h4 className="text-white font-medium mb-3">Niveaux d'incidents</h4>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-3 bg-dark-darker rounded">
                <div className="flex items-center">
                  <div className="bg-danger/20 p-2 rounded-full mr-3">
                    <AlertTriangleIcon className="text-danger" />
                  </div>
                  <p className="text-white">Incidents critiques</p>
                </div>
                <button 
                  className="text-2xl" 
                  onClick={() => setCriticalNotifs(!criticalNotifs)}
                >
                  {criticalNotifs ? (
                    <ToggleRightIcon className="text-success" />
                  ) : (
                    <ToggleLeftIcon className="text-gray-500" />
                  )}
                </button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-dark-darker rounded">
                <div className="flex items-center">
                  <div className="bg-warning/20 p-2 rounded-full mr-3">
                    <AlertTriangleIcon className="text-warning" />
                  </div>
                  <p className="text-white">Incidents urgents</p>
                </div>
                <button 
                  className="text-2xl" 
                  onClick={() => setUrgentNotifs(!urgentNotifs)}
                >
                  {urgentNotifs ? (
                    <ToggleRightIcon className="text-success" />
                  ) : (
                    <ToggleLeftIcon className="text-gray-500" />
                  )}
                </button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-dark-darker rounded">
                <div className="flex items-center">
                  <div className="bg-info/20 p-2 rounded-full mr-3">
                    <AlertTriangleIcon className="text-info" />
                  </div>
                  <p className="text-white">Incidents modérés</p>
                </div>
                <button 
                  className="text-2xl" 
                  onClick={() => setModerateNotifs(!moderateNotifs)}
                >
                  {moderateNotifs ? (
                    <ToggleRightIcon className="text-success" />
                  ) : (
                    <ToggleLeftIcon className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            
            <h4 className="text-white font-medium mb-3">Options supplémentaires</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-dark-darker rounded">
                <div className="flex items-center">
                  <div className="bg-primary/20 p-2 rounded-full mr-3">
                    <i className="ri-volume-up-line text-primary-light"></i>
                  </div>
                  <p className="text-white">Alertes sonores</p>
                </div>
                <button 
                  className="text-2xl" 
                  onClick={() => setSoundAlerts(!soundAlerts)}
                >
                  {soundAlerts ? (
                    <ToggleRightIcon className="text-success" />
                  ) : (
                    <ToggleLeftIcon className="text-gray-500" />
                  )}
                </button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-dark-darker rounded">
                <div className="flex items-center">
                  <div className="bg-secondary/20 p-2 rounded-full mr-3">
                    <i className="ri-computer-line text-secondary"></i>
                  </div>
                  <p className="text-white">Notifications bureau</p>
                </div>
                <button 
                  className="text-2xl" 
                  onClick={() => setDesktopNotifs(!desktopNotifs)}
                >
                  {desktopNotifs ? (
                    <ToggleRightIcon className="text-success" />
                  ) : (
                    <ToggleLeftIcon className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom import for the icons
import { AlertTriangleIcon } from "@/lib/icons";
