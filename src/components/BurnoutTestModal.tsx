import React, { useState } from 'react';
import { BURNOUT_QUESTIONS } from '../data/mockData';

interface BurnoutTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookCounselor: () => void;
}

export const BurnoutTestModal: React.FC<BurnoutTestModalProps> = ({ isOpen, onClose, onBookCounselor }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectOption = (score: number) => {
    const updated = [...answers, score];
    setAnswers(updated);
    if (currentStep < BURNOUT_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const maxScore = BURNOUT_QUESTIONS.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getSeverity = () => {
    if (totalScore <= 5) return { label: 'Low / Mild Fatigue', color: 'text-primary', desc: 'You have good resilience reserves right now. Simple boundary maintenance and regular sleep hygiene will keep you steady.' };
    if (totalScore <= 11) return { label: 'Moderate Academic Strain', color: 'text-amber-600', desc: 'Signs of cognitive depletion and early cynicism detected. Prioritize active rest days and explore low-pressure peer chat.' };
    return { label: 'Severe Exhaustion / Acute Burnout', color: 'text-tertiary', desc: 'You are operating on empty reserves with significant nervous system fatigue. We strongly recommend redeeming your Free Campus Counselor session today.' };
  };

  const severity = getSeverity();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface rounded-3xl p-6 shadow-2xl border border-surface-container flex flex-col gap-5 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
              <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
            </div>
            <div>
              <h3 className="font-bold text-on-surface text-[17px] leading-tight">Academic Burnout Screener</h3>
              <p className="text-[12px] text-on-surface-variant">Anonymous 6-Question Clinical Indicator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {!isCompleted ? (
          <div className="flex flex-col gap-4">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-[12px] text-on-surface-variant">
              <span>Question {currentStep + 1} of {BURNOUT_QUESTIONS.length}</span>
              <span className="font-semibold">{Math.round(((currentStep + 1) / BURNOUT_QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-300"
                style={{ width: `${((currentStep + 1) / BURNOUT_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            {/* Current Question */}
            <div className="bg-surface-container-low rounded-2xl p-4 mt-1">
              <h4 className="font-semibold text-on-surface text-[15px] leading-snug">
                {BURNOUT_QUESTIONS[currentStep].prompt}
              </h4>
            </div>

            {/* Answer Options */}
            <div className="flex flex-col gap-2 mt-1">
              {BURNOUT_QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.score)}
                  className="w-full text-left p-3.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high border border-surface-container/60 text-on-surface text-[14px] font-medium transition-all active:scale-[0.99] flex items-center justify-between group"
                >
                  <span>{option.text}</span>
                  <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">
                    chevron_right
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-2 border-t border-surface-container">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-primary">lock</span>
                Answers never stored on server
              </span>
              {currentStep > 0 && (
                <button
                  onClick={() => {
                    setCurrentStep(prev => prev - 1);
                    setAnswers(prev => prev.slice(0, -1));
                  }}
                  className="text-secondary font-semibold hover:underline"
                >
                  Previous
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center mb-2">
                <span className="text-[24px] font-bold text-on-surface">{percentage}%</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">Burnout Index</span>
              <h4 className={`text-[18px] font-bold mt-1 ${severity.color}`}>{severity.label}</h4>
              <p className="text-[13px] text-on-surface-variant mt-2 leading-relaxed">
                {severity.desc}
              </p>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-3.5 border border-surface-container flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">school</span>
                <div className="text-left">
                  <p className="text-[12px] font-bold text-on-surface">State University Grant Active</p>
                  <p className="text-[11px] text-on-surface-variant">1 free confidential session available</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-bold">100% OFF</span>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onBookCounselor();
                }}
                className="w-full py-3 px-4 rounded-full bg-primary text-white font-semibold text-[14px] shadow-md hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                <span>Connect with Verified Counselor</span>
              </button>

              <button
                onClick={handleReset}
                className="w-full py-2.5 text-center text-[13px] text-on-surface-variant hover:text-on-surface font-medium transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
