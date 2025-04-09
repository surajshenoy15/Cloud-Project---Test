import React from 'react';
import { FaMedal, FaGift, FaHistory } from 'react-icons/fa';

const Rewards = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Rewards Program</h1>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl">
            <span className="font-bold">100</span> Points Available
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Rewards cards will be added here */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center text-gray-500">No rewards available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;