import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { PRODUCTS, Product } from '../data/bakeryData';
import { ImageWithFallback } from './ImageWithFallback';
import { Star, Heart, Plus, Check } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const { addToCart, isInWishlist, toggleWishlist, setSelectedProduct } = useBakery();
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setAnimatingId(product.id);
    addToCart(product, 1);
    setTimeout(() => {
      setAnimatingId(null);
    }, 700);
  };

  return (
    <section id="bestsellers" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8B5A3C] font-semibold">
              Most Loved Creations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2C1F18] font-bold tracking-tight mt-1">
              Our Best Sellers
            </h2>
          </div>
          <p className="text-sm text-[#6E5A4D] max-w-md">
            Our most requested artisanal treats, hand-layered with pure butter, single-origin chocolate, and uncompromised technique.
          </p>
        </div>

        {/* 6 Best Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bestSellers.map((product) => {
            const isFavorite = isInWishlist(product.id);
            const isAdded = animatingId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#EAE1D4] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5EFE8]">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    fallbackTitle={product.name}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {product.badge && (
                      <span className="bg-[#3A2A20]/90 backdrop-blur-xs text-[#F8F3ED] text-[11px] font-medium px-2.5 py-1 rounded-full shadow-xs">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    aria-label="Add to favorites"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#5A483D] hover:text-[#C04838] hover:bg-white shadow-xs transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFavorite ? 'fill-[#C04838] text-[#C04838]' : ''
                      }`}
                    />
                  </button>

                  {/* Subtle Quick View hover overlay */}
                  <div className="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity text-center text-xs text-white font-medium">
                    Click to view ingredients & details
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating & Category */}
                    <div className="flex items-center justify-between text-xs text-[#7B6A5E] mb-1.5">
                      <span className="font-medium text-[#8B5A3C] uppercase tracking-wider text-[11px]">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-[#2C1F18] font-semibold">
                        <Star className="w-3.5 h-3.5 fill-[#D99A26] text-[#D99A26]" />
                        <span>{product.rating}</span>
                        <span className="text-[#99877A] font-normal">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2C1F18] group-hover:text-[#8B5A3C] transition-colors leading-snug">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#635246] mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-4 mt-4 border-t border-[#F2ECE1] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#8A796D] block leading-none">Price</span>
                      <span className="font-serif text-xl sm:text-2xl font-bold text-[#2C1F18] tabular-nums">
                        ₹{product.price}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 ${
                        isAdded
                          ? 'bg-[#4E7D52] text-white scale-105'
                          : 'bg-[#3A2A20] text-white hover:bg-[#523C2E]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 animate-in zoom-in" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
