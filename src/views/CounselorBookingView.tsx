import React, { useState } from 'react';
import { Counselor, SessionMode, UserProfile } from '../types';

interface CounselorBookingViewProps {
  counselor: Counselor;
  user: UserProfile;
  initialMode?: SessionMode;
  onConfirmBooking: (slotDetails: {
    date: string;
    time: string;
    mode: SessionMode;
    cameraDisabled: boolean;
    voiceMask: boolean;
    voucherCode: string;
    total: number;
  }) => void;
}

export const CounselorBookingView: React.FC<CounselorBookingViewProps> = ({
  counselor,
  initialMode = 'chat',
  onConfirmBooking,
}) => {
  const [selectedMode, setSelectedMode] = useState<SessionMode>(initialMode);
  const [selectedDate, setSelectedDate] = useState<string>('Today, Apr 18');
  const [selectedSlot, setSelectedSlot] = useState<string>('3:30 PM');
  const [cameraDisabled, setCameraDisabled] = useState<boolean>(true);
  const [voiceMask, setVoiceMask] = useState<boolean>(false);
  const [voucherCode, setVoucherCode] = useState<string>('UNIV-WELL-2025');
  const [voucherApplied, setVoucherApplied] = useState<boolean>(true);
  const [voucherAlert, setVoucherAlert] = useState<string>('');

  const dates = [
    { label: 'Today', sub: 'Apr 18', full: 'Today, Apr 18' },
    { label: 'Tomorrow', sub: 'Apr 19', full: 'Tomorrow, Apr 19' },
    { label: 'Fri', sub: 'Apr 20', full: 'Fri, Apr 20' },
    { label: 'Sat', sub: 'Apr 21', full: 'Sat, Apr 21' },
    { label: 'Mon', sub: 'Apr 23', full: 'Mon, Apr 23' },
  ];

  const slots = [
    { time: '2:00 PM', badge: '' },
    { time: '3:30 PM', badge: 'Next Soon' },
    { time: '5:00 PM', badge: '' },
    { time: '6:30 PM', badge: '' },
  ];

  // Pricing calculation
  const getBasePrice = () => {
    if (selectedMode === 'chat') return counselor.prices.chat;
    if (selectedMode === 'voice') return counselor.prices.voice;
    return counselor.prices.video;
  };

  const basePrice = getBasePrice();
  // With campus voucher UNIV-WELL-2025, first $25 or $15 is 100% subsidized
  const discountAmount = voucherApplied ? (selectedMode === 'video' ? 25 : basePrice) : 0;
  const totalDue = Math.max(0, basePrice - discountAmount);

  const getModeTitle = () => {
    if (selectedMode === 'chat') return 'Encrypted Chat';
    if (selectedMode === 'voice') return 'Voice Call';
    return 'HD Video';
  };

  const handleApplyVoucher = () => {
    if (voucherCode.trim().toUpperCase() === 'UNIV-WELL-2025' || voucherCode.trim().length > 3) {
      setVoucherApplied(true);
      setVoucherAlert('✓ Campus Grant Applied: 100% Student Subsidy');
      setTimeout(() => setVoucherAlert(''), 3000);
    } else {
      setVoucherApplied(false);
      setVoucherAlert('Invalid voucher code');
      setTimeout(() => setVoucherAlert(''), 3000);
    }
  };

  const handleConfirm = () => {
    onConfirmBooking({
      date: selectedDate,
      time: selectedSlot,
      mode: selectedMode,
      cameraDisabled,
      voiceMask,
      voucherCode,
      total: totalDue,
    });
  };

  return (
    <div className="flex flex-col w-full px-4 pb-32 pt-2">
      {/* Top Counselor Profile Card */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-5 shadow-sm relative overflow-hidden border border-surface-container/60">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full pointer-events-none"></div>

        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            {counselor.avatarUrl ? (
              <img
                alt={counselor.title}
                className="w-20 h-20 rounded-full object-cover shadow-sm ring-2 ring-primary-fixed"
                src={counselor.avatarUrl}
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-2xl shadow-sm">
                MR
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full ring-2 ring-surface-container-lowest"></span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-[18px] text-on-surface truncate">
                {counselor.name}
              </span>
              <span className="text-[12px] text-on-surface-variant font-medium">
                {counselor.credential}
              </span>
            </div>

            <div className="flex items-center gap-1.5 mt-1">
              <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
              <span className="text-[12px] text-on-surface-variant">
                {counselor.licenseNumber}
              </span>
            </div>

            <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-medium">
              <span className="material-symbols-outlined text-[13px] text-primary">school</span>
              <span>{counselor.affiliation}</span>
            </div>
          </div>
        </div>

        {/* Rating & Verification Metric */}
        <div className="flex items-center gap-3 mt-4 pt-3.5 bg-surface-container-low/70 rounded-xl px-3 py-2">
          <div className="flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-[18px] fill">star</span>
            <span className="font-bold text-[14px] text-on-surface">{counselor.rating.toFixed(1)}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
          <span className="text-[12px] text-on-surface-variant">
            {counselor.reviewCount} verified student sessions
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-primary font-semibold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Available Today
          </span>
        </div>

        {/* Student Testimonial Micro-quote */}
        <div className="mt-3.5 p-3 rounded-xl bg-surface-container-lowest flex items-start gap-2.5 shadow-sm border border-surface-container/60">
          <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">format_quote</span>
          <p className="text-[13px] text-on-surface italic line-clamp-2 leading-relaxed">
            {counselor.quote}
          </p>
        </div>
      </div>

      {/* Mode Selection Tabs (Interactive) */}
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[18px] text-on-surface">Select Session Mode</h2>
          <span className="text-[11px] text-primary font-medium flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            100% Confidential
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 mt-1">
          {/* Option A: Chat */}
          <button
            type="button"
            onClick={() => setSelectedMode('chat')}
            className={`w-full text-left p-3.5 rounded-2xl bg-surface-container-lowest transition-all shadow-sm flex items-center justify-between border ${
              selectedMode === 'chat'
                ? 'ring-2 ring-primary border-primary bg-primary-fixed/5'
                : 'border-surface-container hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  selectedMode === 'chat'
                    ? 'bg-primary-fixed text-on-primary-fixed'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] text-on-surface">Encrypted Chat</span>
                  <span className="text-[11px] bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-semibold">
                    Free Applied
                  </span>
                </div>
                <p className="text-[12px] text-on-surface-variant">Real-time text, low cognitive load</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[14px] text-primary font-bold">$0.00</div>
              <div className="text-[11px] text-outline line-through">$15.00</div>
            </div>
          </button>

          {/* Option B: Voice Call */}
          <button
            type="button"
            onClick={() => setSelectedMode('voice')}
            className={`w-full text-left p-3.5 rounded-2xl bg-surface-container-lowest transition-all shadow-sm flex items-center justify-between border ${
              selectedMode === 'voice'
                ? 'ring-2 ring-primary border-primary bg-primary-fixed/5'
                : 'border-surface-container hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  selectedMode === 'voice'
                    ? 'bg-primary-fixed text-on-primary-fixed'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] text-on-surface">Voice Call</span>
                  <span className="text-[11px] bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full font-medium">
                    Campus Voucher
                  </span>
                </div>
                <p className="text-[12px] text-on-surface-variant">No video pressure, end-to-end encrypted</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[14px] text-primary font-bold">$0.00</div>
              <div className="text-[11px] text-outline line-through">$25.00</div>
            </div>
          </button>

          {/* Option C: HD Video */}
          <button
            type="button"
            onClick={() => setSelectedMode('video')}
            className={`w-full text-left p-3.5 rounded-2xl bg-surface-container-lowest transition-all shadow-sm flex items-center justify-between border ${
              selectedMode === 'video'
                ? 'ring-2 ring-primary border-primary bg-primary-fixed/5'
                : 'border-surface-container hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  selectedMode === 'video'
                    ? 'bg-primary-fixed text-on-primary-fixed'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">videocam</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] text-on-surface">HD Video</span>
                </div>
                <p className="text-[12px] text-on-surface-variant">Face-to-face clinical session</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[14px] text-on-surface font-bold">$10.00</div>
              <div className="text-[11px] text-outline line-through">$35.00</div>
            </div>
          </button>
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="mt-6 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[18px] text-on-surface">Date & Time</h2>
          <span className="text-[11px] text-on-surface-variant">EST Zone (Auto-synced)</span>
        </div>

        {/* Horizontal scrollable date pills */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 pt-0.5 scrollbar-none">
          {dates.map(d => {
            const isSelected = selectedDate === d.full;
            return (
              <button
                key={d.full}
                type="button"
                onClick={() => setSelectedDate(d.full)}
                className={`shrink-0 px-4 py-2.5 rounded-2xl shadow-sm text-center flex flex-col items-center transition-all ${
                  isSelected
                    ? 'bg-primary text-white font-semibold'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className="text-[13px] font-semibold">{d.label}</span>
                <span className={`text-[11px] ${isSelected ? 'text-white/85' : 'text-outline'}`}>
                  {d.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Available slot chips */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {slots.map(s => {
            const isSelected = selectedSlot === s.time;
            return (
              <button
                key={s.time}
                type="button"
                onClick={() => setSelectedSlot(s.time)}
                className={`py-2.5 px-1.5 rounded-2xl text-center shadow-sm transition-all relative ${
                  isSelected
                    ? 'bg-primary text-white font-bold'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container text-[13px] font-medium'
                }`}
              >
                <span className="text-[13px] block">{s.time}</span>
                {s.badge && (
                  <span
                    className={`block text-[9px] leading-tight font-semibold mt-0.5 ${
                      isSelected ? 'text-primary-fixed' : 'text-primary'
                    }`}
                  >
                    {s.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Anonymity & Privacy Guard */}
      <div className="mt-6 p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-3.5 border border-surface-container/60">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">security</span>
          <h3 className="font-bold text-[16px] text-on-surface">Anonymity & Privacy Guard</h3>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col pr-3">
            <span className="font-semibold text-[13px] text-on-surface">Keep camera disabled by default</span>
            <span className="text-[12px] text-on-surface-variant">Starts session in audio/text only mode</span>
          </div>
          <button
            type="button"
            onClick={() => setCameraDisabled(prev => !prev)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              cameraDisabled ? 'bg-primary' : 'bg-surface-container'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                cameraDisabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-surface-container/50">
          <div className="flex flex-col pr-3">
            <span className="font-semibold text-[13px] text-on-surface">Mask vocal tone option</span>
            <span className="text-[12px] text-on-surface-variant">
              Light harmonic filter for complete identity shielding
            </span>
          </div>
          <button
            type="button"
            onClick={() => setVoiceMask(prev => !prev)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              voiceMask ? 'bg-primary' : 'bg-surface-container'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                voiceMask ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Institutional Voucher Input */}
      <div className="mt-6 flex flex-col gap-2">
        <label className="font-semibold text-[13px] text-on-surface flex items-center justify-between" htmlFor="campus-voucher">
          <span>Campus Benefit Voucher</span>
          <span className="text-[11px] text-primary font-medium">Student Health Partner</span>
        </label>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              confirmation_number
            </span>
            <input
              id="campus-voucher"
              value={voucherCode}
              onChange={e => setVoucherCode(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-full bg-surface-container-lowest text-[13px] text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary shadow-sm uppercase tracking-wide border border-surface-container"
              placeholder="e.g. UNIV-WELL-2025"
              type="text"
            />
          </div>
          <button
            onClick={handleApplyVoucher}
            className="px-4 py-2.5 rounded-full bg-surface-container text-on-surface text-[12px] font-semibold hover:bg-surface-container-high active:scale-95 transition-all"
            type="button"
          >
            {voucherApplied ? 'Applied' : 'Apply'}
          </button>
        </div>

        {voucherAlert && (
          <p className="text-[12px] text-primary font-medium pl-1 animate-fadeIn">
            {voucherAlert}
          </p>
        )}
      </div>

      {/* Pricing & Payment Breakdown */}
      <div className="mt-6 p-4 rounded-2xl bg-surface-container-low shadow-sm flex flex-col gap-2.5 border border-surface-container/60">
        <div className="text-[14px] text-on-surface font-semibold mb-1">Session Summary</div>
        <div className="flex items-center justify-between text-[13px] text-on-surface-variant">
          <span>Base Session Fee ({getModeTitle()})</span>
          <span className="font-medium text-on-surface">${basePrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-[13px] text-primary">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span>University Student Discount (.edu verified)</span>
          </div>
          <span className="font-medium">-${discountAmount.toFixed(2)}</span>
        </div>
        <div className="pt-2 mt-1 flex items-center justify-between text-[14px] text-on-surface font-bold border-t border-surface-container/80">
          <span>Total Due Today</span>
          <span className="text-primary text-[18px]">${totalDue.toFixed(2)}</span>
        </div>
      </div>

      {/* Encryption Guarantee Note */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-on-surface-variant">
        <span className="material-symbols-outlined text-[15px] text-primary">lock</span>
        <span className="text-[11px]">256-Bit E2E Encrypted HIPAA & FERPA Compliant</span>
      </div>

      {/* Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/95 backdrop-blur-md shadow-xl z-40 border-t border-surface-container/60">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] text-on-surface-variant">Selected Slot</span>
            <span className="text-[13px] text-on-surface font-semibold truncate max-w-[120px]">
              {selectedDate.split(',')[0]}, {selectedSlot}
            </span>
          </div>
          <button
            onClick={handleConfirm}
            className="flex-1 h-12 rounded-full bg-primary text-white font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.99] transition-all shadow-md"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>Confirm & Enter Waiting Room</span>
          </button>
        </div>
      </div>
    </div>
  );
};
