import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCheckCircle, FaClock, FaMapMarkerAlt, FaBolt } from 'react-icons/fa';

const BookingConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    id: Math.random().toString(36).substr(2, 9).toUpperCase(),
    station: {
      name: 'Tata Power - Indiranagar Metro',
      operator: 'Tata Power',
      location: 'Indiranagar, Bangalore'
    },
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    duration: '60 minutes',
    amount: '₹720.00',
    status: 'Confirmed'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="container mx-auto max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-6xl text-green-500" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Your booking has been confirmed</p>

          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">Booking ID: {booking.id}</p>
          </div>

          <div className="space-y-4 text-left border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold">{booking.station.name}</h3>
                <p className="text-gray-600 text-sm">{booking.station.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaClock className="text-blue-500" />
              <div>
                <p className="font-semibold">{booking.date}</p>
                <p className="text-gray-600 text-sm">{booking.time} ({booking.duration})</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaBolt className="text-yellow-500" />
              <div>
                <p className="font-semibold">Amount Paid</p>
                <p className="text-gray-600 text-sm">{booking.amount}</p>
              </div>
            </div>
          </div>

          <div className="space-x-4">
            <button
              onClick={() => navigate('/bookings')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                transition-colors"
            >
              View Bookings
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 
                transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
