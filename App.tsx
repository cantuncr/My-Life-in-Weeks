import React, { useState, useEffect } from 'react';
import { InputSection } from './components/InputSection';
import { StatsPanel } from './components/StatsPanel';
import { Grid } from './components/Grid';
import { EntropyTicker } from './components/EntropyTicker';
import { ResourceBreakdown } from './components/ResourceBreakdown';
import { BucketList } from './components/BucketList';
import { BootSequence } from './components/BootSequence';
import { SocialEntropy } from './components/SocialEntropy';
import { SystemControls } from './components/SystemControls';
import { DEFAULT_LIFE_EXPECTANCY } from './constants';
import { Zap, Terminal, AlertCircle, Globe } from 'lucide-react';
import { LanguageProvider, useLanguage } from './LanguageContext';

// We split the content into a sub-component to use the hook
const AppContent: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isBooting, setIsBooting] = useState(true);
  const [birthDate, setBirthDate] = useState<string>('');
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(DEFAULT_LIFE_EXPECTANCY);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Quote Dictionary (Defined here to access 't')
  const QUOTES = [
    { EN: "You act like mortals in all that you fear, and like immortals in all that you desire. - Seneca", TR: "Korktuğunuz her şeyde ölümlü, arzuladığınız her şeyde ölümsüz gibi davranıyorsunuz. - Seneca" },
    { EN: "It is not that we have a short time to live, but that we waste a lot of it. - Seneca", TR: "Yaşayacak kısa bir zamanımız yok, çoğunu boşa harcıyoruz. - Seneca" },
    { EN: "You could leave life right now. Let that determine what you do and say and think. - Marcus Aurelius", TR: "Şu an hayattan ayrılabilirsin. Ne yaptığını, ne dediğini ve ne düşündüğünü bu belirlesin. - Marcus Aurelius" },
    { EN: "The future torments us, the past holds us back; the present escapes us. - Gustave Flaubert", TR: "Gelecek bize azap çektirir, geçmiş bizi geride tutar; şimdiki zaman ise elimizden kaçar. - Gustave Flaubert" },
    { EN: "Time is the most valuable thing a man can spend. - Theophrastus", TR: "Zaman, bir insanın harcayabileceği en değerli şeydir. - Theophrastus" },
    { EN: "Lost time is never found again. - Benjamin Franklin", TR: "Kaybedilen zaman asla geri gelmez. - Benjamin Franklin" },
    { EN: "Your time is limited, so don't waste it living someone else's life. - Steve Jobs", TR: "Zamanınız kısıtlı, bu yüzden başkasının hayatını yaşayarak onu harcamayın. - Steve Jobs" }
  ];

  // Load from LocalStorage on Mount
  useEffect(() => {
    const savedBirthDate = localStorage.getItem('lifeinweeks_birthdate');
    const savedLifeExpectancy = localStorage.getItem('lifeinweeks_expectancy');

    if (savedBirthDate) setBirthDate(savedBirthDate);
    if (savedLifeExpectancy) setLifeExpectancy(Number(savedLifeExpectancy));
  }, []);

  // Save to LocalStorage on Change
  useEffect(() => {
    if (birthDate) localStorage.setItem('lifeinweeks_birthdate', birthDate);
  }, [birthDate]);

  useEffect(() => {
    localStorage.setItem('lifeinweeks_expectancy', lifeExpectancy.toString());
  }, [lifeExpectancy]);

  // Quote rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
        setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [QUOTES.length]);

  // Robust System Reset Logic
  const handleSystemReset = () => {
    // 1. Clear Storage
    localStorage.clear();
    
    // 2. Reset State
    setBirthDate('');
    setLifeExpectancy(DEFAULT_LIFE_EXPECTANCY);
    
    // 3. Re-trigger Boot Sequence (this acts as a visual reset and unmounts children)
    setIsBooting(true);

    // 4. Attempt reload as backup
    try {
        window.location.reload();
    } catch (e) {
        console.log("Reload prevented by environment, state reset successful.");
    }
  };

  // Boot Sequence Handling
  if (isBooting) {
      return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#050505] text-zinc-200 selection:bg-[#00bf63] selection:text-black overflow-x-hidden relative">
      
      {/* LANGUAGE TOGGLE - FIXED TOP RIGHT */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setLanguage(language === 'EN' ? 'TR' : 'EN')}
          className="bg-black/80 backdrop-blur-md border border-[#00bf63]/30 text-[#00bf63] px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono font-bold hover:bg-[#00bf63]/10 transition-all shadow-[0_0_15px_rgba(0,191,99,0.2)]"
        >
          <Globe size={12} />
          <span className={language === 'EN' ? 'text-white' : 'opacity-50'}>EN</span>
          <span className="opacity-30">/</span>
          <span className={language === 'TR' ? 'text-white' : 'opacity-50'}>TR</span>
        </button>
      </div>

      {/* Decorative Gradient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#00bf63]/5 to-transparent blur-3xl opacity-30"></div>
      </div>

      <div className="w-full max-w-6xl px-4 z-10 flex-grow animate-in fade-in duration-1000">
        
        {/* HEADER */}
        <header className="flex flex-col items-center justify-center py-12 md:py-16">
          <div className="relative group cursor-default text-center">
            {/* Logo Container */}
            <div className="flex items-baseline justify-center gap-2">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white brand-font uppercase">
                    My Life <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700 font-thin">in</span>
                </h1>
            </div>
            <div className="flex items-center justify-center -mt-2 md:-mt-4">
                 <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#00bf63] brand-font uppercase drop-shadow-[0_0_15px_rgba(0,191,99,0.5)]">
                    Weeks
                </h1>
                <Zap size={32} className="text-[#00bf63] fill-[#00bf63] animate-pulse ml-2 hidden md:block" />
            </div>
            
            <p className="text-center text-zinc-500 font-mono text-xs md:text-sm mt-4 tracking-[0.2em] uppercase">
                {t('meta_subtitle')}
            </p>
            
            {/* System Quotes / Ticker */}
            <div className="mt-6 h-6 flex justify-center items-center overflow-hidden">
                <p key={quoteIndex} className="text-[10px] text-zinc-600 font-mono animate-in slide-in-from-bottom-2 fade-in duration-500 italic px-4 text-center">
                    "{QUOTES[quoteIndex][language]}"
                </p>
            </div>
          </div>
        </header>

        {/* INSTRUCTION MANUAL / SYSTEM PROMPT */}
        <div className="w-full max-w-2xl mx-auto mb-4 px-2">
            <div className="flex items-start gap-3 text-[10px] md:text-xs font-mono text-zinc-500 bg-zinc-900/30 border border-dashed border-zinc-800 p-3 rounded-md">
                <Terminal size={14} className="text-[#00bf63] mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                    <p>
                        <span className="text-[#00bf63] font-bold">{t('manual_protocol')}</span> {t('manual_init')}
                    </p>
                    <p>
                        <span className="text-zinc-400 font-bold">{t('manual_instruction')}</span> {t('manual_input')}
                    </p>
                    <p className="flex items-center gap-1.5 text-red-900/70 mt-1">
                        <AlertCircle size={10} />
                        <span>{t('manual_warning')}</span>
                    </p>
                </div>
            </div>
        </div>

        {/* INPUTS */}
        <InputSection 
          birthDate={birthDate} 
          setBirthDate={setBirthDate}
          lifeExpectancy={lifeExpectancy}
          setLifeExpectancy={setLifeExpectancy}
        />

        {/* STATS & VISUALIZATION */}
        {birthDate && (
          <div className="pb-20">
            
            {/* 1. Entropy Ticker (Realtime Age) */}
            <EntropyTicker birthDateStr={birthDate} />

            {/* 2. Main Stats (Temporal / Experiential) */}
            <StatsPanel birthDateStr={birthDate} lifeExpectancy={lifeExpectancy} />
            
            {/* 3. The Grid */}
            <div className="bg-[#0a0a0a] border border-zinc-900 rounded-lg p-2 md:p-6 shadow-2xl relative overflow-hidden mb-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00bf63] to-transparent opacity-20"></div>
                <Grid birthDateStr={birthDate} lifeExpectancy={lifeExpectancy} />
            </div>

            <div className="mt-4 flex justify-center gap-6 text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-16">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-zinc-700 rounded-[1px]"></div>
                    <span>{t('legend_history')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#00bf63] shadow-[0_0_10px_#00bf63] rounded-[1px]"></div>
                    <span className="text-[#00bf63]">{t('legend_present')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border border-zinc-800 bg-[#111] rounded-[1px]"></div>
                    <span>{t('legend_future')}</span>
                </div>
            </div>

            {/* 4. True Freedom Analysis */}
            <ResourceBreakdown birthDateStr={birthDate} lifeExpectancy={lifeExpectancy} />

            {/* 5. Social Entropy (The Tail End) */}
            <SocialEntropy />

            {/* 6. Achievement Protocol */}
            <BucketList />

            {/* 7. System Controls (Export/Reset) */}
            <SystemControls onReset={handleSystemReset} />

          </div>
        )}
      </div>

      <footer className="w-full py-8 text-center border-t border-zinc-900 bg-[#020202] mt-auto">
          <p className="text-zinc-600 text-[10px] font-mono tracking-widest mb-1">{t('footer_status')}</p>
          <p className="text-zinc-500 text-xs font-bold font-mono tracking-wider">
              {t('footer_rights')} <span className="text-[#00bf63]">CAN TUNÇER</span> © {new Date().getFullYear()}
          </p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;