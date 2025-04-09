import React from 'react';
import { FaBolt, FaUsers, FaCar, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <FaBolt className="text-3xl text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Total Stations</h3>
              <p className="text-2xl font-bold">124</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <FaUsers className="text-3xl text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Active Users</h3>
              <p className="text-2xl font-bold">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <FaCar className="text-3xl text-purple-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Today's Bookings</h3>
              <p className="text-2xl font-bold">89</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <FaChartLine className="text-3xl text-yellow-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Revenue</h3>
              <p className="text-2xl font-bold">$12,345</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add more dashboard sections as needed */}
    </div>
  );
};

export default Dashboard;