import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_KEYS = [
  'boot_1', 'boot_2', 'boot_3', 'boot_4', 'boot_5', 'boot_6', 'boot_7', 'boot_8', 'boot_9'
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let delay = 0;
    
    BOOT_KEYS.forEach((key, index) => {
      // Random delay between messages to simulate processing
      const stepDelay = Math.random() * 300 + 150; 
      delay += stepDelay;

      setTimeout(() => {
        // We fetch the translation at the moment of display
        // Note: In a real component, if language changes mid-boot, this might show mixed languages
        // but since boot blocks UI, it shouldn't be possible to toggle.
        setLines(prev => [...prev, key]);
        
        // If it's the last message, wait a bit then complete
        if (index === BOOT_KEYS.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col justify-end pb-12 pl-8 font-mono text-xs md:text-sm text-[#00bf63] select-none overflow-hidden cursor-wait">
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
      
      {/* Glow */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,191,99,0.1)] pointer-events-none"></div>

      <div className="relative z-20 flex flex-col gap-1">
        {lines.map((key, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="opacity-40 text-[10px] min-w-[60px]">
                {`[${(0.124 * (i + 1)).toFixed(3)}]`}
            </span>
            <span className="animate-pulse">{t(key)}</span>
          </div>
        ))}
        {/* Blinking Cursor */}
        <div className="flex items-center gap-3 mt-1">
             <span className="opacity-40 text-[10px] min-w-[60px]">
                {`[${(0.124 * (lines.length + 1)).toFixed(3)}]`}
            </span>
            <div className="w-2 h-4 bg-[#00bf63] animate-[ping_1s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};
