import React, { useMemo, useState } from 'react';
import { calculateWeeksLived } from '../utils';
import { WEEKS_PER_YEAR, EXP_STATS } from '../constants';
import { Sun, Utensils, Moon, RefreshCw } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface StatsPanelProps {
  birthDateStr: string;
  lifeExpectancy: number;
}

type ViewMode = 'TEMPORAL' | 'EXPERIENTIAL';

export const StatsPanel: React.FC<StatsPanelProps> = ({ birthDateStr, lifeExpectancy }) => {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('TEMPORAL');
  
  const stats = useMemo(() => {
    if (!birthDateStr) return null;
    const birthDate = new Date(birthDateStr);
    const lived = calculateWeeksLived(birthDate);
    const totalWeeks = lifeExpectancy * WEEKS_PER_YEAR;
    const remainingWeeks = totalWeeks - lived;
    const remainingDays = remainingWeeks * 7;
    const remainingYears = remainingWeeks / WEEKS_PER_YEAR;

    const percentage = Math.min(100, Math.max(0, (lived / totalWeeks) * 100));

    return { 
        lived, 
        remainingWeeks, 
        percentage, 
        totalWeeks,
        experiential: {
            summers: Math.floor(remainingYears),
            mondays: remainingWeeks,
            meals: Math.floor(remainingDays * EXP_STATS.MEALS_PER_DAY),
            sleeps: Math.floor(remainingDays * EXP_STATS.SLEEPS_PER_DAY)
        }
    };
  }, [birthDateStr, lifeExpectancy]);

  if (!stats) return null;

  return (
    <div className="mb-8">
      {/* Control Switcher */}
      <div className="flex justify-end mb-4">
        <div className="bg-zinc-900 p-1 rounded-lg border border-zinc-800 flex gap-1 relative">
            <button
                onClick={() => setViewMode('TEMPORAL')}
                className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${viewMode === 'TEMPORAL' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
                {t('view_temporal')}
            </button>
            <button
                onClick={() => setViewMode('EXPERIENTIAL')}
                className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${viewMode === 'EXPERIENTIAL' ? 'bg-[#00bf63] text-black shadow-[0_0_10px_rgba(0,191,99,0.3)]' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
                {t('view_experiential')}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {viewMode === 'TEMPORAL' ? (
            <>
                <StatCard 
                    label={t('stat_weeks_rem')}
                    value={stats.remainingWeeks > 0 ? stats.remainingWeeks.toLocaleString() : '0'} 
                    subValue={t('stat_balance')}
                    isPrimary
                />
                <StatCard 
                    label={t('stat_consumed')}
                    value={`%${stats.percentage.toFixed(1)}`} 
                    subValue={t('stat_life_bar')}
                />
                <StatCard 
                    label={t('stat_weeks_lived')}
                    value={stats.lived.toLocaleString()} 
                    subValue={t('stat_history')}
                />
                <StatCard 
                    label={t('stat_capacity')}
                    value={stats.totalWeeks.toLocaleString()} 
                    subValue={`${lifeExpectancy} ${t('input_years')}`}
                />
            </>
        ) : (
            <>
                <StatCard 
                    label={t('exp_summers')}
                    value={stats.experiential.summers.toLocaleString()} 
                    subValue={t('exp_seasons')}
                    icon={<Sun size={16} className="text-[#00bf63]" />}
                    isPrimary
                />
                <StatCard 
                    label={t('exp_mondays')}
                    value={stats.experiential.mondays.toLocaleString()} 
                    subValue={t('exp_grind')}
                    icon={<RefreshCw size={16} className="text-zinc-500" />}
                />
                <StatCard 
                    label={t('exp_meals')}
                    value={stats.experiential.meals.toLocaleString()} 
                    subValue={t('exp_consumption')}
                    icon={<Utensils size={16} className="text-zinc-500" />}
                />
                <StatCard 
                    label={t('exp_sleeps')}
                    value={stats.experiential.sleeps.toLocaleString()} 
                    subValue={t('exp_rest')}
                    icon={<Moon size={16} className="text-zinc-500" />}
                />
            </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, subValue, isPrimary = false, icon }: { label: string, value: string, subValue: string, isPrimary?: boolean, icon?: React.ReactNode }) => (
  <div className={`
    relative p-5 rounded-lg border backdrop-blur-sm transition-all duration-500 group overflow-hidden
    ${isPrimary 
        ? 'bg-[#00bf63]/5 border-[#00bf63]/30 hover:bg-[#00bf63]/10' 
        : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'}
  `}>
    {isPrimary && <div className="absolute top-0 right-0 w-2 h-2 bg-[#00bf63] rounded-full m-2 shadow-[0_0_8px_#00bf63] animate-pulse"></div>}
    
    <div className="flex justify-between items-start mb-1">
        <p className={`text-[10px] font-bold tracking-widest ${isPrimary ? 'text-[#00bf63]' : 'text-zinc-500'}`}>
            {label}
        </p>
        {icon && <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-300">{icon}</div>}
    </div>
    
    <p className={`text-3xl md:text-4xl font-black brand-font tracking-tight ${isPrimary ? 'text-white drop-shadow-[0_0_5px_rgba(0,191,99,0.4)]' : 'text-zinc-200'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
        {value}
    </p>
    <div className="w-full h-[1px] bg-white/5 my-2"></div>
    <p className="text-[10px] font-mono text-zinc-600 uppercase">
        {subValue}
    </p>
  </div>
);