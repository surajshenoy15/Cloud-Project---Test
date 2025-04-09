import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaBolt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const Invoice = () => {
  const { id } = useParams();  // Use useParams instead of useSearchParams
  const navigate = useNavigate();
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    // Use the id from useParams
    setStation({
      id: id,
      name: 'Tata Power - Metro',
      operator: 'Tata Power',
      price: 12.00,
      duration: 60, // Default duration
      total: 12.00 * 60 / 60, // price per hour
      gst: (12.00 * 60 / 60) * 0.18,
    });
    setLoading(false);
  }, [id]);

  const handlePayment = () => {
    // Here you would integrate with a payment gateway
    alert('Payment successful!');
    navigate('/bookings');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Booking Invoice</h1>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{station.name}</h2>
                <p className="text-gray-600">{station.operator}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Invoice #</p>
                <p className="font-medium">{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-4">
              <div className="flex justify-between mb-2">
                <span>Charging Rate</span>
                <span>₹{station.price.toFixed(2)}/kWh</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Duration</span>
                <span>{station.duration} minutes</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{station.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{station.gst.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total</span>
              <span>₹{(station.total + station.gst).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/payment/${id}`)}
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 
              transition-colors flex items-center justify-center gap-2 font-medium"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;