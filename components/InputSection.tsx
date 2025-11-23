import React from 'react';
import { useLanguage } from '../LanguageContext';

interface InputSectionProps {
  birthDate: string;
  setBirthDate: (date: string) => void;
  lifeExpectancy: number;
  setLifeExpectancy: (years: number) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  birthDate,
  setBirthDate,
  lifeExpectancy,
  setLifeExpectancy
}) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="bg-[#0a0a0a] border border-zinc-800 p-6 md:p-8 rounded-xl relative overflow-hidden group">
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#00bf63] opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#00bf63] opacity-50"></div>

        <div className="flex flex-col md:flex-row gap-8 items-end">
            
            {/* Date Input */}
            <div className="flex-1 w-full">
            <label className="text-[#00bf63] text-xs font-bold font-mono uppercase mb-2 block tracking-wider">
                {t('input_dob')}
            </label>
            <div className="relative">
                <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-700 text-white rounded-md px-4 py-3 focus:outline-none focus:border-[#00bf63] focus:ring-1 focus:ring-[#00bf63] transition-all font-mono uppercase"
                />
            </div>
            </div>

            {/* Life Expectancy Input */}
            <div className="flex-1 w-full">
                <div className="flex justify-between mb-2">
                    <label className="text-zinc-500 text-xs font-bold font-mono uppercase tracking-wider">
                        {t('input_target')}
                    </label>
                    <span className="text-[#00bf63] text-xs font-mono font-bold">{lifeExpectancy} {t('input_years')}</span>
                </div>
                <input
                    type="range"
                    min="60"
                    max="100"
                    value={lifeExpectancy}
                    onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#00bf63]"
                />
                <div className="flex justify-between mt-1">
                    <span className="text-[9px] text-zinc-700 font-mono">60</span>
                    <span className="text-[9px] text-zinc-700 font-mono">100</span>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};