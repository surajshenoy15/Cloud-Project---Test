import { Link } from "react-router-dom";

function StationCard({ station }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold">{station.name}</h2>
      <p className="text-gray-600">{station.location}</p>
      <Link to={`/booking/${station.id}`} className="text-blue-500 underline">
        {station.available ? "Book Now" : "Full"}
      </Link>
    </div>
  );
}

export default StationCard;
