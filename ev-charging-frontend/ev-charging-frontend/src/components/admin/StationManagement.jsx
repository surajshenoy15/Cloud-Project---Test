import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const StationManagement = () => {
  const [stations, setStations] = useState([]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Station Management</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
          <FaPlus /> Add Station
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stations.map(station => (
              <tr key={station.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{station.name}</td>
                <td className="px-6 py-4">{station.location}</td>
                <td className="px-6 py-4">{station.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    station.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {station.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                    <button className="text-red-600 hover:text-red-800"><FaTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StationManagement;