import React, { useState } from 'react';
import { ScreenType, Counselor, SessionMode, UserProfile, ScheduledSession } from './types';
import { COUNSELORS, INITIAL_SCHEDULED_SESSIONS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ExploreView } from './views/ExploreView';
import { CounselorBookingView } from './views/CounselorBookingView';
import { LiveConsultationView } from './views/LiveConsultationView';
import { SessionsView } from './views/SessionsView';
import { ChatRoomsView } from './views/ChatRoomsView';
import { AccountView } from './views/AccountView';
import { SOSModal } from './components/SOSModal';
import { AudioReliefModal } from './components/AudioReliefModal';
import { BurnoutTestModal } from './components/BurnoutTestModal';
import { QuickExitModal } from './components/QuickExitModal';

export default function App() {
  // Navigation & Screen state
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('explore');
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor>(COUNSELORS[0]);
  const [preferredMode, setPreferredMode] = useState<SessionMode>('chat');

  // Modals state
  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);
  const [isAudioReliefOpen, setIsAudioReliefOpen] = useState<boolean>(false);
  const [isBurnoutTestOpen, setIsBurnoutTestOpen] = useState<boolean>(false);
  const [isStealthDisguised, setIsStealthDisguised] = useState<boolean>(false);

  // User Profile (Pseudonym & Settings)
  const [user, setUser] = useState<UserProfile>({
    alias: 'Gentle Otter #312',
    avatarAnimal: 'otter',
    ghostMode: true,
    universityDomain: 'State University (@campus.edu)',
    grantCreditsRemaining: 1,
    verifiedStudent: true,
  });

  // Scheduled sessions list
  const [sessions, setSessions] = useState<ScheduledSession[]>(INITIAL_SCHEDULED_SESSIONS);

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updated }));
  };

  const handleSelectCounselor = (counselor: Counselor, mode: SessionMode = 'chat') => {
    setSelectedCounselor(counselor);
    setPreferredMode(mode);
    setCurrentScreen('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmBooking = (details: {
    date: string;
    time: string;
    mode: SessionMode;
    cameraDisabled: boolean;
    voiceMask: boolean;
    voucherCode: string;
    total: number;
  }) => {
    const newSession: ScheduledSession = {
      id: 'sess-' + Date.now(),
      counselor: selectedCounselor,
      date: details.date,
      time: details.time,
      mode: details.mode,
      status: 'live',
      durationMinutes: 45,
      notes: 'Initial consultation intake on academic regulation and stress relief.',
      moodBefore: 5,
    };

    setSessions(prev => [newSession, ...prev]);
    setCurrentScreen('consultation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJoinSession = (session: ScheduledSession) => {
    setSelectedCounselor(session.counselor);
    setCurrentScreen('consultation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearData = () => {
    setUser(prev => ({
      ...prev,
      alias: 'Quiet Panda #402',
      grantCreditsRemaining: 1,
      ghostMode: true,
    }));
    setSessions(INITIAL_SCHEDULED_SESSIONS);
    alert('All local device data & session caches have been securely purged.');
  };

  const getHeaderProps = () => {
    if (currentScreen === 'booking') {
      return {
        title: 'Counselor Profile Details',
        showBack: true,
        onBack: () => setCurrentScreen('explore'),
      };
    }
    if (currentScreen === 'consultation') {
      return {
        title: 'Live Consultation Room',
        showBack: true,
        onBack: () => setCurrentScreen('explore'),
      };
    }
    if (currentScreen === 'sessions') {
      return {
        subtitle: 'Sessions & Care History',
        showBack: false,
      };
    }
    if (currentScreen === 'chat') {
      return {
        subtitle: 'Peer Lounges & DMs',
        showBack: false,
      };
    }
    if (currentScreen === 'account') {
      return {
        subtitle: 'Anonymous Sanctuary Settings',
        showBack: false,
      };
    }
    return {
      subtitle: 'Explore / Hub',
      showBack: false,
    };
  };

  const headerProps = getHeaderProps();

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#111c2d] flex flex-col justify-start items-center selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Container wrapper: mobile-first constraint matching screen designs */}
      <div className="w-full max-w-md min-h-screen bg-[#f9f9ff] flex flex-col relative shadow-xl overflow-x-hidden border-x border-surface-container/40">
        {/* Header */}
        <Header
          title={headerProps.title}
          subtitle={headerProps.subtitle}
          showBack={headerProps.showBack}
          onBack={headerProps.onBack}
          user={user}
          onOpenSOS={() => setIsSOSOpen(true)}
          onOpenAccount={() => setCurrentScreen('account')}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full pt-16 flex flex-col">
          {currentScreen === 'explore' && (
            <ExploreView
              user={user}
              onUpdateUser={handleUpdateUser}
              onSelectCounselor={handleSelectCounselor}
              onOpenAudioRelief={() => setIsAudioReliefOpen(true)}
              onOpenBurnoutTest={() => setIsBurnoutTestOpen(true)}
              onOpenPeerRooms={() => setCurrentScreen('chat')}
              onOpenSOS={() => setIsSOSOpen(true)}
            />
          )}

          {currentScreen === 'booking' && (
            <CounselorBookingView
              counselor={selectedCounselor}
              user={user}
              initialMode={preferredMode}
              onConfirmBooking={handleConfirmBooking}
            />
          )}

          {currentScreen === 'consultation' && (
            <LiveConsultationView
              counselor={selectedCounselor}
              user={user}
              onEndSession={() => setCurrentScreen('sessions')}
              onOpenSOS={() => setIsSOSOpen(true)}
            />
          )}

          {currentScreen === 'sessions' && (
            <SessionsView
              sessions={sessions}
              user={user}
              onJoinSession={handleJoinSession}
              onBookNew={() => {
                setSelectedCounselor(COUNSELORS[0]);
                setCurrentScreen('booking');
              }}
            />
          )}

          {currentScreen === 'chat' && <ChatRoomsView user={user} />}

          {currentScreen === 'account' && (
            <AccountView
              user={user}
              onUpdateUser={handleUpdateUser}
              onClearData={handleClearData}
            />
          )}
        </main>

        {/* Bottom Navigation (Shown except in live consultation) */}
        {currentScreen !== 'consultation' && currentScreen !== 'booking' && (
          <BottomNav
            currentTab={currentScreen}
            onSelectTab={tab => {
              setCurrentScreen(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            unreadChatCount={2}
          />
        )}

        {/* Global Modals */}
        <SOSModal
          isOpen={isSOSOpen}
          onClose={() => setIsSOSOpen(false)}
          onQuickDisguise={() => {
            setIsSOSOpen(false);
            setIsStealthDisguised(true);
          }}
        />

        <AudioReliefModal
          isOpen={isAudioReliefOpen}
          onClose={() => setIsAudioReliefOpen(false)}
        />

        <BurnoutTestModal
          isOpen={isBurnoutTestOpen}
          onClose={() => setIsBurnoutTestOpen(false)}
          onBookCounselor={() => {
            setSelectedCounselor(COUNSELORS[0]);
            setCurrentScreen('booking');
          }}
        />

        <QuickExitModal
          isOpen={isStealthDisguised}
          onResume={() => setIsStealthDisguised(false)}
        />
      </div>
    </div>
  );
}
