import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Compass, Map, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    image: '/images/hero-namibia.jpg',
    tag: 'Explore • Experience • Journey',
    heading: 'Discover Namibia',
    highlight: 'and beyond',
    sub: 'Inspiring travel experiences, self-drive adventures, unique stays and curated journeys — starting with Namibia.',
    primary: ['/namibia','Explore Namibia'],
    secondary: ['/journeys','View Journeys'],
  },
  {
    image: '/images/self-drive.jpg',
    tag: 'Freedom to explore',
    heading: 'Your Road. Your Pace.',
    highlight: 'Your Adventure.',
    sub: 'Build an unforgettable self-drive journey with practical route inspiration, trusted vehicle partners and room to explore.',
    primary: ['/namibia/self-drive','Explore Self-Drive'],
    secondary: ['/car-hire-4x4','Car Hire / 4x4'],
  },
  {
    image: '/images/journey-roadtrip.jpg',
    tag: 'Meaningful travel',
    heading: 'Journeys That',
    highlight: 'Connect',
    sub: 'Discover curated Padmaats journeys, inspiring stories and travel ideas designed around people, places and memorable experiences.',
    primary: ['/journeys','Padmaats Journeys'],
    secondary: ['/travel-guides','Travel Guides'],
  },
];

const TYPING_INTERVAL = 55;
const SLIDE_DURATION = 7000;

function useTypingEffect(text: string, active: boolean) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) { setDisplayed(''); setDone(false); return; }
    setDisplayed(''); setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, TYPING_INTERVAL);
    return () => clearInterval(id);
  }, [text, active]);
  return { displayed, done };
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(true);
  const goTo = useCallback((idx: number) => {
    setAnimating(false);
    setTimeout(() => { setCurrent(idx); setAnimating(true); }, 40);
  }, []);
  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);
  useEffect(() => {
    const id = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [next]);

  const slide = SLIDES[current];
  const { displayed, done } = useTypingEffect(slide.highlight, animating);

  return <section className="relative w-full h-[76vh] min-h-[620px] max-h-[860px] overflow-hidden">
    {SLIDES.map((s,i)=><div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{opacity:i===current?1:0}}>
      <img src={s.image} alt="" className="w-full h-full object-cover"/>
    </div>)}
    <div className="absolute inset-0 bg-gradient-to-r from-[#fffaf2]/95 via-[#fffaf2]/82 to-black/15"/>
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"/>
    <div className="relative z-20 h-full flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur mb-5">
            <Compass size={15} className="text-[#496b35]"/>
            <span className="text-[#496b35] text-xs font-bold tracking-[.22em] uppercase">{slide.tag}</span>
          </div>
          <h1 className="text-[#07344a] text-5xl sm:text-6xl md:text-7xl font-serif font-bold leading-[.95] mb-2">{slide.heading}</h1>
          <h2 className="text-[#496b35] text-4xl sm:text-5xl md:text-6xl font-serif italic leading-tight mb-6">
            <span>{displayed}</span>{!done&&<span className="typing-cursor"/>}
          </h2>
          <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-8 max-w-xl">{slide.sub}</p>
          <div className="flex flex-wrap gap-3">
            <Link to={slide.primary[0]} className="pad-btn">{slide.primary[1]} <ArrowRight size={17}/></Link>
            <Link to={slide.secondary[0]} className="pad-btn-outline">{slide.secondary[1]} <ArrowRight size={17}/></Link>
          </div>
        </div>
      </div>
    </div>
    <button onClick={prev} aria-label="Previous slide" className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/75 text-[#07344a] grid place-items-center shadow"><ChevronLeft/></button>
    <button onClick={next} aria-label="Next slide" className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/75 text-[#07344a] grid place-items-center shadow"><ChevronRight/></button>
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">{SLIDES.map((_,i)=><button key={i} onClick={()=>goTo(i)} aria-label={"Go to slide "+(i+1)} className={i===current?"w-8 h-2 rounded-full bg-[#e7a51e]":"w-2 h-2 rounded-full bg-white/70"}/>)}</div>
    <div className="absolute bottom-8 right-8 hidden lg:flex gap-3 z-30">
      <div className="bg-white/80 backdrop-blur rounded-2xl px-4 py-3 text-[#07344a] flex items-center gap-2 shadow"><Map size={18}/><span className="text-sm font-semibold">Namibia First</span></div>
      <div className="bg-white/80 backdrop-blur rounded-2xl px-4 py-3 text-[#07344a] flex items-center gap-2 shadow"><BookOpen size={18}/><span className="text-sm font-semibold">Travel Stories</span></div>
    </div>
  </section>
}