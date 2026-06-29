import React, { useState, useEffect } from 'react';
import { ShoppingCart, Check, GitCompare, Play, Sparkles } from 'lucide-react';
import { addToCart, useCompare } from '../store/cartStore';
import { products, formatPrice } from '../data/products';

export default function NetflixBillboard() {
  const [added, setAdded] = useState(false);
  const { toggleCompare: applyCompare, isInCompare } = useCompare();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Pick multiple deal products to cycle "one by one" on the homepage billboard
  const trendingList = products.filter(p => p.isDeal);

  useEffect(() => {
    if (trendingList.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [trendingList.length]);

  const billboardProduct = trendingList[currentIndex] || products[0];

  const handleAddToCart = () => {
    addToCart(billboardProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleCompare = () => {
    applyCompare(billboardProduct);
  };

  const inCompare = isInCompare(billboardProduct.id);

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] md:h-[580px] overflow-hidden rounded-3xl border border-slate-900 bg-slate-950 flex items-center">
      
      {/* Background Media Illustration (Fades in on index change) */}
      <div className="absolute inset-0" key={currentIndex}>
        <img 
          src={billboardProduct.image} 
          alt={billboardProduct.title} 
          className="w-full h-full object-cover opacity-60 animate-in fade-in zoom-in-95 duration-700"
        />
        {/* Cinematic Gradients Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-ui-dark via-ui-dark/85 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-ui-dark via-transparent to-transparent z-1" />
      </div>

      {/* Billboard details (Fades in on index change) */}
      <div 
        className="relative max-w-2xl mx-auto px-6 sm:px-12 md:px-16 w-full text-left space-y-4 sm:space-y-6 text-white z-10"
        key={`details-${currentIndex}`}
      >
        <div className="flex items-center gap-2 animate-in slide-in-from-left-4 duration-300">
          <span className="bg-gradient-to-r from-red-500 via-pink-500 via-blue-500 via-green-500 to-amber-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-md flex items-center gap-1">
            <Sparkles className="h-3 w-3 animate-pulse" /> TRENDING BLOCKBUSTER
          </span>
          <span className="text-xs font-bold text-slate-400">Auto Cycling Ticker</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-slate-50 animate-in slide-in-from-left-4 duration-400">
          {billboardProduct.title}
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-lg leading-relaxed font-semibold animate-in slide-in-from-left-4 duration-500">
          {billboardProduct.description}
        </p>

        <div className="flex items-baseline gap-2 pt-1.5 animate-in slide-in-from-left-4 duration-600">
          <span className="text-xl sm:text-2xl font-black text-brand-500">
            {formatPrice(billboardProduct.price)}
          </span>
          <span className="text-xs text-slate-500 line-through">
            {formatPrice(billboardProduct.originalPrice)}
          </span>
          <span className="text-xs text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md ml-1.5">
            {billboardProduct.discount}% OFF
          </span>
        </div>

        {/* Action Buttons in Netflix Style */}
        <div className="flex flex-wrap gap-3 pt-3 animate-in slide-in-from-left-4 duration-700">
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-white hover:bg-slate-200 text-slate-950 rounded-xl text-sm font-extrabold flex items-center gap-2 shadow-xl hover:scale-103 transition-all cursor-pointer"
          >
            {added ? (
              <>
                <Check className="h-4.5 w-4.5 stroke-[3]" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4.5 w-4.5 stroke-[3]" /> Buy Now
              </>
            )}
          </button>
          
          <button
            onClick={handleCompare}
            className={`px-6 py-3 rounded-xl text-sm font-extrabold flex items-center gap-2 transition-all hover:bg-slate-700/80 cursor-pointer ${
              inCompare 
                ? 'bg-brand-600 text-white shadow-lg' 
                : 'bg-slate-800/85 text-white border border-slate-700'
            }`}
          >
            <GitCompare className="h-4.5 w-4.5" />
            {inCompare ? 'In Compare List' : 'Compare Specs'}
          </button>
        </div>
      </div>

      {/* Index indicator slide dots */}
      <div className="absolute bottom-6 right-6 flex gap-1.5 z-10">
        {trendingList.map((_, idx) => {
          const dotColors = ['bg-amber-500', 'bg-red-500', 'bg-emerald-500', 'bg-pink-500', 'bg-blue-500'];
          const colorClass = dotColors[idx % dotColors.length];
          return (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? `w-6 ${colorClass}` : 'w-1.5 bg-slate-500'
              }`}
              title={`Slide ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
