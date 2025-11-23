import React, { useMemo } from 'react';
import { TIME_STATS, WEEKS_PER_YEAR } from '../constants';
import { calculateWeeksLived } from '../utils';
import { useLanguage } from '../LanguageContext';

interface ResourceBreakdownProps {
  birthDateStr: string;
  lifeExpectancy: number;
}

export const ResourceBreakdown: React.FC<ResourceBreakdownProps> = ({ birthDateStr, lifeExpectancy }) => {
  const { t } = useLanguage();
  
  const data = useMemo(() => {
    if (!birthDateStr) return null;
    
    const birthDate = new Date(birthDateStr);
    const livedWeeks = calculateWeeksLived(birthDate);
    const totalWeeks = lifeExpectancy * WEEKS_PER_YEAR;
    const remainingWeeks = Math.max(0, totalWeeks - livedWeeks);
    
    // Calculate remaining "years" for easier mental mapping
    const remainingYears = remainingWeeks / WEEKS_PER_YEAR;

    const sleepYears = remainingYears * TIME_STATS.SLEEP_RATIO;
    const workYears = remainingYears * TIME_STATS.WORK_RATIO; 
    const maintenanceYears = remainingYears * TIME_STATS.MAINTENANCE_RATIO;
    
    const freeYears = remainingYears - (sleepYears + workYears + maintenanceYears);
    const freePercentage = (freeYears / remainingYears) * 100;
    const overheadPercentage = 100 - freePercentage;

    return {
        remainingYears,
        sleepYears,
        workYears,
        maintenanceYears,
        freeYears,
        freePercentage,
        overheadPercentage
    };
  }, [birthDateStr, lifeExpectancy]);

  if (!data || data.remainingYears <= 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-8 mb-16">
      <div className="border border-zinc-800 bg-[#080808] rounded-xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        
        <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-[#00bf63]"></div>
            <h3 className="text-xl md:text-2xl font-bold text-white uppercase brand-font tracking-wide">
                {t('res_title')} <span className="text-zinc-600 text-sm normal-case font-mono ml-2">{t('res_subtitle')}</span>
            </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left: The Visual Bar */}
            <div className="flex flex-col justify-center">
                <div className="flex justify-between text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">
                    <span>{t('res_overhead')}</span>
                    <span className="text-white">{t('res_available')}</span>
                </div>
                <div className="w-full h-16 bg-zinc-900 rounded-sm flex overflow-hidden border border-zinc-700">
                    {/* Sleep */}
                    <div style={{ width: `${TIME_STATS.SLEEP_RATIO * 100}%` }} className="h-full bg-zinc-800 border-r border-black/50 relative group">
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-500 font-mono rotate-0 md:-rotate-90 lg:rotate-0 opacity-0 group-hover:opacity-100 transition-opacity">{t('res_bar_sleep')}</span>
                    </div>
                    {/* Work */}
                    <div style={{ width: `${TIME_STATS.WORK_RATIO * 100}%` }} className="h-full bg-zinc-700 border-r border-black/50 relative group">
                         <span className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">{t('res_bar_work')}</span>
                    </div>
                     {/* Maint */}
                     <div style={{ width: `${TIME_STATS.MAINTENANCE_RATIO * 100}%` }} className="h-full bg-zinc-600 border-r border-black/50 relative group">
                         <span className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-300 font-mono opacity-0 group-hover:opacity-100 transition-opacity">{t('res_bar_tasks')}</span>
                    </div>
                    {/* Freedom */}
                    <div className="flex-1 h-full bg-[#00bf63] relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:10px_10px]"></div>
                    </div>
                </div>
                
                <p className="mt-4 text-zinc-400 text-sm leading-relaxed font-mono">
                  {t('res_desc_1')} <span className="text-white font-bold">{data.remainingYears.toFixed(1)}</span> {t('res_desc_2')} <span className="text-zinc-500 font-bold">{data.overheadPercentage.toFixed(0)}%</span> {t('res_desc_3')}
                </p>
            </div>

            {/* Right: The List Breakdown */}
            <div className="flex flex-col justify-center space-y-3">
                
                <BreakdownItem 
                  label={t('res_item_sleep')} 
                  value={data.sleepYears} 
                  total={data.remainingYears} 
                  color="bg-zinc-800"
                  textColor="text-zinc-500"
                />
                <BreakdownItem 
                  label={t('res_item_work')} 
                  value={data.workYears} 
                  total={data.remainingYears} 
                  color="bg-zinc-700"
                  textColor="text-zinc-400"
                />
                <BreakdownItem 
                  label={t('res_item_maint')} 
                  value={data.maintenanceYears} 
                  total={data.remainingYears} 
                  color="bg-zinc-600"
                  textColor="text-zinc-300"
                />
                
                <div className="w-full h-[1px] bg-zinc-800 my-2"></div>

                <div className="flex items-center justify-between p-3 rounded bg-[#00bf63]/10 border border-[#00bf63]/30">
                   <div>
                      <p className="text-[10px] text-[#00bf63] font-bold uppercase tracking-widest">{t('res_item_freedom')}</p>
                      <p className="text-white text-lg font-bold brand-font">{t('res_item_yours')}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-2xl font-black text-[#00bf63]">{data.freeYears.toFixed(1)} <span className="text-xs text-[#00bf63]/70 font-mono">{t('res_unit_yrs')}</span></p>
                      <p className="text-[10px] text-[#00bf63]/60 font-mono">{data.freePercentage.toFixed(1)}%</p>
                   </div>
                </div>

            </div>

        </div>
      </div>
    </div>
  );
};

const BreakdownItem = ({ label, value, total, color, textColor }: { label: string, value: number, total: number, color: string, textColor: string }) => {
  const { t } = useLanguage();
  const percentage = (value / total) * 100;
  
  return (
    <div className="flex items-center gap-3">
       <div className={`w-2 h-2 rounded-full ${color}`}></div>
       <div className="flex-1">
          <div className="flex justify-between items-baseline">
             <span className={`text-xs font-bold uppercase tracking-wider ${textColor}`}>{label}</span>
             <span className="text-sm font-mono text-zinc-400">{value.toFixed(1)} <span className="text-[10px] text-zinc-600">{t('res_unit_years')}</span></span>
          </div>
          <div className="w-full h-1 bg-zinc-900 mt-1 rounded-full overflow-hidden">
             <div style={{ width: `${percentage}%` }} className={`h-full ${color}`}></div>
          </div>
       </div>
    </div>
  );
};