const express = require('express');
const {
  registerForEvent,
  cancelRegistration,
  getUserEvents,
  checkRegistration,
} = require('../controllers/registrationController');
const protect = require('../middleware/protect');

const router = express.Router();

// All registration routes are protected (require authentication)
router.post('/:eventId', protect, registerForEvent);
router.delete('/:eventId', protect, cancelRegistration);
router.get('/my-events', protect, getUserEvents);
router.get('/check/:eventId', protect, checkRegistration);

module.exports = router;
