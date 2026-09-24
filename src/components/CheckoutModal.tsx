import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { CustomerOrderInfo, ConfirmedOrder } from '../types';
import {
  X,
  CreditCard,
  Banknote,
  Smartphone,
  Truck,
  Store,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  FileText,
  ShoppingBag,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotal,
    deliveryFee,
    discount,
    total,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    confirmedOrder,
    setConfirmedOrder,
  } = useBakery();

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState<CustomerOrderInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Mumbai',
    pincode: '',
    instructions: '',
    orderType: 'delivery',
    paymentMethod: 'upi',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen && !confirmedOrder) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (orderType === 'delivery') {
      if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
      if (!formData.pincode.trim() || formData.pincode.length < 5) newErrors.pincode = 'Valid pincode is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    // Simulate payment / order processing
    setTimeout(() => {
      const randomId = 'CC-' + Math.floor(1000 + Math.random() * 9000);
      const deliveryEst =
        orderType === 'delivery'
          ? '30 - 45 Minutes (Fresh & Warm)'
          : 'Ready for Pickup in 20 Minutes';

      const confirmed: ConfirmedOrder = {
        orderId: randomId,
        items: [...cart],
        subtotal,
        deliveryFee: orderType === 'pickup' ? 0 : deliveryFee,
        discount,
        total: orderType === 'pickup' ? Math.max(0, subtotal - discount) : total,
        customer: {
          ...formData,
          orderType,
          paymentMethod,
        },
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedDelivery: deliveryEst,
      };

      setConfirmedOrder(confirmed);
      setIsProcessing(false);
      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#ECE2D6] overflow-hidden z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[#5A483D] hover:text-[#2C1F18] shadow-sm transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* View 1: Confirmed Order Screen */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-10 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#EAF5EC] text-[#2E7D32] mx-auto flex items-center justify-center mb-4 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4EDE2] text-[#8B5A3C] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bakehouse Kitchen Notified</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1F18]">
              Order Confirmed! 🎉
            </h2>

            <p className="text-sm text-[#6A5A4E] mt-2 max-w-md mx-auto">
              Thank you for ordering from Crème & Crust. Our bakers have received your ticket and are packaging your treats.
            </p>

            {/* Order Card Summary */}
            <div className="mt-8 bg-white p-6 rounded-2xl border border-[#EBE1D3] text-left max-w-lg mx-auto shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE1]">
                <div>
                  <span className="text-xs text-[#8A796D] uppercase tracking-wider">Order Number</span>
                  <p className="font-serif text-xl font-bold text-[#2C1F18]">
                    #{confirmedOrder.orderId}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#8A796D] uppercase tracking-wider">Estimated Time</span>
                  <div className="flex items-center gap-1 text-sm font-semibold text-[#8B5A3C]">
                    <Clock className="w-4 h-4" />
                    <span>{confirmedOrder.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Items List in Receipt */}
              <div className="py-4 border-b border-[#F2ECE1] space-y-2 max-h-40 overflow-y-auto">
                {confirmedOrder.items.map((it) => (
                  <div key={it.product.id} className="flex justify-between text-xs text-[#4A3B32]">
                    <span>
                      {it.quantity}x {it.product.name}
                    </span>
                    <span className="font-medium tabular-nums">
                      ₹{it.product.price * it.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Totals */}
              <div className="pt-4 space-y-1.5 text-xs text-[#635246]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums">₹{confirmedOrder.subtotal}</span>
                </div>
                {confirmedOrder.discount > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Discount</span>
                    <span className="tabular-nums">-₹{confirmedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="tabular-nums">
                    {confirmedOrder.deliveryFee === 0 ? 'FREE' : `₹${confirmedOrder.deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between font-serif text-base font-bold text-[#2C1F18] pt-2 border-t border-[#F2ECE1]">
                  <span>Amount Paid</span>
                  <span className="tabular-nums">₹{confirmedOrder.total}</span>
                </div>
              </div>

              {/* Delivery / Pickup address info */}
              <div className="mt-4 pt-4 border-t border-[#F2ECE1] flex items-start gap-2.5 text-xs text-[#6A5A4E]">
                <MapPin className="w-4 h-4 text-[#8B5A3C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C1F18]">
                    {confirmedOrder.customer.orderType === 'delivery' ? 'Delivery to:' : 'Store Pickup at:'}
                  </strong>{' '}
                  {confirmedOrder.customer.orderType === 'delivery'
                    ? `${confirmedOrder.customer.address}, ${confirmedOrder.customer.city} - ${confirmedOrder.customer.pincode}`
                    : 'Crème & Crust Boutique (24 Baker Street, Downtown)'}
                </div>
              </div>

            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-8 py-3 bg-[#3A2A20] text-white text-sm font-semibold rounded-full hover:bg-[#523C2E] shadow-sm transition-colors"
              >
                Back to Bakery
              </button>
            </div>
          </div>
        ) : (
          /* View 2: Checkout Form */
          <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
            <div className="border-b border-[#EAE0D2] pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#8B5A3C] font-semibold">
                Quick & Seamless
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1F18]">
                Complete Your Order
              </h2>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Order Type Toggle: Delivery vs Pickup */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5A4E] mb-2">
                  Order Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold transition-all ${
                      orderType === 'delivery'
                        ? 'border-[#3A2A20] bg-white text-[#2C1F18] shadow-xs ring-1 ring-[#3A2A20]'
                        : 'border-[#DDD2C4] bg-[#F7F2EC] text-[#7B6A5E] hover:bg-[#EFE8DD]'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-[#8B5A3C]" />
                    <span>Home Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold transition-all ${
                      orderType === 'pickup'
                        ? 'border-[#3A2A20] bg-white text-[#2C1F18] shadow-xs ring-1 ring-[#3A2A20]'
                        : 'border-[#DDD2C4] bg-[#F7F2EC] text-[#7B6A5E] hover:bg-[#EFE8DD]'
                    }`}
                  >
                    <Store className="w-4 h-4 text-[#8B5A3C]" />
                    <span>Boutique Pickup</span>
                  </button>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A5A4E] mb-3">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#554438] font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Priya Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#DDD2C4] text-[#2C1F18] focus:outline-none focus:border-[#8B5A3C]"
                    />
                    {errors.fullName && <p className="text-[11px] text-[#B83E31] mt-0.5">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs text-[#554438] font-medium mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#DDD2C4] text-[#2C1F18] focus:outline-none focus:border-[#8B5A3C]"
                    />
                    {errors.phone && <p className="text-[11px] text-[#B83E31] mt-0.5">{errors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs text-[#554438] font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#DDD2C4] text-[#2C1F18] focus:outline-none focus:border-[#8B5A3C]"
                    />
                    {errors.email && <p className="text-[11px] text-[#B83E31] mt-0.5">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery Address (if Delivery) */}
              {orderType === 'delivery' ? (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A5A4E] mb-3">
                    2. Delivery Address
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-[#554438] font-medium mb-1">Street Address, Flat / Villa *</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Apartment 4B, Sunflower Heights, Marine Drive"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#DDD2C4] text-[#2C1F18] focus:outline-none focus:border-[#8B5A3C]"
                      />
                      {errors.address && <p className="text-[11px] text-[#B83E31] mt-0.5">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-[#554438] font-medium mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#DDD2C4] text-[#2C1F18] focus:outline-none focus:border-[#8B5A3C]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-[#554438] font-medium mb-1">Pincode *</label>
                        <input
                          type="text"
                          name="pincode"
                          placeholder="400001"
                          value={formData.pincode}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#DDD2C4] text-[#2C1F18] focus:outline-none focus:border-[#8B5A3C]"
                        />
                        {errors.pincode && <p className="text-[11px] text-[#B83E31] mt-0.5">{errors.pincode}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#554438] font-medium mb-1">Delivery Instructions (Optional)</label>
                      <input
                        type="text"
                        name="instructions"
                        placeholder="e.g. Ring bell twice, handle delicate cake with care"
                        value={formData.instructions}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#DDD2C4] text-[#2C1F18] focus:outline-none focus:border-[#8B5A3C]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#F6EDE2] border border-[#E9DECF] text-xs text-[#6B5749]">
                  <strong className="block text-sm text-[#2C1F18] mb-1 font-serif">Pickup Location:</strong>
                  Crème & Crust Boutique Atelier<br />
                  24 Baker Street, Downtown<br />
                  Available 8:00 AM – 9:00 PM today.
                </div>
              )}

              {/* Payment Methods */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A5A4E] mb-3">
                  3. Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-3 px-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-semibold transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#3A2A20] bg-white text-[#2C1F18] shadow-xs ring-1 ring-[#3A2A20]'
                        : 'border-[#DDD2C4] bg-[#F7F2EC] text-[#7B6A5E]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-[#8B5A3C]" />
                    <span>Instant UPI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 px-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-semibold transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#3A2A20] bg-white text-[#2C1F18] shadow-xs ring-1 ring-[#3A2A20]'
                        : 'border-[#DDD2C4] bg-[#F7F2EC] text-[#7B6A5E]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#8B5A3C]" />
                    <span>Credit / Debit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-3 px-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-semibold transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#3A2A20] bg-white text-[#2C1F18] shadow-xs ring-1 ring-[#3A2A20]'
                        : 'border-[#DDD2C4] bg-[#F7F2EC] text-[#7B6A5E]'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-[#8B5A3C]" />
                    <span>Pay on Hand</span>
                  </button>
                </div>
              </div>

              {/* Order Review Box */}
              <div className="p-4 rounded-2xl bg-white border border-[#E9E0D4] text-xs space-y-1.5">
                <div className="flex justify-between text-[#6E5D50]">
                  <span>Items Total ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  <span className="tabular-nums">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Discount</span>
                    <span className="tabular-nums">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6E5D50]">
                  <span>Delivery Charge</span>
                  <span className="tabular-nums">
                    {orderType === 'pickup' || deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#2C1F18] pt-2 border-t border-[#F2ECE1]">
                  <span>Total Payable</span>
                  <span className="tabular-nums">
                    ₹{orderType === 'pickup' ? Math.max(0, subtotal - discount) : total}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#3A2A20] hover:bg-[#523C2E] disabled:bg-[#8A796D] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Securing Fresh Bake Ticket...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order (₹{orderType === 'pickup' ? Math.max(0, subtotal - discount) : total})</span>
                  </>
                )}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
