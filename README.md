# 🎯 Bellcorp Event Management Application

This application is built with scalability in mind, ensuring efficient handling of growing event data while maintaining data integrity and performance.


## 🚀 Features

- **User Authentication**: Secure registration and login with JWT authentication
- **Event Discovery**: Browse and search events with advanced filtering
- **Event Management**: Register for events, view details, and manage registrations
- **User Dashboard**: Track upcoming and past events in a personalized dashboard
- **Responsive Design**: Mobile-friendly UI that works across all devices
- **Real-time Updates**: Instant seat availability tracking
- **Search & Filter**: Filter events by category, location, and date

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Development](#development)
- [Contributing](#contributing)

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Enabled for cross-origin requests

### Frontend
- **Library**: React.js (v18+)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Pure CSS3 with Flexbox & Grid
- **State Management**: React Context API

## 📁 Project Structure

```
Bellcorp Event/
├── server/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── Event.js                 # Event schema
│   │   └── Registration.js          # Registration schema
│   ├── controllers/
│   │   ├── authController.js        # Auth logic
│   │   ├── eventController.js       # Event logic
│   │   └── registrationController.js # Registration logic
│   ├── routes/
│   │   ├── authRoutes.js            # Auth routes
│   │   ├── eventRoutes.js           # Event routes
│   │   └── registrationRoutes.js    # Registration routes
│   ├── middleware/
│   │   └── protect.js               # JWT middleware
│   ├── seed/
│   │   └── seedEvents.js            # Database seeding
│   ├── .env                         # Environment variables
│   ├── package.json
│   └── server.js                    # Main server file
│
├── client/
│   ├── public/
│   │   └── index.html               # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js            # Navigation component
│   │   │   ├── EventCard.js         # Event card component
│   │   │   ├── SearchBar.js         # Search component
│   │   │   ├── FilterPanel.js       # Filter component
│   │   │   ├── ProtectedRoute.js    # Auth guard
│   │   │   └── [components].css     # Component styles
│   │   ├── pages/
│   │   │   ├── Login.js             # Login page
│   │   │   ├── Register.js          # Register page
│   │   │   ├── Events.js            # Events listing page
│   │   │   ├── EventDetails.js      # Event details page
│   │   │   ├── Dashboard.js         # User dashboard
│   │   │   └── [pages].css          # Page styles
│   │   ├── context/
│   │   │   └── AuthContext.js       # Auth context provider
│   │   ├── services/
│   │   │   └── api.js               # API service
│   │   ├── App.js                   # Main app component
│   │   ├── index.js                 # Entry point
│   │   ├── index.css                # Global styles
│   │   └── App.css                  # App styles
│   ├── package.json
│   └── .gitignore
│
└── README.md                         # Project documentation
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or MongoDB Atlas cloud account)
- **Git** for version control
- A code editor (VS Code recommended)

## 🔧 Installation

### 1. Clone or Setup Project

```bash
# Navigate to the project directory
cd "Bellcorp Event"
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (already provided, update if needed)
# MongoDB connection string and JWT secret are in .env
```

### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create/update `server/.env`:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/bellcorp-events
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/bellcorp-events

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_change_this_in_production

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### Frontend Configuration

The frontend automatically connects to `http://localhost:5000` as configured in `client/src/services/api.js`.

To change the backend URL, update the `baseURL` in the axios instance.

## 🚀 Running the Application

### Start MongoDB

**For Local MongoDB:**
```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community
```

**For MongoDB Atlas:**
- Connection string is already configured in `.env`

### Start Backend Server

```bash
# From server directory
cd server

# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

Server runs on: `http://localhost:5000`

### Start Frontend Development Server

```bash
# From client directory
cd client

# Start React development server
npm start
```

Frontend runs on: `http://localhost:3000`

### Seed Sample Data

```bash
# From server directory
npm run seed

# This creates 20 sample events in the database
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "success": true,
  "token": "jwt_token_here",
  "user": { "id", "name", "email" }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "success": true,
  "token": "jwt_token_here",
  "user": { "id", "name", "email" }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "user": { "id", "name", "email" }
}
```

### Event Endpoints

#### Get All Events (with Filters)
```http
GET /events?search=react&category=Technology&location=San%20Francisco&date=2026-03-15

Query Parameters:
- search: Search in event name, description, organizer
- category: Filter by event category
- location: Filter by event location
- date: Filter events from this date onwards (YYYY-MM-DD)

Response: 200 OK
{
  "success": true,
  "count": 5,
  "events": [...]
}
```

#### Get Single Event
```http
GET /events/{eventId}

Response: 200 OK
{
  "success": true,
  "event": { event details }
}
```

#### Create Event (Admin)
```http
POST /events
Content-Type: application/json

{
  "name": "Tech Conference 2026",
  "organizer": "Tech Company",
  "location": "New York",
  "date": "2026-04-15T10:00:00",
  "description": "Annual tech conference",
  "capacity": 500,
  "category": ["Technology", "Business"]
}

Response: 201 Created
{
  "success": true,
  "event": { event details }
}
```

### Registration Endpoints

#### Register for Event
```http
POST /registrations/{eventId}
Authorization: Bearer {token}

Response: 201 Created
{
  "success": true,
  "message": "Successfully registered for event",
  "registration": { registration details }
}

Errors:
- 400: Already registered or event full
- 404: Event not found
- 401: Not authenticated
```

#### Cancel Registration
```http
DELETE /registrations/{eventId}
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Registration cancelled successfully"
}
```

#### Get User's Events
```http
GET /registrations/my-events
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "count": 5,
  "registrations": [
    {
      "_id": "...",
      "user": { user details },
      "event": { event details }
    }
  ]
}
```

#### Check Registration Status
```http
GET /registrations/check/{eventId}
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "isRegistered": true|false
}
```

## 🌍 Deployment

### Frontend Deployment (Vercel)

1. **Push code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `client`

3. **Configure Environment Variables**
   - Add `REACT_APP_API_URL` pointing to your backend URL

4. **Deploy**
   - Vercel automatically deploys on every push to main

### Backend Deployment (Render)

1. **Prepare for Production**
   ```bash
   # Update .env with production values
   NODE_ENV=production
   JWT_SECRET=your_strong_production_secret
   MONGODB_URI=your_mongodb_atlas_uri
   ```

2. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repository
   - Set Build Command: `npm install`
   - Set Start Command: `npm start`
   - Add Environment Variables
   - Deploy

4. **Configure CORS**
   - Update frontend to use deployed backend URL
   - Update backend CORS settings with deployed frontend URL

### Database Deployment (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com](https://mongodb.com)
   - Create project and cluster
   - Get connection string

2. **Update .env**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bellcorp-events
   ```

3. **Seed Production Database**
   ```bash
   npm run seed
   ```

## 💻 Development

### Development Mode

Both frontend and backend support hot-reload during development:

**Terminal 1 - Backend**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend**
```bash
cd client
npm start
```

### Code Standards

- Use ES6+ syntax
- Use async/await for asynchronous operations
- Write meaningful variable and function names
- Add comments for complex logic
- Follow REST API conventions

### Testing

Recommended tools:
- **Postman** or **Thunder Client** for API testing
- **React Developer Tools** browser extension
- **MongoDB Compass** for database visualization

## 📝 Sample Test Credentials

After seeding, use:
```
Email: demo@example.com
Password: demo123456
```

(You need to register a new user first)

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in .env
- Verify database credentials

### CORS Error
- Ensure backend is running on correct port
- Check CORS configuration in server.js
- Verify frontend URL matches CORS whitelist

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Token Expired
- Token expires in 30 days
- User needs to login again
- Check token in localStorage

## 🛡️ Security Considerations

✅ Implemented:
- JWT authentication for protected routes
- Password hashing with bcryptjs
- CORS protection
- Environment variables for sensitive data
- Unique email validation

⚠️ For Production:
- Use HTTPS only
- Implement rate limiting
- Add request validation middleware
- Use secure cookie options
- Implement logging and monitoring
- Regular security audits

## 📄 License

MIT License - See LICENSE file for details

## 👥 Support

For issues or questions:
1. Check existing documentation
2. Review API endpoints documentation
3. Check error messages in console
4. Create an issue on GitHub

## 🙏 Acknowledgments

Built with:
- React.js Documentation
- Express.js Best Practices
- MongoDB Documentation
- JWT Security Standards

---

**Made with ❤️ for Bellcorp Studio**

**Version 1.0.0** | Last Updated: 2026
