import React, { useState } from 'react';

const BookingForm = ({ station }) => {
  const [booking, setBooking] = useState({
    date: '',
    time: '',
    duration: 30
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking logic
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Book Charging Slot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setBooking({ ...booking, date: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Time</label>
          <input
            type="time"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setBooking({ ...booking, time: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Duration (minutes)</label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setBooking({ ...booking, duration: parseInt(e.target.value) })}
          >
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;