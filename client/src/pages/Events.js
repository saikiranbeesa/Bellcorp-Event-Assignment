import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import EventCard from '../components/EventCard';
import { eventAPI, registrationAPI, handleAPIError } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    date: '',
  });
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  // Fetch all events on component mount and when filters change
  useEffect(() => {
    fetchEvents();
  }, [filters]);

  // Fetch registered events if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchRegisteredEvents();
    }
  }, [isAuthenticated]);

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await eventAPI.getEvents(filters);
      setEvents(response.data.events);
    } catch (err) {
      const apiError = handleAPIError(err);
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegisteredEvents = async () => {
    try {
      const response = await registrationAPI.getUserEvents();
      const eventIds = response.data.registrations.map((reg) => reg.event._id);
      setRegisteredEvents(eventIds);
    } catch (err) {
      console.error('Error fetching registered events:', err);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await eventAPI.searchEvents(searchQuery, filters);
      setEvents(response.data.events);
    } catch (err) {
      const apiError = handleAPIError(err);
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSearchQuery(''); // Reset search when applying filters
  };

  const handleRegister = async (eventId) => {
    try {
      setError('');
      await registrationAPI.registerForEvent(eventId);
      setRegisteredEvents((prev) => [...prev, eventId]);
      fetchEvents(); // Refresh event list to update seat count
    } catch (err) {
      const apiError = handleAPIError(err);
      setError(apiError.message);
    }
  };

  const handleCancel = async (eventId) => {
    try {
      setError('');
      await registrationAPI.cancelRegistration(eventId);
      setRegisteredEvents((prev) => prev.filter((id) => id !== eventId));
      fetchEvents(); // Refresh event list to update seat count
    } catch (err) {
      const apiError = handleAPIError(err);
      setError(apiError.message);
    }
  };

  // Extract unique categories and locations for filters
  const allCategories = [...new Set(events.flatMap((e) => e.category || []))];
  const allLocations = [...new Set(events.map((e) => e.location))];

  return (
    <div className="events-container">
      <div className="events-header">
        <h1>🎯 Explore Events</h1>
        <p>Find and register for amazing events</p>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
        loading={loading}
      />

      {error && <div className="error-message">{error}</div>}

      <div className="events-layout">
        <aside className="sidebar">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={allCategories}
            locations={allLocations}
            loading={loading}
          />
        </aside>

        <main className="events-main">
          {loading && <div className="loading">Loading events...</div>}

          {!loading && events.length === 0 ? (
            <div className="no-events">
              <p>No events found. Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="events-grid">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  isRegistered={registeredEvents.includes(event._id)}
                  onRegister={handleRegister}
                  onCancel={handleCancel}
                  loading={loading}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Events;
