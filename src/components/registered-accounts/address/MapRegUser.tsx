import React, { useState, useRef, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface IProps {
  disabled: boolean;
  lat?: number;
  lng?: number;
  setMyPosition?: React.Dispatch<React.SetStateAction<string| null>>;
}

const MapComponent: React.FC<IProps> = ({
  lat,
  lng,
  disabled,
  setMyPosition,
}) => {
  const initialPosition = useMemo(
    () => L.latLng(lat || 35.6892, lng || 51.389),
    [lat, lng]
  );
  const [position, setPosition] = useState<L.LatLng | null>(initialPosition);
  const mapRef = useRef<L.Map | null>(null);
  useEffect(() => {
    setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 0);
  }, [mapRef]);
  const LocationMarker: React.FC = () => {
    useMapEvents({
      click(e) {
        const ltlng = e.latlng;
        if (!disabled) {
          setPosition(ltlng);
          setMyPosition?.(`${ltlng.lat},${ltlng.lng}`);
        }
      },
    });

    return position === null ? null : <Marker position={position} />;
  };

  return (
    <div className="z-0 flex items-center justify-center w-full h-full">
      <MapContainer
        center={initialPosition}
        zoom={13}
        className="w-full h-full rounded-md shadow-sm"
        attributionControl={false}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
