import React, { useState } from 'react';
import { Counselor, SessionMode, UserProfile } from '../types';
import { COUNSELORS } from '../data/mockData';

interface ExploreViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onSelectCounselor: (counselor: Counselor, preferredMode?: SessionMode) => void;
  onOpenAudioRelief: () => void;
  onOpenBurnoutTest: () => void;
  onOpenPeerRooms: () => void;
  onOpenSOS: () => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  user,
  onUpdateUser,
  onSelectCounselor,
  onOpenAudioRelief,
  onOpenBurnoutTest,
  onOpenPeerRooms,
  onOpenSOS,
}) => {
  const [selectedMood, setSelectedMood] = useState<string>('Exam Anxiety');
  const [activeSupportMode, setActiveSupportMode] = useState<'chat' | 'audio' | 'video'>('chat');
  const [claimedVoucher, setClaimedVoucher] = useState<boolean>(true);
  const [showConfidentialTooltip, setShowConfidentialTooltip] = useState<boolean>(false);
  const [showAllCounselors, setShowAllCounselors] = useState<boolean>(false);

  const moods = [
    { label: 'Overwhelmed', emoji: '🌊', tip: 'Slow down. You don’t have to solve everything this hour.' },
    { label: 'Exam Anxiety', emoji: '⚡', tip: 'Academic adrenaline is normal. Focus on 1 manageable task next.' },
    { label: 'Burnout', emoji: '🕯️', tip: 'Rest is not a reward—it is a physiological necessity.' },
    { label: 'Seeking Clarity', emoji: '🧭', tip: 'Talking through decisions with a neutral guide brings peace.' },
    { label: 'Just Talking', emoji: '☕', tip: 'Low-stakes human connection without judgment or expectations.' },
    { label: 'Imposter Fears', emoji: '🌱', tip: 'You were admitted on your merit. You belong here.' },
  ];

  const handleClaimVoucher = () => {
    setClaimedVoucher(true);
    onUpdateUser({ grantCreditsRemaining: Math.max(1, user.grantCreditsRemaining) });
  };

  const toggleGhostMode = () => {
    onUpdateUser({ ghostMode: !user.ghostMode });
  };

  const displayedCounselors = showAllCounselors ? COUNSELORS : COUNSELORS.slice(0, 2);

  return (
    <div className="flex flex-col w-full px-4 space-y-6 pb-28 pt-2">
      {/* Confidentiality Banner & Personalized Alias Greeting */}
      <section className="flex flex-col gap-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shadow-sm">
              <span className="material-symbols-outlined text-[20px] fill">pets</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] text-on-surface-variant leading-none">Safe Space Sanctuary</span>
              <h2 className="font-bold text-[20px] text-on-surface tracking-tight mt-0.5">
                Hi, {user.alias} 👋
              </h2>
            </div>
          </div>

          {/* Ghost Mode Toggle */}
          <button
            onClick={toggleGhostMode}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm transition-all active:scale-95 ${
              user.ghostMode
                ? 'bg-surface-container-high text-primary border border-primary/20'
                : 'bg-surface-container text-on-surface-variant'
            }`}
            title="Ghost Mode strictly masks your IP, camera, and device fingerprint"
          >
            <span
              className="material-symbols-outlined text-[16px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <span className="text-[11px] font-semibold text-on-surface">
              {user.ghostMode ? 'Ghost Mode' : 'Standard'}
            </span>
          </button>
        </div>

        {/* Anonymity Pledge Bar */}
        <div className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant shadow-sm border border-surface-container/60">
          <span className="material-symbols-outlined text-[18px] text-primary shrink-0">lock</span>
          <p className="text-[12px] leading-tight flex-1">
            <span className="font-semibold text-primary">100% Confidential</span> • Campus ID Not Shared • Encrypted
          </p>
          <button
            onClick={() => setShowConfidentialTooltip(prev => !prev)}
            className="text-outline hover:text-on-surface transition-colors shrink-0"
            type="button"
          >
            <span className="material-symbols-outlined text-[17px]">info</span>
          </button>

          {showConfidentialTooltip && (
            <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl z-30 text-[11px] leading-relaxed">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-primary-fixed">HIPAA & FERPA Shield</span>
                <button
                  onClick={() => setShowConfidentialTooltip(false)}
                  className="text-inverse-on-surface/70 hover:text-white"
                >
                  ✕
                </button>
              </div>
              Your university administration and professors will never receive individual consultation notes, session logs, or identity mappings. Consultations use temporary cryptographic pseudonyms.
            </div>
          )}
        </div>
      </section>

      {/* Mood Check-in Pill Carousel */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[14px] text-on-surface font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary">psychology_alt</span>
            How does your head feel right now?
          </span>
          <span className="text-[11px] text-on-surface-variant">Tap to ground</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
          {moods.map(m => {
            const isSelected = selectedMood === m.label;
            return (
              <button
                key={m.label}
                onClick={() => setSelectedMood(m.label)}
                type="button"
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-medium transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-primary-fixed text-on-primary-fixed font-bold shadow-sm ring-1 ring-primary/30'
                    : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Mood Empathetic Helper Banner */}
        {selectedMood && (
          <div className="px-3.5 py-2 rounded-xl bg-surface-container-low text-[12px] text-on-surface flex items-center gap-2 border border-primary/10 animate-fadeIn">
            <span className="text-primary font-bold">Anchor:</span>
            <span className="text-on-surface-variant flex-1">
              {moods.find(m => m.label === selectedMood)?.tip}
            </span>
          </div>
        )}
      </section>

      {/* Free 1st Session Student Promo Card */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-container via-primary to-on-primary-fixed-variant text-white p-4 shadow-md">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white">
              <span className="material-symbols-outlined text-[15px] fill">school</span>
              <span className="text-[11px] font-bold tracking-wide uppercase">Campus Grant Active</span>
            </div>
            <span className="text-[11px] bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-full font-bold">
              100% OFF
            </span>
          </div>

          <div>
            <h3 className="font-bold text-[20px] leading-tight">Free 1st Session Available</h3>
            <p className="text-[13px] text-on-primary-container opacity-95 mt-1 leading-snug">
              State University Health Grant Active — 1 free confidential counseling credit pre-loaded to your anonymous ID.
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-on-primary-container">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span className="text-[12px] font-medium">Auto-applied at checkout</span>
            </div>
            <button
              onClick={handleClaimVoucher}
              disabled={claimedVoucher}
              type="button"
              className={`px-4 py-2 rounded-full font-bold text-[12px] transition-all ${
                claimedVoucher
                  ? 'bg-primary-fixed text-on-primary-fixed cursor-default shadow-none'
                  : 'bg-white text-primary shadow-md hover:bg-surface-container-low active:scale-95'
              }`}
            >
              {claimedVoucher ? 'Claimed ✓' : 'Claim Voucher'}
            </button>
          </div>
        </div>
      </section>

      {/* Support Modes Selector (Interactive Tabs) */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[18px] text-on-surface tracking-tight">Choose Your Comfort</h3>
          <span className="text-[11px] text-secondary font-semibold">Zero Camera Pressure</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Mode 1: Peer Chat */}
          <button
            onClick={() => {
              setActiveSupportMode('chat');
              onOpenPeerRooms();
            }}
            type="button"
            className={`text-left p-3 rounded-2xl shadow-sm flex flex-col justify-between h-28 transition-all ${
              activeSupportMode === 'chat'
                ? 'bg-secondary-fixed text-on-secondary-fixed ring-2 ring-secondary'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-secondary-fixed-dim/60 flex items-center justify-center text-on-secondary-fixed">
              <span className="material-symbols-outlined text-[18px]">forum</span>
            </div>
            <div>
              <span className="text-[12px] font-bold block leading-tight">Instant 24/7</span>
              <span className="text-[11px] text-on-surface-variant leading-none">Peer Chat</span>
            </div>
          </button>

          {/* Mode 2: Audio Room */}
          <button
            onClick={() => setActiveSupportMode('audio')}
            type="button"
            className={`text-left p-3 rounded-2xl shadow-sm flex flex-col justify-between h-28 transition-all ${
              activeSupportMode === 'audio'
                ? 'bg-secondary-fixed text-on-secondary-fixed ring-2 ring-secondary'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">headset_mic</span>
            </div>
            <div>
              <span className="text-[12px] font-bold block leading-tight">Audio-Only</span>
              <span className="text-[11px] text-on-surface-variant leading-none">No Camera</span>
            </div>
          </button>

          {/* Mode 3: Professional Video */}
          <button
            onClick={() => setActiveSupportMode('video')}
            type="button"
            className={`text-left p-3 rounded-2xl shadow-sm flex flex-col justify-between h-28 transition-all ${
              activeSupportMode === 'video'
                ? 'bg-secondary-fixed text-on-secondary-fixed ring-2 ring-secondary'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">videocam</span>
            </div>
            <div>
              <span className="text-[12px] font-bold block leading-tight">Pro Video</span>
              <span className="text-[11px] text-on-surface-variant leading-none">Scheduled</span>
            </div>
          </button>
        </div>
      </section>

      {/* Find Certified Counselors Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[18px] text-on-surface tracking-tight">Campus Verified Counselors</h3>
            <p className="text-[13px] text-on-surface-variant">Confidential, licensed, university specialized</p>
          </div>
          <button
            onClick={() => setShowAllCounselors(prev => !prev)}
            className="text-[12px] text-primary font-semibold flex items-center hover:underline"
            type="button"
          >
            {showAllCounselors ? 'Show Less' : 'See All'}
            <span className="material-symbols-outlined text-[16px]">
              {showAllCounselors ? 'expand_less' : 'chevron_right'}
            </span>
          </button>
        </div>

        {/* Counselor Card 1: Dr. Sarah Jenkins */}
        <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm flex flex-col gap-3.5 border border-surface-container/60">
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <img
                alt="Dr. Sarah Jenkins, LPC"
                className="w-16 h-16 rounded-2xl object-cover shadow-inner"
                src={COUNSELORS[0].avatarUrl}
              />
              <div
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary-fixed border-2 border-surface-container-lowest flex items-center justify-center"
                title="Verified License"
              >
                <span className="material-symbols-outlined text-[10px] text-on-primary-fixed font-bold">check</span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h4 className="font-bold text-[16px] text-on-surface truncate">
                  {COUNSELORS[0].title}
                </h4>
                <div className="flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded-full shrink-0">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-container fill">star</span>
                  <span className="text-[11px] font-semibold text-on-surface">{COUNSELORS[0].rating}</span>
                  <span className="text-[11px] text-on-surface-variant font-normal">({COUNSELORS[0].reviewCount})</span>
                </div>
              </div>
              <p className="text-[13px] text-primary font-medium mt-0.5 truncate">{COUNSELORS[0].specialty}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="inline-flex items-center gap-1 text-[11px] text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  {COUNSELORS[0].availableText}
                </span>
                <span className="text-outline-variant text-[11px]">•</span>
                <span className="text-[11px] text-secondary font-medium">Free Voucher Eligible</span>
              </div>
            </div>
          </div>

          {/* Pricing & Support Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-surface-container-low text-[11px] text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant">chat_bubble_outline</span>
              Chat: <strong className="text-primary font-semibold">$15</strong>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-low text-[11px] text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant">mic</span>
              Voice: <strong className="text-primary font-semibold">$25</strong>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-low text-[11px] text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant">videocam</span>
              Video: <strong className="text-primary font-semibold">$35</strong>
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-[11px] text-on-surface-variant line-through">$35.00</span>
              <span className="text-[14px] font-bold text-primary">$0 with Grant</span>
            </div>
            <button
              onClick={() => onSelectCounselor(COUNSELORS[0])}
              type="button"
              className="px-5 py-2.5 rounded-full bg-primary text-white text-[12px] font-semibold shadow-sm hover:bg-primary-container active:scale-95 transition-all"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Counselor Card 2: Marcus Rivera */}
        <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm flex flex-col gap-3 border border-surface-container/60">
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary font-bold text-[22px]">
                MR
              </div>
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary"></span>
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h4 className="font-bold text-[16px] text-on-surface truncate">
                  {COUNSELORS[1].title}
                </h4>
                <div className="flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded-full shrink-0">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-container fill">star</span>
                  <span className="text-[11px] font-semibold text-on-surface">{COUNSELORS[1].rating}</span>
                  <span className="text-[11px] text-on-surface-variant font-normal">({COUNSELORS[1].reviewCount})</span>
                </div>
              </div>
              <p className="text-[13px] text-primary font-medium mt-0.5 truncate">{COUNSELORS[1].specialty}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed-dim text-on-primary-fixed-variant text-[11px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  {COUNSELORS[1].availableText}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-secondary">headset</span>
              <span className="text-[11px]">Audio & Peer Bridge Ready</span>
            </div>
            <button
              onClick={() => onSelectCounselor(COUNSELORS[1], 'voice')}
              type="button"
              className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface text-[12px] font-semibold hover:bg-surface-variant active:scale-95 transition-all"
            >
              Quick Match
            </button>
          </div>
        </div>

        {/* Additional Counselors if Expanded */}
        {showAllCounselors && displayedCounselors.slice(2).map(c => (
          <div key={c.id} className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm flex flex-col gap-3 border border-surface-container/60">
            <div className="flex items-start gap-3">
              <img
                alt={c.name}
                className="w-16 h-16 rounded-2xl object-cover shadow-inner shrink-0"
                src={c.avatarUrl}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-bold text-[16px] text-on-surface truncate">{c.title}</h4>
                  <div className="flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded-full shrink-0">
                    <span className="material-symbols-outlined text-[14px] text-tertiary-container fill">star</span>
                    <span className="text-[11px] font-semibold text-on-surface">{c.rating}</span>
                  </div>
                </div>
                <p className="text-[13px] text-primary font-medium mt-0.5 truncate">{c.specialty}</p>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-on-surface-variant">
                  <span>{c.availableText}</span>
                  <span>•</span>
                  <span className="text-secondary font-medium">Free Voucher Eligible</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[13px] font-bold text-primary">$0 with Voucher</span>
              <button
                onClick={() => onSelectCounselor(c)}
                type="button"
                className="px-4 py-2 rounded-full bg-primary text-white text-[12px] font-semibold hover:bg-primary-container active:scale-95 transition-all"
              >
                View Profile & Slots
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Interactive Relief Tool Snippets */}
      <section className="flex flex-col gap-2.5">
        <h3 className="font-bold text-[18px] text-on-surface tracking-tight">Micro-Grounding Tools</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {/* Tool 1: Audio Relief */}
          <div
            onClick={onOpenAudioRelief}
            className="p-3.5 rounded-2xl bg-surface-container-low shadow-sm flex flex-col justify-between gap-3 group cursor-pointer active:scale-95 transition-all hover:bg-surface-container border border-surface-container/60"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shadow-sm">
                <span className="material-symbols-outlined text-[20px] fill">graphic_eq</span>
              </div>
              <span className="text-[11px] text-primary font-bold px-2 py-0.5 rounded-full bg-surface-container-lowest">
                5 Min
              </span>
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-on-surface leading-snug">Panic Relief Audio</h4>
              <p className="text-[12px] text-on-surface-variant leading-tight mt-1">Guided soothing 4-7-8 voice reset</p>
            </div>
            <div className="flex items-center gap-1 text-primary text-[11px] font-semibold group-hover:translate-x-0.5 transition-transform">
              <span>Listen now</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </div>

          {/* Tool 2: Burnout Quick Test */}
          <div
            onClick={onOpenBurnoutTest}
            className="p-3.5 rounded-2xl bg-surface-container-low shadow-sm flex flex-col justify-between gap-3 group cursor-pointer active:scale-95 transition-all hover:bg-surface-container border border-surface-container/60"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shadow-sm">
                <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
              </div>
              <span className="text-[11px] text-secondary font-bold px-2 py-0.5 rounded-full bg-surface-container-lowest">
                2 Min
              </span>
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-on-surface leading-snug">Academic Burnout Test</h4>
              <p className="text-[12px] text-on-surface-variant leading-tight mt-1">Anonymous 6-question clinical screener</p>
            </div>
            <div className="flex items-center gap-1 text-secondary text-[11px] font-semibold group-hover:translate-x-0.5 transition-transform">
              <span>Start check</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Hotline Reassurance & 1-Tap Trigger */}
      <section className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm flex items-center justify-between gap-3 border border-surface-container/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
            <span className="material-symbols-outlined text-[22px]">ring_volume</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider">In Deep Distress?</span>
            <span className="text-[14px] font-semibold text-on-surface leading-tight">988 Suicide & Crisis Lifeline</span>
            <span className="text-[12px] text-on-surface-variant">Free, confidential, 24/7 call or text</span>
          </div>
        </div>
        <button
          onClick={onOpenSOS}
          type="button"
          className="shrink-0 px-3.5 py-2 rounded-full bg-tertiary text-white text-[12px] font-bold shadow-sm hover:bg-tertiary-container active:scale-95 transition-all flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">call</span>
          <span>Call 988</span>
        </button>
      </section>
    </div>
  );
};
