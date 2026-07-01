import React, { useState } from 'react';
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, ChevronRight, Check } from 'lucide-react';
import { addToCart, type Product } from '../store/cartStore';
import { products as allProducts, formatPrice } from '../data/products';
import ProductCard from './ProductCard';

interface ProductDetailsSectionProps {
  product: Product;
}

export default function ProductDetailsSection({ product }: ProductDetailsSectionProps) {
  const [activeTab, setActiveTab] = useState<'desc' | 'specs'>('desc');
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Gallery mockup - we can generate variations of the main image or just use it
  const images = [
    product.image,
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=60'
  ];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.location.href = '/checkout';
  };

  // Get related products (same category, excluding current product)
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        <a href="/FlixCart-Website/" className="hover:text-brand-600">Home</a>
        <ChevronRight className="h-3.5 w-3.5" />
        <a href="/FlixCart-Website/products" className="hover:text-brand-600">Products</a>
        <ChevronRight className="h-3.5 w-3.5" />
        <a href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-600">{product.category}</a>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-600 dark:text-slate-300 truncate max-w-[120px] sm:max-w-none">{product.title}</span>
      </nav>

      {/* Main Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square bg-slate-50 dark:bg-ui-card-dark border border-ui-border-light dark:border-ui-border-dark rounded-3xl overflow-hidden shadow-sm">
            <img 
              src={selectedImage} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`aspect-square bg-slate-50 dark:bg-ui-card-dark border rounded-xl overflow-hidden transition-all cursor-pointer ${
                  selectedImage === img 
                    ? 'border-brand-600 ring-2 ring-brand-500/20' 
                    : 'border-ui-border-light dark:border-ui-border-dark hover:border-brand-500'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Purchase Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="inline-block text-[10px] font-extrabold bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {product.title}
            </h1>
            
            {/* Rating Stars */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4.5 w-4.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                {product.rating} ★ <span className="text-slate-400 font-normal">({product.reviewCount} customer reviews)</span>
              </span>
            </div>
          </div>

          {/* Price section */}
          <div className="p-5 bg-slate-50 dark:bg-ui-card-dark border border-ui-border-light dark:border-ui-border-dark rounded-2xl">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="text-base text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm text-red-500 font-bold bg-red-100 dark:bg-red-500/10 px-2 py-0.5 rounded-md">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">
              Taxes calculated at checkout. Free shipping on orders over ₹2,499.
            </p>
          </div>

          {/* Description / Highlight Text */}
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {product.description}
          </p>

          {/* Quantity Controls & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-ui-border-light/60 dark:border-ui-border-dark/60">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between border border-ui-border-light dark:border-ui-border-dark rounded-xl bg-slate-50 dark:bg-ui-dark overflow-hidden p-1 sm:w-32 shrink-0">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-2 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-ui-card-dark rounded-lg transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="px-4 text-sm font-extrabold text-slate-800 dark:text-white">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="p-2 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-ui-card-dark rounded-lg transition-colors cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Actions */}
            <div className="flex-grow flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 rounded-xl text-sm font-extrabold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                  added 
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20 scale-98' 
                    : 'bg-white hover:bg-slate-50 text-brand-600 border border-brand-500/30'
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-4.5 w-4.5" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4.5 w-4.5" /> Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-extrabold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 transition-all cursor-pointer text-center"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Guarantee Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-ui-border-light/60 dark:border-ui-border-dark/60 text-center">
            <div className="space-y-1.5 flex flex-col items-center">
              <Truck className="h-5 w-5 text-brand-500" />
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-300">Fast Shipping</span>
            </div>
            <div className="space-y-1.5 flex flex-col items-center">
              <ShieldCheck className="h-5 w-5 text-brand-500" />
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-300">Secure Payments</span>
            </div>
            <div className="space-y-1.5 flex flex-col items-center">
              <RefreshCw className="h-5 w-5 text-brand-500" />
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-300">14-Day Returns</span>
            </div>
          </div>

          {/* Detail/Spec Tabs */}
          <div className="pt-6 border-t border-ui-border-light/60 dark:border-ui-border-dark/60">
            <div className="flex gap-4 border-b border-ui-border-light dark:border-ui-border-dark mb-4">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-2.5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'desc' 
                    ? 'border-brand-500 text-brand-600 dark:text-brand-500' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2.5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'specs' 
                    ? 'border-brand-500 text-brand-600 dark:text-brand-500' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Specifications
              </button>
            </div>
            
            <div className="animate-in fade-in duration-200">
              {activeTab === 'desc' ? (
                <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed space-y-3 font-medium">
                  <p>Our products are engineered with the highest quality standards to ensure long-lasting durability and top performance.</p>
                  <p>Includes a 1-year limited warranty that covers parts and labor. Customer support is available 24/7 to answer any of your questions.</p>
                </div>
              ) : (
                <div className="border border-ui-border-light dark:border-ui-border-dark rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-ui-border-light dark:divide-ui-border-dark">
                      {Object.entries(product.specs).map(([key, val]) => (
                        <tr key={key} className="hover:bg-slate-50 dark:hover:bg-ui-card-dark transition-colors">
                          <td className="px-4 py-3 font-bold text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-ui-dark/30 w-1/3">{key}</td>
                          <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Recommended Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-12 border-t border-ui-border-light dark:border-ui-border-dark">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
