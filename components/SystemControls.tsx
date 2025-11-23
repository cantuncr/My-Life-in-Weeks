import React from 'react';
import { Download, Trash2, ShieldAlert } from 'lucide-react';
import { calculateWeeksLived } from '../utils';
import { WEEKS_PER_YEAR, ACHIEVEMENT_MODULES } from '../constants';
import { useLanguage } from '../LanguageContext';

interface SystemControlsProps {
  onReset: () => void;
}

export const SystemControls: React.FC<SystemControlsProps> = ({ onReset }) => {
  const { t } = useLanguage();
  
  const handleExport = () => {
    // Gather Data
    const birthDate = localStorage.getItem('lifeinweeks_birthdate') || 'NOT_SET';
    const lifeExpectancy = localStorage.getItem('lifeinweeks_expectancy') || '80';
    const achievementsRaw = localStorage.getItem('lifeinweeks_achievements');
    const unlockedIds = achievementsRaw ? JSON.parse(achievementsRaw) : [];

    // Calculate basic stats for the log
    let statsText = "NO_DATA";
    if (birthDate !== 'NOT_SET') {
        const lived = calculateWeeksLived(new Date(birthDate));
        const total = Number(lifeExpectancy) * WEEKS_PER_YEAR;
        const remaining = total - lived;
        const percentage = ((lived / total) * 100).toFixed(2);
        statsText = `${t('log_lived')}: ${lived} | ${t('log_rem')}: ${remaining} | ${t('log_comp')}: ${percentage}%`;
    }

    // Map achievements to readable text
    let achievementLog = `\n--- ${t('log_achievements')} ---\n`;
    if (unlockedIds.length === 0) {
        achievementLog += `${t('log_none')}\n`;
    } else {
        ACHIEVEMENT_MODULES.forEach(mod => {
            mod.items.forEach(item => {
                if (unlockedIds.includes(item.id)) {
                    achievementLog += `[${t('log_unlocked')}] ${t(mod.translationKey)}: ${t(item.labelKey)}\n`;
                }
            });
        });
    }

    const timestamp = new Date().toISOString();
    
    // Construct the file content
    const fileContent = `
=========================================
      ${t('log_header')}
=========================================
${t('log_timestamp')}: ${timestamp}
${t('log_origin')}: ${birthDate}
${t('log_target')}: ${lifeExpectancy} ${t('res_unit_years')}
-----------------------------------------
${t('log_status')}:
${statsText}
-----------------------------------------
${achievementLog}
=========================================
${t('log_end')}
    `.trim();

    // Create and trigger download
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${t('sys_export')}`; // Translated filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleResetClick = () => {
    const confirmed = window.confirm(t('sys_confirm'));
    if (confirmed) {
      onReset();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-t border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-sm">
        
        <div className="flex items-center gap-2 text-zinc-600">
            <ShieldAlert size={14} />
            <span className="text-[10px] font-mono uppercase tracking-widest">{t('sys_title')}</span>
        </div>

        <div className="flex gap-4">
            <button 
                type="button"
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded text-xs font-mono text-zinc-300 hover:text-[#00bf63] hover:border-[#00bf63] transition-all group"
            >
                <Download size={14} className="group-hover:animate-bounce" />
                {t('sys_export')}
            </button>
            
            <button 
                type="button"
                onClick={handleResetClick}
                className="flex items-center gap-2 px-4 py-2 bg-red-900/10 border border-red-900/30 rounded text-xs font-mono text-red-500 hover:bg-red-900/30 hover:text-red-400 transition-all"
            >
                <Trash2 size={14} />
                {t('sys_purge')}
            </button>
        </div>

      </div>
    </div>
  );
};