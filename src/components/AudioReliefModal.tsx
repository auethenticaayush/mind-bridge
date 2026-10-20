import React, { useState, useEffect, useRef } from 'react';

interface AudioReliefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioReliefModal: React.FC<AudioReliefModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [phaseSeconds, setPhaseSeconds] = useState<number>(4);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [audioMode, setAudioMode] = useState<'binaural' | 'chimes' | 'rain'>('binaural');

  // Web Audio API refs for zero-dependency real sound generation
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTotalSeconds(prev => prev + 1);
        setPhaseSeconds(prev => {
          if (prev <= 1) {
            // Cycle 4-7-8
            if (phase === 'Inhale') {
              setPhase('Hold');
              playChime(520);
              return 7;
            } else if (phase === 'Hold') {
              setPhase('Exhale');
              playChime(390);
              return 8;
            } else {
              setPhase('Inhale');
              playChime(440);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, phase]);

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.connect(ctx.destination);
      gainNodeRef.current = gain;

      // Binaural alpha/theta beat (432Hz & 438Hz = 6Hz theta relaxation wave)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(216, ctx.currentTime);
      osc2.frequency.setValueAtTime(222, ctx.currentTime);

      osc1.connect(gain);
      osc2.connect(gain);
      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
    } catch {
      // AudioContext might be blocked until user gesture, handles gracefully
    }
  };

  const stopAudio = () => {
    try {
      if (osc1Ref.current) osc1Ref.current.stop();
      if (osc2Ref.current) osc2Ref.current.stop();
      if (audioCtxRef.current) audioCtxRef.current.close();
    } catch {
      // ignore
    }
    osc1Ref.current = null;
    osc2Ref.current = null;
    audioCtxRef.current = null;
  };

  const playChime = (freq: number) => {
    try {
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // ignore
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio();
      setIsPlaying(true);
      playChime(440);
    }
  };

  const handleClose = () => {
    stopAudio();
    setIsPlaying(false);
    onClose();
  };

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-surface rounded-3xl p-6 shadow-2xl border border-surface-container flex flex-col gap-5 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-secondary-fixed/40 blur-2xl pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
              <span className="material-symbols-outlined text-[20px] fill">graphic_eq</span>
            </div>
            <div>
              <h3 className="font-bold text-on-surface text-[17px] leading-tight">Panic Relief Audio</h3>
              <p className="text-[12px] text-on-surface-variant">Guided 4-7-8 Autonomic Reset</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Interactive Breathing Sphere Visualizer */}
        <div className="relative z-10 flex flex-col items-center justify-center py-6">
          <div className="relative flex items-center justify-center">
            {/* Outer pulsating ring */}
            <div
              className={`absolute rounded-full border-2 border-primary/30 transition-all duration-1000 ${
                isPlaying && phase === 'Inhale'
                  ? 'w-48 h-48 scale-110 opacity-80'
                  : isPlaying && phase === 'Hold'
                  ? 'w-48 h-48 scale-100 opacity-60'
                  : 'w-36 h-36 scale-90 opacity-40'
              }`}
            ></div>

            {/* Inner Glowing Bubble */}
            <div
              className={`w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-1000 ease-in-out ${
                phase === 'Inhale'
                  ? 'bg-gradient-to-tr from-primary-container to-primary-fixed text-white scale-110'
                  : phase === 'Hold'
                  ? 'bg-gradient-to-tr from-secondary to-secondary-fixed text-white scale-105'
                  : 'bg-gradient-to-tr from-surface-container-high to-surface-container text-primary scale-95'
              }`}
            >
              <span className="text-[12px] uppercase tracking-widest font-semibold opacity-90">
                {isPlaying ? phase : 'Ready'}
              </span>
              <span className="text-[32px] font-bold leading-none mt-1">
                {isPlaying ? phaseSeconds : '4-7-8'}
              </span>
              <span className="text-[11px] opacity-80 mt-1">
                {isPlaying
                  ? phase === 'Inhale'
                    ? 'Breathe in deep'
                    : phase === 'Hold'
                    ? 'Hold still & calm'
                    : 'Gently blow out'
                  : 'Tap Play below'}
              </span>
            </div>
          </div>

          <p className="text-[13px] text-on-surface-variant text-center mt-6 max-w-xs leading-snug">
            {isPlaying
              ? 'Synchronize your lungs with the pulsating sphere to slow your heart rate.'
              : 'Scientifically proven to trigger the vagus nerve and ease acute panic in under 3 minutes.'}
          </p>
        </div>

        {/* Audio Ambient Track Selection */}
        <div className="relative z-10 flex items-center justify-center gap-1.5 bg-surface-container-low p-1.5 rounded-2xl">
          <button
            onClick={() => setAudioMode('binaural')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-[12px] font-medium transition-all ${
              audioMode === 'binaural'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Theta Harmonic
          </button>
          <button
            onClick={() => setAudioMode('chimes')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-[12px] font-medium transition-all ${
              audioMode === 'chimes'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Temple Chimes
          </button>
          <button
            onClick={() => setAudioMode('rain')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-[12px] font-medium transition-all ${
              audioMode === 'rain'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Gentle Rain
          </button>
        </div>

        {/* Player Controls */}
        <div className="relative z-10 flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-[11px] text-on-surface-variant font-medium">Elapsed Session</span>
            <span className="text-[15px] font-bold text-on-surface">{formatTime(totalSeconds)} / 5:00</span>
          </div>

          <button
            onClick={togglePlay}
            className={`h-13 px-6 rounded-full flex items-center gap-2 font-semibold shadow-md active:scale-95 transition-all ${
              isPlaying
                ? 'bg-secondary text-white hover:bg-secondary/90'
                : 'bg-primary text-white hover:bg-primary-container'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
            <span>{isPlaying ? 'Pause Audio' : 'Begin 4-7-8 Reset'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
