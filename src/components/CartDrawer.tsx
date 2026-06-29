import React, { useEffect } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../store/cartStore';
import { formatPrice } from '../data/products';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, cartTotal, cartOriginalTotal } = useCart();
  
  // Disable body scroll when drawer is open
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  const totalSavings = cartOriginalTotal - cartTotal;
  const isFreeShipping = cartTotal >= 2499;
  const shippingProgress = Math.min((cartTotal / 2499) * 100, 100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      {/* Background Overlay */}
      <div 
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-ui-card-dark shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-ui-border-light dark:border-ui-border-dark flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand-600 dark:text-brand-500" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Shopping Cart</h2>
            <span className="text-xs bg-slate-100 dark:bg-ui-dark text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full font-medium">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-ui-dark dark:hover:text-slate-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 && (
          <div className="px-5 py-3.5 bg-slate-50 dark:bg-ui-dark border-b border-ui-border-light dark:border-ui-border-dark">
            <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              <span>{isFreeShipping ? '🎉 You unlocked Free Shipping!' : `Spend ${formatPrice(2499 - cartTotal)} more for Free Shipping`}</span>
              <span>{Math.round(shippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 w-16 bg-slate-100 dark:bg-ui-dark rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white">Your cart is empty</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-[240px] mx-auto">
                  Add items to your cart to see them here and begin checkout.
                </p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md shadow-brand-600/10 hover:shadow-brand-600/20 cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.product.id}
                className="flex gap-4 p-3 bg-slate-50 dark:bg-ui-dark border border-ui-border-light dark:border-ui-border-dark rounded-xl animate-in fade-in zoom-in-95 duration-200"
              >
                <img 
                  src={item.product.image} 
                  alt={item.product.title} 
                  className="h-20 w-20 rounded-lg object-cover bg-white border border-ui-border-light dark:border-ui-border-dark"
                />
                <div className="flex-grow flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">
                        {item.product.title}
                      </h4>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                      {item.product.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-ui-border-light dark:border-ui-border-dark rounded-lg bg-white dark:bg-ui-card-dark overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-ui-dark transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-800 dark:text-white">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-ui-dark transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Price details */}
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-800 dark:text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      {item.product.discount > 0 && (
                        <span className="block text-[10px] text-slate-400 dark:text-slate-500 line-through">
                          {formatPrice(item.product.originalPrice * item.quantity)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-ui-border-light dark:border-ui-border-dark bg-slate-50 dark:bg-ui-dark/50 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="line-through">{formatPrice(cartOriginalTotal)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-500">
                  <span>Savings</span>
                  <span>-{formatPrice(totalSavings)} ({Math.round((totalSavings / cartOriginalTotal) * 100)}% Off)</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Shipping</span>
                <span>{isFreeShipping ? 'FREE' : formatPrice(299)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-800 dark:text-white pt-2 border-t border-ui-border-light/60 dark:border-ui-border-dark/60">
                <span>Total</span>
                <span>{formatPrice(cartTotal + (isFreeShipping ? 0 : 299))}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setIsOpen(false)}
                className="flex-1 py-3 border border-ui-border-light dark:border-ui-border-dark text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-100 dark:hover:bg-ui-card-dark transition-colors cursor-pointer text-center"
              >
                Close Drawer
              </button>
              <a 
                href="/checkout"
                className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 flex items-center justify-center gap-1.5 cursor-pointer text-center"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
