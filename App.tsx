import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, 
  BookOpen, 
  Camera, 
  Presentation, 
  ArrowRight, 
  Send, 
  Youtube, 
  ChevronRight,
  ExternalLink,
  MapPin,
  Menu,
  X,
  Play,
  Pause
} from 'lucide-react';

const IMAGES = {
  homeHero: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200",
  neuromusic: "https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=800",
  stories: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
  eurythmy: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
  neurophoto: "https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&q=80&w=800",
  presentations: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
};

const CONTACTS = {
  email1: "ohra.delf@yandex.ru",
  email2: "sharmohra@gmail.com",
  city: "Москва, Россия",
  tgNeuro: "https://t.me/neirofotosharm",
  tgStories: "https://t.me/olgaskazky",
  youtube: "https://www.youtube.com/@MusicforGymnasticPerformances",
  spotify: "https://open.spotify.com/artist/41dNshRfit4g0078Kib0qH",
  // ВСТАВЬТЕ ВАШУ ССЫЛКУ НА MP3 НИЖЕ
  audioStream: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
};

type ViewType = 'home' | 'neuromusic' | 'stories' | 'neurophoto' | 'presentations' | 'eurythmy' | 'contact';

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
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const Header = () => (
    <header className="border-b-2 border-black pt-8 pb-4 px-4 md:px-8 bg-[#F9F9F7] sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto">
        <audio ref={audioRef} src={CONTACTS.audioStream} loop />
        
        <div className="flex justify-between items-end mb-6 font-mono text-[10px] uppercase tracking-[0.3em] border-b border-black/10 pb-2">
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <span>Выпуск №1</span>
              <span className="hidden sm:inline">|</span>
              <span>2025</span>
            </div>
            {/* Music Toggle - Newsprint Style */}
            <button 
              onClick={toggleMusic}
              className={`
                flex items-center gap-2 px-3 py-1 border border-black transition-all sharp-corners group
                ${isPlaying ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}
              `}
            >
              {isPlaying ? <Pause size={10} /> : <Play size={10} />}
              <span className="text-[9px] tracking-widest font-bold">
                {isPlaying ? 'МУЗЫКА: ВКЛ' : 'МУЗЫКА: ВЫКЛ'}
              </span>
            </button>
          </div>
          
          <div className="text-center hidden md:block italic">Творческий Альманах</div>
          
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">{new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            <span className="hidden sm:inline">|</span>
            <div className="flex gap-3">
              <a href={CONTACTS.tgStories} target="_blank" className="hover:text-[#CC0000] transition-colors"><Send size={14} /></a>
              <a href={CONTACTS.youtube} target="_blank" className="hover:text-[#CC0000] transition-colors"><Youtube size={14} /></a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center mb-8 relative">
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 md:hidden p-2 border border-black sharp-corners"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <h1 
            onClick={() => setView('home')}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85] cursor-pointer hover:text-[#CC0000] transition-colors text-center"
          >
            OLGA DELF
          </h1>
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] mt-6 text-neutral-500 text-center">
            Хореограф • Эвритмист • AI творец
          </p>
        </div>

        <nav className={`
          md:flex w-full border-y border-black py-3 justify-center gap-10 font-sans text-[11px] font-bold uppercase tracking-[0.25em] bg-[#F9F9F7]
          ${isMenuOpen ? 'flex flex-col items-center absolute top-full left-0 border-b-2 shadow-xl bg-[#F9F9F7]' : 'hidden md:flex'}
        `}>
          {(['home', 'neuromusic', 'stories', 'eurythmy', 'neurophoto', 'contact'] as const).map(v => (
            <button 
              key={v}
              onClick={() => setView(v)} 
              className={`
                ${view === v ? 'text-[#CC0000] underline decoration-2 underline-offset-8' : ''} 
                hover:text-[#CC0000] transition-colors py-2 md:py-0
              `}
            >
              {v === 'home' ? 'Главная' : v === 'neuromusic' ? 'Музыка' : v === 'stories' ? 'Сказки' : v === 'eurythmy' ? 'Эвритмия' : v === 'neurophoto' ? 'Нейрофото' : 'Контакты'}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );

  const Marquee = () => (
    <div className="border-b-2 border-black bg-[#111111] text-[#F9F9F7] overflow-hidden whitespace-nowrap py-2 relative z-30">
      <div className="inline-block animate-[marquee_50s_linear_infinite] uppercase font-mono text-[11px] tracking-[0.4em]">
        ОЛЬГА ХРАПУТСКАЯ • MUSIC FOR GYMNASTICS PERFORMANCES • СКАЗКИ ИЗ МИРА ФАНТАЗИЙ • МАГИЯ НЕЙРОФОТО • ЭВРИТМИЯ • 
        ОЛЬГА ХРАПУТСКАЯ • MUSIC FOR GYMNASTICS PERFORMANCES • СКАЗКИ ИЗ МИРА ФАНТАЗИЙ • МАГИЯ НЕЙРОФОТО • ЭВРИТМИЯ • 
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );

  const renderContent = () => {
    if (view === 'home') {
      return (
        <div className="animate-in fade-in duration-1000">
          <section className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-black">
            <div className="lg:col-span-8 p-8 md:p-16 lg:p-24 border-r-2 border-black flex flex-col justify-center bg-white relative">
              <div className="absolute top-8 left-8 font-serif text-6xl opacity-10 select-none">“</div>
              <span className="font-mono text-[11px] uppercase tracking-[0.5em] text-[#CC0000] mb-8 block">Колонка автора</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-10 tracking-tight text-balance text-left">
                Движение — это жизнь, <br />
                сотканная из поиска...
              </h2>
              <div className="max-w-2xl text-left">
                <p className="font-body text-xl md:text-2xl italic leading-relaxed text-neutral-600 mb-8">
                  «Я верю, что искусство — это мост между земным движением и вечной гармонией. Мы танцуем свои мысли и поем свои чувства».
                </p>
                <div className="h-px w-20 bg-black mb-8" />
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">Автор: Ольга Храпутская</p>
              </div>
            </div>
            <div className="lg:col-span-4 p-4 md:p-8 bg-black flex flex-col justify-end relative overflow-hidden min-h-[500px] group">
              <div 
                className="absolute top-0 left-0 w-full h-full grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 bg-cover bg-center" 
                style={{ backgroundImage: `url('${IMAGES.homeHero}')` }}
              />
              <div className="relative z-10 border-4 border-white p-8 bg-black/50 backdrop-blur-md sharp-corners">
                  <h4 className="font-serif text-2xl mb-3 font-bold text-white italic">Вдохновение</h4>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-300 mb-8">Профиль творца</p>
                  <button onClick={() => setView('eurythmy')} className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-[11px] hover:bg-[#CC0000] hover:text-white transition-all sharp-corners">
                    Узнать больше
                  </button>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b-2 border-black">
            {[
              { id: 'neuromusic', title: 'Музыка', sub: 'Music for Gymnastics Performances', icon: <Music size={28} /> },
              { id: 'stories', title: 'Сказки', sub: 'Миры фантазий в словах', icon: <BookOpen size={28} /> },
              { id: 'neurophoto', title: 'Нейрофото', sub: 'Ваш идеальный образ', icon: <Camera size={28} /> },
              { id: 'presentations', title: 'Презентации', sub: 'Визуализация смыслов', icon: <Presentation size={28} /> },
            ].map((item, idx) => (
              <div 
                key={item.id}
                onClick={() => setView(item.id as ViewType)}
                className={`
                  group cursor-pointer p-10 flex flex-col items-center text-center hover:bg-white transition-all 
                  ${idx !== 3 ? 'lg:border-r border-black' : ''}
                  ${idx % 2 === 0 ? 'md:border-r lg:border-r border-black' : ''}
                  ${idx > 1 ? 'border-t lg:border-t-0 border-black' : ''}
                  ${idx === 1 ? 'border-t md:border-t-0 border-black' : ''}
                `}
              >
                <div className="mb-8 p-5 border-2 border-black group-hover:bg-black group-hover:text-white transition-all sharp-corners">
                  {item.icon}
                </div>
                <h3 className="font-serif text-2xl font-black mb-2 uppercase tracking-tighter">{item.title}</h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-8">{item.sub}</p>
                <div className="h-px w-10 bg-black/20 mb-6" />
                <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3 group-hover:text-[#CC0000]">
                  Перейти <ArrowRight size={14} />
                </span>
              </div>
            ))}
          </section>

          <section className="py-16 text-center border-b-2 border-black bg-white">
             <div className="font-serif text-xl text-neutral-300 tracking-[1.5em] mb-4">✧ ✧ ✧</div>
             <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400">Издано в Москве, Россия</p>
          </section>
        </div>
      );
    }

    if (view === 'contact') {
      return (
        <div className="max-w-screen-xl mx-auto py-20 px-4 md:px-8 animate-in fade-in slide-in-from-bottom-6">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.5em] text-[#CC0000] mb-6 block">Обратная связь</span>
            <h2 className="font-serif text-5xl md:text-7xl font-black uppercase tracking-tighter">Контакты</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-4 border-black hard-shadow bg-white">
            <div className="lg:col-span-5 p-12 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-[#F9F9F7]">
              <div className="space-y-12">
                <section>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#CC0000] mb-6 border-b-2 border-black pb-2">Местоположение</h3>
                  <div className="flex items-center gap-4 font-serif text-2xl font-bold"><MapPin size={20} /> {CONTACTS.city}</div>
                </section>
                <section>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#CC0000] mb-6 border-b-2 border-black pb-2">Электронная почта</h3>
                  <a href={`mailto:${CONTACTS.email1}`} className="block font-serif text-xl md:text-2xl hover:text-[#CC0000] underline underline-offset-8 decoration-2 mb-6 break-all">{CONTACTS.email1}</a>
                  <a href={`mailto:${CONTACTS.email2}`} className="block font-serif text-xl md:text-2xl hover:text-[#CC0000] underline underline-offset-8 decoration-2 break-all">{CONTACTS.email2}</a>
                </section>
              </div>
            </div>
            <div className="lg:col-span-7 p-12 flex flex-col justify-center">
              <h3 className="font-serif text-3xl md:text-4xl font-black mb-8 leading-tight italic text-balance">Пишите о сотрудничестве и творческих проектах.</h3>
              <p className="font-body text-lg md:text-xl leading-relaxed mb-10 text-neutral-700">
                Буду рада вашим предложениям, отзывам о музыке и сказках или запросам на создание нейро-образов. 
                Каждый запрос рассматривается лично Ольгой.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                <a href={CONTACTS.tgStories} target="_blank" className="flex items-center justify-center gap-4 border-2 border-black p-4 hover:bg-black hover:text-white transition-all font-black uppercase text-[11px] tracking-widest sharp-corners">
                  <Send size={16} /> Telegram
                </a>
                <a href={CONTACTS.youtube} target="_blank" className="flex items-center justify-center gap-4 border-2 border-black p-4 hover:bg-black hover:text-white transition-all font-black uppercase text-[11px] tracking-widest sharp-corners">
                  <Youtube size={16} /> YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const pages = {
      neuromusic: {
        title: "Music for Gymnastics Performances",
        sub: "Специализированный аудио-дизайн",
        text: "Под брендом Music for Gymnastics Performances я создаю специализированную музыку для выступлений. Мои работы — это синтез хореографического чутья и возможностей современных технологий. \nНа данный момент выпущено 3 полноценных альбома, которые получили признание в сообществе художественной гимнастики. Каждая композиция тщательно выверена по темпу, динамике и акцентам, необходимым для профессионального спорта.",
        img: IMAGES.neuromusic,
        details: ["3 профессиональных альбома", "Индивидуальный анализ ритма", "Верифицированный артист Spotify"],
        ctas: [
          { label: "Слушать в Spotify", link: CONTACTS.spotify, icon: <Music size={16} /> },
          { label: "Слушать на YouTube", link: CONTACTS.youtube, icon: <Youtube size={16} /> }
        ]
      },
      stories: {
        title: "Сказки Фантазии",
        sub: "Литературные миры Ольги Храпутской",
        text: "«Сказки из мира фантазий» — это ментальные путешествия, которые я пишу, вдохновляясь эвритмией и живым движением жизни. \nСлова имеют силу оживлять целые миры. Мой проект — это пространство, где взрослые и дети могут снова поверить в чудо. Это литература, которая лечит и наполняет светом.",
        img: IMAGES.stories,
        details: ["Авторский Telegram-канал", "Аудио-сказки в озвучке", "Атмосферная проза"],
        ctas: [
          { label: "Читать в Telegram", link: CONTACTS.tgStories, icon: <Send size={16} /> }
        ]
      },
      eurythmy: {
        title: "Искусство Эвритмии",
        sub: "Видимая речь и пение",
        text: "Эвритмия — это не просто танец, а образ мышления. Она позволяет сделать невидимые силы звука и слова видимыми в пространстве через гармоничный жест. \nКак свободный эвритмист, я исследую границы между жестом и смыслом. Это фундамент всей моей творческой деятельности и источник вдохновения для музыки и текстов.",
        img: IMAGES.eurythmy,
        details: ["Индивидуальное обучение", "Сценические постановки", "Интеграция искусств"],
        ctas: [
          { label: "Написать автору", link: `mailto:${CONTACTS.email1}`, icon: <ExternalLink size={16} /> }
        ]
      },
      neurophoto: {
        title: "Магия Нейрофото",
        sub: "Искусство с помощью ИИ",
        text: "Создаю портреты мечты с помощью ИИ. Нейронные сети — это кисти нового времени, требующие мастерства и тонкого вкуса. \nЯ помогаю создавать визуальные образы, которые раньше казались невозможными. Магия нейрофото позволяет воплотить ваши самые смелые фантазии в безупречном художественном качестве.",
        img: IMAGES.neurophoto,
        details: ["Генерация AI образов", "Личный брендинг", "Художественное руководство"],
        ctas: [
          { label: "Telegram Канал", link: CONTACTS.tgNeuro, icon: <Send size={16} /> }
        ]
      },
      presentations: {
        title: "Презентации",
        sub: "Визуализация концепций",
        text: "Я помогаю структурировать ваши мысли и облекать их в безупречную визуальную форму. \nКаждая идея заслуживает того, чтобы быть понятой с первого взгляда. Я создаю дизайн презентаций, который не просто информирует, но и эмоционально вовлекает вашу аудиторию, превращая данные в историю.",
        img: IMAGES.presentations,
        details: ["Дизайн презентаций", "Логика инфографики", "Брендовый сторителлинг"],
        ctas: [
          { label: "Обсудить проект", link: `mailto:${CONTACTS.email1}`, icon: <ExternalLink size={16} /> }
        ]
      }
    };

    const p = pages[view as keyof typeof pages];
    if (!p) return null;

    return (
      <div className="max-w-screen-xl mx-auto border-x-2 border-black bg-white animate-in fade-in slide-in-from-bottom-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch border-b-2 border-black">
          <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#CC0000] mb-6 block">Специальный репортаж</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tighter uppercase">{p.title}</h2>
            <p className="font-serif italic text-2xl md:text-3xl text-neutral-500 mb-10 border-b-2 border-black pb-8">{p.sub}</p>
            <div className="font-body text-xl leading-relaxed text-justify space-y-6 first-letter:text-7xl first-letter:font-serif first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:text-[#CC0000] first-letter:font-black">
              {p.text.split('\n').map((para, i) => <p key={i}>{para}</p>)}
            </div>
            <div className="mt-12 pt-8 border-t border-black/10 text-neutral-300 font-serif text-xl tracking-[1em] text-center">
              * * *
            </div>
          </div>
          <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 space-y-10 bg-[#F9F9F7]">
            <div className="border-2 border-black p-3 bg-white hard-shadow-hover transition-all">
              <div className="overflow-hidden border border-black/10">
                <img src={p.img} alt={p.title} className="w-full photo-reveal" />
              </div>
              <div className="p-4 font-mono text-[9px] uppercase text-center border-t-2 border-black mt-2 tracking-[0.2em]">
                Рис. 2025 // Архивный материал
              </div>
            </div>
            <div className="bg-[#111111] text-[#F9F9F7] p-8 md:p-10 sharp-corners">
              <h4 className="font-serif text-xl font-black mb-8 border-b border-white/20 pb-4 uppercase tracking-widest">Особенности</h4>
              <ul className="space-y-4 font-body text-lg text-neutral-300">
                {p.details.map((d, i) => (
                  <li key={i} className="flex gap-4 border-b border-white/5 pb-3 last:border-0">
                    <ChevronRight size={18} className="text-[#CC0000] shrink-0 mt-1" /> 
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-10 space-y-4">
                {p.ctas.map((cta, i) => (
                  <a key={i} href={cta.link} target="_blank" className="w-full bg-white text-black py-4 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#CC0000] hover:text-white transition-all flex justify-center items-center gap-3 sharp-corners border border-transparent hover:border-black">
                    {cta.label} {cta.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#CC0000] selection:text-white bg-[#F9F9F7]">
      <Header />
      <Marquee />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <footer className="bg-[#111111] text-[#F9F9F7] p-12 md:p-24 lg:p-32 mt-auto border-t-8 border-black">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <h2 className="font-serif text-5xl md:text-6xl font-black mb-8 tracking-tighter">OLGA DELF</h2>
            <div className="h-1.5 w-16 bg-[#CC0000] mb-8" />
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500 max-w-sm leading-loose">
              Пространство творческого поиска в музыке, слове и движении. Создано Ольгой Храпутской. 
              Все права на интеллектуальную собственность защищены редакцией 2025 года.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-between">
            <div className="space-y-8 text-left md:text-right w-full">
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 block">Социальные сети</span>
              <a href={`mailto:${CONTACTS.email1}`} className="block font-serif text-2xl md:text-3xl hover:text-[#CC0000] underline underline-offset-8 decoration-2 break-all">{CONTACTS.email1}</a>
              <div className="flex gap-6 mt-10 md:justify-end">
                <a href={CONTACTS.youtube} target="_blank" className="p-4 border-2 border-white/20 hover:border-white text-white/70 hover:text-white transition-all sharp-corners"><Youtube size={20} /></a>
                <a href={CONTACTS.tgStories} target="_blank" className="p-4 border-2 border-white/20 hover:border-white text-white/70 hover:text-white transition-all sharp-corners"><Send size={20} /></a>
                <a href={CONTACTS.spotify} target="_blank" className="p-4 border-2 border-white/20 hover:border-white text-white/70 hover:text-white transition-all sharp-corners"><Music size={20} /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto mt-24 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] text-neutral-600 uppercase tracking-[0.4em]">
          <span>© 2025 АРХИВЫ OLGA DELF</span>
          <span className="mt-4 md:mt-0 italic">Издание: Vol 2.0 // Отпечатано в Москве</span>
        </div>
      </footer>
    </div>
  );
}