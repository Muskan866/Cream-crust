import React, { useState, useEffect } from 'react';
import { useBakery } from '../context/BakeryContext';
import { ImageWithFallback } from './ImageWithFallback';
import { X, Plus, Minus, Trash2, Tag, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    discount,
    total,
    couponCode,
    couponError,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
  } = useBakery();

  const [inputCoupon, setInputCoupon] = useState('');

  useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = applyCoupon(inputCoupon);
    if (ok) {
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl border-l border-[#ECE2D6] flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EAE0D2] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8B5A3C]" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1F18]">
                Your Bakery Basket
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#7B6A5E] hover:text-[#2C1F18] hover:bg-[#F4ECE1] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 divide-y divide-[#EFE7DC]">
            {cart.length > 0 ? (
              cart.map(({ product, quantity }) => (
                <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F5EFE8] shrink-0 border border-[#EAE0D2]">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      fallbackTitle={product.name}
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm sm:text-base font-bold text-[#2C1F18] leading-tight truncate">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-[#A49488] hover:text-[#C04838] p-1 transition-colors shrink-0"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-[#8A796D] mt-0.5">
                      ₹{product.price} each
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D9CEBE] rounded-lg bg-white px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#5C4A3E] hover:text-[#2C1F18]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-serif font-bold text-xs text-[#2C1F18] px-2 tabular-nums">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#5C4A3E] hover:text-[#2C1F18]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-serif font-bold text-sm sm:text-base text-[#2C1F18] tabular-nums">
                        ₹{product.price * quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F6EDE2] flex items-center justify-center text-2xl mb-4">
                  🥐
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2C1F18]">
                  Your basket is empty
                </h3>
                <p className="text-xs text-[#7B6A5E] mt-1.5 max-w-xs">
                  Warm croissants, decadent Belgian cakes, and crusty baguettes are waiting for you!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-5 py-2.5 bg-[#3A2A20] text-white text-xs font-semibold rounded-full hover:bg-[#523C2E] transition-colors"
                >
                  Explore Delicious Treats
                </button>
              </div>
            )}
          </div>

          {/* Footer & Calculations (Only when cart has items) */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#EAE0D2] shadow-lg">
              
              {/* Coupon Section */}
              <div className="mb-4">
                {couponCode ? (
                  <div className="flex items-center justify-between bg-[#F4F9F4] border border-[#CDE5CE] px-3 py-2 rounded-xl text-xs text-[#2E6B34]">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Coupon <strong>{couponCode}</strong> applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-[#8A4A4A] hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#8B6B55] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Coupon code (BAKERY10 / SWEET50)"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-[#FBF8F3] border border-[#DDD0C2] text-[#2C1F18] focus:outline-none focus:border-[#8B5A3C] uppercase placeholder:normal-case"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#F0E6D8] hover:bg-[#E4D7C5] text-[#3A2A20] text-xs font-bold rounded-xl transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponError && (
                  <p className="text-[11px] text-[#B83E31] mt-1.5 pl-1">
                    {couponError}
                  </p>
                )}

                {/* Sample coupon hints */}
                {!couponCode && (
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-[#8A796D]">
                    <span>Try:</span>
                    <button
                      type="button"
                      onClick={() => applyCoupon('BAKERY10')}
                      className="underline hover:text-[#8B5A3C]"
                    >
                      BAKERY10 (10% off)
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => applyCoupon('SWEET50')}
                      className="underline hover:text-[#8B5A3C]"
                    >
                      SWEET50 (₹50 off)
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#635246] pt-2 border-t border-[#F2ECE1]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#2C1F18] tabular-nums">₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-[#2C1F18] tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-[#3A7E46] font-semibold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                {deliveryFee > 0 && (
                  <p className="text-[10px] text-[#8B6B55]">
                    Add ₹{500 - subtotal} more for free delivery!
                  </p>
                )}

                {discount > 0 && (
                  <div className="flex justify-between text-[#3A7E46] font-semibold">
                    <span>Discount</span>
                    <span className="tabular-nums">-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-serif font-bold text-[#2C1F18] pt-2 border-t border-[#EFE7DC]">
                  <span>Total</span>
                  <span className="tabular-nums text-lg">₹{total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 bg-[#3A2A20] hover:bg-[#4E392C] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 text-xs text-[#7B6A5E] hover:text-[#2C1F18] font-medium transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
