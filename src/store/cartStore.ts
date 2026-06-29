import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  specs: Record<string, string>;
  isDeal?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  date: string;
  status: string;
  shippingDetails: {
    name: string;
    email: string;
    phone: string;
    addressLine: string;
    city: string;
    zip: string;
  };
  paymentMethod: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  category?: string;
}

const CART_EVENT = 'ecommerce-cart-update';
const CART_DRAWER_EVENT = 'ecommerce-cart-drawer-toggle';
const COMPARE_EVENT = 'ecommerce-compare-update';
const ORDER_EVENT = 'ecommerce-orders-update';
const MERCHANT_EVENT = 'ecommerce-merchant-update';

// ---------------- CART STATE FUNCTIONS ----------------

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('cart');
  return stored ? JSON.parse(stored) : [];
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(CART_EVENT));
}

export function addToCart(product: Product, quantity = 1) {
  // Resolve overrides if any
  const resolvedProduct = getStoreProductById(product.id) || product;
  const items = getCartItems();
  const existingIndex = items.findIndex(item => item.product.id === resolvedProduct.id);
  if (existingIndex > -1) {
    items[existingIndex].quantity += quantity;
  } else {
    items.push({ product: resolvedProduct, quantity });
  }
  saveCartItems(items);
  setCartDrawerOpen(true);
}

export function removeFromCart(productId: string) {
  const items = getCartItems().filter(item => item.product.id !== productId);
  saveCartItems(items);
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const items = getCartItems();
  const itemIndex = items.findIndex(item => item.product.id === productId);
  if (itemIndex > -1) {
    items[itemIndex].quantity = quantity;
    saveCartItems(items);
  }
}

export function clearCart() {
  saveCartItems([]);
}

let isDrawerOpen = false;

export function isCartDrawerOpen(): boolean {
  return isDrawerOpen;
}

export function setCartDrawerOpen(open: boolean) {
  isDrawerOpen = open;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CART_DRAWER_EVENT, { detail: open }));
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setItems(getCartItems());
    setIsOpen(isDrawerOpen);

    const handleCartUpdate = () => {
      setItems(getCartItems());
    };

    const handleDrawerUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsOpen(customEvent.detail);
    };

    const handleMerchantUpdate = () => {
      // Re-resolve item details from catalog if overrides changed
      const currentItems = getCartItems();
      const updatedItems = currentItems.map(item => {
        const catalogProduct = getStoreProductById(item.product.id);
        if (catalogProduct) {
          return { ...item, product: catalogProduct };
        }
        return item;
      });
      // Save without triggering loops
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      setItems(updatedItems);
    };

    window.addEventListener(CART_EVENT, handleCartUpdate);
    window.addEventListener(CART_DRAWER_EVENT, handleDrawerUpdate);
    window.addEventListener(MERCHANT_EVENT, handleMerchantUpdate);

    return () => {
      window.removeEventListener(CART_EVENT, handleCartUpdate);
      window.removeEventListener(CART_DRAWER_EVENT, handleDrawerUpdate);
      window.removeEventListener(MERCHANT_EVENT, handleMerchantUpdate);
    };
  }, []);

  return {
    items,
    isOpen,
    setIsOpen: setCartDrawerOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount: items.reduce((acc, item) => acc + item.quantity, 0),
    cartTotal: items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    cartOriginalTotal: items.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0),
  };
}

// ---------------- PRODUCT COMPARISON MODULE ----------------

export function getCompareItems(): Product[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('compare-list');
  return stored ? JSON.parse(stored) : [];
}

export function saveCompareItems(items: Product[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('compare-list', JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(COMPARE_EVENT));
}

export function toggleCompare(product: Product) {
  const items = getCompareItems();
  const index = items.findIndex(item => item.id === product.id);
  if (index > -1) {
    items.splice(index, 1);
  } else {
    if (items.length >= 3) {
      alert('You can compare up to 3 products at a time.');
      return;
    }
    items.push(product);
  }
  saveCompareItems(items);
}

export function clearCompare() {
  saveCompareItems([]);
}

export function useCompare() {
  const [compareList, setCompareList] = useState<Product[]>([]);

  useEffect(() => {
    setCompareList(getCompareItems());
    const handleCompareUpdate = () => {
      setCompareList(getCompareItems());
    };
    window.addEventListener(COMPARE_EVENT, handleCompareUpdate);
    return () => window.removeEventListener(COMPARE_EVENT, handleCompareUpdate);
  }, []);

  return {
    compareList,
    toggleCompare,
    clearCompare,
    isInCompare: (id: string) => compareList.some(item => item.id === id)
  };
}

// ---------------- ORDERS LOG MODULE ----------------

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('orders');
  return stored ? JSON.parse(stored) : [];
}

export function addOrder(order: Omit<Order, 'id' | 'date' | 'status'>) {
  if (typeof window === 'undefined') return '';
  const id = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const date = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  const fullOrder: Order = {
    ...order,
    id,
    date,
    status: 'Processing'
  };
  const orders = getOrders();
  orders.unshift(fullOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
  window.dispatchEvent(new CustomEvent(ORDER_EVENT));
  return id;
}

export function updateOrderStatus(orderId: string, status: string) {
  if (typeof window === 'undefined') return;
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    localStorage.setItem('orders', JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent(ORDER_EVENT));
  }
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
    const handleOrdersUpdate = () => {
      setOrders(getOrders());
    };
    window.addEventListener(ORDER_EVENT, handleOrdersUpdate);
    return () => window.removeEventListener(ORDER_EVENT, handleOrdersUpdate);
  }, []);

  return {
    orders,
    addOrder,
    updateOrderStatus
  };
}

// ---------------- MERCHANT OVERRIDES & CATALOG INTEGRATION ----------------

export function getStoreProductById(id: string): Product | null {
  if (typeof window === 'undefined') return null;
  const overridesRaw = localStorage.getItem('merchant-overrides');
  if (!overridesRaw) return null;
  const overrides = JSON.parse(overridesRaw);
  return overrides[id] || null;
}

export function saveProductOverride(productId: string, updates: Partial<Product>) {
  if (typeof window === 'undefined') return;
  const overridesRaw = localStorage.getItem('merchant-overrides') || '{}';
  const overrides = JSON.parse(overridesRaw);
  overrides[productId] = { ...(overrides[productId] || {}), ...updates };
  localStorage.setItem('merchant-overrides', JSON.stringify(overrides));
  window.dispatchEvent(new CustomEvent(MERCHANT_EVENT));
}

export function deleteProductOverride(productId: string) {
  if (typeof window === 'undefined') return;
  const overridesRaw = localStorage.getItem('merchant-overrides') || '{}';
  const overrides = JSON.parse(overridesRaw);
  delete overrides[productId];
  localStorage.setItem('merchant-overrides', JSON.stringify(overrides));
  window.dispatchEvent(new CustomEvent(MERCHANT_EVENT));
}

export function getStoreProducts(staticProducts: Product[]): Product[] {
  if (typeof window === 'undefined') return staticProducts;
  const overridesRaw = localStorage.getItem('merchant-overrides');
  if (!overridesRaw) return staticProducts;
  const overrides = JSON.parse(overridesRaw);
  return staticProducts.map(p => {
    if (overrides[p.id]) {
      return { ...p, ...overrides[p.id] };
    }
    return p;
  });
}

export function useStoreProducts(staticProducts: Product[]) {
  const [productsList, setProductsList] = useState<Product[]>(staticProducts);

  useEffect(() => {
    setProductsList(getStoreProducts(staticProducts));
    const handleMerchantUpdate = () => {
      setProductsList(getStoreProducts(staticProducts));
    };
    window.addEventListener(MERCHANT_EVENT, handleMerchantUpdate);
    return () => window.removeEventListener(MERCHANT_EVENT, handleMerchantUpdate);
  }, [staticProducts]);

  return productsList;
}

// ---------------- PROMO COUPONS LOGIC ----------------

const DEFAULT_COUPONS: Coupon[] = [
  { code: 'WELCOME15', discountPercent: 15 },
  { code: 'FESTIVE30', discountPercent: 30, category: 'Home & Living' },
  { code: 'TECHGURU', discountPercent: 20, category: 'Electronics' }
];

export function getCoupons(): Coupon[] {
  if (typeof window === 'undefined') return DEFAULT_COUPONS;
  const stored = localStorage.getItem('coupons');
  if (!stored) {
    localStorage.setItem('coupons', JSON.stringify(DEFAULT_COUPONS));
    return DEFAULT_COUPONS;
  }
  return JSON.parse(stored);
}

export function addCoupon(coupon: Coupon) {
  if (typeof window === 'undefined') return;
  const coupons = getCoupons();
  if (coupons.some(c => c.code.toUpperCase() === coupon.code.toUpperCase())) {
    alert('Coupon code already exists!');
    return;
  }
  coupons.push({ ...coupon, code: coupon.code.toUpperCase() });
  localStorage.setItem('coupons', JSON.stringify(coupons));
}

export function deleteCoupon(code: string) {
  if (typeof window === 'undefined') return;
  const coupons = getCoupons().filter(c => c.code !== code);
  localStorage.setItem('coupons', JSON.stringify(coupons));
}
