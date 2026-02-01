import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, 
  BookOpen, 
  Camera, 
  Presentation, 
  ArrowRight, 
  Send, 
  Youtube, 
  ExternalLink,
  Menu,
  X,
  Play,
  Pause,
  FolderOpen,
  Archive
} from 'lucide-react';

// --- (1) ВАШИ КОНТАКТЫ И ИЗОБРАЖЕНИЯ ---
const CONTACTS = {
  email1: "ohra.delf@yandex.ru",
  email2: "sharmohra@gmail.com",
  tgNeuro: "https://t.me/neirofotosharm",
  tgStories: "https://t.me/olgaskazky",
  youtube: "https://www.youtube.com/@MusicforGymnasticPerformances",
  spotify: "https://open.spotify.com/artist/41dNshRfit4g0078Kib0qH",
  audioStream: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  
  // ВСТАВЬТЕ СЮДА ВАШИ ССЫЛКИ:
  mainPhoto: "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/olga_delf_sticker.png", // Фото в фиолетовом
  roundSeal: "https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/olga_delf_seal.png"   // Круглый стикер
};

// --- (2) ВЕСЬ КОНТЕНТ САЙТА ---
const PAGES_DATA = {
  neuromusic: {
    title: "Music for Gymnastic Performances",
    sub: "Аудио-архитектура для побед",
    text: "Специализированный аудио-дизайн для художественной гимнастики. В проекте Music for Gymnastic Performances я объединяю хореографический опыт с передовыми технологиями звукозаписи. Каждый альбом — это результат математического анализа темпа и эмоционального наполнения.",
    img: "https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=800",
    specs: ["3 авторских альбома", "Международное признание", "Анализ темпа"],
    links: [
      { label: "Spotify", url: CONTACTS.spotify, icon: <Music size={14} /> },
      { label: "YouTube", url: CONTACTS.youtube, icon: <Youtube size={14} /> }
    ]
  },
  stories: {
    title: "Сказки Фантазии",
    sub: "Словесные миры за гранью",
    text: "«Сказки из мира фантазий» — это тексты, в которых буквы превращаются в живые образы. В Telegram-канале я ежедневно делюсь историями, которые балансируют на грани сна и реальности.",
    img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
    specs: ["Ежедневный канал", "Аудио-версии", "Авторский стиль"],
    links: [
      { label: "Читать в Telegram", url: CONTACTS.tgStories, icon: <Send size={14} /> }
    ]
  },
  eurythmy: {
    title: "Эвритмия",
    sub: "Искусство видимой речи и пения",
    text: "Эвритмия является фундаментом моего мировосприятия. Это искусство делать видимыми тончайшие вибрации звука и слова. В своей практике я исследую, как жест может трансформировать пространство.",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    specs: ["Личная практика", "Перформансы", "Обучение"],
    links: [
      { label: "Eurythmie.ru", url: "http://eurythmie.ru.tilda.ws", icon: <ExternalLink size={14} /> },
      { label: "Фестиваль Эвритмии", url: "https://eurythmy-festival.ru", icon: <ExternalLink size={14} /> },
      { label: "Написать", url: `mailto:${CONTACTS.email1}`, icon: <Send size={14} /> }
    ]
  },
  neurophoto: {
    title: "Магия Нейрофото",
    sub: "Синтез ИИ и классики",
    text: "Создаю визуальные воплощения мечты, используя нейронные сети как современный холст. Мои работы — это художественно выверенные портреты и ландшафты.",
    img: "https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&q=80&w=800",
    specs: ["Art-дирекшн", "Кастомные сеты", "AI Постпродакшн"],
    links: [
      { label: "Галерея в Telegram", url: CONTACTS.tgNeuro, icon: <Send size={14} /> }
    ]
  },
  presentations: {
    title: "Презентации",
    sub: "Логика визуальных смыслов",
    text: "Визуализация идей — это умение выделять главное. Я создаю презентации, которые работают как точные инструменты убеждения.",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
    specs: ["Инфографика", "Pitch Decks", "Бизнес-дизайн"],
    links: [
      { label: "Обсудить проект", url: `mailto:${CONTACTS.email1}`, icon: <ExternalLink size={14} /> }
    ]
  },
  contact: {
    title: "Связи / Contacts",
    sub: "Открыта к сотрудничеству",
    text: "По вопросам сотрудничества, создания музыки или нейро-визуализаций обращайтесь по указанным контактам.",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200",
    specs: ["Email Correspondence", "Global Collaboration", "Professional Network"],
    links: [
      { label: "ohra.delf@yandex.ru", url: `mailto:${CONTACTS.email1}`, icon: <ExternalLink size={14} /> },
      { label: "sharmohra@gmail.com", url: `mailto:${CONTACTS.email2}`, icon: <ExternalLink size={14} /> }
    ]
  }
};

// --- (3) АРХИВНЫЕ ССЫЛКИ ---
const ARCHIVE_LINKS = [
  { 
    title: "Общий архив (Яндекс Диск)", 
    url: "https://disk.yandex.ru", 
    description: "Документы, статьи и исходные материалы проекта." 
  },
  { 
    title: "Медиа-архив", 
    url: "https://disk.yandex.ru", 
    description: "Фотографии высокого разрешения и аудио-превью." 
  }
];

type ViewType = keyof typeof PAGES_DATA | 'home';

export default function App() {
  const [view, setView] = useState<ViewType>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [view]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio error:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const Header = () => (
    <header className="border-b-4 border-black pt-6 pb-4 px-4 md:px-8 bg-[#F9F9F7] sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto">
        <audio ref={audioRef} src={CONTACTS.audioStream} loop />
        
        {/* ВЕРХНЯЯ СТРОКА МЕТАДАННЫХ */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 font-mono text-[10px] uppercase tracking-[0.2em] border-b border-black/10 pb-4 gap-4">
          <div className="flex items-center gap-4">
            <span className="font-bold">ТОМ 1.0</span>
            <span className="opacity-30">|</span>
            <button 
              onClick={toggleMusic}
              className={`flex items-center gap-2 px-3 py-1 border border-black transition-all ${isPlaying ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
            >
              {isPlaying ? <Pause size={10} /> : <Play size={10} />}
              <span className="text-[9px] font-black">{isPlaying ? 'СТОП' : 'СЛУШАТЬ'}</span>
            </button>
          </div>
          <div className="text-center font-serif italic text-[12px] uppercase tracking-widest hidden lg:block">Издание об искусстве и цифровом видении</div>
          <div className="font-bold">{new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}</div>
        </div>
        
        {/* ЦЕНТРАЛЬНЫЙ ЛОГОТИП */}
        <div className="relative flex flex-col items-center mb-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-neutral-400 mb-2">Портфолио</span>
          <div className="flex items-center justify-center w-full relative">
            <h1 
              onClick={() => setView('home')}
              className="font-serif text-5xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-none cursor-pointer hover:text-[#CC0000] transition-colors uppercase text-center"
            >
              OLGA DELF
            </h1>
            
            {/* МОНОГРАММА */}
            <div className="hidden xl:flex absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 border-2 border-black items-center justify-center bg-white rotate-3">
               <div className="text-center">
                 <div className="font-serif text-2xl font-black leading-none">OD</div>
                 <div className="font-mono text-[8px] tracking-tighter uppercase mt-1">EST. 2024</div>
               </div>
            </div>
          </div>
        </div>

        {/* НАВИГАЦИЯ */}
        <nav className="border-y-2 border-black mt-4 relative">
          <button 
            className="md:hidden w-full py-4 font-black uppercase text-xs flex items-center justify-center gap-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />} Меню разделов
          </button>
          
          <div className={`
            md:flex w-full py-2 justify-center gap-4 lg:gap-12 font-sans text-[11px] font-extrabold uppercase tracking-[0.2em] bg-[#F9F9F7]
            ${isMenuOpen ? 'flex flex-col items-center' : 'hidden md:flex'}
          `}>
            {(['home', 'neuromusic', 'stories', 'eurythmy', 'neurophoto', 'contact'] as const).map(v => (
              <button 
                key={v}
                onClick={() => setView(v)} 
                className={`
                  px-4 py-2 transition-all relative group
                  ${view === v ? 'text-[#CC0000]' : 'hover:text-[#CC0000]'} 
                `}
              >
                {v === 'home' ? 'Главная' : v === 'neuromusic' ? 'Музыка' : v === 'stories' ? 'Сказки' : v === 'eurythmy' ? 'Эвритмия' : v === 'neurophoto' ? 'Нейрофото' : 'Контакты'}
                {view === v && <div className="absolute -bottom-2 left-0 w-full h-1 bg-black" />}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );

  const Ticker = () => (
    <div className="border-b-2 border-black bg-[#111111] text-[#F9F9F7] overflow-hidden whitespace-nowrap py-1.5 z-40 relative">
      <div className="inline-block animate-[ticker_40s_linear_infinite] uppercase font-mono text-[10px] tracking-[0.4em] font-bold">
        ОЛЬГА ХРАПУТСКАЯ • MUSIC FOR GYMNASTIC PERFORMANCES • СКАЗКИ ИЗ МИРА ФАНТАЗИЙ • МАГИЯ НЕЙРОФОТО • ЭВРИТМИЯ • 
        ОЛЬГА ХРАПУТСКАЯ • MUSIC FOR GYMNASTIC PERFORMANCES • СКАЗКИ ИЗ МИРА ФАНТАЗИЙ • МАГИЯ НЕЙРОФОТО • ЭВРИТМИЯ • 
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );

  const ArchiveSection = () => (
    <section className="max-w-screen-xl mx-auto border-t-4 border-black mt-12 bg-white block overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
        <div className="lg:col-span-4 p-8 md:p-10 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-neutral-50 flex flex-col justify-center">
           <div className="flex items-center gap-3 mb-4">
             <Archive className="text-[#CC0000]" size={28} />
             <h4 className="font-serif text-2xl font-black uppercase tracking-tighter">Цифровой Архив</h4>
           </div>
           <p className="font-body text-base leading-relaxed mb-6">
             Доступ к облачным хранилищам, публикациям и материалам проекта.
           </p>
           <div className="h-1 w-16 bg-[#CC0000]" />
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2">
            {ARCHIVE_LINKS.map((link, idx) => (
              <a 
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group p-8 border-b-2 md:border-b-0 border-black flex flex-col justify-between hover:bg-black hover:text-white transition-all
                  ${idx === 0 ? 'md:border-r-2 border-black' : ''}
                `}
              >
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#CC0000] group-hover:text-white block mb-3">Яндекс Диск</span>
                  <h5 className="font-serif text-xl font-black mb-2">{link.title}</h5>
                  <p className="font-body text-xs opacity-60 group-hover:opacity-100">{link.description}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest">
                  Открыть папку <ExternalLink size={12} />
                </div>
              </a>
            ))}
        </div>
      </div>
    </section>
  );

  const renderHome = () => (
    <div className="animate-in fade-in duration-700">
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b-2 border-black items-stretch bg-white">
        <div className="p-8 md:p-16 lg:p-20 border-b-2 lg:border-b-0 lg:border-r-2 border-black flex flex-col justify-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#CC0000] mb-6 block font-bold">Главная Тема</span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-10 tracking-tighter text-left uppercase">
            Гармония <br />
            в Движении <br />
            и Цифре
          </h2>
          <div className="text-left border-t-4 border-black pt-8">
            <p className="font-body text-lg md:text-xl leading-relaxed text-neutral-800 drop-cap">
              Искусство — это живой организм, который эволюционирует вместе с нами. Мой путь — это симбиоз классической эвритмии и современных нейросетевых технологий. Мы ищем новые способы выражения вечных истин через музыку, слово и образ.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-widest mt-8 font-black">— Ольга Храпутская</p>
          </div>
        </div>
        
        {/* ФОТО СПРАВА */}
        <div className="p-8 md:p-12 bg-[#F9F9F7] flex flex-col justify-center items-center">
          <div className="relative group w-full max-w-sm">
             <div className="absolute -inset-4 border-2 border-dashed border-black opacity-20 group-hover:opacity-40 transition-opacity" />
             <img 
               src={CONTACTS.mainPhoto} 
               onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800";
               }}
               alt="Olga Delf" 
               className="w-full relative z-10 shadow-[15px_15px_0px_0px_rgba(0,0,0,0.05)] filter contrast-110" 
             />
             <div className="absolute bottom-4 -left-8 z-20 bg-black text-white p-3 rotate-[-4deg] font-mono text-[9px] uppercase tracking-widest border border-white/20">
               Автор Проекта
             </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b-2 border-black">
        {[
          { id: 'neuromusic', title: 'Музыка', sub: 'Gymnastics Sound', icon: <Music size={24} /> },
          { id: 'stories', title: 'Сказки', sub: 'Literature', icon: <BookOpen size={24} /> },
          { id: 'neurophoto', title: 'Нейрофото', sub: 'AI Photography', icon: <Camera size={24} /> },
          { id: 'presentations', title: 'Визуал', sub: 'Design Logic', icon: <Presentation size={24} /> },
        ].map((item, idx) => (
          <div 
            key={item.id}
            onClick={() => setView(item.id as ViewType)}
            className={`
              group cursor-pointer p-10 flex flex-col items-center text-center hover:bg-white transition-all
              ${idx !== 3 ? 'lg:border-r-2 border-black' : ''}
              ${idx % 2 === 0 ? 'md:border-r-2 lg:border-r-2 border-black' : ''}
              ${idx > 1 ? 'border-t-2 lg:border-t-0 border-black' : ''}
              ${idx === 1 ? 'border-t-2 md:border-t-0 border-black' : ''}
            `}
          >
            <div className="mb-6 p-4 border-2 border-black group-hover:bg-black group-hover:text-white transition-all bg-white">
              {item.icon}
            </div>
            <h3 className="font-serif text-2xl font-black mb-1 uppercase tracking-tighter">{item.title}</h3>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-400 mb-6">{item.sub}</p>
            <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3 group-hover:text-[#CC0000]">
              Читать далее <ArrowRight size={12} />
            </span>
          </div>
        ))}
      </section>
      <ArchiveSection />
    </div>
  );

  const renderArticle = () => {
    const p = PAGES_DATA[view as keyof typeof PAGES_DATA];
    if (!p) return null;

    return (
      <div className="max-w-screen-xl mx-auto border-x-2 border-black bg-white animate-in slide-in-from-bottom-8 duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-8 p-8 md:p-12 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#CC0000] mb-4 block font-bold">Раздел</span>
            <h2 className="font-serif text-4xl lg:text-5xl font-black mb-6 uppercase tracking-tighter leading-none">{p.title}</h2>
            <p className="font-serif italic text-xl text-neutral-400 mb-8 border-b-4 border-black pb-6">{p.sub}</p>
            <div className="font-body text-lg lg:text-xl leading-relaxed text-justify drop-cap">
              <p className="text-neutral-800">{p.text}</p>
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
               {p.links.map((link, i) => (
                 <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="border-2 border-black px-6 py-3 font-black uppercase text-[10px] hover:bg-black hover:text-white transition-all flex items-center gap-2">
                   {link.label} {link.icon}
                 </a>
               ))}
            </div>
          </div>
          <div className="lg:col-span-4 p-8 bg-[#F9F9F7] space-y-8 flex flex-col items-center">
             <div className="w-full border-4 border-black p-2 bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
               <img src={p.img} alt={p.title} className="w-full photo-grayscale border border-black transition-all duration-700 hover:scale-105" />
             </div>
             
             {/* КРУГЛАЯ ПЕЧАТЬ */}
             <div className="w-32 h-32 relative rotate-6">
                <img 
                  src={CONTACTS.roundSeal} 
                  onError={(e) => {
                     e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200";
                  }}
                  className="w-full h-full object-cover rounded-full border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]" 
                  alt="Печать" 
                />
             </div>

             <div className="bg-[#111111] text-white p-6 w-full border-b-4 border-[#CC0000]">
                <h4 className="font-serif text-lg font-bold mb-4 italic border-b border-white/20 pb-2">Детали</h4>
                <ul className="space-y-3 font-mono text-[10px] uppercase tracking-wider">
                  {p.specs.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 bg-[#CC0000] shrink-0" /> 
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F7] overflow-x-hidden">
      <Header />
      <Ticker />
      <main className="flex-grow">{view === 'home' ? renderHome() : renderArticle()}</main>
      
      {view !== 'home' && view !== 'contact' && <ArchiveSection />}

      <footer className="bg-[#111111] text-white pt-20 pb-12 px-8 border-t-[10px] border-black mt-16 overflow-hidden">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">OLGA DELF</h2>
            <div className="h-1 w-16 bg-[#CC0000]" />
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-400 max-w-sm leading-loose">
              Мультидисциплинарный проект Ольги Храпутской. <br /> Основано в 2024 году. Москва.
            </p>
          </div>
          <div className="flex flex-col justify-end lg:items-end">
            <div className="space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-neutral-500 block font-bold">Связаться</span>
              <a href={`mailto:${CONTACTS.email1}`} className="block font-serif text-xl hover:text-[#CC0000] transition-colors">{CONTACTS.email1}</a>
              <div className="flex gap-3">
                <a href={CONTACTS.tgStories} target="_blank" className="p-3 border border-white/10 hover:bg-white hover:text-black transition-all"><Send size={16} /></a>
                <a href={CONTACTS.youtube} target="_blank" className="p-3 border border-white/10 hover:bg-white hover:text-black transition-all"><Youtube size={16} /></a>
                <a href={CONTACTS.spotify} target="_blank" className="p-3 border border-white/10 hover:bg-white hover:text-black transition-all"><Music size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}