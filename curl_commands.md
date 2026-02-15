# API Curl Commands

Use these commands to validat the API endpoints. Replace `YOUR_JWT_TOKEN` with the token received from the `/api/auth/login` or `/api/auth/register` response.

Measurements are based on running the server locally at `https://bellcorp-event-assignment.onrender.com`.

## Authentication

### Register User
```bash
curl -X POST https://bellcorp-event-assignment.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "password123"}'
```

### Login User
```bash
curl -X POST https://bellcorp-event-assignment.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### Get Current User (Protected)
```bash
curl -X GET https://bellcorp-event-assignment.onrender.com/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Events

### Get All Events
```bash
curl -X GET https://bellcorp-event-assignment.onrender.com/api/events
```

### Get Single Event
Replace `EVENT_ID` with an actual ID from the "Get All Events" response.
```bash
curl -X GET https://bellcorp-event-assignment.onrender.com/api/events/EVENT_ID
```

### Create Event (Admin/Protected)
```bash
curl -X POST https://bellcorp-event-assignment.onrender.com/api/events \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Tech Conference",
    "description": "An amazing tech event",
    "date": "2023-12-25T10:00:00.000Z",
    "location": "Virtual",
    "capacity": 100
  }'
```

## Registrations

### Register for Event (Protected)
Replace `EVENT_ID` with the ID of the event you want to register for.
```bash
curl -X POST https://bellcorp-event-assignment.onrender.com/api/registrations/EVENT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Check Registration Status (Protected)
```bash
curl -X GET http://localhost:5000/api/registrations/check/EVENT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get My Events (Protected)
```bash
curl -X GET http://localhost:5000/api/registrations/my-events \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Cancel Registration (Protected)
```bash
curl -X DELETE http://localhost:5000/api/registrations/EVENT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
