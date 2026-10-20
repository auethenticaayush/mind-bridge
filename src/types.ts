export type ScreenType = 'explore' | 'booking' | 'consultation' | 'sessions' | 'chat' | 'account';

export type SessionMode = 'chat' | 'voice' | 'video';

export interface Counselor {
  id: string;
  name: string;
  title: string;
  credential: string;
  licenseNumber: string;
  affiliation: string;
  rating: number;
  reviewCount: number;
  specialty: string;
  avatarUrl: string;
  availableText: string;
  isAvailableToday: boolean;
  freeVoucherEligible: boolean;
  prices: {
    chat: number;
    voice: number;
    video: number;
  };
  quote: string;
  bio: string;
}

export interface BookingSlot {
  date: string;
  time: string;
  mode: SessionMode;
  counselorId: string;
  counselorName: string;
  anonymitySettings: {
    cameraDisabled: boolean;
    voiceMask: boolean;
  };
  voucherCode: string;
  totalCost: number;
}

export interface ScheduledSession {
  id: string;
  counselor: Counselor;
  date: string;
  time: string;
  mode: SessionMode;
  status: 'upcoming' | 'completed' | 'live';
  durationMinutes: number;
  notes?: string;
  moodBefore?: number;
  moodAfter?: number;
}

export interface UserProfile {
  alias: string;
  avatarAnimal: string;
  ghostMode: boolean;
  universityDomain: string;
  grantCreditsRemaining: number;
  verifiedStudent: boolean;
}

export interface PeerRoom {
  id: string;
  title: string;
  category: string;
  activeCount: number;
  description: string;
  icon: string;
}

export interface PeerMessage {
  id: string;
  author: string;
  avatarBg: string;
  content: string;
  timestamp: string;
  isSelf: boolean;
  helpfulCount: number;
}
