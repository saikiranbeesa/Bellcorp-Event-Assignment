const mongoose = require('mongoose');

// Event Schema - stores event details and capacity information
const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide event name'],
      trim: true,
    },
    organizer: {
      type: String,
      required: [true, 'Please provide organizer name'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Please provide location'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Please provide event date'],
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
    },
    capacity: {
      type: Number,
      required: [true, 'Please provide capacity'],
      min: [1, 'Capacity must be at least 1'],
    },
    availableSeats: {
      type: Number,
      required: [true, 'Please provide available seats'],
    },
    category: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

// Index for efficient searching
EventSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Event', EventSchema);
