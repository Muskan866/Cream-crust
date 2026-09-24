import React, { useState, useMemo } from 'react';
import { useBakery } from '../context/BakeryContext';
import { PRODUCTS, Product } from '../data/bakeryData';
import { ImageWithFallback } from './ImageWithFallback';
import { Star, Heart, Plus, Check, Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

const MENU_CATEGORIES = [
  'All',
  'Cakes',
  'Pastries',
  'Cupcakes',
  'Cookies',
  'Breads',
  'Desserts',
  'Beverages',
];

export const MenuSection: React.FC = () => {
  const {
    addToCart,
    isInWishlist,
    toggleWishlist,
    setSelectedProduct,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
  } = useBakery();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // default featured
    });
  }, [activeCategory, searchQuery, sortBy]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setAnimatingId(product.id);
    addToCart(product, 1);
    setTimeout(() => {
      setAnimatingId(null);
    }, 700);
  };

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#FBF9F5] border-t border-[#EFE8DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-widest text-[#8B5A3C] font-semibold">
            Fresh From The Bakehouse
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2C1F18] font-bold tracking-tight mt-1">
            Explore Our Full Menu
          </h2>
          <p className="text-sm sm:text-base text-[#6E5A4D] mt-3">
            Every morning at 5:00 AM, our bakers fire up the hearth ovens. Browse our complete menu of artisan cakes, pastries, sourdoughs, and beverages.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E9E0D4] shadow-xs mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#3A2A20] text-white shadow-xs'
                    : 'bg-[#F6EFE6] text-[#5A483D] hover:bg-[#EFE5D8] hover:text-[#2C1F18]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-[#8B6B55] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl bg-[#FBF8F3] border border-[#E0D5C7] text-[#2C1F18] placeholder-[#9D8E81] focus:outline-none focus:border-[#8B5A3C] transition-colors"
              />
            </div>

            {/* Sort Select */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none pl-8 pr-8 py-1.5 text-xs sm:text-sm rounded-xl bg-[#FBF8F3] border border-[#E0D5C7] text-[#2C1F18] font-medium focus:outline-none focus:border-[#8B5A3C] cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B6B55] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#8B6B55]">▾</span>
            </div>
          </div>

        </div>

        {/* Results Counter & Active Filter Badge */}
        <div className="flex items-center justify-between text-xs text-[#7B6A5E] mb-6 px-1">
          <span>
            Showing <strong className="text-[#2C1F18]">{filteredProducts.length}</strong> delicious items
            {activeCategory !== 'All' && ` in "${activeCategory}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(activeCategory !== 'All' || searchQuery || sortBy !== 'featured') && (
            <button
              onClick={handleResetFilters}
              className="text-[#8B5A3C] hover:text-[#2C1F18] font-medium flex items-center gap-1 hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isFavorite = isInWishlist(product.id);
              const isAdded = animatingId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#ECE2D6] shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F2EC]">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      fallbackTitle={product.name}
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-[#3A2A20]/90 backdrop-blur-xs text-[#F8F3ED] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      aria-label="Add to favorites"
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#5A483D] hover:text-[#C04838] hover:bg-white shadow-xs transition-colors"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isFavorite ? 'fill-[#C04838] text-[#C04838]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#7B6A5E] mb-1">
                        <span className="font-semibold text-[#8B5A3C] uppercase tracking-wider">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-[#2C1F18] font-medium">
                          <Star className="w-3 h-3 fill-[#D99A26] text-[#D99A26]" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-base font-bold text-[#2C1F18] group-hover:text-[#8B5A3C] transition-colors leading-snug line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#6A5A4E] mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price & Add */}
                    <div className="pt-3 mt-3 border-t border-[#F2ECE1] flex items-center justify-between">
                      <span className="font-serif text-lg font-bold text-[#2C1F18] tabular-nums">
                        ₹{product.price}
                      </span>

                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs transition-all active:scale-95 ${
                          isAdded
                            ? 'bg-[#4E7D52] text-white'
                            : 'bg-[#3A2A20] text-white hover:bg-[#523C2E]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E9E0D4] max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F6EDE2] mx-auto flex items-center justify-center text-2xl mb-4">
              🔍
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2C1F18]">No bakes found</h3>
            <p className="text-xs sm:text-sm text-[#736357] mt-2 mb-6">
              We couldn't find any treats matching your search or filters. Try adjusting your query or browse our full collection.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#3A2A20] text-white text-xs font-semibold rounded-full hover:bg-[#523C2E] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
