# Quick Start Guide for Bellcorp Event Management

## 📋 Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Quick Setup

### 1. Backend Setup (5 minutes)
```bash
cd server
npm install
# Edit .env with your MongoDB URI
npm run seed          # Seed sample data
npm run dev           # Start in development mode
```

Backend runs on: http://localhost:5000

### 2. Frontend Setup (3 minutes)
```bash
cd client
npm install
npm start             # Start React dev server
```

Frontend runs on: http://localhost:3000

## ✨ Features Ready to Use

✅ User Authentication (Register/Login)
✅ Browse & Search Events
✅ Filter by Category, Location, Date
✅ Register for Events
✅ View Event Details
✅ Check Seat Availability
✅ User Dashboard (Upcoming & Past Events)
✅ Cancel Registrations
✅ Responsive Design

## 🧪 Test the App

1. **Register a new account**
   - Go to http://localhost:3000/register
   - Create an account with any credentials

2. **Browse Events**
   - View all events on /events page
   - Use search and filters

3. **Register for an Event**
   - Click "Register Now" on any event card
   - See it appear on your dashboard

4. **Check Dashboard**
   - Go to /dashboard (requires login)
   - See upcoming and past events

## 📚 API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Events
- GET /api/events
- GET /api/events/:id

### Registrations
- POST /api/registrations/:eventId
- DELETE /api/registrations/:eventId
- GET /api/registrations/my-events

## 🛠️ Troubleshooting

**Port 5000 in use:**
```bash
# Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**MongoDB not connecting:**
- Ensure MongoDB is running
- Check connection string in .env

**CORS Error:**
- Check backend is running on port 5000
- Check frontend URL in CORS config

## 📖 Full Documentation
See README.md for comprehensive documentation

## 🎉 You're Ready!
The application is fully functional and ready to use!
