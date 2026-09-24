import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, COUPONS } from '../data/bakeryData';
import { CartItem, ToastMessage, ConfirmedOrder } from '../types';

interface BakeryContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  couponCode: string;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  confirmedOrder: ConfirmedOrder | null;
  setConfirmedOrder: (order: ConfirmedOrder | null) => void;

  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  scrollToSection: (sectionId: string) => void;
}

const BakeryContext = createContext<BakeryContextType | undefined>(undefined);

export const BakeryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('creme_crust_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage persistence
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('creme_crust_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Coupon state
  const [couponCode, setCouponCode] = useState<string>(() => {
    return localStorage.getItem('creme_crust_coupon') || '';
  });
  const [couponError, setCouponError] = useState<string | null>(null);

  // Modals & Navigation state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  // Filter & Search
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('creme_crust_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('creme_crust_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Add toast helper
  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    addToast(
      `Added to Cart! 🥐`,
      `${quantity}x ${product.name} has been added to your order.`
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    localStorage.removeItem('creme_crust_coupon');
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Delivery fee: ₹49 if subtotal < 500, else Free
  const deliveryFee = cart.length === 0 || subtotal >= 500 ? 0 : 49;

  // Calculate discount
  let discount = 0;
  if (couponCode && COUPONS[couponCode.toUpperCase()]) {
    const coupon = COUPONS[couponCode.toUpperCase()];
    if (coupon.type === 'percent') {
      discount = Math.round((subtotal * coupon.value) / 100);
    } else {
      discount = Math.min(coupon.value, subtotal);
    }
  }

  const total = Math.max(0, subtotal + deliveryFee - discount);

  // Coupon handling
  const applyCoupon = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      setCouponError('Please enter a coupon code.');
      return false;
    }
    if (COUPONS[normalized]) {
      setCouponCode(normalized);
      setCouponError(null);
      localStorage.setItem('creme_crust_coupon', normalized);
      addToast('Coupon Applied! ✨', `${COUPONS[normalized].label} discount applied to your order.`);
      return true;
    } else {
      setCouponError('Invalid coupon code. Try BAKERY10 or SWEET50');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponError(null);
    localStorage.removeItem('creme_crust_coupon');
    addToast('Coupon Removed', 'Discount has been cleared.');
  };

  // Wishlist
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        addToast('Removed from Favorites', `${product.name} removed from your wishlist.`, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        addToast('Saved to Favorites! ❤️', `${product.name} saved to your wishlist.`);
        return [...prev, product.id];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <BakeryContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        deliveryFee,
        discount,
        total,
        couponCode,
        couponError,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        toasts,
        addToast,
        removeToast,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        confirmedOrder,
        setConfirmedOrder,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        scrollToSection,
      }}
    >
      {children}
    </BakeryContext.Provider>
  );
};

export const useBakery = () => {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider');
  }
  return context;
};
