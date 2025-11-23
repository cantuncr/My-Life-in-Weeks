import { LifeStage } from './types';

export const WEEKS_PER_YEAR = 52;
export const DEFAULT_LIFE_EXPECTANCY = 80;

// The requested green accent
export const ACCENT_COLOR = '#00bf63'; 

// Lived stages are muted colors. The focus is on the "NOW".
export const STAGE_CONFIG = [
  { maxAge: 5, stage: LifeStage.EARLY_YEARS, color: 'bg-zinc-800' },
  { maxAge: 22, stage: LifeStage.SCHOOL, color: 'bg-zinc-700' },
  { maxAge: 60, stage: LifeStage.CAREER, color: 'bg-zinc-600' },
  { maxAge: 120, stage: LifeStage.RETIREMENT, color: 'bg-zinc-500' },
];

export const getStageColor = (age: number): string => {
  const config = STAGE_CONFIG.find(c => age < c.maxAge);
  return config ? config.color : 'bg-zinc-800';
};

// Resource Breakdown Constants (Averages)
export const TIME_STATS = {
    SLEEP_RATIO: 0.33, // 8 hours a day
    WORK_RATIO: 0.20,  // Averaged over lifetime (assuming 40h weeks during career)
    MAINTENANCE_RATIO: 0.15, // Eating, commuting, chores, hygiene
};

// Experience Multipliers
export const EXP_STATS = {
    MEALS_PER_DAY: 3,
    SLEEPS_PER_DAY: 1,
    MONDAYS_PER_WEEK: 1,
};

// Quotes are now handled in App.tsx via translation keys or logic, 
// but for simplicity we can keep a dynamic list here or just handle IDs.
// To support dual language quotes properly, we should probably stick to 
// a simple list of IDs or objects, but given they are random rotation,
// let's put the EN/TR versions directly in LanguageContext or just keep english quotes as "System Flavor".
// Let's decide to keep quotes in English as "System Messages" for now, or move them to LanguageContext if critical.
// Actually, let's make them part of the language dict if we want them translated.
// For now, I will export an empty array here and handle them in App.tsx using t().
export const SYSTEM_QUOTES = [
  "quote_1", "quote_2", "quote_3", "quote_4", "quote_5", "quote_6", "quote_7"
];

// Achievement / Bucket List Data (Structure Only)
export const ACHIEVEMENT_MODULES = [
  {
    id: 'exploration',
    translationKey: 'mod_exploration',
    descKey: 'mod_exploration_desc',
    items: [
      { id: 'exp_1', labelKey: 'item_exp_1' },
      { id: 'exp_2', labelKey: 'item_exp_2' },
      { id: 'exp_3', labelKey: 'item_exp_3' },
      { id: 'exp_4', labelKey: 'item_exp_4' },
      { id: 'exp_5', labelKey: 'item_exp_5' },
      { id: 'exp_6', labelKey: 'item_exp_6' },
    ]
  },
  {
    id: 'creation',
    translationKey: 'mod_creation',
    descKey: 'mod_creation_desc',
    items: [
      { id: 'crt_1', labelKey: 'item_crt_1' },
      { id: 'crt_2', labelKey: 'item_crt_2' },
      { id: 'crt_3', labelKey: 'item_crt_3' },
      { id: 'crt_4', labelKey: 'item_crt_4' },
      { id: 'crt_5', labelKey: 'item_crt_5' },
    ]
  },
  {
    id: 'connection',
    translationKey: 'mod_connection',
    descKey: 'mod_connection_desc',
    items: [
      { id: 'con_1', labelKey: 'item_con_1' },
      { id: 'con_2', labelKey: 'item_con_2' },
      { id: 'con_3', labelKey: 'item_con_3' },
      { id: 'con_4', labelKey: 'item_con_4' },
      { id: 'con_5', labelKey: 'item_con_5' },
    ]
  },
  {
    id: 'resilience',
    translationKey: 'mod_resilience',
    descKey: 'mod_resilience_desc',
    items: [
      { id: 'res_1', labelKey: 'item_res_1' },
      { id: 'res_2', labelKey: 'item_res_2' },
      { id: 'res_3', labelKey: 'item_res_3' },
      { id: 'res_4', labelKey: 'item_res_4' },
      { id: 'res_5', labelKey: 'item_res_5' },
    ]
  }
];