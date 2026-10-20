import React from 'react';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickDisguise: () => void;
}

export const SOSModal: React.FC<SOSModalProps> = ({ isOpen, onClose, onQuickDisguise }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface rounded-3xl p-6 shadow-2xl border-2 border-tertiary/20 flex flex-col gap-5 relative overflow-hidden">
        {/* Subtle Urgent Glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-tertiary-fixed/40 blur-2xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[24px]">e911_emergency</span>
            </div>
            <div>
              <h3 className="font-bold text-on-surface text-[18px] leading-tight">Campus & Crisis Lifeline</h3>
              <p className="text-[12px] text-tertiary font-medium">Free, confidential 24/7 immediate assistance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Primary Lifeline Button */}
        <a
          href="tel:988"
          className="w-full p-4 rounded-2xl bg-tertiary text-white shadow-lg hover:bg-tertiary-container transition-all flex items-center justify-between group active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">call</span>
            </div>
            <div className="text-left">
              <span className="text-[16px] font-bold block leading-tight">Call or Text 988</span>
              <span className="text-[12px] text-white/90">Suicide & Crisis Lifeline (US Nationwide)</span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-white text-tertiary text-[12px] font-bold">
            1-Tap Call
          </span>
        </a>

        {/* Crisis Text Line */}
        <a
          href="sms:741741?body=HOME"
          className="w-full p-3.5 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low border border-surface-container text-on-surface transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </div>
            <div className="text-left">
              <span className="text-[14px] font-bold block leading-tight">Text HOME to 741741</span>
              <span className="text-[11px] text-on-surface-variant">Crisis Text Line (Free SMS support)</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline text-[18px]">open_in_new</span>
        </a>

        {/* Campus Safety Dispatch */}
        <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
              <span className="material-symbols-outlined text-[18px]">local_police</span>
            </div>
            <div className="text-left">
              <span className="text-[14px] font-bold text-on-surface block leading-tight">University Crisis Dispatch</span>
              <span className="text-[11px] text-on-surface-variant">24/7 Campus Well-being Officer</span>
            </div>
          </div>
          <a
            href="tel:5550194357"
            className="px-3 py-1 rounded-full bg-surface-container-lowest text-primary text-[12px] font-semibold border border-primary/20 hover:bg-surface-container"
          >
            Call Campus
          </a>
        </div>

        {/* Discreet Quick Escape options */}
        <div className="flex items-center gap-2 pt-2 border-t border-surface-container">
          <button
            onClick={() => {
              onClose();
              onQuickDisguise();
            }}
            className="flex-1 py-2.5 px-3 rounded-full bg-surface-container-high text-on-surface text-[12px] font-medium flex items-center justify-center gap-1.5 hover:bg-surface-variant active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">visibility_off</span>
            <span>Stealth Disguise</span>
          </button>

          <a
            href="https://scholar.google.com"
            target="_top"
            className="flex-1 py-2.5 px-3 rounded-full bg-surface-container-low text-on-surface-variant text-[12px] font-medium flex items-center justify-center gap-1.5 hover:bg-surface-container hover:text-on-surface transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">exit_to_app</span>
            <span>Open Google Scholar</span>
          </a>
        </div>
      </div>
    </div>
  );
};
