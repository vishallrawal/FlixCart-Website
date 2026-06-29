import React, { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, Ticket, Settings, Plus, Trash2, CheckCircle2, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { 
  getOrders, 
  updateOrderStatus, 
  getCoupons, 
  addCoupon, 
  deleteCoupon, 
  saveProductOverride, 
  deleteProductOverride, 
  getStoreProducts, 
  type Product, 
  type Order, 
  type Coupon 
} from '../store/cartStore';
import { products as staticProducts, formatPrice } from '../data/products';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'inventory' | 'coupons'>('analytics');
  const [orders, setOrders] = useState<Order[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  
  // Auto-rotating trending products ticker state
  const [trendingIndex, setTrendingIndex] = useState(0);

  // Inventory form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editDiscount, setEditDiscount] = useState<number>(0);
  const [editOutOfStock, setEditOutOfStock] = useState<boolean>(false);

  // New coupon form state
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState(10);
  const [newCategory, setNewCategory] = useState('All');

  // Load everything on mount & sync when local storage updates
  const loadData = () => {
    setOrders(getOrders());
    const storeProds = getStoreProducts(staticProducts);
    setProductsList(storeProds);
    setCoupons(getCoupons());
  };

  useEffect(() => {
    loadData();
    
    const handleOrderUpdate = () => setOrders(getOrders());
    const handleMerchantUpdate = () => {
      const storeProds = getStoreProducts(staticProducts);
      setProductsList(storeProds);
    };

    window.addEventListener('ecommerce-orders-update', handleOrderUpdate);
    window.addEventListener('ecommerce-merchant-update', handleMerchantUpdate);
    
    return () => {
      window.removeEventListener('ecommerce-orders-update', handleOrderUpdate);
      window.removeEventListener('ecommerce-merchant-update', handleMerchantUpdate);
    };
  }, []);

  // Filter trending products for auto-slideshow (e.g. deals or high ratings)
  const trendingProducts = productsList.filter(p => p.isDeal || p.rating >= 4.7);

  // Trigger one-by-one rotation interval
  useEffect(() => {
    if (trendingProducts.length === 0) return;
    const interval = setInterval(() => {
      setTrendingIndex((prev) => (prev + 1) % trendingProducts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [trendingProducts.length]);

  // Analytics Helpers
  const totalRevenue = orders.reduce((sum, o) => o.status !== 'Cancelled' ? sum + o.total : sum, 0);
  const totalOrdersCount = orders.length;
  const activeOrdersCount = orders.filter(o => o.status === 'Processing' || o.status === 'Shipped').length;
  const avgOrderValue = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;

  // Inventory Save
  const handleStartEdit = (prod: Product) => {
    setEditingId(prod.id);
    setEditPrice(prod.price);
    setEditDiscount(prod.discount);
    setEditOutOfStock((prod as any).outOfStock === true);
  };

  const handleSaveInventory = (id: string) => {
    const originalPrice = Math.round(editPrice / (1 - editDiscount / 100));
    
    saveProductOverride(id, {
      price: editPrice,
      discount: editDiscount,
      originalPrice: originalPrice,
      outOfStock: editOutOfStock
    } as any);

    setEditingId(null);
    loadData();
  };

  const handleResetInventory = (id: string) => {
    deleteProductOverride(id);
    setEditingId(null);
    loadData();
  };

  // Coupons Add
  const handleAddCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    addCoupon({
      code: newCode.trim().toUpperCase(),
      discountPercent: newDiscount,
      category: newCategory === 'All' ? undefined : newCategory
    });

    setNewCode('');
    setNewDiscount(10);
    setNewCategory('All');
    setCoupons(getCoupons());
  };

  const handleDeleteCoupon = (code: string) => {
    deleteCoupon(code);
    setCoupons(getCoupons());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-2xl p-6 md:p-8">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-600 tracking-tight flex items-center gap-2.5">
            <LayoutDashboard className="h-8 w-8 text-brand-600" /> FlixCart Creator Panel
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">
            Advanced real-time simulation panel. Administrator simulator control for products, coupons, and orders logs.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-1.5 bg-slate-50 border border-slate-200 p-1.5 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 text-xs font-extrabold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-555 hover:text-slate-800'
            }`}
          >
            <TrendingUp className="h-4 w-4" /> Live Stream & Orders
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 text-xs font-extrabold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-555 hover:text-slate-800'
            }`}
          >
            <ShoppingBag className="h-4 w-4" /> Products Catalog
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-2 text-xs font-extrabold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'coupons'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-555 hover:text-slate-800'
            }`}
          >
            <Ticket className="h-4 w-4" /> Promo Tickets
          </button>
        </div>
      </div>

      {/* TABS CONTENT */}

      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* ONE-BY-ONE AUTO RUNNING TRENDING SLIDESHOW */}
          {trendingProducts.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              {/* Ticker light bar indicator */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent animate-pulse" />
              
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-600 animate-ping" />
                <span className="text-[10px] font-black text-brand-600 tracking-widest">AUTO RUNNING SHOWCASE</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-2xl overflow-hidden border border-slate-200 bg-white shrink-0 relative">
                  <img 
                    key={trendingProducts[trendingIndex].id}
                    src={trendingProducts[trendingIndex].image} 
                    alt="" 
                    className="h-full w-full object-cover animate-in fade-in zoom-in-95 duration-500" 
                  />
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4.5 w-4.5 text-brand-600 animate-spin-slow" />
                    <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest bg-brand-50 px-2 py-0.5 rounded-md">
                      {trendingProducts[trendingIndex].category}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-800 leading-tight">
                    {trendingProducts[trendingIndex].title}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-brand-600">
                      {formatPrice(trendingProducts[trendingIndex].price)}
                    </span>
                    {trendingProducts[trendingIndex].discount > 0 && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatPrice(trendingProducts[trendingIndex].originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Slide Indicator circles */}
              <div className="flex gap-1.5 md:mr-6">
                {trendingProducts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTrendingIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === trendingIndex ? 'w-6 bg-brand-600' : 'w-2 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Session Revenue</span>
              <h3 className="text-2xl font-black text-slate-800">{formatPrice(totalRevenue)}</h3>
              <p className="text-[10px] text-slate-400 font-semibold">Excluding cancelled checkout receipts</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Simulation Orders</span>
              <h3 className="text-2xl font-black text-slate-800">{totalOrdersCount}</h3>
              <p className="text-[10px] text-slate-400 font-semibold">{activeOrdersCount} processing / shipped</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Order Value (AOV)</span>
              <h3 className="text-2xl font-black text-slate-800">{formatPrice(avgOrderValue)}</h3>
              <p className="text-[10px] text-slate-400 font-semibold">Standard checkout cart metrics</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Promo Codes</span>
              <h3 className="text-2xl font-black text-slate-800">{coupons.length}</h3>
              <p className="text-[10px] text-slate-400 font-semibold">Includes welcome & category engines</p>
            </div>
          </div>

          {/* Orders Tracking Table */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Active Order Tracking Log</h2>
              <span className="text-xs bg-brand-50 text-brand-600 px-3 py-1 rounded-full font-bold">
                Live Session Pipeline
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="p-16 text-center text-slate-455">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 stroke-1 opacity-50 text-brand-600" />
                <h4 className="font-bold text-sm text-slate-700">No orders recorded in this session yet</h4>
                <p className="text-xs mt-1">Go to the shop storefront, add items, and complete mock checkout to see live entries populate here!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-55 text-slate-500 text-xs uppercase font-extrabold tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">Order ID & Date</th>
                      <th className="px-6 py-4">Customer Details</th>
                      <th className="px-6 py-4">Purchased Items</th>
                      <th className="px-6 py-4">Financials</th>
                      <th className="px-6 py-4 text-center">Pipeline Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 space-y-1">
                          <span className="font-extrabold text-slate-850 block">{order.id}</span>
                          <span className="text-[10px] text-slate-400 block">{order.date}</span>
                        </td>
                        <td className="px-6 py-4 space-y-1">
                          <span className="font-bold text-slate-700 block">{order.shippingDetails.name}</span>
                          <span className="text-[11px] text-slate-500 block">{order.shippingDetails.email}</span>
                          <span className="text-[11px] text-slate-500 block">{order.shippingDetails.phone}</span>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="flex flex-col gap-1">
                            {order.items.map((item, idx) => (
                              <span key={idx} className="text-xs text-slate-600 truncate block">
                                • {item.product.title} <strong className="text-brand-600">x{item.quantity}</strong>
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 space-y-1 font-semibold text-slate-500">
                          <div className="flex justify-between max-w-[120px]">
                            <span>Sub:</span><span>{formatPrice(order.subtotal)}</span>
                          </div>
                          {order.discount > 0 && (
                            <div className="flex justify-between max-w-[120px] text-emerald-600">
                              <span>Saved:</span><span>-{formatPrice(order.discount)}</span>
                            </div>
                          )}
                          <div className="flex justify-between max-w-[120px] font-extrabold text-slate-800 pt-1 border-t border-slate-200">
                            <span>Total:</span><span>{formatPrice(order.total)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <select
                            value={order.status}
                            onChange={(e) => {
                              updateOrderStatus(order.id, e.target.value);
                              setOrders(getOrders());
                            }}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold focus:outline-none bg-white border border-slate-200 text-slate-850 cursor-pointer ${
                              order.status === 'Processing'
                                ? 'border-brand-500 text-brand-600'
                                : order.status === 'Shipped'
                                  ? 'border-blue-500 text-blue-600'
                                  : order.status === 'Delivered'
                                    ? 'border-emerald-500 text-emerald-600'
                                    : 'border-red-500 text-red-600'
                            }`}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs animate-in fade-in duration-200">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Active Product Catalog</h2>
            <span className="text-xs text-slate-400 font-semibold">Click edit to override price or toggle stock</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-55 text-slate-500 text-xs uppercase font-extrabold tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Thumbnail & Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-center">Stock Status</th>
                  <th className="px-6 py-4">Discount %</th>
                  <th className="px-6 py-4">Final Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {productsList.map((product) => {
                  const isEditing = editingId === product.id;
                  const isOutOfStock = (product as any).outOfStock === true;
                  
                  return (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt="" className="h-10 w-10 rounded-lg object-cover bg-slate-50" />
                          <div>
                            <span className="font-extrabold text-slate-850 block">{product.title}</span>
                            <span className="text-[10px] text-slate-400 block">{product.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-500">{product.category}</td>
                      <td className="px-6 py-4 text-center">
                        {isEditing ? (
                          <button
                            type="button"
                            onClick={() => setEditOutOfStock(!editOutOfStock)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                              editOutOfStock 
                                ? 'bg-red-600 text-white' 
                                : 'bg-emerald-600 text-white'
                            }`}
                          >
                            {editOutOfStock ? 'Set: In Stock' : 'Set: Out of Stock'}
                          </button>
                        ) : (
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            isOutOfStock 
                              ? 'bg-red-50 text-red-600 border border-red-200' 
                              : 'bg-emerald-50 text-emerald-600 border border-emerald-250'
                          }`}>
                            {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input 
                            type="number" min="0" max="95" value={editDiscount}
                            onChange={(e) => setEditDiscount(Number(e.target.value))}
                            className="w-16 px-2 py-1 text-xs border border-slate-200 bg-white text-slate-800 rounded-lg focus:outline-none focus:border-brand-500"
                          />
                        ) : (
                          <span className="font-bold text-slate-600">{product.discount}% OFF</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-extrabold text-brand-600">
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-slate-400">₹</span>
                            <input 
                              type="number" min="1" value={editPrice}
                              onChange={(e) => setEditPrice(Number(e.target.value))}
                              className="w-24 px-2 py-1 text-xs border border-slate-200 bg-white text-slate-800 rounded-lg focus:outline-none focus:border-brand-500"
                            />
                          </div>
                        ) : (
                          formatPrice(product.price)
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {isEditing ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleResetInventory(product.id)}
                              className="px-2.5 py-1 border border-slate-200 text-slate-500 hover:bg-slate-100 rounded-lg text-xs font-bold cursor-pointer"
                            >
                              Reset
                            </button>
                            <button
                              onClick={() => handleSaveInventory(product.id)}
                              className="px-3 py-1 bg-brand-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleStartEdit(product)}
                            className="px-3 py-1 border border-brand-500/20 text-brand-600 hover:bg-brand-600 hover:text-white rounded-lg text-xs font-bold cursor-pointer"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          
          {/* Left: Active Coupons list */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <h2 className="text-lg font-bold text-slate-800">Active Simulation Coupons</h2>
            <div className="divide-y divide-slate-150">
              {coupons.map((coupon) => (
                <div key={coupon.code} className="flex justify-between items-center py-3.5">
                  <div className="space-y-1">
                    <span className="font-mono font-extrabold text-sm text-brand-600 bg-brand-50 px-3 py-1 rounded-md border border-brand-500/20 mr-2">
                      {coupon.code}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Gives <strong className="text-slate-850">{coupon.discountPercent}% Off</strong> 
                      {coupon.category ? ` on ${coupon.category} items` : ' store-wide'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteCoupon(coupon.code)}
                    className="p-1 text-slate-400 hover:text-brand-600 transition-colors"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Add new coupon form */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-4 flex items-center gap-2">
              <Plus className="h-4.5 w-4.5" /> Create New Coupon
            </h3>
            <form onSubmit={handleAddCouponSubmit} className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Coupon Code</label>
                <input
                  type="text" required placeholder="SUMMER50"
                  value={newCode} onChange={(e) => setNewCode(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Discount Percentage (%)</label>
                <input
                  type="number" required min="5" max="90"
                  value={newDiscount} onChange={(e) => setNewDiscount(Number(e.target.value))}
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Applicable Category</label>
                <select
                  value={newCategory} onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 text-slate-800 cursor-pointer"
                >
                  <option value="All">All Categories (Store-wide)</option>
                  <option value="Electronics">Electronics Only</option>
                  <option value="Fashion">Fashion Only</option>
                  <option value="Home & Living">Home & Living Only</option>
                  <option value="Fitness & Wellness">Fitness & Wellness Only</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                Add Coupon Code
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
