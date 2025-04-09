const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', stationController.getAllStations);
router.get('/nearby', stationController.getNearbyStations);
router.get('/:id', stationController.getStationById);
router.patch('/:id/availability', protect, stationController.updateStationAvailability);

module.exports = router;