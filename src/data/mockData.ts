import { Counselor, PeerRoom, PeerMessage, ScheduledSession } from '../types';

export const COUNSELORS: Counselor[] = [
  {
    id: 'jenkins',
    name: 'Dr. Sarah Jenkins',
    title: 'Dr. Sarah Jenkins, LPC',
    credential: 'LPC',
    licenseNumber: 'State Board Certified #MH-8849',
    affiliation: 'University Affiliate Counselor',
    rating: 5.0,
    reviewCount: 142,
    specialty: 'Academic Stress & Anxiety',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsxdljH_DSKYyhmqWiQ0zdu8uN3scqi5kK1A-Rmuju-HPaVdDs94re6hffR2a0nc3I4-jcyuJvqssu5f894Oq7O8pxcmcnT_Q1dRCczMwCmzsi2e17QI-fxvNOus6dOBK-ybQU2IOUzQXCgMb9AOsdD3rWOUt0F-DWNGV8boPNYDMAWVbhwPXwvC6D4uN4t2jNor8wmTrngcR7BkJNbvj7U4k_6VrDbffAe2Sbp2yBk03_6axvMeqU',
    availableText: 'Available Today',
    isAvailableToday: true,
    freeVoucherEligible: true,
    prices: {
      chat: 15,
      voice: 25,
      video: 35,
    },
    quote: '"Sarah helped me conquer my thesis defense panic attack with zero judgment. Best session I\'ve had on campus."',
    bio: 'Specializing in student mental wellness, imposter syndrome, high-stakes academic pressure, and somatic regulation.'
  },
  {
    id: 'rivera',
    name: 'Marcus Rivera',
    title: 'Marcus Rivera, LMFT',
    credential: 'LMFT',
    licenseNumber: 'State Board Certified #MH-6102',
    affiliation: 'Campus Peer & Crisis Specialist',
    rating: 4.8,
    reviewCount: 98,
    specialty: 'Life Transitions & Relationship Grief',
    avatarUrl: '',
    availableText: 'Available in 15 mins',
    isAvailableToday: true,
    freeVoucherEligible: true,
    prices: {
      chat: 15,
      voice: 25,
      video: 35,
    },
    quote: '"Marcus made talking about moving across the country and navigating family expectations so comfortable."',
    bio: 'Focusing on roommate dynamics, family boundaries, relationship grief, and college adjustment.'
  },
  {
    id: 'chen',
    name: 'Dr. Elena Chen',
    title: 'Dr. Elena Chen, PsyD',
    credential: 'PsyD',
    licenseNumber: 'State Board Certified #PS-4431',
    affiliation: 'Clinical Psychology Fellow',
    rating: 5.0,
    reviewCount: 210,
    specialty: 'First-Gen Student & Perfectionism',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813639-5095e09f7a5b?auto=format&fit=crop&w=400&q=80',
    availableText: 'Available Tomorrow',
    isAvailableToday: false,
    freeVoucherEligible: true,
    prices: {
      chat: 15,
      voice: 25,
      video: 35,
    },
    quote: '"She validated cultural dynamics my family never understood. Truly life changing."',
    bio: 'Expert in minority student identity, immigrant family expectations, and perfectionistic paralysis.'
  },
  {
    id: 'morales',
    name: 'David Morales',
    title: 'David Morales, LCSW',
    credential: 'LCSW',
    licenseNumber: 'State Board Certified #SW-9923',
    affiliation: 'Neurodiversity & Focus Consultant',
    rating: 4.9,
    reviewCount: 175,
    specialty: 'ADHD, Executive Dysfunction & Burnout',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    availableText: 'Available Today',
    isAvailableToday: true,
    freeVoucherEligible: true,
    prices: {
      chat: 15,
      voice: 25,
      video: 35,
    },
    quote: '"Practical strategies that actually worked with my ADHD brain instead of generic advice."',
    bio: 'Pragmatic neuro-affirming support for time blindness, task paralysis, and semester planning.'
  }
];

export const INITIAL_SCHEDULED_SESSIONS: ScheduledSession[] = [
  {
    id: 'sess-active',
    counselor: COUNSELORS[0],
    date: 'Today, Apr 18',
    time: '3:30 PM',
    mode: 'video',
    status: 'live',
    durationMinutes: 45,
    notes: 'Thesis defense regulation, 4-7-8 breathing practice, cognitive reframing on failure perception.',
    moodBefore: 3,
    moodAfter: 7,
  },
  {
    id: 'sess-past-1',
    counselor: COUNSELORS[1],
    date: 'Apr 11, 2026',
    time: '4:00 PM',
    mode: 'voice',
    status: 'completed',
    durationMinutes: 30,
    notes: 'Explored boundary setting with roommates during midterms. Grounding anchors established.',
    moodBefore: 4,
    moodAfter: 8,
  }
];

export const PEER_ROOMS: PeerRoom[] = [
  {
    id: 'finals',
    title: 'Finals & Midterms Anxiety',
    category: 'Academic Stress',
    activeCount: 38,
    description: 'Vent without judgment about exams, deadlines, and study burnout.',
    icon: 'school'
  },
  {
    id: 'night-owls',
    title: 'Late Night Overthinking Lounge',
    category: 'Sleep & Grounding',
    activeCount: 24,
    description: 'Can\'t shut your mind off at 2 AM? Quiet, slow-paced peer company.',
    icon: 'bedtime'
  },
  {
    id: 'first-gen',
    title: 'First-Generation College Voices',
    category: 'Identity & Community',
    activeCount: 19,
    description: 'Navigating financial aid, family guilt, and campus culture shock together.',
    icon: 'diversity_3'
  },
  {
    id: 'grad-thesis',
    title: 'Grad School & Thesis Support',
    category: 'Post-Grad',
    activeCount: 15,
    description: 'Advisor friction, imposter syndrome, and research roadblocks.',
    icon: 'history_edu'
  }
];

export const INITIAL_PEER_MESSAGES: Record<string, PeerMessage[]> = {
  finals: [
    {
      id: 'm1',
      author: 'Quiet Sparrow #812',
      avatarBg: 'bg-primary-fixed',
      content: 'Just finished my 3rd coffee. Chemistry exam in 4 hours and feel like my brain is frozen.',
      timestamp: '12m ago',
      isSelf: false,
      helpfulCount: 5
    },
    {
      id: 'm2',
      author: 'Mindful Panda #104',
      avatarBg: 'bg-secondary-fixed',
      content: 'Hey friend, close your eyes for 2 minutes and drink some actual water. Even 5 deep belly breaths help unclench your jaw!',
      timestamp: '9m ago',
      isSelf: false,
      helpfulCount: 11
    },
    {
      id: 'm3',
      author: 'Gentle Otter #312 (You)',
      avatarBg: 'bg-primary-fixed',
      content: 'I was in the same boat yesterday. Doing the 5-4-3-2-1 countdown right outside the lecture hall helped me calm down.',
      timestamp: '3m ago',
      isSelf: true,
      helpfulCount: 4
    }
  ],
  'night-owls': [
    {
      id: 'no1',
      author: 'Brave Koala #621',
      avatarBg: 'bg-secondary-fixed',
      content: 'Anyone else staring at the ceiling replaying something awkward from freshman year?',
      timestamp: '25m ago',
      isSelf: false,
      helpfulCount: 18
    },
    {
      id: 'no2',
      author: 'Steady Fox #409',
      avatarBg: 'bg-primary-fixed',
      content: 'Every single night haha. Put on the 4-7-8 audio reset in the explore tab, it knocked me out in 10 minutes last night.',
      timestamp: '14m ago',
      isSelf: false,
      helpfulCount: 8
    }
  ]
};

export const BURNOUT_QUESTIONS = [
  {
    id: 'q1',
    prompt: 'How often do you feel emotionally drained by your academic or coursework demands?',
    options: [
      { text: 'Never / Rarely', score: 0 },
      { text: 'A few times a month', score: 1 },
      { text: 'Once or twice a week', score: 2 },
      { text: 'Almost every single day', score: 3 }
    ]
  },
  {
    id: 'q2',
    prompt: 'Do you find yourself feeling detached, cynical, or indifferent toward assignments you used to care about?',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Occasionally when tired', score: 1 },
      { text: 'Frequently during this term', score: 2 },
      { text: 'Constantly feeling numb/cynical', score: 3 }
    ]
  },
  {
    id: 'q3',
    prompt: 'Even after a full night of sleep or a weekend break, do you wake up feeling unrefreshed and exhausted?',
    options: [
      { text: 'I feel rested after breaks', score: 0 },
      { text: 'Sometimes fatigued', score: 1 },
      { text: 'Often still tired', score: 2 },
      { text: 'Chronic exhaustion that won\'t lift', score: 3 }
    ]
  },
  {
    id: 'q4',
    prompt: 'How often do you feel like whatever effort you put in is never enough or won\'t make a difference?',
    options: [
      { text: 'Rarely, I feel effective', score: 0 },
      { text: 'Sometimes under heavy deadlines', score: 1 },
      { text: 'Frequent self-doubt', score: 2 },
      { text: 'Persistent sense of futility / failure', score: 3 }
    ]
  },
  {
    id: 'q5',
    prompt: 'Have you noticed difficulty concentrating, reading standard paragraphs, or remembering routine tasks?',
    options: [
      { text: 'Normal focus levels', score: 0 },
      { text: 'Mild brain fog during late nights', score: 1 },
      { text: 'Noticeable cognitive drag', score: 2 },
      { text: 'Severe brain fog & paralysis', score: 3 }
    ]
  },
  {
    id: 'q6',
    prompt: 'Do you isolate yourself or cancel plans with friends and family due to overwhelming academic dread?',
    options: [
      { text: 'I maintain healthy social connection', score: 0 },
      { text: 'Occasional need for quiet time', score: 1 },
      { text: 'Frequently canceling to isolate', score: 2 },
      { text: 'Total social withdrawal & dread', score: 3 }
    ]
  }
];
