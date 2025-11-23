import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../LanguageContext';

interface EntropyTickerProps {
  birthDateStr: string;
}

export const EntropyTicker: React.FC<EntropyTickerProps> = ({ birthDateStr }) => {
  const { t } = useLanguage();
  const [ageDisplay, setAgeDisplay] = useState<string>('0.000000000');
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!birthDateStr) return;

    const birthDate = new Date(birthDateStr).getTime();
    const msPerYear = 1000 * 60 * 60 * 24 * 365.25;

    const updateAge = () => {
      const now = Date.now();
      const ageInMs = now - birthDate;
      const ageInYears = ageInMs / msPerYear;
      
      // Format to show 9 decimal places for that "matrix" feel
      setAgeDisplay(ageInYears.toFixed(9));
      
      frameRef.current = requestAnimationFrame(updateAge);
    };

    frameRef.current = requestAnimationFrame(updateAge);

    return () => cancelAnimationFrame(frameRef.current);
  }, [birthDateStr]);

  if (!birthDateStr) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mb-8 px-4">
      <div className="bg-black/50 border-y border-zinc-800 py-6 flex flex-col items-center justify-center relative overflow-hidden group">
         {/* Background Glitch Effect */}
         <div className="absolute top-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
         
         <p className="text-[10px] text-[#00bf63] font-mono tracking-[0.3em] mb-2 uppercase animate-pulse">
            {t('ticker_label')}
         </p>
         
         <div className="font-mono text-4xl md:text-7xl font-bold text-white tracking-tighter tabular-nums relative z-10">
            {ageDisplay.split('.')[0]}
            <span className="text-[#00bf63]">.</span>
            <span className="text-zinc-500 text-2xl md:text-4xl">{ageDisplay.split('.')[1]}</span>
         </div>
      </div>
    </div>
  );
};