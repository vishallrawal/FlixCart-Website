import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Check, GitCompare } from 'lucide-react';
import { addToCart, getStoreProductById, useCompare, type Product } from '../store/cartStore';
import { formatPrice } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product: staticProduct }: ProductCardProps) {
  const [product, setProduct] = useState<Product>(staticProduct);
  const [added, setAdded] = useState(false);
  const { toggleCompare, isInCompare } = useCompare();

  // Load merchant overrides reactively
  useEffect(() => {
    const resolveProduct = () => {
      const resolved = getStoreProductById(staticProduct.id);
      if (resolved) {
        setProduct(resolved);
      } else {
        setProduct(staticProduct);
      }
    };
    resolveProduct();

    const handleMerchantUpdate = () => {
      resolveProduct();
    };

    window.addEventListener('ecommerce-merchant-update', handleMerchantUpdate);
    return () => window.removeEventListener('ecommerce-merchant-update', handleMerchantUpdate);
  }, [staticProduct]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check out of stock status (custom override detail)
    const isOutOfStock = (product as any).outOfStock === true;
    if (isOutOfStock) return;

    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product);
  };

  const handleCardClick = () => {
    window.location.href = `/product/${product.id}`;
  };

  const inCompare = isInCompare(product.id);
  const isOutOfStock = (product as any).outOfStock === true;

  return (
    <div 
      onClick={handleCardClick}
      className={`group relative bg-white dark:bg-ui-card-dark border border-slate-100 dark:border-ui-border-dark rounded-2xl overflow-hidden netflix-hover-card flex flex-col h-full cursor-pointer ${
        isOutOfStock ? 'opacity-50' : ''
      }`}
    >
      {/* Badge for Discount */}
      {product.discount > 0 && !isOutOfStock && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider z-10 shadow-sm animate-pulse">
          {product.discount}% OFF
        </span>
      )}

      {/* Compare Toggle Button */}
      <button
        onClick={handleCompareClick}
        className={`absolute top-3 right-3 p-2 rounded-full border z-10 transition-all cursor-pointer ${
          inCompare 
            ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/30' 
            : 'bg-white/90 text-slate-500 border-slate-200/80 hover:bg-slate-50 dark:bg-ui-card-dark/95 dark:text-slate-400 dark:border-slate-700/80 dark:hover:bg-ui-dark'
        }`}
        title="Compare this product"
      >
        <GitCompare className="h-3.5 w-3.5" />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-ui-dark">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div className="space-y-1.5">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-extrabold">
            {product.category}
          </span>
          <h3 className="font-bold text-slate-800 dark:text-white text-sm line-clamp-2 leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-500 transition-colors">
            {product.title}
          </h3>
          
          {/* Star Ratings */}
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`} 
                />
              ))}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
              {product.rating} <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </span>
          </div>
        </div>

        {/* Action / Price Area */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-ui-border-light/60 dark:border-ui-border-dark/60">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.discount > 0 && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 dark:bg-ui-dark dark:text-slate-600 cursor-not-allowed border border-dashed border-slate-200 dark:border-slate-800 shadow-none'
                : added 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-95' 
                  : 'bg-brand-50 text-brand-600 hover:bg-brand-600 hover:text-white dark:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-600 dark:hover:text-white shadow-sm'
            }`}
            aria-label="Add to Cart"
          >
            {added ? <Check className="h-4.5 w-4.5" /> : <ShoppingCart className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
