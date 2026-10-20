import React from 'react';

interface QuickExitModalProps {
  isOpen: boolean;
  onResume: () => void;
}

export const QuickExitModal: React.FC<QuickExitModalProps> = ({ isOpen, onResume }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#ffffff] text-[#1e293b] flex flex-col p-6 overflow-y-auto">
      {/* Top Academic Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            EDU
          </div>
          <span className="font-semibold text-gray-800 text-sm">BIO 301: Molecular Cellular Mechanisms</span>
        </div>
        <button
          onClick={onResume}
          className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition-all"
        >
          Resume Session
        </button>
      </div>

      {/* Disguised Academic Content */}
      <div className="max-w-xl mx-auto w-full py-8 space-y-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Lecture 14 Notes</span>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">Krebs Cycle Regulation & Oxidative Phosphorylation</h2>
          <p className="text-xs text-gray-400 mt-1">Last edited today at 3:15 PM • Cloud synced</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
          <h4 className="font-semibold text-sm text-gray-800">1. Key Rate-Limiting Enzymes</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Citrate synthase initiates condensation of oxaloacetate and acetyl-CoA. Allosterically inhibited by ATP, NADH, and succinyl-CoA.
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
          <h4 className="font-semibold text-sm text-gray-800">2. Upcoming Midterm Prep Schedule</h4>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
            <li>Thursday: Review complex I-IV proton gradients</li>
            <li>Friday: Practice questions chapter 18-20</li>
            <li>Saturday: Group review session in Science Library Rm 302</li>
          </ul>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <span className="text-xs text-gray-400">MindBridge paused discreetly in background.</span>
          <button
            onClick={onResume}
            className="text-xs font-semibold text-emerald-700 hover:underline"
          >
            Click to return to call
          </button>
        </div>
      </div>
    </div>
  );
};
