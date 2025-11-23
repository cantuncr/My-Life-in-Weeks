import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'EN' | 'TR';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// --- TRANSLATION DICTIONARY ---
const TRANSLATIONS: Record<string, { EN: string; TR: string }> = {
  // META / HEADER
  'meta_subtitle': { EN: 'Memento Mori • Time Visualization Protocol', TR: 'Memento Mori • Zaman Görselleştirme Protokolü' },
  'legend_history': { EN: 'History', TR: 'Geçmiş' },
  'legend_present': { EN: 'Present', TR: 'Şimdi' },
  'legend_future': { EN: 'Future', TR: 'Gelecek' },
  'footer_status': { EN: 'SYSTEM_STATUS: ONLINE', TR: 'SİSTEM_DURUMU: ÇEVRİMİÇİ' },
  'footer_rights': { EN: 'ALL RIGHTS RESERVED', TR: 'TÜM HAKLARI SAKLIDIR' },

  // INSTRUCTION MANUAL
  'manual_protocol': { EN: 'PROTOCOL:', TR: 'PROTOKOL:' },
  'manual_init': { EN: 'INITIATE TEMPORAL MAPPING SEQUENCE.', TR: 'ZAMANSAL HARİTALAMA DİZİSİNİ BAŞLAT.' },
  'manual_instruction': { EN: 'INSTRUCTION:', TR: 'TALİMAT:' },
  'manual_input': { EN: 'INPUT BIOLOGICAL ORIGIN [DOB] AND PROJECTED TERMINATION CYCLE [TARGET YEAR].', TR: 'BİYOLOJİK BAŞLANGIÇ [DOĞUM] VE TAHMİNİ SONLANMA DÖNGÜSÜNÜ [HEDEF YIL] GİRİN.' },
  'manual_warning': { EN: 'WARNING: VISUALIZATION MAY INDUCE ACUTE REALITY SHOCK.', TR: 'UYARI: GÖRSELLEŞTİRME AKUT GERÇEKLİK ŞOKUNA NEDEN OLABİLİR.' },

  // INPUTS
  'input_dob': { EN: 'INITIALIZATION DATE (DOB)', TR: 'BAŞLANGIÇ TARİHİ (DOĞUM)' },
  'input_target': { EN: 'TARGET YEAR', TR: 'HEDEF YIL' },
  'input_years': { EN: 'YEARS', TR: 'YIL' },

  // TICKER
  'ticker_label': { EN: 'Real-time Entropy (Current Age)', TR: 'Gerçek Zamanlı Entropi (Şu Anki Yaş)' },

  // STATS PANEL
  'view_temporal': { EN: 'Temporal', TR: 'Zamansal' },
  'view_experiential': { EN: 'Experiential', TR: 'Deneyimsel' },
  
  'stat_weeks_rem': { EN: 'WEEKS REMAINING', TR: 'KALAN HAFTA' },
  'stat_balance': { EN: 'BALANCE', TR: 'BAKİYE' },
  'stat_consumed': { EN: 'CONSUMED', TR: 'TÜKETİLEN' },
  'stat_life_bar': { EN: 'LIFE BAR', TR: 'YAŞAM ÇUBUĞU' },
  'stat_weeks_lived': { EN: 'WEEKS LIVED', TR: 'YAŞANAN HAFTA' },
  'stat_history': { EN: 'HISTORY', TR: 'GEÇMİŞ' },
  'stat_capacity': { EN: 'TOTAL CAPACITY', TR: 'TOPLAM KAPASİTE' },
  
  'exp_summers': { EN: 'SUMMERS LEFT', TR: 'KALAN YAZLAR' },
  'exp_seasons': { EN: 'SEASONS', TR: 'MEVSİMLER' },
  'exp_mondays': { EN: 'MONDAYS LEFT', TR: 'KALAN PAZARTESİLER' },
  'exp_grind': { EN: 'THE GRIND', TR: 'ANGARYA' },
  'exp_meals': { EN: 'MEALS REMAINING', TR: 'KALAN ÖĞÜNLER' },
  'exp_consumption': { EN: 'CONSUMPTION', TR: 'TÜKETİM' },
  'exp_sleeps': { EN: 'SLEEPS LEFT', TR: 'KALAN UYKULAR' },
  'exp_rest': { EN: 'REST CYCLES', TR: 'DİNLENME DÖNGÜLERİ' },

  // GRID
  'grid_awaiting': { EN: 'AWAITING INPUT DATA...', TR: 'VERİ GİRİŞİ BEKLENİYOR...' },

  // RESOURCE BREAKDOWN
  'res_title': { EN: 'True Freedom Analysis', TR: 'Gerçek Özgürlük Analizi' },
  'res_subtitle': { EN: '(Resource Allocation)', TR: '(Kaynak Dağılımı)' },
  'res_overhead': { EN: 'System Overhead', TR: 'Sistem Yükü' },
  'res_available': { EN: 'Available for User', TR: 'Kullanıcıya Kalan' },
  'res_bar_sleep': { EN: 'SLEEP', TR: 'UYKU' },
  'res_bar_work': { EN: 'WORK', TR: 'İŞ' },
  'res_bar_tasks': { EN: 'TASKS', TR: 'GÖREV' },
  'res_desc_1': { EN: 'Of the', TR: 'Kalan' },
  'res_desc_2': { EN: 'years remaining, approximately', TR: 'yılın, yaklaşık' },
  'res_desc_3': { EN: 'will be spent on biological and societal maintenance.', TR: "'si biyolojik ve toplumsal bakım için harcanacak." },
  
  'res_item_sleep': { EN: 'SLEEP CYCLES', TR: 'UYKU DÖNGÜLERİ' },
  'res_item_work': { EN: 'CAREER/WORK', TR: 'KARİYER/İŞ' },
  'res_item_maint': { EN: 'MAINTENANCE', TR: 'BAKIM' },
  'res_item_freedom': { EN: 'TRUE FREEDOM', TR: 'GERÇEK ÖZGÜRLÜK' },
  'res_item_yours': { EN: 'PURELY YOURS', TR: 'TAMAMEN SENİN' },
  'res_unit_yrs': { EN: 'YRS', TR: 'YIL' },
  'res_unit_years': { EN: 'YEARS', TR: 'YIL' },

  // SOCIAL ENTROPY
  'soc_title': { EN: 'Social Entropy', TR: 'Sosyal Entropi' },
  'soc_subtitle': { EN: '(The Tail End Protocol)', TR: '(Kuyruk Sonu Protokolü)' },
  'soc_warning': { EN: 'WARNING:', TR: 'UYARI:' },
  'soc_warning_text': { EN: 'This module calculates the remaining face-to-face interactions with a specific person. The results can be distressing.', TR: 'Bu modül, belirli bir kişiyle kalan yüz yüze etkileşimleri hesaplar. Sonuçlar üzücü olabilir.' },
  'soc_label_name': { EN: 'Target Identifier (Name)', TR: 'Hedef Tanımlayıcı (İsim)' },
  'soc_ph_name': { EN: 'e.g. Mom, Dad, Best Friend', TR: 'Örn: Anne, Baba, Kanka' },
  'soc_label_age': { EN: 'Their Current Age', TR: 'Şu Anki Yaşları' },
  'soc_label_freq': { EN: 'Visits Per Year', TR: 'Yıllık Görüşme' },
  'soc_awaiting': { EN: 'AWAITING DATA INPUT...', TR: 'VERİ GİRİŞİ BEKLENİYOR...' },
  'soc_result_pre': { EN: 'Remaining Interactions with', TR: 'Kalan Etkileşim Sayısı:' },
  'soc_result_unit': { EN: 'Times', TR: 'Kez' },
  'soc_limit': { EN: '...SYSTEM_LIMIT_REACHED', TR: '...SİSTEM_LİMİTİNE_ULAŞILDI' },

  // BUCKET LIST / ACHIEVEMENTS
  'bucket_title': { EN: 'Achievement Protocol', TR: 'Başarı Protokolü' },
  'bucket_subtitle': { EN: '(Experience Data)', TR: '(Deneyim Verisi)' },
  'bucket_desc': { EN: 'System tracks qualitative data points. Unlock modules to increase life synchronization rate.', TR: 'Sistem niteliksel veri noktalarını izler. Yaşam senkronizasyon oranını artırmak için modülleri açın.' },
  'bucket_sync': { EN: 'Synchronization Status', TR: 'Senkronizasyon Durumu' },
  'bucket_complete': { EN: 'COMPLETE', TR: 'TAMAMLANDI' },

  // MODULES & ITEMS (Dynamic Keys)
  'mod_exploration': { EN: 'EXPLORATION', TR: 'KEŞİF' },
  'mod_exploration_desc': { EN: 'Expanding physical and mental horizons.', TR: 'Fiziksel ve zihinsel ufukları genişletmek.' },
  'item_exp_1': { EN: 'Travel to a different continent', TR: 'Farklı bir kıtaya seyahat et' },
  'item_exp_2': { EN: 'See the Northern Lights (Aurora)', TR: 'Kuzey Işıklarını (Aurora) gör' },
  'item_exp_3': { EN: 'Live in a foreign country for >3 months', TR: 'Yabancı bir ülkede 3 aydan fazla yaşa' },
  'item_exp_4': { EN: 'Learn a second language to fluency', TR: 'İkinci bir dili akıcı öğren' },
  'item_exp_5': { EN: 'Solo trip to an unknown city', TR: 'Bilinmeyen bir şehre tek başına git' },
  'item_exp_6': { EN: 'Swim in an ocean', TR: 'Okyanusta yüz' },

  'mod_creation': { EN: 'CREATION', TR: 'YARATIM' },
  'mod_creation_desc': { EN: 'Leaving a mark through output.', TR: 'Üreterek iz bırakmak.' },
  'item_crt_1': { EN: 'Build a project that generates income', TR: 'Gelir getiren bir proje inşa et' },
  'item_crt_2': { EN: 'Public speaking in front of 50+ people', TR: '50+ kişi önünde konuşma yap' },
  'item_crt_3': { EN: 'Write a book / lengthy manifesto', TR: 'Bir kitap veya uzun manifesto yaz' },
  'item_crt_4': { EN: 'Master a musical instrument', TR: 'Bir müzik aletinde ustalaş' },
  'item_crt_5': { EN: 'Mentor someone to success', TR: 'Birine başarı yolunda mentorluk yap' },

  'mod_connection': { EN: 'CONNECTION', TR: 'BAĞLANTI' },
  'mod_connection_desc': { EN: 'Depth of human experience.', TR: 'İnsan deneyiminin derinliği.' },
  'item_con_1': { EN: 'Fall deeply in love', TR: 'Derinden aşık ol' },
  'item_con_2': { EN: 'Forgive someone who hurt you', TR: 'Seni inciten birini affet' },
  'item_con_3': { EN: 'Perform a significant act of charity', TR: 'Anlamlı bir hayır işi yap' },
  'item_con_4': { EN: 'Have a conversation that lasts till sunrise', TR: 'Gün doğumuna kadar süren bir sohbet et' },
  'item_con_5': { EN: 'Make peace with your parents', TR: 'Ailenle barış / aranızı düzelt' },

  'mod_resilience': { EN: 'RESILIENCE', TR: 'DAYANIKLILIK' },
  'mod_resilience_desc': { EN: 'Overcoming biological/mental limits.', TR: 'Biyolojik/zihinsel sınırları aşmak.' },
  'item_res_1': { EN: 'Run a Marathon (or equivalent physical feat)', TR: 'Maraton koş (veya benzer fiziksel başarı)' },
  'item_res_2': { EN: 'Achieve financial independence', TR: 'Finansal özgürlüğe ulaş' },
  'item_res_3': { EN: 'Overcome a major fear (phobia)', TR: 'Büyük bir korkunu (fobi) yen' },
  'item_res_4': { EN: 'Meditate for 30 days consistently', TR: '30 gün aralıksız meditasyon yap' },
  'item_res_5': { EN: 'Recover from a major failure', TR: 'Büyük bir başarısızlığın üstesinden gel' },

  // SYSTEM CONTROLS
  'sys_title': { EN: 'System Admin Controls', TR: 'Sistem Yönetici Kontrolleri' },
  'sys_export': { EN: 'EXPORT_LOG.TXT', TR: 'LOG_DISARI_AKTAR.TXT' },
  'sys_purge': { EN: 'SYSTEM_PURGE', TR: 'SİSTEMİ_SIFIRLA' },
  'sys_confirm': { 
    EN: 'WARNING: SYSTEM PURGE INITIATED.\n\nThis will wipe all biological data and achievement records from local storage.\n\nAre you sure you want to reboot?', 
    TR: 'UYARI: SİSTEM SIFIRLAMA BAŞLATILDI.\n\nTüm biyolojik veriler ve başarı kayıtları yerel hafızadan silinecek.\n\nYeniden başlatmak istediğine emin misin?' 
  },
  
  // LOG EXPORT CONTENT
  'log_header': { EN: 'LIFE_OS SYSTEM LOG // MEMORY DUMP', TR: 'LIFE_OS SISTEM LOGU // BELLEK DOKUMU' },
  'log_timestamp': { EN: 'TIMESTAMP', TR: 'ZAMAN_DAMGASI' },
  'log_origin': { EN: 'USER_ORIGIN', TR: 'KULLANICI_BASLANGIC' },
  'log_target': { EN: 'TARGET_CYCLE', TR: 'HEDEF_DONGU' },
  'log_status': { EN: 'STATUS_REPORT', TR: 'DURUM_RAPORU' },
  'log_lived': { EN: 'LIVED', TR: 'YASANAN' },
  'log_rem': { EN: 'REMAINING', TR: 'KALAN' },
  'log_comp': { EN: 'COMPLETION', TR: 'TAMAMLANMA' },
  'log_achievements': { EN: 'ACHIEVEMENT PROTOCOL', TR: 'BASARI PROTOKOLU' },
  'log_none': { EN: 'NO ACHIEVEMENTS UNLOCKED.', TR: 'HICBIR BASARI ACILMADI.' },
  'log_unlocked': { EN: 'UNLOCKED', TR: 'ACILDI' },
  'log_end': { EN: 'END OF LOG', TR: 'LOG SONU' },

  // BOOT
  'boot_1': { EN: 'INITIALIZING KERNEL...', TR: 'ÇEKİRDEK BAŞLATILIYOR...' },
  'boot_2': { EN: 'LOADING BIOS MEMORY BLOCKS...', TR: 'BIOS BELLEK BLOKLARI YÜKLENİYOR...' },
  'boot_3': { EN: 'CHECKING CPU REGISTERS [OK]', TR: 'CPU KAYITLARI KONTROL EDİLİYOR [TAMAM]' },
  'boot_4': { EN: 'MOUNTING FILE SYSTEM...', TR: 'DOSYA SİSTEMİ BAĞLANIYOR...' },
  'boot_5': { EN: 'ACCESSING BIOMETRIC DATABASE...', TR: 'BİYOMETRİK VERİTABANINA ERİŞİLİYOR...' },
  'boot_6': { EN: 'CALIBRATING TEMPORAL SENSORS...', TR: 'ZAMANSAL SENSÖRLER KALİBRE EDİLİYOR...' },
  'boot_7': { EN: 'DECRYPTING USER TIMELINE...', TR: 'KULLANICI ZAMAN ÇİZELGESİ ÇÖZÜLÜYOR...' },
  'boot_8': { EN: 'SYNCHRONIZING ENTROPY...', TR: 'ENTROPİ SENKRONİZE EDİLİYOR...' },
  'boot_9': { EN: 'SYSTEM_READY.', TR: 'SİSTEM_HAZIR.' },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('EN');

  useEffect(() => {
    const saved = localStorage.getItem('lifeinweeks_lang');
    if (saved === 'EN' || saved === 'TR') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lifeinweeks_lang', lang);
  };

  const t = (key: string): string => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
