import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Coordinates } from '../types';
import L from 'leaflet';
import { calculateDistance } from '../utils/scoring';

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapSelectorProps {
  onLocationSelect: (coords: Coordinates) => void;
  selectedLocation: Coordinates | null;
  correctLocation?: { lat: number; lng: number; name: string };
  disabled: boolean;
  resetMap?: boolean;
}

function LocationMarker({ 
  position, 
  onLocationSelect,
  correctPosition,
  distance
}: { 
  position: Coordinates | null;
  onLocationSelect: (coords: Coordinates) => void;
  correctPosition?: Coordinates;
  distance?: number;
}) {
  const map = useMapEvents({
    click(e) {
      if (!correctPosition) {
        onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });

  React.useEffect(() => {
    if (position && correctPosition) {
      const bounds = L.latLngBounds([position, correctPosition]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [correctPosition, position, map]);

  return (
    <>
      {position && (
        <Marker position={position}>
          <Popup>
            <div className="text-sm font-medium">Your guess</div>
          </Popup>
        </Marker>
      )}
      {correctPosition && (
        <Marker 
          position={correctPosition}
          icon={new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })}
        >
          <Popup>
            <div className="text-sm font-medium">Correct location</div>
          </Popup>
        </Marker>
      )}
      {position && correctPosition && distance !== undefined && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200">
          <span className="text-sm font-medium">
            {Math.round(distance)}km away
          </span>
        </div>
      )}
    </>
  );
}

export const MapSelector: React.FC<MapSelectorProps> = ({
  onLocationSelect,
  selectedLocation,
  correctLocation,
  disabled,
  resetMap
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const distance = selectedLocation && correctLocation 
    ? calculateDistance(selectedLocation, correctLocation)
    : undefined;

  React.useEffect(() => {
    if (resetMap && mapRef.current) {
      mapRef.current.setView([20, 0], 2);
    }
  }, [resetMap]);

  return (
    <div className="relative w-full h-48 sm:h-64 md:h-[400px] rounded-lg overflow-hidden">
      <div className={`w-full h-full ${disabled ? 'pointer-events-none opacity-50' : ''}`}>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker 
            position={selectedLocation} 
            onLocationSelect={onLocationSelect}
            correctPosition={correctLocation}
            distance={distance}
          />
        </MapContainer>
      </div>
    </div>
  );
};