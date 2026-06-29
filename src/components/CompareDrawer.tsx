import React, { useState } from 'react';
import { GitCompare, X, Trash2, ShoppingCart, Star } from 'lucide-react';
import { useCompare, addToCart, type Product } from '../store/cartStore';
import { formatPrice } from '../data/products';

export default function CompareDrawer() {
  const { compareList, toggleCompare, clearCompare } = useCompare();
  const [modalOpen, setModalOpen] = useState(false);

  if (compareList.length === 0) return null;

  // Extract all unique specs keys to align side-by-side spec comparisons
  const allSpecKeys = Array.from(
    new Set(compareList.flatMap(p => Object.keys(p.specs || {})))
  );

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <>
      {/* Floating Bar at Bottom Center */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 dark:bg-ui-card-dark/95 border border-brand-500/30 rounded-2xl shadow-2xl p-4 flex items-center gap-6 backdrop-blur-md animate-in slide-in-from-bottom duration-300 max-w-lg w-[calc(100%-2rem)]">
        <div className="flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-brand-600 dark:text-brand-500 animate-pulse" />
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-white">Compare Products</h4>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              {compareList.length} of 3 items selected
            </span>
          </div>
        </div>

        {/* Thumbnail list */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[150px] sm:max-w-none">
          {compareList.map(item => (
            <div key={item.id} className="relative h-10 w-10 border border-ui-border-light dark:border-ui-border-dark rounded-lg overflow-hidden shrink-0 group">
              <img src={item.image} alt="" className="h-full w-full object-cover" />
              <button 
                onClick={() => toggleCompare(item)}
                className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <button 
            onClick={clearCompare}
            className="text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/10 cursor-pointer"
          >
            Compare Now
          </button>
        </div>
      </div>

      {/* Comparison Grid Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-xs animate-in fade-in"
          />

          {/* Modal Box */}
          <div className="relative w-full max-w-5xl h-[calc(100vh-4rem)] max-h-[800px] bg-white dark:bg-ui-card-dark border border-ui-border-light dark:border-ui-border-dark rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-ui-border-light dark:border-ui-border-dark flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <GitCompare className="h-6 w-6 text-brand-600" /> Dynamic Product Comparison
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-ui-dark dark:hover:text-slate-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Matrix Body Container */}
            <div className="flex-grow overflow-auto p-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-ui-border-light dark:border-ui-border-dark">
                    <th className="text-left font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-xs pb-4 w-1/4">Specs / Features</th>
                    {compareList.map(item => (
                      <th key={item.id} className="text-left pb-4 w-[25%] px-4">
                        <div className="space-y-3 relative group">
                          {/* Close/Remove from compare inside table */}
                          <button 
                            onClick={() => toggleCompare(item)}
                            className="absolute -top-1 right-2 text-slate-400 hover:text-red-500"
                            title="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          
                          <img src={item.image} alt={item.title} className="h-32 w-full object-cover rounded-2xl border border-ui-border-light dark:border-ui-border-dark bg-slate-50" />
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-brand-500 uppercase">{item.category}</span>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-white line-clamp-2 leading-tight">{item.title}</h4>
                            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span>{item.rating}</span>
                              <span className="text-slate-400 font-normal">({item.reviewCount})</span>
                            </div>
                            <div className="flex items-baseline gap-1.5 pt-1">
                              <span className="text-sm font-extrabold text-slate-800 dark:text-white">{formatPrice(item.price)}</span>
                              {item.discount > 0 && <span className="text-[10px] text-slate-400 line-through">{formatPrice(item.originalPrice)}</span>}
                            </div>
                          </div>
                          <button 
                            onClick={() => handleAddToCart(item)}
                            className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
                          >
                            <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
                          </button>
                        </div>
                      </th>
                    ))}
                    {/* Fill remaining empty columns if comparing less than 3 */}
                    {compareList.length < 3 && (
                      [...Array(3 - compareList.length)].map((_, i) => (
                        <th key={i} className="text-center pb-4 opacity-30 px-4">
                          <div className="border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl h-48 flex items-center justify-center flex-col gap-2">
                            <GitCompare className="h-8 w-8 text-slate-400" />
                            <span className="text-xs text-slate-500 font-semibold">Select another product</span>
                          </div>
                        </th>
                      ))
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ui-border-light dark:divide-ui-border-dark text-sm">
                  {/* Category Field */}
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-ui-dark/30 transition-colors">
                    <td className="py-3.5 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-xs">Category</td>
                    {compareList.map(item => (
                      <td key={item.id} className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">{item.category}</td>
                    ))}
                    {compareList.length < 3 && [...Array(3 - compareList.length)].map((_, i) => <td key={i} className="py-3.5 px-4"></td>)}
                  </tr>
                  
                  {/* Rating Field */}
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-ui-dark/30 transition-colors">
                    <td className="py-3.5 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-xs">Customer Rating</td>
                    {compareList.map(item => (
                      <td key={item.id} className="py-3.5 px-4 font-bold text-slate-700 dark:text-slate-300">
                        {item.rating} / 5.0
                      </td>
                    ))}
                    {compareList.length < 3 && [...Array(3 - compareList.length)].map((_, i) => <td key={i} className="py-3.5 px-4"></td>)}
                  </tr>

                  {/* Specifications Align Matrix */}
                  {allSpecKeys.map(key => (
                    <tr key={key} className="hover:bg-slate-50/50 dark:hover:bg-ui-dark/30 transition-colors">
                      <td className="py-3.5 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-xs">{key}</td>
                      {compareList.map(item => (
                        <td key={item.id} className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                          {item.specs[key] || '-'}
                        </td>
                      ))}
                      {compareList.length < 3 && [...Array(3 - compareList.length)].map((_, i) => <td key={i} className="py-3.5 px-4"></td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-ui-border-light dark:border-ui-border-dark bg-slate-50 dark:bg-ui-dark/50 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Close Matrix
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
