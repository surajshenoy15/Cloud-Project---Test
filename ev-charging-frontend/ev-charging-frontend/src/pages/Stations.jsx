import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaClock, FaBolt, FaRupeeSign } from 'react-icons/fa';
import axios from 'axios';

const Stations = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    duration: 30,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/stations');
      setStations(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch stations');
      console.error('Error fetching stations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (station) => {
    if (!bookingDetails.date || !bookingDetails.time) {
      alert('Please select date and time for booking');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        stationId: station._id,
        date: bookingDetails.date,
        time: bookingDetails.time,
        duration: bookingDetails.duration
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data) {
        alert('Booking successful!');
        navigate('/bookings');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-xl">{error}</p>
          <button 
            onClick={fetchStations}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Charging Stations</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map(station => (
            <div key={station.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-xl">{station.name}</h3>
                  <p className="text-gray-600">{station.operator}</p>
                </div>
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < Math.floor(station.rating) ? '★' : '☆'}</span>
                  ))}
                  <span className="ml-1 text-gray-600">({station.rating})</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <FaBolt className="text-blue-500" />
                  <span>{station.maxPower} ({station.type.toUpperCase()})</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRupeeSign className="text-green-500" />
                  <span>{station.price.toFixed(2)}/kWh</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-orange-500" />
                  <span>{station.availability ? 'Available Now' : 'Currently Occupied'}</span>
                </div>
              </div>

              {/* Booking Section */}
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="p-2 border rounded-lg"
                    onChange={(e) => setBookingDetails({
                      ...bookingDetails,
                      date: e.target.value
                    })}
                  />
                  <input
                    type="time"
                    className="p-2 border rounded-lg"
                    onChange={(e) => setBookingDetails({
                      ...bookingDetails,
                      time: e.target.value
                    })}
                  />
                </div>
                <select
                  className="w-full p-2 border rounded-lg"
                  onChange={(e) => setBookingDetails({
                    ...bookingDetails,
                    duration: parseInt(e.target.value)
                  })}
                >
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
                <button
                  onClick={() => handleBooking(station)}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                    transition-colors disabled:bg-gray-400"
                  disabled={!station.availability}
                >
                  {station.availability ? 'Book Now' : 'Currently Unavailable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stations;