const mongoose = require('mongoose');

// Registration Schema - tracks which users are registered for which events
const RegistrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
  },
  { timestamps: true }
);

// Create compound index to prevent duplicate registrations
RegistrationSchema.index({ user: 1, event: 1 }, { unique: true });

module.exports = mongoose.model('Registration', RegistrationSchema);
