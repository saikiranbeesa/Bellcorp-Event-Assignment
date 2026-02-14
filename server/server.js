const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// ==================== MIDDLEWARE ====================

// Enable CORS for frontend communication
// Supports either a single CLIENT_URL, a comma-separated CLIENT_URLS,
// or — if none provided — a permissive fallback to allow deployed frontends
const clientUrl = process.env.CLIENT_URL;
const clientUrls = process.env.CLIENT_URLS; // optional comma-separated list
let allowedOrigins = [];
if (clientUrls) {
  allowedOrigins = clientUrls.split(',').map((s) => s.trim()).filter(Boolean);
} else if (clientUrl) {
  allowedOrigins = [clientUrl.trim()];
}

if (allowedOrigins.length > 0) {
  app.use(
    cors({
      origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
        return callback(new Error('Origin not allowed by CORS'));
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
  );
} else {
  // No CLIENT_URL configured: allow all origins (suitable for APIs using
  // Authorization headers). For stricter security, set CLIENT_URL or
  // CLIENT_URLS in the Render environment variables to restrict origins.
  app.use(
    cors({
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: false,
    })
  );
}

// Parse incoming JSON requests
app.use(express.json());

// ==================== ROUTES ====================

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Event routes
app.use('/api/events', eventRoutes);

// Registration routes
app.use('/api/registrations', registrationRoutes);

// ==================== ERROR HANDLING ====================

// 404 Not Found middleware
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error.message);
  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
  });
});

// ==================== START SERVER ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🎯 Bellcorp Event Management API     ║
║   Server running on port ${PORT}          ║
║   Environment: ${process.env.NODE_ENV || 'development'}           ║
╚════════════════════════════════════════╝
  `);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
