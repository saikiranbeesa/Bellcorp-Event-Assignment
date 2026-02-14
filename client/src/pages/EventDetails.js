import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { eventAPI, registrationAPI, handleAPIError } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch event details on mount
  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  // Check if user is registered for this event
  useEffect(() => {
    if (isAuthenticated) {
      checkRegistration();
    }
  }, [id, isAuthenticated]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await eventAPI.getEventById(id);
      setEvent(response.data.event);
    } catch (err) {
      const apiError = handleAPIError(err);
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const checkRegistration = async () => {
    try {
      const response = await registrationAPI.checkRegistration(id);
      setIsRegistered(response.data.isRegistered);
    } catch (err) {
      console.error('Error checking registration:', err);
    }
  };

  const handleRegister = async () => {
    try {
      setActionLoading(true);
      setError('');
      await registrationAPI.registerForEvent(id);
      setIsRegistered(true);
      fetchEventDetails(); // Refresh event to update available seats
    } catch (err) {
      const apiError = handleAPIError(err);
      setError(apiError.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setActionLoading(true);
      setError('');
      await registrationAPI.cancelRegistration(id);
      setIsRegistered(false);
      fetchEventDetails(); // Refresh event to update available seats
    } catch (err) {
      const apiError = handleAPIError(err);
      setError(apiError.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading event details...</div>;
  }

  if (!event) {
    return (
      <div className="event-not-found">
        <h2>Event not found</h2>
        <Link to="/events" className="btn btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isEventFull = event.availableSeats === 0;
  const isEventPast = eventDate < new Date();

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="event-details-container">
      <Link to="/events" className="back-button">
        ← Back to Events
      </Link>

      <div className="event-details-box">
        <div className="event-details-header">
          <h1>{event.name}</h1>
          <div className="event-badges">
            {isEventFull && <span className="badge badge-full">Sold Out</span>}
            {isEventPast && <span className="badge badge-past">Past Event</span>}
            {isRegistered && <span className="badge badge-registered">Registered</span>}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="event-details-grid">
          {/* Main Details */}
          <div className="event-details-main">
            <div className="detail-section">
              <h3>Event Information</h3>
              <div className="detail-item">
                <strong>📅 Date & Time:</strong>
                <p>{formatDate(eventDate)}</p>
              </div>
              <div className="detail-item">
                <strong>📍 Location:</strong>
                <p>{event.location}</p>
              </div>
              <div className="detail-item">
                <strong>🎤 Organizer:</strong>
                <p>{event.organizer}</p>
              </div>
            </div>

            <div className="detail-section">
              <h3>Description</h3>
              <p className="event-description">{event.description}</p>
            </div>

            {event.category && event.category.length > 0 && (
              <div className="detail-section">
                <h3>Categories</h3>
                <div className="categories-list">
                  {event.category.map((cat, index) => (
                    <span key={index} className="category-badge">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="event-details-sidebar">
            <div className="capacity-card">
              <h3>Event Details</h3>
              <div className="capacity-info">
                <div className="capacity-item">
                  <span>Total Capacity:</span>
                  <strong>{event.capacity}</strong>
                </div>
                <div className="capacity-item">
                  <span>Available Seats:</span>
                  <strong
                    className={isEventFull ? 'text-danger' : 'text-success'}
                  >
                    {event.availableSeats}
                  </strong>
                </div>
                <div className="capacity-item">
                  <span>Booked:</span>
                  <strong>{event.capacity - event.availableSeats}</strong>
                </div>
              </div>

              <div className="capacity-bar">
                <div
                  className="capacity-used"
                  style={{
                    width: `${((event.capacity - event.availableSeats) / event.capacity) * 100}%`,
                  }}
                ></div>
              </div>

              <p className="capacity-percentage">
                {Math.round(
                  ((event.capacity - event.availableSeats) / event.capacity) * 100
                )}
                % Booked
              </p>

              {/* Action Buttons */}
              <div className="action-buttons">
                {!isEventPast ? (
                  isRegistered ? (
                    <button
                      onClick={handleCancel}
                      className="btn btn-danger"
                      disabled={actionLoading}
                    >
                      {actionLoading ? 'Cancelling...' : '❌ Cancel Registration'}
                    </button>
                  ) : (
                    <button
                      onClick={handleRegister}
                      className="btn btn-success"
                      disabled={actionLoading || isEventFull || !isAuthenticated}
                    >
                      {!isAuthenticated
                        ? 'Login to Register'
                        : actionLoading
                        ? 'Registering...'
                        : isEventFull
                        ? 'Event Full'
                        : '✓ Register Now'}
                    </button>
                  )
                ) : (
                  <p className="past-event-notice">This event has already passed.</p>
                )}

                {!isAuthenticated && (
                  <p className="login-prompt">
                    <Link to="/login">Login</Link> or{' '}
                    <Link to="/register">Register</Link> to book events
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
