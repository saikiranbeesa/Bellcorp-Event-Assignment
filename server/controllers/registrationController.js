const Registration = require('../models/Registration');
const Event = require('../models/Event');
const User = require('../models/User');

// @desc    Register user for an event
// @route   POST /api/registrations/:eventId
// @access  Private
exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.userId;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user already registered for this event
    const existingRegistration = await Registration.findOne({
      user: userId,
      event: eventId,
    });
    if (existingRegistration) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Check if event has available seats
    if (event.availableSeats <= 0) {
      return res.status(400).json({ message: 'Event is full, no available seats' });
    }

    // Create registration record
    const registration = await Registration.create({
      user: userId,
      event: eventId,
    });

    // Decrease available seats by 1
    event.availableSeats -= 1;
    await event.save();

    // Populate and return registration with event details
    await registration.populate('event user');

    res.status(201).json({
      success: true,
      message: 'Successfully registered for event',
      registration,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel event registration
// @route   DELETE /api/registrations/:eventId
// @access  Private
exports.cancelRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.userId;

    // Find and delete registration
    const registration = await Registration.findOneAndDelete({
      user: userId,
      event: eventId,
    });

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Increase available seats by 1
    const event = await Event.findById(eventId);
    event.availableSeats += 1;
    await event.save();

    res.status(200).json({
      success: true,
      message: 'Registration cancelled successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's registered events
// @route   GET /api/registrations/my-events
// @access  Private
exports.getUserEvents = async (req, res) => {
  try {
    const userId = req.userId;

    // Get all registrations for user and populate event details
    const registrations = await Registration.find({ user: userId }).populate('event');

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check if user is registered for an event
// @route   GET /api/registrations/check/:eventId
// @access  Private
exports.checkRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.userId;

    const registration = await Registration.findOne({
      user: userId,
      event: eventId,
    });

    res.status(200).json({
      success: true,
      isRegistered: !!registration,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
