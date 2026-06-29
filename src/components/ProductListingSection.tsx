import React, { useState, useEffect, useMemo } from 'react';
import { SlidersHorizontal, Search, Star, X, RefreshCw } from 'lucide-react';
import { products, categories, formatPrice } from '../data/products';
import ProductCard from './ProductCard';

interface ProductListingSectionProps {
  initialSearch: string;
  initialCategory: string;
}

export default function ProductListingSection({ initialSearch, initialCategory }: ProductListingSectionProps) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(150000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync state if URL props change
  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const maxProductPrice = useMemo(() => {
    return Math.max(...products.map(p => p.price), 150000);
  }, []);

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
    setMaxPrice(maxProductPrice);
    setMinRating(0);
    setSortBy('popular');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    // Search Query Filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // Price Filter
    result = result.filter(p => p.price <= maxPrice);

    // Rating Filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [category, search, maxPrice, minRating, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Banner / Heading */}
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {category === 'All' ? 'All Products' : category}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar (Desktop) */}
        <aside className="w-full lg:w-64 shrink-0 hidden lg:block space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-ui-border-light dark:border-ui-border-dark">
            <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-brand-600 dark:text-brand-500" /> Filters
            </h2>
            <button 
              onClick={handleResetFilters}
              className="text-xs text-brand-600 hover:text-brand-700 dark:text-brand-500 font-semibold flex items-center gap-0.5"
            >
              <RefreshCw className="h-3 w-3" /> Reset All
            </button>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Category</h3>
            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    category === cat
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/10'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-ui-card-dark'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2.5 pt-4 border-t border-ui-border-light/60 dark:border-ui-border-dark/60">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <span>Max Price</span>
              <span className="text-slate-700 dark:text-slate-300 normal-case font-extrabold">{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="500"
              max={maxProductPrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-600 dark:accent-brand-500"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>{formatPrice(500)}</span>
              <span>{formatPrice(maxProductPrice)}</span>
            </div>
          </div>

          {/* Minimum Rating Filter */}
          <div className="space-y-2.5 pt-4 border-t border-ui-border-light/60 dark:border-ui-border-dark/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Minimum Rating</h3>
            <div className="flex flex-col gap-1.5">
              {[4, 3, 0].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold flex items-center justify-between cursor-pointer ${
                    minRating === rating
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                      : 'text-slate-600 dark:text-slate-300 border border-transparent hover:bg-slate-100 dark:hover:bg-ui-card-dark'
                  }`}
                >
                  <span>{rating === 0 ? 'Any Rating' : `${rating}★ & Above`}</span>
                  {rating > 0 && (
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < rating ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`} />
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid & Controls */}
        <div className="flex-grow space-y-6">
          
          {/* Controls bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white dark:bg-ui-card-dark border border-ui-border-light dark:border-ui-border-dark rounded-2xl">
            {/* Search filter inside listing */}
            <div className="relative flex-grow max-w-sm">
              <input
                type="text"
                placeholder="Search within results..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100 focus:bg-white border border-transparent focus:border-brand-500 rounded-full text-slate-800 focus:outline-none dark:bg-ui-dark dark:text-slate-100 dark:focus:border-brand-500 transition-colors"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-2.5 text-slate-400"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFiltersMobile(true)}
                className="lg:hidden flex items-center gap-1.5 px-4 py-2 border border-ui-border-light dark:border-ui-border-dark rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-ui-dark cursor-pointer"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 whitespace-nowrap">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3.5 py-1.5 text-xs bg-slate-100 dark:bg-ui-dark border border-transparent rounded-full font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-brand-500"
                >
                  <option value="popular">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4 bg-white dark:bg-ui-card-dark border border-ui-border-light dark:border-ui-border-dark rounded-3xl">
              <div className="h-16 w-16 bg-slate-100 dark:bg-ui-dark rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 mx-auto">
                <Search className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">No products found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[280px] mx-auto">
                  Try adjusting your search queries or clearing filters.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-md cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFiltersMobile && (
        <div className="fixed inset-0 z-100 flex justify-end lg:hidden">
          <div 
            onClick={() => setShowFiltersMobile(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
          />
          <div className="relative w-full max-w-xs h-full bg-white dark:bg-ui-card-dark shadow-2xl p-6 flex flex-col z-10 animate-in slide-in-from-right">
            <div className="flex items-center justify-between pb-4 border-b border-ui-border-light dark:border-ui-border-dark mb-4">
              <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </h2>
              <button 
                onClick={() => setShowFiltersMobile(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-ui-dark"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-6 pb-20">
              {/* Category */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</h3>
                <div className="flex flex-col gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                        category === cat
                          ? 'bg-brand-600 text-white'
                          : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span>Max Price</span>
                  <span className="text-slate-700 dark:text-slate-300">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max={maxProductPrice}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Minimum Rating</h3>
                <div className="flex flex-col gap-1">
                  {[4, 3, 0].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold flex items-center justify-between cursor-pointer ${
                        minRating === rating
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          : 'text-slate-600 dark:text-slate-300 border border-transparent'
                      }`}
                    >
                      <span>{rating === 0 ? 'Any Rating' : `${rating}★ & Above`}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white dark:bg-ui-card-dark border-t border-ui-border-light dark:border-ui-border-dark flex gap-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 border border-ui-border-light rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFiltersMobile(false)}
                className="flex-1 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold shadow-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
