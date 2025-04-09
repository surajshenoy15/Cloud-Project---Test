import React, { useState, useEffect } from 'react';
import { FaClock, FaBolt, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBookings(response.data);
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchBookings();
    } catch (err) {
      alert('Failed to cancel booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

        <div className="grid gap-6">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-xl">{booking.station.name}</h3>
                  <p className="text-gray-600">{booking.station.operator}</p>
                </div>
                <div className={`px-4 py-2 rounded-lg ${
                  new Date(booking.date) > new Date() 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {new Date(booking.date) > new Date() ? 'Upcoming' : 'Completed'}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>{booking.station.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-blue-500" />
                  <span>
                    {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    {' '}({booking.duration} minutes)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBolt className="text-yellow-500" />
                  <span>{booking.station.maxPower} ({booking.station.type.toUpperCase()})</span>
                </div>
              </div>

              {new Date(booking.date) > new Date() && (
                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg 
                    hover:bg-red-700 transition-colors"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}

          {bookings.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No bookings found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;