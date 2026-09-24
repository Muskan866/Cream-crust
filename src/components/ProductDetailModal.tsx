import React, { useState, useEffect } from 'react';
import { useBakery } from '../context/BakeryContext';
import { ImageWithFallback } from './ImageWithFallback';
import { Star, Heart, X, Plus, Minus, Check, ShieldCheck, Clock } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
  } = useBakery();

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setIsAdded(false);
  }, [selectedProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
      }
    };
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct, setSelectedProduct]);

  if (!selectedProduct) return null;

  const isFavorite = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setSelectedProduct(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#ECE2D6] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#5A483D] hover:text-[#2C1F18] hover:bg-white shadow-md transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image Side */}
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-[#F5EFE8] min-h-[260px]">
            <ImageWithFallback
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
              fallbackTitle={selectedProduct.name}
            />

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-[#3A2A20]/90 backdrop-blur-xs text-[#F8F3ED] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                {selectedProduct.category}
              </span>
              {selectedProduct.badge && (
                <span className="bg-[#8B5A3C] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                  {selectedProduct.badge}
                </span>
              )}
            </div>

            {/* Favorite button */}
            <button
              onClick={() => toggleWishlist(selectedProduct)}
              className="absolute bottom-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#5A483D] hover:text-[#C04838] shadow-md transition-colors"
              aria-label="Toggle wishlist"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-[#C04838] text-[#C04838]' : ''
                }`}
              />
            </button>
          </div>

          {/* Details Content Side */}
          <div className="p-6 sm:p-7 flex flex-col justify-between">
            <div>
              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 text-[#2C1F18] font-bold text-sm bg-[#F6EDE2] px-2 py-0.5 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-[#D99A26] text-[#D99A26]" />
                  <span>{selectedProduct.rating}</span>
                </div>
                <span className="text-xs text-[#8A786B]">
                  ({selectedProduct.reviewsCount} customer ratings)
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1F18] leading-tight">
                {selectedProduct.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#2C1F18] tabular-nums">
                  ₹{selectedProduct.price}
                </span>
                <span className="text-xs text-[#8A796D]">Inclusive of all taxes</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5C4A3E] mt-3 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Ingredients */}
              <div className="mt-5 pt-4 border-t border-[#F0E6D8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B5A3C] mb-2">
                  Key Artisanal Ingredients
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-[#F7F2EC] text-[#554338] px-2.5 py-1 rounded-md border border-[#EAE0D4]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Freshness Badge */}
              <div className="mt-4 flex items-center gap-3 text-xs text-[#6B5A4E]">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8B5A3C]" />
                  <span>{selectedProduct.prepTime || 'Baked Fresh Daily'}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4E7D52]" />
                  <span>100% Real Butter</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-5 border-t border-[#F0E6D8] flex flex-col sm:flex-row items-center gap-3">
              
              {/* Quantity Selector: − 1 + */}
              <div className="flex items-center justify-between border border-[#D8CABE] rounded-xl px-3 py-1.5 w-full sm:w-auto bg-[#FDFBF7]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-7 h-7 flex items-center justify-center text-[#5C4A3E] hover:text-[#2C1F18] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-serif font-bold text-base text-[#2C1F18] px-4 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center text-[#5C4A3E] hover:text-[#2C1F18] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 w-full py-3 px-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
                  isAdded
                    ? 'bg-[#4E7D52] text-white'
                    : 'bg-[#3A2A20] hover:bg-[#4E392C] text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 animate-in zoom-in" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Cart (₹{selectedProduct.price * quantity})</span>
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
