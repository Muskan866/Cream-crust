import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { CATEGORIES } from '../data/bakeryData';
import { ImageWithFallback } from './ImageWithFallback';
import { ArrowUpRight } from 'lucide-react';

export const CategorySection: React.FC = () => {
  const { setActiveCategory, scrollToSection } = useBakery();

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    scrollToSection('menu');
  };

  return (
    <section id="categories" className="py-16 md:py-20 bg-[#F8F4EE]/60 border-y border-[#EFE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <p className="text-xs uppercase tracking-widest text-[#8B5A3C] font-semibold mb-2">
            Curated Artisanal Collections
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C1F18] font-bold tracking-tight">
            What Are You Craving?
          </h2>
          <p className="text-sm sm:text-base text-[#6E5A4D] mt-3">
            Choose from freshly pulled espresso, layered celebration cakes, crisp viennoiseries, or rustic sourdough.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="group text-left bg-white rounded-2xl p-3 sm:p-4 border border-[#EAE0D2] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5A3C]"
            >
              {/* Category Image */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-[#F4EFEA]">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  fallbackTitle={cat.name}
                />
                <div className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-white/90 backdrop-blur-xs flex items-center justify-center text-sm shadow-xs">
                  {cat.icon}
                </div>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-2">
                  <div className="w-6 h-6 rounded-full bg-white text-[#2C1F18] flex items-center justify-center shadow-sm">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Title & Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#2C1F18] group-hover:text-[#8B5A3C] transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#7A695C] mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#F2ECE1] flex items-center justify-between text-[11px] text-[#8B5A3C] font-medium">
                  <span>{cat.count}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">Explore →</span>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
