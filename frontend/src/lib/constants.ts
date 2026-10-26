import { CategoryType, IRequirementFormData } from '@/types/requirement';

export const CATEGORIES: {
  id: CategoryType;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
}[] = [
  {
    id: 'planner',
    title: 'Event Planner',
    tagline: 'End-to-End Orchestration',
    description: 'Hire certified planners for full-scale design, vendor curation, themes, decor, and day-of execution.',
    iconName: 'Sparkles',
    accentColor: 'from-amber-500 to-orange-500',
    badgeBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    badgeText: 'Event Planner',
  },
  {
    id: 'performer',
    title: 'Performer / Artist',
    tagline: 'Stage & Entertainment',
    description: 'Book live music bands, solo vocalists, headline DJs, stand-up comedians, emcees, and entertainers.',
    iconName: 'Mic2',
    accentColor: 'from-purple-500 to-pink-500',
    badgeBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    badgeText: 'Performer',
  },
  {
    id: 'crew',
    title: 'Event Crew & Staff',
    tagline: 'Technical & On-Ground Operations',
    description: 'Staff your event with photographers, sound engineers, lighting technicians, stage hands, security, and ushers.',
    iconName: 'Users',
    accentColor: 'from-blue-500 to-cyan-500',
    badgeBg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    badgeText: 'Event Crew',
  },
];

export const EVENT_TYPES = [
  'Wedding & Reception',
  'Corporate Summit / Conference',
  'Music Concert / Fest',
  'Birthday Party & Milestone',
  'College Cultural Fest',
  'Private Luxury Gathering',
  'Product Launch',
  'Exhibition & Gala',
  'Other',
];

export const PLANNER_SERVICES = [
  'Full Event Planning & Execution',
  'Day-of Event Coordination',
  'Theme Conception & Decor Styling',
  'Catering & Menu Consultation',
  'Vendor Sourcing & Negotiation',
  'Audio/Visual & Lighting Setup',
  'Guest Logistics & Hospitality',
  'Artist & Entertainment Booking',
];

export const PERFORMER_TYPES = [
  'Live Music Band',
  'Solo Singer / Vocalist',
  'Electronic DJ / Club DJ',
  'Anchor / Master of Ceremonies (MC)',
  'Stand-up Comedian',
  'Magician / Illusionist',
  'Classical / Instrumental Ensemble',
  'Dance Troupe / Choreographers',
  'Celebrity Guest / Influencer',
];

export const MUSIC_GENRES = [
  'Bollywood Commercial',
  'EDM / Electronic',
  'Sufi & Ghazal',
  'Pop / Top 40',
  'Rock / Indie',
  'Punjabi / Bhangra',
  'Jazz & Blues',
  'Acoustic Unplugged',
  'Classical / Folk',
];

export const CREW_ROLES_OPTIONS = [
  'Event Photographer',
  'Cinematographer / 4K Videographer',
  'Live Stream & Video Switcher',
  'FOH Sound Engineer',
  'Stage Lighting Technician',
  'Stage Hand / Production Assistant',
  'Event Ushers & Hostesses',
  'Security & Bouncer Personnel',
  'Registration & Ticketing Desk',
];

export const THEME_VIBES_OPTIONS = [
  'Royal Rajputana Heritage',
  'Modern Minimalist Luxury',
  'Bohemian Chic Garden',
  'Bollywood Retro Glam',
  'Futuristic Cyber Neon',
  'Classic White Floral Elegance',
  'Rustic Vintage Farmhouse',
  'Tropical Beach Sunset',
];

export const CATERING_OPTIONS = [
  'Both (Separate Veg & Non-Veg Counters)',
  'Pure Vegetarian Only',
  'Jain Food Options Available',
  'No Catering Required',
];

export const SOUND_POLICIES = [
  'Host / Venue Provides Full PA & Sound System',
  'Performer Must Bring Own Sound Equipment',
  'Open to Discussion / Hybrid',
];

export const GEAR_POLICIES = [
  'Crew Must Bring Own Equipment',
  'Host / Venue Provides All Equipment',
  'Partial / Mixed (Venue Audio + Personal Cameras)',
];

export const AUDIENCE_PRESETS = [
  '50 - 200 Guests',
  '200 - 500 Guests',
  '500 - 1,500 Guests',
  '1,500 - 5,000 Guests',
  '5,000+ Massive Arena',
];

export const SAMPLE_PRESETS: Record<CategoryType, IRequirementFormData> = {
  planner: {
    category: 'planner',
    eventName: 'Royal Heritage Wedding of Vivaan & Ananya',
    eventType: 'Wedding & Reception',
    dateType: 'range',
    startDate: '2026-11-20',
    endDate: '2026-11-22',
    location: {
      city: 'Jaipur',
      state: 'Rajasthan',
      address: 'Near Amber Fort Road',
    },
    venue: 'Fairmont Jaipur Heritage Palace',
    plannerDetails: {
      servicesNeeded: [
        'Full Event Planning & Execution',
        'Theme Conception & Decor Styling',
        'Catering & Menu Consultation',
        'Guest Logistics & Hospitality',
      ],
      guestCount: 400,
      budgetMin: 3500000,
      budgetMax: 5000000,
      currency: 'INR',
      themeOrVibe: 'Grand royal Rajputana aesthetic with marigolds, brass lanterns, and fairy light canopies.',
      cateringPreference: 'Both (Separate vegetarian and non-vegetarian live counters)',
      specialInstructions: 'Need 3 days of coordinated hospitality including airport transfers for VIP guests.',
    },
    contact: {
      name: 'Vivaan Kapoor',
      email: 'vivaan.kapoor@example.com',
      phone: '+91 98765 12340',
    },
  },
  performer: {
    category: 'performer',
    eventName: 'Apex Global Tech Summit After-Party',
    eventType: 'Corporate Summit / Conference',
    dateType: 'single',
    startDate: '2026-12-05',
    location: {
      city: 'Bengaluru',
      state: 'Karnataka',
      address: 'Whitefield International Tech Park',
    },
    venue: 'Grand Ball Room, The Leela Palace',
    performerDetails: {
      performanceType: 'Electronic DJ / Club DJ',
      genres: ['EDM / Electronic', 'Bollywood Commercial', 'Pop / Top 40'],
      durationHours: 3.5,
      numberOfSets: 2,
      soundProvidedByHost: true,
      stageSpecifications: 'Pioneer CDJ 3000 + DJM-900NXS2 mixer setup with 2x stage monitors and wireless mic',
      audienceSize: 850,
      specialRequests: 'Upbeat high-energy corporate after-party vibe with interactive drops and custom corporate visual sync.',
    },
    contact: {
      name: 'Shreya Nambiar',
      email: 'shreya@apexsummit.io',
      phone: '+91 98112 88990',
    },
  },
  crew: {
    category: 'crew',
    eventName: 'Sunwaves Multi-Genre Music Festival',
    eventType: 'Music Concert / Fest',
    dateType: 'range',
    startDate: '2026-11-14',
    endDate: '2026-11-15',
    location: {
      city: 'Goa',
      state: 'Goa',
      address: 'Vagator Hilltop Arena',
    },
    venue: 'Vagator Open Air Arena',
    crewDetails: {
      rolesNeeded: [
        { role: 'Event Photographer', count: 4 },
        { role: 'Cinematographer / 4K Videographer', count: 3 },
        { role: 'FOH Sound Engineer', count: 2 },
        { role: 'Stage Lighting Technician', count: 2 },
        { role: 'Security & Bouncer Personnel', count: 8 },
        { role: 'Registration & Ticketing Desk', count: 6 },
      ],
      shiftStartTime: '02:00 PM',
      shiftEndTime: '01:30 AM',
      gearPolicy: 'Technical crew must bring personal cameras/lenses; Stage audio and truss lighting provided by festival',
      uniformRequired: true,
      mealsProvided: true,
      additionalNotes: 'All crew will receive official festival laminate badges. Mandatory briefing at 12:30 PM on Day 1.',
    },
    contact: {
      name: 'Kabir Sengupta',
      email: 'kabir@sunwavesfest.com',
      phone: '+91 98450 67891',
    },
  },
};
