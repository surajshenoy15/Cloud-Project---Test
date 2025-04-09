const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: [Number], // [latitude, longitude]
    required: true
  },
  operator: {
    type: String,
    required: true
  },
  socket: String,
  capacity: {
    type: String,
    default: '1'
  },
  maxPower: String,
  authentication: String,
  fee: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  isFastCharging: Boolean,
  type: {
    type: String,
    enum: ['ac', 'dc'],
    required: true
  },
  rating: {
    type: Number,
    default: 4.0
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Station', stationSchema);