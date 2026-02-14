const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('../models/Event');
const connectDB = require('../config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const categories = ['Technology', 'Business', 'Health', 'Sports', 'Entertainment', 'Education'];

// Sample event data - 20 events with varied details
const sampleEvents = [
  {
    name: 'React Workshop for Beginners',
    organizer: 'Tech Academy',
    location: 'San Francisco, CA',
    date: new Date('2026-03-15T10:00:00'),
    description: 'Learn the fundamentals of React.js with hands-on coding exercises and projects.',
    capacity: 50,
    availableSeats: 50,
    category: ['Technology', 'Education'],
  },
  {
    name: 'Web Development Bootcamp',
    organizer: 'Dev School',
    location: 'New York, NY',
    date: new Date('2026-03-20T09:00:00'),
    description: 'Complete Web Development course covering frontend and backend technologies.',
    capacity: 30,
    availableSeats: 25,
    category: ['Technology', 'Education'],
  },
  {
    name: 'Startup Networking Event',
    organizer: 'Silicon Valley Hub',
    location: 'Palo Alto, CA',
    date: new Date('2026-03-25T18:00:00'),
    description: 'Connect with founders, investors, and tech entrepreneurs in a casual setting.',
    capacity: 100,
    availableSeats: 45,
    category: ['Business', 'Technology'],
  },
  {
    name: 'AI & Machine Learning Summit',
    organizer: 'AI Institute',
    location: 'Boston, MA',
    date: new Date('2026-04-05T10:00:00'),
    description: 'Explore cutting-edge AI applications and network with ML professionals.',
    capacity: 200,
    availableSeats: 150,
    category: ['Technology', 'Business'],
  },
  {
    name: 'Digital Marketing Conference',
    organizer: 'Marketing Pro',
    location: 'Chicago, IL',
    date: new Date('2026-04-10T08:30:00'),
    description: 'Latest trends in digital marketing, SEO, social media, and content strategy.',
    capacity: 150,
    availableSeats: 60,
    category: ['Business', 'Technology'],
  },
  {
    name: 'Cloud Computing Masterclass',
    organizer: 'Cloud Experts',
    location: 'Seattle, WA',
    date: new Date('2026-04-15T14:00:00'),
    description: 'Master AWS, Azure, and Google Cloud with real-world projects.',
    capacity: 40,
    availableSeats: 15,
    category: ['Technology'],
  },
  {
    name: 'Fitness & Wellness Expo',
    organizer: 'Health First',
    location: 'Miami, FL',
    date: new Date('2026-04-20T08:00:00'),
    description: 'Discover fitness trends, nutrition tips, and wellness workshops.',
    capacity: 500,
    availableSeats: 300,
    category: ['Health', 'Sports'],
  },
  {
    name: 'Cybersecurity Conference',
    organizer: 'SecureNet',
    location: 'Washington, DC',
    date: new Date('2026-04-25T09:00:00'),
    description: 'Expert talks on cybersecurity, data protection, and ethical hacking.',
    capacity: 120,
    availableSeats: 80,
    category: ['Technology', 'Business'],
  },
  {
    name: 'Blockchain & Crypto Summit',
    organizer: 'Crypto Leaders',
    location: 'Denver, CO',
    date: new Date('2026-05-01T10:00:00'),
    description: 'Explore blockchain technology, cryptocurrency, and web3 opportunities.',
    capacity: 180,
    availableSeats: 100,
    category: ['Technology', 'Business'],
  },
  {
    name: 'Mobile App Development Workshop',
    organizer: 'App Studio',
    location: 'Austin, TX',
    date: new Date('2026-05-05T11:00:00'),
    description: 'Build iOS and Android apps with React Native and Flutter.',
    capacity: 50,
    availableSeats: 20,
    category: ['Technology', 'Education'],
  },
  {
    name: 'Business Leadership Forum',
    organizer: 'Executive Club',
    location: 'Boston, MA',
    date: new Date('2026-05-10T15:00:00'),
    description: 'Learn leadership strategies from successful entrepreneurs and executives.',
    capacity: 100,
    availableSeats: 55,
    category: ['Business'],
  },
  {
    name: 'Data Science Bootcamp',
    organizer: 'Data Academy',
    location: 'San Francisco, CA',
    date: new Date('2026-05-15T10:00:00'),
    description: 'Master Python, SQL, machine learning, and data visualization.',
    capacity: 60,
    availableSeats: 30,
    category: ['Technology', 'Education'],
  },
  {
    name: 'Music Festival 2026',
    organizer: 'Festival Productions',
    location: 'Los Angeles, CA',
    date: new Date('2026-05-20T16:00:00'),
    description: 'Three-day music festival featuring top international and local artists.',
    capacity: 5000,
    availableSeats: 2000,
    category: ['Entertainment'],
  },
  {
    name: 'Environmental Conference',
    organizer: 'Green Earth',
    location: 'Portland, OR',
    date: new Date('2026-05-25T09:00:00'),
    description: 'Sustainable living practices and environmental solutions discussions.',
    capacity: 150,
    availableSeats: 100,
    category: ['Health', 'Education'],
  },
  {
    name: 'DevOps & Docker Workshop',
    organizer: 'DevOps Masters',
    location: 'Seattle, WA',
    date: new Date('2026-06-01T13:00:00'),
    description: 'Learn containerization, orchestration, and CI/CD pipelines.',
    capacity: 45,
    availableSeats: 10,
    category: ['Technology'],
  },
  {
    name: 'Sports Networking Event',
    organizer: 'Sports Connect',
    location: 'Denver, CO',
    date: new Date('2026-06-05T17:00:00'),
    description: 'Connect with athletes, coaches, and sports industry professionals.',
    capacity: 200,
    availableSeats: 120,
    category: ['Sports', 'Business'],
  },
  {
    name: 'GraphQL & Modern APIs Workshop',
    organizer: 'API Experts',
    location: 'Austin, TX',
    date: new Date('2026-06-10T10:00:00'),
    description: 'Build scalable APIs with GraphQL, REST best practices, and microservices.',
    capacity: 50,
    availableSeats: 35,
    category: ['Technology', 'Education'],
  },
  {
    name: 'Entrepreneurship Bootcamp',
    organizer: 'Startup Inc',
    location: 'New York, NY',
    date: new Date('2026-06-15T09:00:00'),
    description: 'From idea to product launch - everything you need to know about starting a business.',
    capacity: 80,
    availableSeats: 50,
    category: ['Business', 'Education'],
  },
  {
    name: 'Python Advanced Training',
    organizer: 'Code Masters',
    location: 'San Francisco, CA',
    date: new Date('2026-06-20T10:00:00'),
    description: 'Advanced Python concepts including decorators, generators, and async programming.',
    capacity: 40,
    availableSeats: 18,
    category: ['Technology', 'Education'],
  },
  {
    name: 'Entertainment Industry Gala',
    organizer: 'Hollywood Productions',
    location: 'Los Angeles, CA',
    date: new Date('2026-06-25T19:00:00'),
    description: 'Networking event with producers, directors, and entertainment industry leaders.',
    capacity: 300,
    availableSeats: 150,
    category: ['Entertainment', 'Business'],
  },
];

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing events
    await Event.deleteMany({});
    console.log('✓ Cleared existing events');

    // Insert sample events
    const events = await Event.insertMany(sampleEvents);
    console.log(`✓ Created ${events.length} sample events`);

    // Display confirmation
    console.log('\n📅 Sample Events Created:');
    events.forEach((event, index) => {
      console.log(
        `${index + 1}. ${event.name} - ${event.date.toLocaleDateString()} (${event.availableSeats}/${event.capacity} seats)`
      );
    });

    console.log('\n✓ Database seeding completed successfully');
  } catch (error) {
    console.error('✗ Error seeding database:', error.message);
  } finally {
    // Close MongoDB connection
    mongoose.connection.close();
  }
};

seedDatabase();
