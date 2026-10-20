import React, { useState } from 'react';
import { UserProfile } from '../types';

interface AccountViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onClearData: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({ user, onUpdateUser, onClearData }) => {
  const [feedback, setFeedback] = useState<string>('');

  const adjectives = ['Gentle', 'Calm', 'Mindful', 'Resilient', 'Brave', 'Steady', 'Quiet'];
  const animals = ['Otter', 'Panda', 'Sparrow', 'Koala', 'Fox', 'Hawk'];

  const handleRandomizeAlias = () => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    const num = Math.floor(100 + Math.random() * 900);
    const newAlias = `${adj} ${animal} #${num}`;
    onUpdateUser({ alias: newAlias, avatarAnimal: animal.toLowerCase() });
    setFeedback(`Pseudonym updated to: ${newAlias}`);
    setTimeout(() => setFeedback(''), 2500);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 space-y-5">
      {/* Anonymous Identity Card */}
      <div className="rounded-3xl bg-surface-container-lowest p-5 shadow-sm border border-surface-container/60 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-secondary uppercase tracking-wider">
            Identity Protection
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-[11px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">shield</span>
            Pseudonym Active
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed text-[28px] shadow-sm">
            🐾
          </div>
          <div className="flex-1">
            <span className="text-[12px] text-on-surface-variant block">Display Alias</span>
            <h3 className="font-bold text-[20px] text-on-surface">{user.alias}</h3>
            <span className="text-[11px] text-primary font-medium">Campus ID hidden from all counselors</span>
          </div>
        </div>

        <button
          onClick={handleRandomizeAlias}
          type="button"
          className="w-full py-2.5 px-4 rounded-full bg-surface-container-high hover:bg-surface-variant text-on-surface text-[13px] font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">casino</span>
          <span>Generate New Random Pseudonym</span>
        </button>

        {feedback && (
          <p className="text-[12px] text-primary font-semibold text-center animate-fadeIn">
            {feedback}
          </p>
        )}
      </div>

      {/* University SSO & Verification Status */}
      <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm border border-surface-container/60 space-y-3">
        <h4 className="font-bold text-[15px] text-on-surface">Campus Affiliation</h4>
        <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[22px]">school</span>
            <div>
              <p className="font-semibold text-[13px] text-on-surface">{user.universityDomain} Student</p>
              <p className="text-[11px] text-on-surface-variant">SSO Authenticated • Grant Eligible</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded-full">
            Verified
          </span>
        </div>

        <div className="flex items-center justify-between text-[12px] text-on-surface-variant px-1">
          <span>Active Grant Balance:</span>
          <span className="font-bold text-on-surface">{user.grantCreditsRemaining} Free Credits preloaded</span>
        </div>
      </div>

      {/* Anonymity & Ghost Mode Preferences */}
      <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm border border-surface-container/60 space-y-4">
        <h4 className="font-bold text-[15px] text-on-surface">Privacy Controls</h4>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-[13px] text-on-surface">Ghost Mode</p>
            <p className="text-[11px] text-on-surface-variant">
              Zero-retention browsing, stripped telemetry, and anonymous routing
            </p>
          </div>
          <button
            onClick={() => onUpdateUser({ ghostMode: !user.ghostMode })}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              user.ghostMode ? 'bg-primary' : 'bg-surface-container'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                user.ghostMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-surface-container/50">
          <div>
            <p className="font-semibold text-[13px] text-on-surface">30-Day Auto Purge</p>
            <p className="text-[11px] text-on-surface-variant">
              All consultation logs and chat threads auto-delete every 30 days
            </p>
          </div>
          <span className="text-[12px] text-primary font-bold">Enforced</span>
        </div>
      </div>

      {/* Emergency & Reset Data */}
      <div className="rounded-2xl bg-surface-container-low p-4 space-y-3">
        <h4 className="font-bold text-[14px] text-on-surface">Local Device Storage</h4>
        <p className="text-[12px] text-on-surface-variant leading-relaxed">
          Need to clear all local session notes, scratchpad drafts, and active tokens immediately?
        </p>
        <button
          onClick={onClearData}
          className="w-full py-2.5 rounded-full border border-error/30 text-error hover:bg-error-container text-[12px] font-semibold transition-all active:scale-95"
        >
          Purge Local Cache & Reset Sanctuary
        </button>
      </div>
    </div>
  );
};
