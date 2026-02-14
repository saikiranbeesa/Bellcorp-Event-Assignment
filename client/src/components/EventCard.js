import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({
  event,
  isRegistered = false,
  onRegister,
  onCancel,
  loading = false,
}) => {
  const eventDate = new Date(event.date);
  const isEventFull = event.availableSeats === 0;
  const isEventPast = eventDate < new Date();

  // Format date to readable string
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="event-card">
      <div className="event-card-header">
        <h3 className="event-title">{event.name}</h3>
        {isEventFull && <span className="badge badge-full">Sold Out</span>}
        {isEventPast && <span className="badge badge-past">Past Event</span>}
      </div>

      <div className="event-card-body">
        <div className="event-info">
          <p>
            <strong>📅 Date:</strong> {formatDate(eventDate)}
          </p>
          <p>
            <strong>📍 Location:</strong> {event.location}
          </p>
          <p>
            <strong>🎤 Organizer:</strong> {event.organizer}
          </p>
          <p>
            <strong>💺 Available Seats:</strong> {event.availableSeats}/{event.capacity}
          </p>

          {/* Categories */}
          {event.category && event.category.length > 0 && (
            <div className="categories">
              {event.category.map((cat, index) => (
                <span key={index} className="category-badge">
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="event-description">{event.description}</p>
        </div>
      </div>

      <div className="event-card-footer">
        <Link to={`/events/${event._id}`} className="btn btn-primary">
          View Details
        </Link>

        {isRegistered && !isEventPast ? (
          <button
            onClick={() => onCancel(event._id)}
            className="btn btn-danger"
            disabled={loading}
          >
            {loading ? 'Cancelling...' : 'Cancel Registration'}
          </button>
        ) : !isEventPast ? (
          <button
            onClick={() => onRegister(event._id)}
            className="btn btn-success"
            disabled={loading || isEventFull}
          >
            {loading ? 'Registering...' : 'Register Now'}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default EventCard;
