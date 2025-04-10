import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Camera } from '@/lib/types';

// Correction pour l'icône par défaut de Leaflet qui ne s'affiche pas correctement
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapComponentProps {
  cameras: Camera[];
  center?: LatLngExpression;
  zoom?: number;
  height?: string;
  onMarkerClick?: (camera: Camera) => void;
  onMapClick?: (e: { latlng: { lat: number; lng: number } }) => void;
  selectedCamera?: Camera | null;
}

// Composant pour mettre à jour la vue de la carte
function MapView({ center, zoom }: { center: LatLngExpression, zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

// Composant pour gérer les événements de la carte
function MapEvents({ onClick }: { onClick?: (e: { latlng: { lat: number; lng: number } }) => void }) {
  useMapEvents({
    click: (e) => {
      if (onClick) onClick(e);
    },
  });
  
  return null;
}

export default function MapComponent({
  cameras,
  center = [48.8566, 2.3522], // Paris par défaut
  zoom = 13,
  height = '400px',
  onMarkerClick,
  onMapClick,
  selectedCamera
}: MapComponentProps) {
  
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height, width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapView center={center} zoom={zoom} />
      {onMapClick && <MapEvents onClick={onMapClick} />}
      
      {cameras.map((camera) => {
        if (!camera.location) return null;
        
        const position: LatLngExpression = camera.location
          .split(',')
          .map(coord => parseFloat(coord)) as [number, number];
        
        const isSelected = selectedCamera && selectedCamera.id === camera.id;
        
        return (
          <Marker
            key={camera.id}
            position={position}
            icon={defaultIcon}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) onMarkerClick(camera);
              }
            }}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{camera.name}</h3>
                <p className="text-sm text-gray-600">Statut: {camera.status}</p>
                {isSelected && (
                  <button className="mt-2 bg-primary text-white px-2 py-1 rounded text-xs">
                    Voir le flux
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}