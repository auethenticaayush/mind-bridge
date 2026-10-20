import React, { useState, useEffect } from 'react';
import { Counselor, UserProfile } from '../types';

interface LiveConsultationViewProps {
  counselor: Counselor;
  user: UserProfile;
  onEndSession: () => void;
  onOpenSOS: () => void;
}

export const LiveConsultationView: React.FC<LiveConsultationViewProps> = ({
  counselor,
  user,
  onEndSession,
  onOpenSOS,
}) => {
  // Session countdown timer (starts at 28 mins 45 secs)
  const [remainingSeconds, setRemainingSeconds] = useState<number>(28 * 60 + 45);

  // Audio / Video states
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAvatarMode, setIsAvatarMode] = useState<boolean>(true);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState<boolean>(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState<boolean>(false);

  // Quick exit disguise
  const [isQuickExitDisguised, setIsQuickExitDisguised] = useState<boolean>(false);

  // Shared Regulation (Breathing sync)
  const [isBreathingSync, setIsBreathingSync] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathPrompt, setBreathPrompt] = useState<string>('Breathe gently together...');

  // Right Now Feeling rating
  const [moodRating, setMoodRating] = useState<number>(6);

  // Scratchpad notes
  const [scratchpadNotes, setScratchpadNotes] = useState<string>(
    'Anchor takeaway: When the anxiety spike hits, activate physiological sigh (2 quick inhales, 1 long exhale).'
  );
  const [notesSaved, setNotesSaved] = useState<boolean>(true);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string>('');

  // Live in-call messages with Dr. Jenkins
  const [inCallMessages, setInCallMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: counselor.name,
      text: "Welcome Gentle Otter. I have your audio stream encrypted and secure. Take your time, we are at your pace today.",
      time: "3:30 PM"
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');

  // Counselor video URL from provided attachment
  const counselorVideoUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBi2-4aMbNPF5sGg35rA5okwuoDsjLQ6g3NArcjFg51vFQAE3FhJknZvdIho9oUFgaU1xXnoNz9ATiYdd2r2izFz_cpK-Z-00ymOBlj2bMT0aXxOkUPPOf-pcvxu9Jc875jeF6DMTBW5miYfjsyJoXN6Gn3g3ysigokzrR1q43A5v8xFUwU_gVs3VQHXQhhjD44XAm4RQldupRwthQgaccj5u4RWW8Q8NVCx5EKScfujUjx9g468vrS';

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Breathing cycle sync
  useEffect(() => {
    if (!isBreathingSync) return;
    let phase = 0; // 0: inhale, 1: hold, 2: exhale
    const interval = setInterval(() => {
      if (phase === 0) {
        setBreathPhase('Inhale');
        setBreathPrompt('Inhale peace (4 seconds)...');
        phase = 1;
      } else if (phase === 1) {
        setBreathPhase('Hold');
        setBreathPrompt('Hold gently (4 seconds)...');
        phase = 2;
      } else {
        setBreathPhase('Exhale');
        setBreathPrompt('Release tension (4 seconds)...');
        phase = 0;
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isBreathingSync]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const moodDescriptions: Record<number, string> = {
    1: 'Overwhelmed (1/10)',
    2: 'Anxious (2/10)',
    3: 'Restless (3/10)',
    4: 'Guarded (4/10)',
    5: 'Neutral (5/10)',
    6: 'Centered (6/10)',
    7: 'Calm (7/10)',
    8: 'Grounded (8/10)',
    9: 'Refreshed (9/10)',
    10: 'Empowered (10/10)',
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setInCallMessages(prev => [
      ...prev,
      { sender: user.alias, text: userText, time: 'Now' }
    ]);
    setChatInput('');

    // Simulated counselor response
    setTimeout(() => {
      const responses = [
        "That's a very insightful reflection. Let's ground that thought together.",
        "You're doing great. Feel how your feet are resting on the floor right now.",
        "I hear you completely. Remember you have complete agency over your academic workload.",
        "Take a slow breath. Notice how much lighter your chest feels after naming that."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setInCallMessages(prev => [
        ...prev,
        { sender: counselor.name, text: randomResponse, time: 'Now' }
      ]);
    }, 1200);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScratchpadNotes(e.target.value);
    setNotesSaved(false);
    setTimeout(() => setNotesSaved(true), 600);
  };

  return (
    <div className="flex flex-col w-full relative pb-28 pt-2">
      {/* Discreet Cover Screen Modal (For Quick Exit) */}
      {isQuickExitDisguised && (
        <div className="fixed inset-0 z-50 bg-white text-gray-900 flex flex-col p-6 items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 mb-4">
            <span className="material-symbols-outlined text-[32px]">menu_book</span>
          </div>
          <h3 className="font-bold text-[20px] text-gray-900 mb-2">Academic Study Schedule</h3>
          <p className="text-[14px] text-gray-600 max-w-xs mb-6">
            MindBridge call paused in background mode. Your privacy is safe.
          </p>
          <button
            onClick={() => setIsQuickExitDisguised(false)}
            className="px-6 py-3 rounded-full bg-primary text-white font-semibold text-[14px] shadow-md active:scale-95 transition-transform"
            type="button"
          >
            Resume Tele-Consultation
          </button>
        </div>
      )}

      {/* Discreet Emergency Safety Banner */}
      <aside className="mx-4 mt-1 mb-3 bg-surface-container-high rounded-xl p-3 shadow-sm flex items-center justify-between gap-3 border border-surface-container">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-tertiary text-[17px]">shield_with_heart</span>
          </div>
          <p className="text-[12px] text-on-surface truncate">
            Feeling unsafe? Tap <span className="font-bold text-tertiary">SOS</span> for campus dispatch or 988 lifeline.
          </p>
        </div>
        <button
          onClick={onOpenSOS}
          className="shrink-0 px-2.5 py-1 bg-surface-container-lowest text-tertiary rounded-full text-[11px] font-bold shadow-sm active:scale-95 transition-transform flex items-center gap-1"
          type="button"
        >
          <span className="material-symbols-outlined text-[14px]">call</span>
          <span>988</span>
        </button>
      </aside>

      {/* Active Session Meta Bar */}
      <section className="px-4 mb-3 flex items-center justify-between">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <h2 className="font-bold text-[18px] text-on-surface truncate">
              {counselor.name}
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[12px] text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
              <span className="font-bold text-primary">{formatTimer(remainingSeconds)}</span> remaining
            </span>
            <span className="text-outline-variant text-[11px]">•</span>
            <span className="text-[11px] text-on-surface-variant flex items-center gap-0.5 bg-surface-container px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[13px] text-secondary">lock</span>
              256-bit Encrypted
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Exit Discreet Button */}
          <button
            onClick={() => setIsQuickExitDisguised(true)}
            className="w-10 h-10 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center active:scale-95 transition-all shadow-sm hover:bg-surface-container"
            title="Quick Discreet Exit (Disguises screen as study notes)"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">visibility_off</span>
          </button>

          {/* End Session */}
          <button
            onClick={onEndSession}
            className="px-3.5 py-2 rounded-full bg-tertiary-fixed text-tertiary font-bold text-[12px] flex items-center gap-1 shadow-sm active:scale-95 transition-all hover:bg-tertiary-fixed-dim"
            type="button"
          >
            <span className="material-symbols-outlined text-[17px]">call_end</span>
            <span>End</span>
          </button>
        </div>
      </section>

      {/* Dual Video Stage Area */}
      <section className="px-4 mb-4 relative">
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-surface-container-highest">
          {/* Counselor Video Stream */}
          <img
            className="w-full h-full object-cover"
            alt="Dr. Sarah Jenkins tele-consultation stream"
            src={counselorVideoUrl}
          />

          {/* Soft Gradient Scrim */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-inverse-surface/75 via-inverse-surface/25 to-transparent pointer-events-none"></div>

          {/* Live Status & Audio Waveform on Counselor stream */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-inverse-surface/85 backdrop-blur-md px-3 py-1.5 rounded-full text-inverse-on-surface shadow-md">
            <span className="text-[12px] font-medium">{counselor.name.split(' ')[1]}</span>
            {/* Dynamic Audio Wave Graphic */}
            <div className="flex items-center gap-0.5 h-3 ml-1">
              <span className="w-0.5 h-2 bg-primary-fixed rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
              <span className="w-0.5 h-3.5 bg-primary-fixed rounded-full animate-bounce" style={{ animationDelay: '0.25s' }}></span>
              <span className="w-0.5 h-2.5 bg-primary-fixed rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
              <span className="w-0.5 h-4 bg-primary-fixed rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
              <span className="w-0.5 h-1.5 bg-primary-fixed rounded-full animate-bounce" style={{ animationDelay: '0.05s' }}></span>
            </div>
          </div>

          {/* Counselor Connection Badge */}
          <div className="absolute top-3 left-3 bg-inverse-surface/65 backdrop-blur-md px-2.5 py-1 rounded-full text-inverse-on-surface flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-[14px] text-primary-fixed">wifi</span>
            <span className="text-[11px] font-medium">HD 1080p</span>
          </div>

          {/* Student PiP Window (Avatar Mode / Zero Anxiety) */}
          <div
            onClick={() => {
              setIsAvatarMode(!isAvatarMode);
              showToast(isAvatarMode ? 'Switched to Camera mode with soft blur' : 'Switched to Gentle Otter Avatar protection');
            }}
            className="absolute top-3 right-3 w-32 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-surface-container p-2 flex flex-col justify-between cursor-pointer transition-transform duration-200 hover:scale-105 border border-white/20"
            title="Click to toggle avatar / camera mode"
          >
            {/* Shield & Mode chip */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 bg-surface-container-lowest/90 px-1.5 py-0.5 rounded-full shadow-sm">
                <span className="material-symbols-outlined text-[12px] text-primary">verified_user</span>
                <span className="text-[10px] text-on-surface font-semibold">Protected</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-primary"></span>
            </div>

            {/* Otter Avatar Graphic Illustration */}
            <div className="flex flex-col items-center justify-center py-1">
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center shadow-inner relative overflow-hidden">
                <svg className="w-10 h-10 text-on-primary-fixed" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" fill="#a4f3ca" r="18"></circle>
                  <ellipse cx="24" cy="25" fill="#005236" rx="11" ry="10"></ellipse>
                  <circle cx="16" cy="18" fill="#005236" r="3.5"></circle>
                  <circle cx="32" cy="18" fill="#005236" r="3.5"></circle>
                  <ellipse cx="24" cy="27" fill="#a4f3ca" rx="6" ry="4.5"></ellipse>
                  <ellipse cx="24" cy="25.5" fill="#002113" rx="2" ry="1.2"></ellipse>
                  <circle cx="20.5" cy="23" fill="#ffffff" r="1.5"></circle>
                  <circle cx="27.5" cy="23" fill="#ffffff" r="1.5"></circle>
                  <path d="M19 28C21 30 27 30 29 28" stroke="#005236" strokeLinecap="round" strokeWidth="1.2"></path>
                </svg>
                <div className="absolute bottom-0 inset-x-0 h-3 bg-primary-container/20"></div>
              </div>
              <span className="text-[10px] text-on-surface font-semibold mt-1 truncate max-w-full text-center">
                {user.alias}
              </span>
            </div>

            {/* Bottom Mode Info Tag */}
            <div className="bg-surface-container-lowest/95 rounded-lg py-1 px-1.5 text-center">
              <p className="text-[9px] text-on-surface-variant flex items-center justify-center gap-0.5">
                <span className="material-symbols-outlined text-[10px] text-secondary">
                  {isAvatarMode ? 'videocam_off' : 'videocam'}
                </span>
                {isAvatarMode ? 'Camera Off' : 'Camera Live'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive In-Call Drawer / Toolkit */}
      <section className="px-4 mb-4">
        <div className="bg-surface-container-lowest rounded-3xl p-4 shadow-sm flex flex-col gap-4 border border-surface-container/60">
          {/* Interactive Breathing Sync Card */}
          <div className="bg-surface-container-low rounded-2xl p-3.5 flex flex-col gap-2 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                  <span className="material-symbols-outlined text-[19px]">air</span>
                </div>
                <div>
                  <p className="font-bold text-[14px] text-on-surface">Shared Regulation</p>
                  <p className="text-[12px] text-on-surface-variant">Synchronized with {counselor.name}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsBreathingSync(!isBreathingSync);
                  showToast(!isBreathingSync ? 'Breathing cadence synchronized with counselor' : 'Breathing guide paused');
                }}
                className={`px-3.5 py-1.5 rounded-full font-semibold text-[12px] shadow-sm active:scale-95 transition-all flex items-center gap-1 ${
                  isBreathingSync
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-white hover:bg-secondary/90'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isBreathingSync ? 'pause' : 'sync'}
                </span>
                <span>{isBreathingSync ? 'Stop Sync' : 'Sync (4-4-4)'}</span>
              </button>
            </div>

            {/* Breathing Sphere Interactive Visualizer (Expands on sync) */}
            {isBreathingSync && (
              <div className="flex flex-col items-center justify-center py-4 bg-surface-container-lowest rounded-xl animate-fadeIn">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-[13px] shadow-md transition-all duration-1000 ease-in-out ${
                    breathPhase === 'Inhale'
                      ? 'bg-primary-container scale-125'
                      : breathPhase === 'Hold'
                      ? 'bg-secondary scale-110'
                      : 'bg-primary scale-95'
                  }`}
                >
                  {breathPhase}
                </div>
                <p className="text-[12px] text-secondary font-semibold mt-3">{breathPrompt}</p>
              </div>
            )}
          </div>

          {/* Live Mood & Regulation Slider */}
          <div className="flex flex-col gap-2 bg-surface-container-low rounded-2xl p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">sentiment_calm</span>
                <span className="font-bold text-[14px] text-on-surface">Right Now Feeling</span>
              </div>
              <span className="text-[12px] text-primary font-bold bg-surface-container-lowest px-2.5 py-0.5 rounded-full shadow-sm">
                {moodDescriptions[moodRating] || `${moodRating}/10`}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <span className="material-symbols-outlined text-[18px] text-outline">sentiment_dissatisfied</span>
              <input
                className="w-full h-2 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary focus:outline-none"
                max="10"
                min="1"
                type="range"
                value={moodRating}
                onChange={e => setMoodRating(Number(e.target.value))}
              />
              <span className="material-symbols-outlined text-[18px] text-primary">sentiment_very_satisfied</span>
            </div>
          </div>

          {/* Real-Time Shared Collaborative Session Notes */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-secondary">stylus_note</span>
                <label className="font-bold text-[14px] text-on-surface" htmlFor="sharedNotesInput">
                  Private Session Scratchpad
                </label>
              </div>
              <span className="text-[11px] text-outline flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-primary">check_circle</span>
                {notesSaved ? 'Auto-saved' : 'Saving...'}
              </span>
            </div>

            <div className="relative bg-surface-container-low rounded-2xl p-3 border border-surface-container/60">
              <textarea
                id="sharedNotesInput"
                className="w-full bg-transparent text-[13px] text-on-surface placeholder:text-outline focus:outline-none resize-none"
                placeholder="Jot safe anchor thoughts, grounding takeaways, or coping mechanisms discussed..."
                rows={2}
                value={scratchpadNotes}
                onChange={handleNotesChange}
              />
              <div className="flex items-center justify-between mt-1 pt-2 border-t border-surface-container/40 text-outline">
                <div className="flex items-center gap-1 text-on-surface-variant text-[11px]">
                  <span className="material-symbols-outlined text-[14px]">visibility_lock</span>
                  Visible only to you during call
                </div>
                <button
                  onClick={() => setScratchpadNotes('')}
                  className="text-primary text-[12px] font-semibold hover:underline active:scale-95 transition-transform"
                  type="button"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Tele-Consultation Control Dock */}
      <section className="px-4 mb-2">
        <div className="bg-surface-container-lowest rounded-3xl p-3 shadow-md flex items-center justify-between gap-1.5 border border-surface-container/60">
          {/* Mic Mute Toggle */}
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              showToast(isMuted ? 'Microphone is live' : 'Microphone is now muted');
            }}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all active:scale-95 ${
              isMuted ? 'bg-amber-100 text-amber-800' : 'bg-surface-container-low hover:bg-surface-container'
            }`}
            type="button"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                isMuted ? 'bg-amber-200 text-amber-800' : 'bg-surface-container text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isMuted ? 'mic_off' : 'mic'}
              </span>
            </div>
            <span className="text-[11px] font-semibold">
              {isMuted ? 'Unmute' : 'Mute'}
            </span>
          </button>

          {/* Video Avatar / Cam Toggle */}
          <button
            onClick={() => {
              setIsAvatarMode(!isAvatarMode);
              showToast(isAvatarMode ? 'Camera mode enabled' : 'Avatar mode enabled');
            }}
            className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-secondary-fixed/50 hover:bg-secondary-fixed active:scale-95 transition-all"
            type="button"
          >
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-1">
              <span className="material-symbols-outlined text-[20px]">
                {isAvatarMode ? 'face' : 'videocam'}
              </span>
            </div>
            <span className="text-[11px] text-on-secondary-fixed font-semibold">
              {isAvatarMode ? 'Avatar' : 'Camera'}
            </span>
          </button>

          {/* Mode Switch (Voice Only / Text Chat Drawer) */}
          <button
            onClick={() => setIsChatDrawerOpen(!isChatDrawerOpen)}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all active:scale-95 ${
              isChatDrawerOpen ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container-low hover:bg-surface-container'
            }`}
            type="button"
          >
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface mb-1">
              <span className="material-symbols-outlined text-[20px]">chat_bubble_outline</span>
            </div>
            <span className="text-[11px] text-on-surface font-semibold">Chat Mode</span>
          </button>

          {/* Share Screen / Resources Drawer */}
          <button
            onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all active:scale-95 ${
              isResourcesOpen ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container-low hover:bg-surface-container'
            }`}
            type="button"
          >
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface mb-1">
              <span className="material-symbols-outlined text-[20px]">folder_open</span>
            </div>
            <span className="text-[11px] text-on-surface font-semibold">Resources</span>
          </button>

          {/* Safe Disconnect */}
          <button
            onClick={onEndSession}
            className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-error-container hover:bg-error-container/80 active:scale-95 transition-all"
            type="button"
          >
            <div className="w-10 h-10 rounded-full bg-error text-white flex items-center justify-center mb-1 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">call_end</span>
            </div>
            <span className="text-[11px] text-on-error-container font-semibold">Leave</span>
          </button>
        </div>
      </section>

      {/* In-Call Encrypted Live Chat Drawer */}
      {isChatDrawerOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 max-w-md mx-auto bg-surface-container-lowest rounded-t-3xl shadow-2xl border-t border-surface-container p-4 max-h-[75vh] flex flex-col animate-slideUp">
          <div className="flex items-center justify-between pb-3 border-b border-surface-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">lock</span>
              <h4 className="font-bold text-[15px] text-on-surface">E2E In-Call Chat with {counselor.name}</h4>
            </div>
            <button
              onClick={() => setIsChatDrawerOpen(false)}
              className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-3 space-y-2.5 max-h-60 scrollbar-none">
            {inCallMessages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl text-[13px] max-w-[85%] ${
                  msg.sender === user.alias
                    ? 'ml-auto bg-primary text-white rounded-br-xs'
                    : 'mr-auto bg-surface-container-low text-on-surface rounded-bl-xs'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] opacity-75 mb-0.5">
                  <span className="font-semibold">{msg.sender}</span>
                  <span>{msg.time}</span>
                </div>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-surface-container">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Type confidential note or query..."
              className="flex-1 px-4 py-2.5 rounded-full bg-surface-container-low text-[13px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-container shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      )}

      {/* In-Call Shared Resources Drawer */}
      {isResourcesOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 max-w-md mx-auto bg-surface-container-lowest rounded-t-3xl shadow-2xl border-t border-surface-container p-5 max-h-[75vh] flex flex-col animate-slideUp">
          <div className="flex items-center justify-between pb-3 border-b border-surface-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">folder_open</span>
              <h4 className="font-bold text-[15px] text-on-surface">Session Worksheets & Anchors</h4>
            </div>
            <button
              onClick={() => setIsResourcesOpen(false)}
              className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            >
              ✕
            </button>
          </div>

          <div className="py-3 space-y-2.5 overflow-y-auto">
            <div className="p-3 bg-surface-container-low rounded-2xl flex items-center justify-between">
              <div>
                <h5 className="font-semibold text-[13px] text-on-surface">5-4-3-2-1 Sensory Grounding Guide</h5>
                <p className="text-[11px] text-on-surface-variant">Rapid reset technique for acute test anxiety</p>
              </div>
              <span className="text-[11px] text-primary font-bold px-2 py-1 bg-surface-container-lowest rounded-lg">PDF</span>
            </div>

            <div className="p-3 bg-surface-container-low rounded-2xl flex items-center justify-between">
              <div>
                <h5 className="font-semibold text-[13px] text-on-surface">Cognitive Reframe Worksheet</h5>
                <p className="text-[11px] text-on-surface-variant">Challenging catastrophizing thoughts during finals</p>
              </div>
              <span className="text-[11px] text-primary font-bold px-2 py-1 bg-surface-container-lowest rounded-lg">PDF</span>
            </div>

            <div className="p-3 bg-surface-container-low rounded-2xl flex items-center justify-between">
              <div>
                <h5 className="font-semibold text-[13px] text-on-surface">Campus Academic Accommodations</h5>
                <p className="text-[11px] text-on-surface-variant">Confidential memo protocol for temporary medical relief</p>
              </div>
              <span className="text-[11px] text-secondary font-bold px-2 py-1 bg-surface-container-lowest rounded-lg">DOC</span>
            </div>
          </div>
        </div>
      )}

      {/* Grounding Micro-Interaction Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-full shadow-lg text-[12px] font-medium flex items-center gap-2 pointer-events-none animate-fadeIn">
          <span className="material-symbols-outlined text-[16px] text-primary-fixed">spa</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
