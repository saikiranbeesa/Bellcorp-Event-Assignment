const Event = require('../models/Event');

// @desc    Get all events with search, filter, and pagination
// @route   GET /api/events
// @access  Public
// Query params: search, category, location, date
exports.getEvents = async (req, res) => {
  try {
    const { search, category, location, date } = req.query;
    let query = {};

    // Search functionality - search in name and description using regex (case-insensitive)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { organizer: { $regex: search, $options: 'i' } },
      ];
    }

    // Category filter - can be single or multiple categories
    if (category) {
      query.category = { $in: Array.isArray(category) ? category : [category] };
    }

    // Location filter - case-insensitive
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Date filter - shows events on or after the specified date
    if (date) {
      const filterDate = new Date(date);
      query.date = { $gte: filterDate };
    }

    // Execute query
    const events = await Event.find(query).sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create event (Admin only - optional, for now just skeleton)
// @route   POST /api/events
// @access  Private
exports.createEvent = async (req, res) => {
  try {
    const { name, organizer, location, date, description, capacity, category } = req.body;

    // Validate required fields
    if (!name || !organizer || !location || !date || !description || !capacity) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const event = await Event.create({
      name,
      organizer,
      location,
      date: new Date(date),
      description,
      capacity,
      availableSeats: capacity,
      category: category || [],
    });

    res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
