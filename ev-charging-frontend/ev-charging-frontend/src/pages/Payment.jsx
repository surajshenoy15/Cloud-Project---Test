import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCreditCard, FaLock } from 'react-icons/fa';

const Payment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate(`/booking-confirmation/${id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="container mx-auto max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-center mb-6">
            <FaCreditCard className="text-3xl text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold">Payment Details</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength="19"
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                  setPaymentDetails({ ...paymentDetails, cardNumber: value });
                }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength="5"
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, '')
                      .replace(/(\d{2})(\d)/, '$1/$2');
                    setPaymentDetails({ ...paymentDetails, expiry: value });
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="password"
                  placeholder="123"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength="3"
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600 mt-4">
              <FaLock className="mr-2" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                transition-colors flex items-center justify-center gap-2 font-medium mt-6
                disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FaCreditCard /> Pay Now
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;