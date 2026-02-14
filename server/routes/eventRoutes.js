const express = require('express');
const {
  getEvents,
  getEventById,
  createEvent,
} = require('../controllers/eventController');

const router = express.Router();

// Public routes - anyone can view events
router.get('/', getEvents);
router.get('/:id', getEventById);

// Admin route (currently open, add protection as needed)
router.post('/', createEvent);

module.exports = router;
