import React, { useState } from 'react';
import { CreditCard, Truck, CheckCircle2, ChevronRight, ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart, clearCart, addOrder, getCoupons } from '../store/cartStore';
import { formatPrice } from '../data/products';

export default function CheckoutSection() {
  const { items, cartTotal, cartOriginalTotal } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [address, setAddress] = useState({ name: '', email: '', phone: '', addressLine: '', city: '', zip: '' });
  const [payment, setPayment] = useState({ method: 'card', cardNo: '', expiry: '', cvv: '' });
  const [orderId, setOrderId] = useState('');
  
  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState<{ code: string; discountPercent: number; category?: string } | null>(null);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    const allCoupons = getCoupons();
    const match = allCoupons.find(c => c.code.toUpperCase() === code);
    if (match) {
      if (match.category) {
        const hasCategoryItem = items.some(item => item.product.category === match.category);
        if (!hasCategoryItem) {
          setCouponError(`This coupon is only valid for ${match.category} products!`);
          return;
        }
      }
      setCouponApplied(match);
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code!');
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Financial math
    const subtotal = cartOriginalTotal;
    const finalSavings = cartOriginalTotal - cartTotal;
    const couponDiscount = couponApplied 
      ? items.reduce((sum, item) => {
          if (!couponApplied.category || item.product.category === couponApplied.category) {
            return sum + Math.round((item.product.price * item.quantity) * (couponApplied.discountPercent / 100));
          }
          return sum;
        }, 0)
      : 0;

    const totalDiscount = finalSavings + couponDiscount;

    const placedId = addOrder({
      items: items,
      subtotal: subtotal,
      discount: totalDiscount,
      shipping: shippingCost,
      total: cartTotal + shippingCost - couponDiscount,
      shippingDetails: address,
      paymentMethod: payment.method
    });

    setOrderId(placedId);
    clearCart();
    setStep(3);
  };

  const isFreeShipping = cartTotal >= 2499;
  const shippingCost = isFreeShipping ? 0 : 299;
  
  const couponDiscount = couponApplied 
    ? items.reduce((sum, item) => {
        if (!couponApplied.category || item.product.category === couponApplied.category) {
          return sum + Math.round((item.product.price * item.quantity) * (couponApplied.discountPercent / 100));
        }
        return sum;
      }, 0)
    : 0;

  const finalTotal = cartTotal + shippingCost - couponDiscount;

  if (items.length === 0 && step !== 3) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-6 space-y-6">
        <div className="h-16 w-16 bg-slate-100 dark:bg-ui-dark rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 mx-auto">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Your Cart is Empty</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Add items to your cart before proceeding to checkout.
          </p>
        </div>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold shadow-lg"
        >
          Return to Store
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Checkout Stepper Progress */}
      <div className="max-w-2xl mx-auto flex items-center justify-between relative px-2.5">
        <div className="absolute left-10 right-10 top-5 h-0.5 bg-slate-200 dark:bg-slate-800 -z-1" />
        
        {/* Step 1 */}
        <div className="flex flex-col items-center gap-2">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${
            step >= 1 
              ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20' 
              : 'bg-white border-ui-border-light text-slate-400'
          }`}>
            1
          </div>
          <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Shipping</span>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center gap-2">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${
            step >= 2 
              ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20' 
              : 'bg-white dark:bg-ui-card-dark border-ui-border-light dark:border-ui-border-dark text-slate-400'
          }`}>
            2
          </div>
          <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Payment</span>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center gap-2">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${
            step === 3 
              ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20' 
              : 'bg-white dark:bg-ui-card-dark border-ui-border-light dark:border-ui-border-dark text-slate-400'
          }`}>
            3
          </div>
          <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Receipt</span>
        </div>
      </div>

      {/* Main Content Layout */}
      {step === 3 ? (
        /* Success Receipt Page */
        <div className="max-w-2xl mx-auto bg-white dark:bg-ui-card-dark border border-ui-border-light dark:border-ui-border-dark rounded-3xl p-8 sm:p-12 text-center space-y-6 animate-in zoom-in duration-300">
          <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <span className="inline-block text-[10px] font-extrabold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 px-3 py-1 rounded-full uppercase tracking-wider">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Thank you for your order!
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Your purchase was successful. We have sent a confirmation email with tracking details.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-ui-dark border border-ui-border-light dark:border-ui-border-dark rounded-2xl p-5 text-left max-w-md mx-auto space-y-2 text-sm font-medium">
            <div className="flex justify-between">
              <span className="text-slate-400">Order ID:</span>
              <span className="text-slate-800 dark:text-white font-extrabold">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Estimated Delivery:</span>
              <span className="text-slate-800 dark:text-white font-extrabold">3 - 5 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payment Status:</span>
              <span className="text-emerald-600 font-extrabold">Authorized</span>
            </div>
          </div>

          <div className="pt-4 flex gap-4 justify-center">
            <a 
              href="/" 
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold shadow-lg"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      ) : (
        /* Shipping / Payment Split Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Forms */}
          <div className="lg:col-span-7 bg-white dark:bg-ui-card-dark border border-ui-border-light dark:border-ui-border-dark rounded-3xl p-6 sm:p-8 space-y-6">
            
            {step === 1 ? (
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-ui-border-light dark:border-ui-border-dark pb-4">
                  <Truck className="h-5 w-5 text-brand-600 dark:text-brand-500" />
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white">Shipping Details</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Full Name</label>
                    <input 
                      type="text" required value={address.name} 
                      onChange={(e) => setAddress({...address, name: e.target.value})}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-ui-border-light dark:bg-ui-dark dark:border-ui-border-dark rounded-xl focus:outline-none focus:border-brand-500 dark:text-slate-100"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Email Address</label>
                    <input 
                      type="email" required value={address.email} 
                      onChange={(e) => setAddress({...address, email: e.target.value})}
                      placeholder="johndoe@example.com"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-ui-border-light dark:bg-ui-dark dark:border-ui-border-dark rounded-xl focus:outline-none focus:border-brand-500 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Street Address</label>
                  <input 
                    type="text" required value={address.addressLine} 
                    onChange={(e) => setAddress({...address, addressLine: e.target.value})}
                    placeholder="123 Main St, Suite 40"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-ui-border-light dark:bg-ui-dark dark:border-ui-border-dark rounded-xl focus:outline-none focus:border-brand-500 dark:text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">City</label>
                    <input 
                      type="text" required value={address.city} 
                      onChange={(e) => setAddress({...address, city: e.target.value})}
                      placeholder="New York"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-ui-border-light dark:bg-ui-dark dark:border-ui-border-dark rounded-xl focus:outline-none focus:border-brand-500 dark:text-slate-100"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Postal / ZIP Code</label>
                    <input 
                      type="text" required value={address.zip} 
                      onChange={(e) => setAddress({...address, zip: e.target.value})}
                      placeholder="10001"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-ui-border-light dark:bg-ui-dark dark:border-ui-border-dark rounded-xl focus:outline-none focus:border-brand-500 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Phone Number</label>
                  <input 
                    type="tel" required value={address.phone} 
                    onChange={(e) => setAddress({...address, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-ui-border-light dark:bg-ui-dark dark:border-ui-border-dark rounded-xl focus:outline-none focus:border-brand-500 dark:text-slate-100"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-6"
                >
                  Proceed to Payment <ChevronRight className="h-4.5 w-4.5" />
                </button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-ui-border-light dark:border-ui-border-dark pb-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-brand-600 dark:text-brand-500" />
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">Payment Method</h2>
                  </div>
                  <button 
                    type="button" onClick={() => setStep(1)}
                    className="text-xs text-brand-600 font-bold flex items-center gap-1"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Shipping
                  </button>
                </div>

                {/* Card Type Selector */}
                <div className="grid grid-cols-3 gap-3">
                  {['card', 'upi', 'cod'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPayment({...payment, method: m})}
                      className={`py-3.5 px-2 text-xs font-bold rounded-xl border flex flex-col items-center gap-1 transition-all capitalize cursor-pointer ${
                        payment.method === m
                          ? 'border-brand-500 bg-brand-500/5 text-brand-600 dark:text-brand-400'
                          : 'border-ui-border-light dark:border-ui-border-dark text-slate-500 hover:border-brand-500'
                      }`}
                    >
                      <span>{m === 'card' ? 'Credit Card' : m === 'upi' ? 'UPI' : 'Cash on Delivery'}</span>
                    </button>
                  ))}
                </div>

                {payment.method === 'card' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Card Number</label>
                      <input 
                        type="text" required placeholder="xxxx xxxx xxxx xxxx"
                        value={payment.cardNo} onChange={(e) => setPayment({...payment, cardNo: e.target.value})}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-ui-border-light dark:bg-ui-dark dark:border-ui-border-dark rounded-xl focus:outline-none focus:border-brand-500 dark:text-slate-100"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Expiration Date</label>
                        <input 
                          type="text" required placeholder="MM/YY"
                          value={payment.expiry} onChange={(e) => setPayment({...payment, expiry: e.target.value})}
                          className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-ui-border-light dark:bg-ui-dark dark:border-ui-border-dark rounded-xl focus:outline-none focus:border-brand-500 dark:text-slate-100"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">CVV</label>
                        <input 
                          type="password" required placeholder="***"
                          value={payment.cvv} onChange={(e) => setPayment({...payment, cvv: e.target.value})}
                          className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-ui-border-light dark:bg-ui-dark dark:border-ui-border-dark rounded-xl focus:outline-none focus:border-brand-500 dark:text-slate-100"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {payment.method === 'upi' && (
                  <div className="space-y-2.5 pt-2 animate-in fade-in duration-200">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">UPI ID / VPA</label>
                    <input 
                      type="text" required placeholder="username@upi"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-ui-border-light dark:bg-ui-dark dark:border-ui-border-dark rounded-xl focus:outline-none focus:border-brand-500 dark:text-slate-100"
                    />
                    <p className="text-[10px] text-slate-400 font-medium">Please accept the payment request on your linked UPI app after submission.</p>
                  </div>
                )}

                {payment.method === 'cod' && (
                  <div className="py-4 text-center border border-dashed border-ui-border-light dark:border-ui-border-dark rounded-2xl bg-slate-50 dark:bg-ui-dark/30 animate-in fade-in duration-200">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Payment will be collected in cash upon package delivery.</p>
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-6"
                >
                  Pay {formatPrice(finalTotal)} & Place Order
                </button>
              </form>
            )}

          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-ui-card-dark border border-ui-border-light dark:border-ui-border-dark rounded-3xl p-6 space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-white text-base">Order Summary</h3>

              {/* Items List inside summary */}
              <div className="divide-y divide-ui-border-light/60 dark:divide-ui-border-dark/60 max-h-56 overflow-y-auto pr-2 space-y-3.5">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 pt-3 first:pt-0">
                    <img src={item.product.image} alt={item.product.title} className="h-12 w-12 rounded-lg object-cover bg-slate-100" />
                    <div className="flex-grow min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">{item.product.title}</h4>
                      <span className="text-[10px] text-slate-400">Qty: {item.quantity}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="border-t border-ui-border-light dark:border-ui-border-dark pt-4 space-y-2 text-sm font-semibold">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartOriginalTotal)}</span>
                </div>
                {cartOriginalTotal - cartTotal > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-500">
                    <span>Store Savings</span>
                    <span>-{formatPrice(cartOriginalTotal - cartTotal)}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-500 animate-bounce">
                    <span>Coupon Discount ({couponApplied?.code})</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span>{isFreeShipping ? 'FREE' : formatPrice(299)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-800 dark:text-white border-t border-ui-border-light/60 dark:border-ui-border-dark/60 pt-3">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Promo code input section */}
              <div className="border-t border-ui-border-light dark:border-ui-border-dark pt-4 space-y-2">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Promo Code</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. WELCOME15"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow px-3.5 py-2 text-xs bg-slate-50 border border-ui-border-light dark:bg-ui-dark dark:border-ui-border-dark rounded-xl focus:outline-none focus:border-brand-500 dark:text-slate-100"
                  />
                  <button 
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-brand-600 dark:hover:bg-brand-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[10px] text-red-500 font-semibold">{couponError}</p>}
                {couponApplied && (
                  <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span>Applied: {couponApplied.code}</span>
                    <div className="flex items-center gap-2">
                      <span>-{couponApplied.discountPercent}%</span>
                      <button 
                        type="button" 
                        onClick={() => setCouponApplied(null)} 
                        className="text-red-500 hover:text-red-700 font-black cursor-pointer px-1"
                      >
                        X
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Secure Badging */}
            <div className="bg-slate-50 dark:bg-ui-card-dark/40 border border-ui-border-light dark:border-ui-border-dark rounded-2xl p-4 flex gap-3 items-center">
              <ShieldCheck className="h-6 w-6 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">Secure Checkout Guarantee</h4>
                <p className="text-[10px] text-slate-400 leading-normal">Your information is protected by industry-standard 256-bit SSL encryption. We never store raw credit card details.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
