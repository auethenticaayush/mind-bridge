import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  user: UserProfile;
  onOpenSOS: () => void;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  user,
  onOpenSOS,
  onOpenAccount,
}) => {
  const brandLogoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1U93QmwmBtuNrEjYa5X7UPcKiSsGbfLpAAsKhlDD6l-gNAQq91MpJsvChLikzpHkgM2OP7cl6J1L7JooPwa7ODYNWkcsNnAihUy6_PTzojOlcRQw0ShLN8o_zq4FRMAB6CFl0WoIlnQ6V5DTFetZ1gubbWjGFY8ZSEnCBRAcOgoBoCqJzp9dCrCj93Xh-yoaU-65qwmBffE14pgQVnghgEuSJ1wdXBuHU3EO0OzY-KNYGG6kvptqvtFh-M';
  const profileAvatarUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAsxdljH_DSKYyhmqWiQ0zdu8uN3scqi5kK1A-Rmuju-HPaVdDs94re6hffR2a0nc3I4-jcyuJvqssu5f894Oq7O8pxcmcnT_Q1dRCczMwCmzsi2e17QI-fxvNOus6dOBK-ybQU2IOUzQXCgMb9AOsdD3rWOUt0F-DWNGV8boPNYDMAWVbhwPXwvC6D4uN4t2jNor8wmTrngcR7BkJNbvj7U4k_6VrDbffAe2Sbp2yBk03_6axvMeqU';

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-surface-container/50">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">
        {/* Left branding or back button */}
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={onBack}
              aria-label="Go back"
              className="w-10 h-10 -ml-1 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          )}

          <img
            alt="MindBridge Brand Logo"
            className="h-7 w-auto object-contain"
            src={brandLogoUrl}
          />

          {!showBack ? (
            <div className="flex flex-col">
              <span className="font-bold text-[17px] text-primary tracking-tight leading-none">
                MindBridge
              </span>
              <span className="text-[11px] text-on-surface-variant font-normal">
                {subtitle || 'Explore / Hub'}
              </span>
            </div>
          ) : (
            <h1 className="font-semibold text-[16px] text-on-surface truncate max-w-[160px]">
              {title}
            </h1>
          )}
        </div>

        {/* Right action items: Alias shield, SOS button, profile avatar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {!showBack && (
            <div
              onClick={onOpenAccount}
              className="cursor-pointer flex items-center gap-1 py-1 px-2.5 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors"
              title="Your anonymous pseudonym"
            >
              <span className="material-symbols-outlined text-[15px] text-primary">shield</span>
              <span className="text-[11px] text-on-surface-variant font-medium">
                {user.alias}
              </span>
            </div>
          )}

          {/* Persistent SOS Emergency Button */}
          <button
            onClick={onOpenSOS}
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-tertiary text-on-tertiary shadow-[0_4px_14px_rgba(177,0,50,0.25)] hover:bg-tertiary-container transition-all active:scale-95"
            title="Crisis SOS"
          >
            <span className="material-symbols-outlined text-[17px]">e911_emergency</span>
            <span className="text-[12px] tracking-wider font-semibold">SOS</span>
          </button>

          {/* Profile Avatar */}
          <button
            onClick={onOpenAccount}
            type="button"
            className="relative ml-0.5 rounded-full ring-2 ring-primary/20 hover:ring-primary transition-all overflow-hidden"
            title="Account & Anonymous Settings"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={profileAvatarUrl}
            />
            {user.ghostMode && (
              <span
                className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full ring-1 ring-white"
                title="Ghost Mode Active"
              ></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
