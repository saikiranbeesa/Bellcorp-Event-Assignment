import axios from 'axios';

// Create axios instance with base URL. Use REACT_APP_API_URL if provided,
// otherwise default to localhost (used for local dev with the server running).
// Ensure the base URL includes '/api' since server routes are mounted at /api/*
let rawBase = process.env.REACT_APP_API_URL || 'http://localhost:5000';
rawBase = rawBase.trim();
if (rawBase === '') rawBase = 'http://localhost:5000';
// remove trailing slashes then append /api if not already present
let baseURL = rawBase.replace(/\/+$/, '');
if (!baseURL.endsWith('/api')) baseURL = baseURL + '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include JWT token in every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==================== AUTH REQUESTS ====================

export const authAPI = {
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
};

// ==================== EVENT REQUESTS ====================

export const eventAPI = {
  // Get all events with optional filters
  getEvents: (filters = {}) =>
    api.get('/events', { params: filters }),

  // Get single event by ID
  getEventById: (id) =>
    api.get(`/events/${id}`),

  // Create new event (admin only)
  createEvent: (eventData) =>
    api.post('/events', eventData),

  // Search events with filters
  searchEvents: (query, filters) =>
    api.get('/events', {
      params: {
        search: query,
        ...filters,
      },
    }),
};

// ==================== REGISTRATION REQUESTS ====================

export const registrationAPI = {
  // Register user for an event
  registerForEvent: (eventId) =>
    api.post(`/registrations/${eventId}`),

  // Cancel registration
  cancelRegistration: (eventId) =>
    api.delete(`/registrations/${eventId}`),

  // Get all user's registered events
  getUserEvents: () =>
    api.get('/registrations/my-events'),

  // Check if user is registered for specific event
  checkRegistration: (eventId) =>
    api.get(`/registrations/check/${eventId}`),
};

// ==================== ERROR HANDLER ====================

// Helper function to handle API errors
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data.message || 'An error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'No response from server. Please check your connection.',
      status: 0,
    };
  } else {
    // Other errors
    return {
      message: error.message,
      status: 0,
    };
  }
};

export default api;
