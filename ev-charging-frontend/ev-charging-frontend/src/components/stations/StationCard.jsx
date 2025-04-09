import React from 'react';
import { FaStar, FaRegStar, FaMapMarkerAlt } from 'react-icons/fa';

const StationCard = ({ station, onFavorite, onNavigate }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{station.name}</h3>
          <p className="text-gray-600">{station.operator}</p>
        </div>
        <button 
          onClick={() => onFavorite(station)}
          className="text-yellow-500 hover:scale-110 transition-transform"
        >
          {station.isFavorite ? <FaStar /> : <FaRegStar />}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`px-3 py-1 rounded-full text-sm ${
          station.availability 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {station.availability ? '● Available' : '● Occupied'}
        </span>
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
          {station.type}
        </span>
      </div>

      <div className="mt-4 flex justify-between items-end">
        <div>
          <div className="text-2xl font-bold">${station.price}/kWh</div>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">
                {i < station.rating ? '★' : '☆'}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => onNavigate(station)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FaMapMarkerAlt className="inline mr-2" />
          Navigate
        </button>
      </div>
    </div>
  );
};

export default StationCard;