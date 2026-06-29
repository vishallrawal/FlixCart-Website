import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, Sun, Moon, X, ChevronRight } from 'lucide-react';
import { useCart } from '../store/cartStore';
import { products } from '../data/products';

export default function Navbar() {
  const { cartCount, setIsOpen } = useCart();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const suggestionsRef = useRef<HTMLFormElement>(null);

  // Sync theme state with DOM class list
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', nextTheme);
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  // Autocomplete Suggestions logic
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Close suggestions box if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const selectSuggestion = (title: string) => {
    setSearchQuery(title);
    setShowSuggestions(false);
    window.location.href = `/products?search=${encodeURIComponent(title)}`;
  };



  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-ui-border-light dark:border-ui-border-dark h-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group shrink-0">
          <div className="h-9 w-9 bg-gradient-to-tr from-red-500 via-pink-500 via-blue-500 via-green-500 to-amber-500 rounded-lg flex items-center justify-center text-white font-extrabold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
            F
          </div>
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-red-500 via-pink-500 via-blue-500 via-green-500 to-amber-500 bg-clip-text text-transparent">
            FlixCart
          </span>
        </a>

        {/* Search Bar with Autocomplete Suggestions */}
        <form onSubmit={handleSearchSubmit} className="relative flex-grow max-w-lg hidden md:block" ref={suggestionsRef}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, brands, and categories..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-10 pr-10 py-2 text-sm bg-slate-100 hover:bg-slate-200/70 focus:bg-white border border-transparent focus:border-brand-500 rounded-full text-slate-800 focus:outline-none dark:bg-ui-card-dark dark:hover:bg-slate-800/50 dark:focus:bg-ui-dark dark:text-slate-100 dark:focus:border-brand-500 transition-all duration-200"
            />
            <Search className="absolute left-3.5 top-2.5 h-4.5 w-4.5 text-blue-500" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSuggestions([]);
                }}
                className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-white dark:bg-ui-card-dark border border-ui-border-light dark:border-ui-border-dark rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2 text-xs font-semibold text-slate-400 dark:text-slate-500 border-b border-ui-border-light dark:border-ui-border-dark flex items-center justify-between">
                <span>Suggested Products</span>
                <span>Press Enter to Search</span>
              </div>
              <ul className="divide-y divide-ui-border-light dark:divide-ui-border-dark">
                {suggestions.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => selectSuggestion(item.title)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-ui-dark flex items-center justify-between group transition-colors duration-150"
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.title} className="h-8 w-8 rounded object-cover shadow-sm" />
                        <div>
                          <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-500 transition-colors">
                            {item.title}
                          </span>
                          <span className="block text-[10px] text-slate-400 dark:text-slate-500">
                            in {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-brand-500 dark:group-hover:text-brand-400">
                        View <ChevronRight className="h-3 w-3" />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>

        {/* Right Navigation Links & Toggles */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-sm font-semibold text-slate-700 hover:text-brand-600 px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Home
          </a>

          <a
            href="/products"
            className="text-sm font-medium text-slate-500 hover:text-brand-600 px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Explore
          </a>

          <a
            href="/about"
            className="text-sm font-medium text-slate-500 hover:text-brand-600 px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            About Us
          </a>

          <a
            href="/contact"
            className="text-sm font-semibold text-pink-400 hover:text-pink-600 px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            Contact Us
          </a>

          <a
            href="/admin"
            className="text-sm font-medium text-brand-500 bg-brand-500/10 border border-brand-500/20 px-3 py-1.5 rounded-lg hover:bg-brand-600 hover:text-white dark:hover:bg-brand-500 transition-all cursor-pointer whitespace-nowrap"
          >
            Merchant Panel
          </a>

           {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-650 hover:bg-slate-100 rounded-full transition-all duration-200 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5 text-amber-500 fill-amber-500/20" /> : <Sun className="h-5 w-5 text-amber-500 fill-amber-500/20" />}
          </button>

          {/* Cart Indicator */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-slate-650 hover:bg-slate-100 rounded-full transition-all duration-200 cursor-pointer"
            aria-label="Open Cart"
          >
            <ShoppingBag className="h-5 w-5 text-pink-500" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-md shadow-emerald-500/30 scale-100 animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Search Bar - Visible under navbar on small viewports */}
      <div className="px-4 py-2 bg-white/70 dark:bg-ui-dark/70 border-b border-ui-border-light dark:border-ui-border-dark md:hidden flex gap-2">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-100 focus:bg-white border border-transparent focus:border-brand-500 rounded-full text-slate-800 focus:outline-none dark:bg-ui-card-dark dark:text-slate-100 transition-all duration-200"
          />
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-blue-500" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2 text-slate-400 dark:text-slate-500"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </form>
      </div>
    </nav>
  );
}
