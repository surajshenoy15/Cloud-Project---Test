import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const evChargerIcon = new L.Icon({
  iconUrl: "/ev-charger.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const StationDetails = () => {
  const { id: stationId } = useParams();
  const navigate = useNavigate();

  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (!stationId) {
      toast.error("Invalid station ID.");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/stations/${stationId}/`)
      .then((res) => res.json())
      .then((data) => {
        setStation(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load station details.");
        setLoading(false);
      });
  }, [stationId]);

  const reserveSlot = async () => {
    if (!selectedSlot || !startTime || !endTime) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (new Date(startTime) >= new Date(endTime)) {
      toast.error("Start time must be before end time.");
      return;
    }
    if (!station || station.available_slots <= 0) {
      toast.error("No slots available.");
      return;
    }
    if (booking) return;

    setBooking(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to book a slot.");
      setBooking(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/stations/${station.id}/book/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          station: station.id,
          slot_number: parseInt(selectedSlot, 10),
          start_time: startTime,
          end_time: endTime,
          status: "booked",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Booking failed.");
      }

      toast.success("Slot reserved successfully!");
      navigate("/confirmation", { state: { selectedSlot, startTime, endTime, stationName: station.name } });
      setStation((prev) => ({ ...prev, available_slots: prev.available_slots - 1 }));
      setSelectedSlot("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      toast.error(error.message);
    }

    setBooking(false);
  };

  if (loading) return <p className="text-center text-gray-600">Loading station details...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl w-full text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800">{station.name}</h1>
        <p className="text-gray-600 mt-2">{station.address || "Address not available"}</p>
        <p className="text-lg">⚡ Charging Speed: {station.charging_speed || "N/A"} kW</p>
        <p className="text-lg">🔋 Available Slots: {station.available_slots}</p>
        <p className="text-lg">💰 Price: ₹{station.price_per_kwh || "N/A"} per kWh</p>

        <div className="mt-4">
          <label className="block text-gray-700">Select Slot:</label>
          <select className="w-full p-2 mt-1 border rounded" value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
            <option value="">Choose a slot</option>
            {[...Array(station.total_slots)].map((_, i) => (
              <option key={i + 1} value={i + 1} disabled={i + 1 > station.available_slots}>
                Slot {i + 1} {i + 1 > station.available_slots ? "(Unavailable)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Start Time:</label>
          <input type="datetime-local" className="w-full p-2 mt-1 border rounded" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">End Time:</label>
          <input type="datetime-local" className="w-full p-2 mt-1 border rounded" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>

        <motion.button
          onClick={reserveSlot}
          whileHover={{ scale: 1.05 }}
          className={`mt-4 px-6 py-3 rounded-lg shadow-md text-white cursor-pointer ${booking ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
          disabled={booking}
        >
          {booking ? "Booking..." : "Reserve Slot 🔒"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StationDetails;
