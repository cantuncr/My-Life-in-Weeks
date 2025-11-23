import React, { useState, useMemo } from 'react';
import { User, Activity, AlertTriangle, Users } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const SocialEntropy: React.FC = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>(60);
  const [frequency, setFrequency] = useState<number | ''>(2); // Times per year

  const stats = useMemo(() => {
    const ageNum = Number(age) || 0;
    const freqNum = Number(frequency) || 0;
    const expectancy = 80; // Hardcoded average for relative calculation
    
    const yearsLeft = Math.max(0, expectancy - ageNum);
    const interactionsLeft = Math.floor(yearsLeft * freqNum);
    
    return { yearsLeft, interactionsLeft };
  }, [age, frequency]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-16">
        <div className="border border-red-900/30 bg-[#0a0505] rounded-xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
            
            {/* Ambient Red Glow */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-600/10 blur-[100px] pointer-events-none"></div>

            {/* Header */}
            <div className="flex items-center gap-3 mb-8 relative z-10">
                <AlertTriangle size={24} className="text-red-600 animate-pulse" />
                <h3 className="text-xl md:text-2xl font-bold text-white uppercase brand-font tracking-wide">
                    {t('soc_title')} <span className="text-red-800 text-sm normal-case font-mono ml-2">{t('soc_subtitle')}</span>
                </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                {/* Inputs */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <p className="text-zinc-500 text-xs font-mono leading-relaxed">
                        <strong className="text-red-500">{t('soc_warning')}</strong> {t('soc_warning_text')}
                    </p>
                    
                    <div>
                        <label className="text-[10px] text-red-500 font-bold uppercase tracking-widest block mb-2">{t('soc_label_name')}</label>
                        <div className="relative group">
                            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-500 transition-colors" />
                            <input 
                                type="text" 
                                placeholder={t('soc_ph_name')}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-9 pr-3 py-3 text-sm rounded focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-zinc-700"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-2">{t('soc_label_age')}</label>
                            <div className="relative group">
                                <Activity size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" />
                                <input 
                                    type="number" 
                                    value={age}
                                    placeholder="60"
                                    onChange={(e) => setAge(Number(e.target.value))}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-9 pr-3 py-3 text-sm rounded focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-zinc-700"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-2">{t('soc_label_freq')}</label>
                            <div className="relative group">
                                <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" />
                                <input 
                                    type="number" 
                                    value={frequency}
                                    placeholder="2"
                                    onChange={(e) => setFrequency(Number(e.target.value))}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-9 pr-3 py-3 text-sm rounded focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-zinc-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="lg:col-span-8 bg-black/40 rounded-lg border border-red-900/20 p-8 flex flex-col items-center justify-center relative min-h-[250px] shadow-inner">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(50,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(50,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

                    {stats.interactionsLeft <= 0 ? (
                        <p className="text-red-900/50 font-mono text-sm animate-pulse">{t('soc_awaiting')}</p>
                    ) : (
                        <>
                            <div className="text-center mb-8 relative z-10">
                                <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-2">
                                    {t('soc_result_pre')} {name || 'Target'}
                                </p>
                                <div className="flex items-baseline justify-center gap-2">
                                    <p className="text-6xl md:text-8xl font-black text-red-600 tracking-tighter brand-font drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]">
                                        {stats.interactionsLeft}
                                    </p>
                                    <span className="text-red-800 font-bold uppercase text-sm">{t('soc_result_unit')}</span>
                                </div>
                            </div>

                            {/* Dot Visualization */}
                            <div className="w-full max-w-lg">
                                <div className="flex flex-wrap gap-1.5 justify-center max-h-[160px] overflow-y-auto custom-scrollbar p-2 mask-linear">
                                    {Array.from({ length: Math.min(stats.interactionsLeft, 300) }).map((_, i) => (
                                        <div 
                                            key={i} 
                                            className="w-1.5 h-1.5 bg-red-600 shadow-[0_0_4px_rgba(220,38,38,0.8)] rounded-full animate-in zoom-in duration-500"
                                            style={{ animationDelay: `${i * 2}ms` }}
                                        ></div>
                                    ))}
                                    {stats.interactionsLeft > 300 && (
                                        <span className="text-red-900 text-xs self-end font-mono animate-pulse">{t('soc_limit')}</span>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};