import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/MapView.css';

// Fix for default marker icons in Leaflet with React
// This ensures marker icons display correctly in React/Leaflet projects
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom AUV marker icon (blue)
// Used to visually distinguish AUVs on the map
const auvIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],      // Size of the icon
  iconAnchor: [12, 41],    // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34],   // Point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41]     // Size of the shadow
});

// Mock AUV data array
// Each AUV has an id, name, position (lat/lng), depth, status, and battery level
const mockAUVs = [
  { id: 'AUV-001', name: 'Explorer-1', position: [-14.652, -125.423], depth: 3240, status: 'active', batteryLevel: 78 },
  { id: 'AUV-002', name: 'Surveyor-1', position: [-14.658, -125.427], depth: 3180, status: 'active', batteryLevel: 65 },
  { id: 'AUV-003', name: 'Collector-1', position: [-14.662, -125.419], depth: 3210, status: 'warning', batteryLevel: 32 }
];

// Mock sediment plume data array
// Each plume has an id, center (lat/lng), radius (meters), and intensity (0-1)
const mockPlumes = [
  { id: 'plume-001', center: [-14.657, -125.425], radius: 500, intensity: 0.7 }
];

// Main MapView component
function MapView() {
  // State for AUVs and plumes (could be dynamic in a real app)
  const [auvs] = useState(mockAUVs);
  const [plumes] = useState(mockPlumes);

  return (
    <div className="map-view">
      {/* MapContainer sets up the interactive map */}
      <MapContainer
        center={[-14.657, -125.425]} // Initial center of the map (CCZ region)
        zoom={12}                    // Initial zoom level
        style={{ height: '70vh', width: '100%' }} // Ensures map is visible
      >
        {/* Base map tiles from OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render a marker for each AUV */}
        {auvs.map(auv => (
          <Marker
            key={auv.id}
            position={auv.position}
            icon={auvIcon}
          >
            {/* Popup shows AUV details when marker is clicked */}
            <Popup>
              <div>
                <strong>{auv.name}</strong><br />
                Depth: {auv.depth} m<br />
                Status: {auv.status}<br />
                Battery: {auv.batteryLevel}%
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render a circle marker for each sediment plume */}
        {plumes.map(plume => (
          <CircleMarker
            key={plume.id}
            center={plume.center}
            radius={plume.radius / 50} // Scale radius for map display
            pathOptions={{
              fillColor: '#00b4d8',
              fillOpacity: 0.3 * plume.intensity,
              color: '#007ea7',
              weight: 1
            }}
          >
            {/* Popup shows sediment plume details */}
            <Popup>
              <div>
                <strong>Sediment Plume</strong><br />
                Intensity: {(plume.intensity * 100).toFixed(1)}%<br />
                Radius: {plume.radius} m
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
