import React from 'react';
import { FaStar, FaBolt, FaClock, FaWallet } from 'react-icons/fa';

const StationDetails = ({ station }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-48">
        <img 
          src={station.image || '/default-station.jpg'} 
          alt={station.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-black/50 text-white rounded-full text-sm">
            {station.availability ? 'Available' : 'Occupied'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{station.name}</h2>
            <p className="text-gray-600">{station.address}</p>
          </div>
          <div className="flex items-center">
            <FaStar className="text-yellow-400" />
            <span className="ml-1 font-semibold">{station.rating}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-2">
            <FaBolt className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Charger Type</p>
              <p className="font-semibold">{station.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Available Hours</p>
              <p className="font-semibold">24/7</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaWallet className="text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Price</p>
              <p className="font-semibold">${station.price}/kWh</p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Book Now
          </button>
          <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default StationDetails;