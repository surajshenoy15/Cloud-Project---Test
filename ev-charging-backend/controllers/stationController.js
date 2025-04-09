const Station = require('../models/Station');

exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    res.json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNearbyStations = async (req, res) => {
  try {
    const { latitude, longitude, radius = 5000 } = req.query;

    const stations = await Station.find({
      position: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    });

    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStationAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;

    const station = await Station.findByIdAndUpdate(
      id,
      { availability },
      { new: true }
    );

    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }

    res.json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};