import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import evIcon from "/ev-charger.png"; // Ensure this exists in `src/assets/`

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// Custom EV charger icon
const evChargerIcon = new L.Icon({
  iconUrl: evIcon,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const LeafletMap = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch EV stations from Django API
  useEffect(() => {
    fetch(`${API_URL}/stations/`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load station data.");
        return response.json();
      })
      .then((data) => {
        setStations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading EV stations...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="relative">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px", width: "100%", borderRadius: "12px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {stations.map((station) => (
          <Marker key={station.id} position={[station.latitude, station.longitude]} icon={evChargerIcon}>
            <Popup>
              <strong>{station.name}</strong> <br />
              Available Slots: {station.available_slots} <br />
              <Link to={`/stations/${station.id}`} className="text-blue-500 underline">
                View Details →
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
