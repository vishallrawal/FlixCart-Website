import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  buttonText: string;
  link: string;
  bgGradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Super Saver Deals on Premium Gadgets!',
    subtitle: 'Save up to 40% on smartwatches, headphones, laptops, and smart home appliances.',
    tagline: 'FUTURE TECH TODAY',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    buttonText: 'Shop Electronics',
    link: '/products?category=Electronics',
    bgGradient: 'from-blue-600/30 to-indigo-900/40'
  },
  {
    id: 2,
    title: 'Revamp Your Look for the Summer Season',
    subtitle: 'Discover lightweight jackets, high-performance running shoes, and chic backpacks.',
    tagline: 'STREETWEAR & RUNNING',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
    buttonText: 'Explore Fashion',
    link: '/products?category=Fashion',
    bgGradient: 'from-rose-500/30 to-amber-900/40'
  },
  {
    id: 3,
    title: 'Upgrade Your Everyday Living Space',
    subtitle: 'Get top ergonomic office chairs, smart espresso makers, and ambient projection lamps.',
    tagline: 'MODERN LIVING COMFORT',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    buttonText: 'Browse Home Goods',
    link: '/products?category=Home%20%26%20Living',
    bgGradient: 'from-emerald-600/30 to-slate-900/40'
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] overflow-hidden rounded-2xl md:rounded-3xl border border-ui-border-light/60 dark:border-ui-border-dark/60 bg-slate-900 group">
      {/* Slides Container */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full flex items-center transition-all duration-1000 ease-in-out ${
            index === current 
              ? 'opacity-100 scale-100 pointer-events-auto z-10' 
              : 'opacity-0 scale-95 pointer-events-none z-0'
          }`}
        >
          {/* Slide Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Dark & Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} via-black/70 to-black/85`} />
          </div>

          {/* Slide Content */}
          <div className="relative max-w-3xl mx-auto px-6 sm:px-12 md:px-16 w-full text-left space-y-3 sm:space-y-4 md:space-y-6 text-white z-20">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-widest text-brand-400 bg-brand-500/10 border border-brand-500/30 px-3 py-1 rounded-full uppercase">
              {slide.tagline}
            </span>
            <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight sm:leading-none max-w-2xl animate-in slide-in-from-bottom duration-700">
              {slide.title}
            </h1>
            <p className="text-xs sm:text-sm md:text-lg text-slate-300 max-w-xl line-clamp-2 sm:line-clamp-none font-medium">
              {slide.subtitle}
            </p>
            <div className="pt-2 sm:pt-4">
              <a
                href={slide.link}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-brand-600/30 hover:shadow-brand-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                {slide.buttonText} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Manual Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-5 sm:h-6 sm:w-6 w-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-5 sm:h-6 sm:w-6 w-5" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === current ? 'w-6 sm:w-8 bg-brand-500' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
