import { useState } from "react";
import { AlertTriangleIcon, XIcon } from "@/lib/icons";

interface AlertBannerProps {
  count: number;
  onClose?: () => void;
  onClick?: () => void;
}

export default function AlertBanner({ count, onClose, onClick }: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible || count === 0) return null;

  return (
    <div 
      className="bg-danger/20 border border-danger rounded-lg mb-6 p-4 flex items-start fade-in cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-danger/20 rounded-full p-2 mr-3">
        <AlertTriangleIcon className="text-xl text-danger" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-white">
            Alerte: {count} incident{count > 1 ? 's' : ''} critique{count > 1 ? 's' : ''} détecté{count > 1 ? 's' : ''}
          </h3>
          <span className="text-xs bg-danger px-2 py-1 rounded-full text-white">URGENT</span>
        </div>
        <p className="mt-1 text-sm">
          Plusieurs incidents nécessitent votre attention immédiate. Cliquez pour voir les détails.
        </p>
      </div>
      <button 
        className="ml-4 text-gray-300 hover:text-white"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        <XIcon className="text-xl" />
      </button>
    </div>
  );
}
