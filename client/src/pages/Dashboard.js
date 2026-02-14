import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { registrationAPI, handleAPIError } from '../services/api';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await registrationAPI.getUserEvents();

      // Separate events into upcoming and past based on date
      const now = new Date();
      const upcoming = [];
      const past = [];

      response.data.registrations.forEach((registration) => {
        const eventDate = new Date(registration.event.date);
        if (eventDate >= now) {
          upcoming.push(registration.event);
        } else {
          past.push(registration.event);
        }
      });

      setUpcomingEvents(upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)));
      setPastEvents(past.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (err) {
      const apiError = handleAPIError(err);
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (eventId) => {
    try {
      setError('');
      await registrationAPI.cancelRegistration(eventId);
      fetchUserEvents(); // Refresh the list
    } catch (err) {
      const apiError = handleAPIError(err);
      setError(apiError.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading your dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>👋 Welcome, {user?.name}!</h1>
          <p>Your Event Management Dashboard</p>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-icon">📅</div>
          <div className="summary-content">
            <h3>Upcoming Events</h3>
            <p className="summary-number">{upcomingEvents.length}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">✓</div>
          <div className="summary-content">
            <h3>Attended Events</h3>
            <p className="summary-number">{pastEvents.length}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">🎫</div>
          <div className="summary-content">
            <h3>Total Registrations</h3>
            <p className="summary-number">
              {upcomingEvents.length + pastEvents.length}
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <section className="events-section">
        <h2>📌 Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <div className="no-events-message">
            <p>You haven't registered for any upcoming events yet.</p>
            <Link to="/events" className="btn btn-primary">
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="events-list">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                isRegistered={true}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </section>

      {/* Past Events */}
      <section className="events-section">
        <h2>✓ Past Events</h2>
        {pastEvents.length === 0 ? (
          <div className="no-events-message">
            <p>You haven't attended any events yet.</p>
          </div>
        ) : (
          <div className="events-list">
            {pastEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                isRegistered={true}
                onCancel={() => {}} // Can't cancel past events
              />
            ))}
          </div>
        )}
      </section>

      {/* Explore More Button */}
      <div className="explore-button-container">
        <Link to="/events" className="btn btn-primary">
          🔍 Explore More Events
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
