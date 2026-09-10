// ─── Courses ────────────────────────────────────────────────────────────────
export const courses = [
  {
    id: 1,
    title: 'Road Signs & Markings',
    description: 'Master all regulatory, warning, and information signs used on South African roads.',
    lessons: 12,
    duration: '3h 20m',
    progress: 75,
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    tag: 'Core Module',
    tagColor: 'bg-blue-500/20 text-blue-300',
    instructor: 'Themba Dlamini',
  },
  {
    id: 2,
    title: 'Rules of the Road',
    description: 'Comprehensive coverage of traffic laws, right-of-way rules, and legal obligations.',
    lessons: 18,
    duration: '4h 45m',
    progress: 40,
    thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80',
    tag: 'Core Module',
    tagColor: 'bg-blue-500/20 text-blue-300',
    instructor: 'Themba Dlamini',
  },
  {
    id: 3,
    title: 'Vehicle Controls & Safety',
    description: 'Learn about dashboard instruments, safety features, and pre-trip inspections.',
    lessons: 10,
    duration: '2h 55m',
    progress: 10,
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80',
    tag: 'Core Module',
    tagColor: 'bg-blue-500/20 text-blue-300',
    instructor: 'Themba Dlamini',
  },
  {
    id: 4,
    title: 'Emergency Procedures',
    description: 'Handle breakdowns, accidents, and emergency situations on the road.',
    lessons: 8,
    duration: '2h 10m',
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=400&q=80',
    tag: 'Safety',
    tagColor: 'bg-red-500/20 text-red-300',
    instructor: 'Themba Dlamini',
  },
  {
    id: 5,
    title: 'Exam Preparation Masterclass',
    description: 'Targeted revision of the most-tested K53 topics with exam-strategy tips.',
    lessons: 15,
    duration: '3h 50m',
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80',
    tag: 'Pro',
    tagColor: 'bg-purple-500/20 text-purple-300',
    instructor: 'Themba Dlamini',
  },
  {
    id: 6,
    title: 'Light Motor Vehicle Controls',
    description: 'Practical theory on clutch control, gear changes, and steering techniques.',
    lessons: 9,
    duration: '2h 30m',
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80',
    tag: 'Code 8',
    tagColor: 'bg-green-500/20 text-green-300',
    instructor: 'Themba Dlamini',
  },
];

// ─── Question Bank ───────────────────────────────────────────────────────────
export const questions = [
  {
    id: 1,
    topic: 'Road Signs',
    question: 'A red circular sign with a white horizontal bar means:',
    options: ['No entry', 'Stop ahead', 'Give way', 'No parking'],
    correct: 0,
    explanation: 'A red circle with a white horizontal bar is the internationally recognised "No Entry" sign — vehicles are prohibited from entering.',
  },
  {
    id: 2,
    topic: 'Rules of the Road',
    question: 'When two vehicles arrive at an uncontrolled intersection simultaneously, who has the right of way?',
    options: [
      'The vehicle on the left',
      'The vehicle on the right',
      'The larger vehicle',
      'Either vehicle',
    ],
    correct: 1,
    explanation: 'Under the K53 rule, when two vehicles arrive simultaneously at an uncontrolled intersection, the vehicle on the RIGHT has the right of way.',
  },
  {
    id: 3,
    topic: 'Road Signs',
    question: 'A yellow diamond-shaped sign indicates:',
    options: ['A regulatory instruction', 'A warning of a hazard ahead', 'An information guide', 'A temporary sign'],
    correct: 1,
    explanation: 'Yellow (or orange) diamond-shaped signs are WARNING signs — they alert drivers to potential hazards ahead.',
  },
  {
    id: 4,
    topic: 'Vehicle Controls',
    question: 'What does the red oil pressure warning light indicate?',
    options: [
      'Oil level is low and needs topping up',
      'Oil pressure is critically low — stop safely immediately',
      'Time for a routine oil service',
      'Oil temperature is too high',
    ],
    correct: 1,
    explanation: 'A red oil pressure light means dangerously low oil pressure. Continue driving and you risk severe engine damage. Stop safely as soon as possible.',
  },
  {
    id: 5,
    topic: 'Rules of the Road',
    question: 'The minimum following distance at 60 km/h in good conditions is:',
    options: ['1 second', '2 seconds', '3 seconds', '4 seconds'],
    correct: 1,
    explanation: 'The two-second rule applies in good conditions. Increase to at least four seconds in wet or poor visibility conditions.',
  },
  {
    id: 6,
    topic: 'Road Signs',
    question: 'A blue circular sign conveys:',
    options: ['A prohibition', 'A warning', 'A mandatory instruction', 'Route information'],
    correct: 2,
    explanation: 'Blue circular signs are MANDATORY — drivers must obey the instruction shown (e.g. minimum speed, keep left).',
  },
  {
    id: 7,
    topic: 'Vehicle Controls',
    question: 'Before moving off from a parked position you should:',
    options: [
      'Check mirrors only',
      'Signal, check mirrors, check blind spots, then move',
      'Sound the horn to warn other road users',
      'Move off and then check mirrors',
    ],
    correct: 1,
    explanation: 'The correct sequence is Mirror–Signal–Blind spot check before any movement. This covers all potential hazard zones.',
  },
  {
    id: 8,
    topic: 'Emergency Procedures',
    question: 'If your brakes fail while driving, you should first:',
    options: [
      'Apply the handbrake hard immediately',
      'Pump the brake pedal to build pressure, then engine-brake by downshifting',
      'Turn off the ignition',
      'Swerve off the road immediately',
    ],
    correct: 1,
    explanation: 'Pumping can restore partial hydraulic pressure. Engine braking by downshifting adds further deceleration. The handbrake is a last resort as hard application can lock rear wheels and cause a spin.',
  },
];

// ─── Live Sessions ───────────────────────────────────────────────────────────
export const liveSessions = [
  {
    id: 1,
    title: 'Exam Prep: Road Signs Deep Dive',
    date: '2026-09-11',
    time: '18:00',
    duration: '90 min',
    instructor: 'Themba Dlamini',
    attendees: 128,
    status: 'upcoming',
    type: 'exam-prep',
  },
  {
    id: 2,
    title: 'Rules of the Road — Live Q&A',
    date: '2026-09-14',
    time: '10:00',
    duration: '60 min',
    instructor: 'Themba Dlamini',
    attendees: 95,
    status: 'upcoming',
    type: 'q-and-a',
  },
  {
    id: 3,
    title: 'Mock Exam Practice Session',
    date: '2026-09-09',
    time: '14:00',
    duration: '120 min',
    instructor: 'Themba Dlamini',
    attendees: 210,
    status: 'live',
    type: 'mock-exam',
  },
  {
    id: 4,
    title: 'Vehicle Controls Masterclass',
    date: '2026-09-18',
    time: '17:00',
    duration: '75 min',
    instructor: 'Themba Dlamini',
    attendees: 76,
    status: 'upcoming',
    type: 'masterclass',
  },
  {
    id: 5,
    title: 'Emergency Procedures Walkthrough',
    date: '2026-08-30',
    time: '11:00',
    duration: '60 min',
    instructor: 'Themba Dlamini',
    attendees: 183,
    status: 'completed',
    type: 'masterclass',
  },
];

// ─── Students (Admin) ────────────────────────────────────────────────────────
export const students = [
  { id: 1, name: 'Amahle Ndlovu',  email: 'amahle@email.com',  plan: 'Pro',     joined: '2026-07-12', status: 'active',   progress: 68, score: 82 },
  { id: 2, name: 'Sipho Mokoena',  email: 'sipho@email.com',   plan: 'Basic',   joined: '2026-08-01', status: 'active',   progress: 34, score: 61 },
  { id: 3, name: 'Keabetswe Tau',  email: 'keabetswe@email.com',plan: 'Premium', joined: '2026-06-20', status: 'active',   progress: 91, score: 94 },
  { id: 4, name: 'Lethiwe Khumalo',email: 'lethiwe@email.com', plan: 'Pro',     joined: '2026-08-15', status: 'inactive', progress: 12, score: 45 },
  { id: 5, name: 'Ntokozo Sithole',email: 'ntokozo@email.com', plan: 'Basic',   joined: '2026-09-01', status: 'active',   progress: 5,  score: 50 },
  { id: 6, name: 'Zanele Dube',    email: 'zanele@email.com',  plan: 'Premium', joined: '2026-07-28', status: 'active',   progress: 79, score: 88 },
];

// ─── Revenue (Instructor) ────────────────────────────────────────────────────
export const revenueData = [
  { month: 'Apr', revenue: 8400,  students: 42 },
  { month: 'May', revenue: 11200, students: 56 },
  { month: 'Jun', revenue: 9800,  students: 49 },
  { month: 'Jul', revenue: 14600, students: 73 },
  { month: 'Aug', revenue: 16200, students: 81 },
  { month: 'Sep', revenue: 18900, students: 94 },
];

export const planBreakdown = [
  { name: 'Basic',    value: 34, color: '#3b82f6' },
  { name: 'Pro',      value: 42, color: '#8b5cf6' },
  { name: 'Premium',  value: 18, color: '#f97316' },
  { name: 'Lifetime', value: 6,  color: '#10b981' },
];

// ─── Chatbot responses ───────────────────────────────────────────────────────
export const chatResponses = {
  default: "I'm your K53 AI tutor. Ask me anything about road signs, rules of the road, vehicle controls, or the licence application process!",
  keywords: [
    {
      keys: ['sign', 'signs', 'road sign'],
      response: "South African road signs fall into three categories: **Regulatory** (round, red border — must obey), **Warning** (yellow diamond — hazard ahead), and **Guidance** (rectangular, blue/green — information). Want me to recommend a specific lesson?",
    },
    {
      keys: ['stop', 'stop sign'],
      response: "A STOP sign requires a complete stop — wheels must be stationary — before the stop line. You must wait until the road is clear before proceeding. Rolling stops are a common reason for test failures!",
    },
    {
      keys: ['yield', 'give way'],
      response: "A YIELD (Give Way) sign means slow down and be prepared to stop. You must give right of way to cross-traffic and only proceed when safe. Unlike a STOP sign, a full stop is not always required.",
    },
    {
      keys: ['speed', 'speed limit'],
      response: "Default speed limits in South Africa: **60 km/h** in urban areas, **100 km/h** on rural roads, and **120 km/h** on freeways — unless posted signs indicate otherwise.",
    },
    {
      keys: ['brake', 'braking', 'emergency brake'],
      response: "For emergency braking: apply firm, progressive pressure — don't stomp. On ABS-equipped vehicles, hold the pedal down and steer around the hazard. On non-ABS, use cadence braking (pump) to maintain steering. Check the Emergency Procedures module for a full walkthrough.",
    },
    {
      keys: ['book', 'booking', 'test', 'natis', 'appointment'],
      response: "To book your K53 learner's licence test: 1) Visit your nearest Traffic Department or use the online eNaTIS portal. 2) Bring your ID, proof of address, and the required fee. 3) Complete the eyesight test on the day. Booking via eNaTIS is generally faster — I can guide you through it!",
    },
    {
      keys: ['drunk', 'alcohol', 'dui'],
      response: "The legal blood-alcohol limit in South Africa is **0.05 g/100 ml** (0.02 g/100 ml for professional drivers). The breath-alcohol limit is **0.24 mg/1000 ml**. Driving over the limit is a criminal offence.",
    },
    {
      keys: ['follow', 'following', 'distance'],
      response: "Use the **two-second rule** in normal conditions: pick a fixed point, and your vehicle should pass it at least two seconds after the vehicle ahead. Double to four seconds in wet weather or poor visibility.",
    },
  ],
};
