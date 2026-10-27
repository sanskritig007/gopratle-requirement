import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { Requirement } from '../models/Requirement.js';

dotenv.config();

const sampleRequirements = [
  {
    category: 'planner',
    eventName: 'Royal Destination Wedding of Aarav & Riya',
    eventType: 'Wedding',
    dateType: 'range',
    startDate: new Date('2026-12-15'),
    endDate: new Date('2026-12-18'),
    location: {
      city: 'Udaipur',
      state: 'Rajasthan',
      address: 'Near Lake Pichola',
    },
    venue: 'Jagmandir Island Palace',
    plannerDetails: {
      servicesNeeded: ['Full Planning & Coordination', 'Decor & Theme Styling', 'Catering & Hospitality', 'Vendor Management'],
      guestCount: 350,
      budgetMin: 2500000,
      budgetMax: 4000000,
      currency: 'INR',
      themeOrVibe: 'Regal Rajputana heritage with pastel floral touches and fairy lights',
      cateringPreference: 'Both (Separate vegetarian & non-vegetarian royal spread)',
      specialInstructions: 'Need complete coordination for Sangeet, Mehendi, and Varmala over 3 days.',
    },
    contact: {
      name: 'Aarav Singhania',
      email: 'aarav.singhania@example.com',
      phone: '+91 98765 43210',
    },
    status: 'open',
  },
  {
    category: 'performer',
    eventName: 'Sunburn Arena Pre-Party Fest',
    eventType: 'Concert',
    dateType: 'single',
    startDate: new Date('2026-11-28'),
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      address: 'BKC Ground, Bandra East',
    },
    venue: 'Jio World Garden',
    performerDetails: {
      performanceType: 'Electronic DJ & Live Percussionist',
      genres: ['EDM', 'Commercial House', 'Bollywood Electro'],
      durationHours: 3,
      numberOfSets: 2,
      soundProvidedByHost: true,
      budgetMin: 80000,
      budgetMax: 150000,
      currency: 'INR',
      stageSpecifications: 'Pioneer CDJ 3000 setup, minimum 4 stage monitors and CO2 cannon cues',
      audienceSize: 2200,
      specialRequests: 'High-energy closing set with crowd interaction.',
    },
    contact: {
      name: 'Rohan Mehra',
      email: 'rohan.sunburn@example.com',
      phone: '+91 98111 22334',
    },
    status: 'open',
  },
  {
    category: 'crew',
    eventName: 'TechInnovate Global Summit 2026',
    eventType: 'Conference',
    dateType: 'range',
    startDate: new Date('2026-11-10'),
    endDate: new Date('2026-11-12'),
    location: {
      city: 'Bengaluru',
      state: 'Karnataka',
      address: 'Whitefield Main Road',
    },
    venue: 'Bengaluru Marriott Hotel & Convention Centre',
    crewDetails: {
      rolesNeeded: [
        { role: 'Professional Event Photographer', count: 3 },
        { role: '4K Videographer & Livestream Operator', count: 2 },
        { role: 'Audio / Console Technician', count: 2 },
        { role: 'Registration Desk & Ushers', count: 6 },
        { role: 'Floor Security Personnel', count: 4 },
      ],
      shiftStartTime: '08:00 AM',
      shiftEndTime: '07:30 PM',
      gearPolicy: 'Technical crew must bring primary cameras/consoles; venue provides PA & display LED walls',
      uniformRequired: true,
      mealsProvided: true,
      budgetMin: 65000,
      budgetMax: 120000,
      currency: 'INR',
      additionalNotes: 'Strict punctuality required. Full event briefing on Day 1 at 7:00 AM.',
    },
    contact: {
      name: 'Neha Sharma',
      email: 'neha@techinnovate.io',
      phone: '+91 98222 33445',
    },
    status: 'open',
  },
];

async function seed() {
  try {
    await connectDB();
    console.log('🌱 Seeding sample GoPratle requirements...');
    await Requirement.deleteMany({});
    const created = await Requirement.insertMany(sampleRequirements);
    console.log(`✅ Seeded ${created.length} requirements successfully!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
