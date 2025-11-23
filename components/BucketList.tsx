import React, { useState, useEffect, useMemo } from 'react';
import { ACHIEVEMENT_MODULES } from '../constants';
import { Check, ChevronDown, ChevronUp, Unlock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const BucketList: React.FC = () => {
  const { t } = useLanguage();
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);
  const [expandedModule, setExpandedModule] = useState<string | null>('exploration');

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('lifeinweeks_achievements');
    if (saved) {
      try {
        setUnlockedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse achievements", e);
      }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('lifeinweeks_achievements', JSON.stringify(unlockedItems));
  }, [unlockedItems]);

  const toggleItem = (id: string) => {
    setUnlockedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const toggleModule = (id: string) => {
    setExpandedModule(prev => prev === id ? null : id);
  };

  const stats = useMemo(() => {
    let total = 0;
    let unlocked = 0;
    ACHIEVEMENT_MODULES.forEach(mod => {
        total += mod.items.length;
        mod.items.forEach(item => {
            if (unlockedItems.includes(item.id)) unlocked++;
        });
    });
    return { total, unlocked, percentage: total === 0 ? 0 : (unlocked / total) * 100 };
  }, [unlockedItems]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-20">
      <div className="border border-zinc-800 bg-[#0a0a0a] rounded-xl overflow-hidden shadow-2xl">
        
        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-zinc-800 bg-[#050505]">
            <div className="flex items-center gap-3 mb-2">
                <Unlock size={24} className="text-[#00bf63]" />
                <h3 className="text-xl md:text-2xl font-bold text-white uppercase brand-font tracking-wide">
                    {t('bucket_title')} <span className="text-zinc-600 text-sm normal-case font-mono ml-2">{t('bucket_subtitle')}</span>
                </h3>
            </div>
            <p className="text-zinc-500 text-xs md:text-sm font-mono max-w-2xl">
                {t('bucket_desc')}
            </p>

            {/* Global Progress Bar */}
            <div className="mt-6">
                <div className="flex justify-between text-[10px] font-mono uppercase text-zinc-400 mb-1">
                    <span>{t('bucket_sync')}</span>
                    <span className="text-[#00bf63]">{stats.percentage.toFixed(1)}% {t('bucket_complete')}</span>
                </div>
                <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <div 
                        style={{ width: `${stats.percentage}%` }} 
                        className="h-full bg-[#00bf63] shadow-[0_0_10px_#00bf63] transition-all duration-700 ease-out relative"
                    >
                         <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Modules List */}
        <div className="divide-y divide-zinc-900/50">
            {ACHIEVEMENT_MODULES.map((module) => {
                const isExpanded = expandedModule === module.id;
                
                // Calculate module specific progress
                const moduleTotal = module.items.length;
                const moduleUnlocked = module.items.filter(i => unlockedItems.includes(i.id)).length;
                const isComplete = moduleTotal === moduleUnlocked;

                return (
                    <div key={module.id} className="bg-[#080808] transition-colors hover:bg-[#0c0c0c]">
                        {/* Module Header */}
                        <button 
                            onClick={() => toggleModule(module.id)}
                            className="w-full px-6 py-4 flex items-center justify-between group focus:outline-none"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${isComplete ? 'bg-[#00bf63] shadow-[0_0_8px_#00bf63]' : 'bg-zinc-700'}`}></div>
                                <div className="text-left">
                                    <h4 className={`text-sm font-bold uppercase tracking-widest ${isComplete ? 'text-[#00bf63]' : 'text-zinc-300'} group-hover:text-white transition-colors`}>
                                        {t(module.translationKey)}
                                    </h4>
                                    <p className="text-[10px] text-zinc-600 font-mono mt-0.5">{t(module.descKey)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-mono text-zinc-500">
                                    {moduleUnlocked}/{moduleTotal}
                                </span>
                                {isExpanded ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-600" />}
                            </div>
                        </button>

                        {/* Module Items */}
                        {isExpanded && (
                            <div className="px-6 pb-6 pt-2 animate-in slide-in-from-top-2 duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-6 border-l border-zinc-800 ml-3">
                                    {module.items.map((item) => {
                                        const isUnlocked = unlockedItems.includes(item.id);
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => toggleItem(item.id)}
                                                className={`
                                                    relative flex items-center gap-3 p-3 rounded-lg border text-left transition-all duration-300
                                                    ${isUnlocked 
                                                        ? 'bg-[#00bf63]/10 border-[#00bf63]/30' 
                                                        : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600'}
                                                `}
                                            >
                                                <div className={`
                                                    w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors
                                                    ${isUnlocked ? 'bg-[#00bf63] border-[#00bf63]' : 'bg-transparent border-zinc-600'}
                                                `}>
                                                    {isUnlocked && <Check size={12} className="text-black stroke-[4]" />}
                                                </div>
                                                <span className={`text-xs font-medium ${isUnlocked ? 'text-white' : 'text-zinc-400'}`}>
                                                    {t(item.labelKey)}
                                                </span>
                                                {isUnlocked && (
                                                    <div className="absolute inset-0 border border-[#00bf63] rounded-lg opacity-20 animate-pulse"></div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>

      </div>
    </div>
  );
};
