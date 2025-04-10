import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  RefreshIcon, FullscreenIcon, SettingsIcon, 
  PlusCircleIcon, EyeIcon
} from "@/lib/icons";
import { Camera } from "@/lib/types";

export default function CameraOverview() {
  const { data: cameras, isLoading } = useQuery({
    queryKey: ['/api/cameras'],
  });

  // Custom camera component for reusing in the grid
  const CameraCard = ({ camera }: { camera: Camera }) => (
    <div className="relative rounded-lg overflow-hidden bg-dark group">
      <div className="relative h-40 bg-dark-darker">
        {camera.streamUrl && (
          <div className="w-full h-full bg-dark-darker flex items-center justify-center">
            {/* This would be replaced with actual video stream in production */}
            <p className="text-gray-400">Flux vidéo</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
        <div className="absolute top-2 right-2 flex items-center">
          <span className={`animate-pulse ${camera.status === 'active' ? 'bg-success' : 'bg-danger'} rounded-full h-2 w-2 mr-1`}></span>
          <span className="text-xs text-white bg-dark bg-opacity-70 px-1.5 py-0.5 rounded">LIVE</span>
        </div>
        <div className="absolute bottom-2 left-2">
          <p className="text-xs text-white bg-dark bg-opacity-70 px-1.5 py-0.5 rounded">{camera.name}</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-primary bg-opacity-30 hidden group-hover:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-dark-light p-2 rounded-full text-white mr-2">
          <FullscreenIcon />
        </button>
        <button className="bg-dark-light p-2 rounded-full text-white">
          <SettingsIcon />
        </button>
      </div>
    </div>
  );

  return (
    <div className="xl:col-span-2 bg-dark-light rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-dark-lighter flex justify-between items-center">
        <h3 className="font-heading font-semibold text-white">Aperçu des caméras</h3>
        <div className="flex space-x-2">
          <button className="p-1.5 bg-dark-lighter rounded text-gray-300 hover:text-white">
            <RefreshIcon />
          </button>
          <button className="p-1.5 bg-dark-lighter rounded text-gray-300 hover:text-white">
            <FullscreenIcon />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-400">Chargement des caméras...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Display camera feeds */}
            {cameras && cameras.slice(0, 3).map((camera: Camera) => (
              <CameraCard key={camera.id} camera={camera} />
            ))}
            
            {/* See more cameras button */}
            <div className="flex items-center justify-center bg-dark-lighter rounded-lg h-40">
              <button className="text-primary-light hover:text-primary flex flex-col items-center">
                <PlusCircleIcon className="text-4xl mb-2" />
                <span className="text-sm">Voir toutes les caméras</span>
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="px-4 pb-4 flex justify-center">
        <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center shadow-lg hover:bg-primary-light transition-colors">
          <EyeIcon className="mr-2" />
          <span>Voir toutes les caméras</span>
        </button>
      </div>
    </div>
  );
}
