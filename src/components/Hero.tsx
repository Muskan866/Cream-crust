import React from 'react';
import { useBakery } from '../context/BakeryContext';
import heroImg from '../assets/images/hero_artisan_spread_1790261910143.jpg';
import { ImageWithFallback } from './ImageWithFallback';
import { Sparkles, ArrowRight, Wheat, Clock, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollToSection, setIsCartOpen, cartCount } = useBakery();

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-16 md:py-20 lg:py-24">
      {/* Subtle warm ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F5E6D3]/40 to-[#EFE1D1]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start z-10">
            {/* Small text kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE5D8] text-[#715440] text-xs font-semibold tracking-wider uppercase mb-5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5A3C]" />
              <span>Baked Fresh Every Day</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] text-[#2C1F18] font-bold leading-[1.12] tracking-tight mb-6">
              Sweet Moments, <br />
              <span className="italic font-normal text-[#8B5A3C] font-editorial">
                Freshly Baked.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#5A483D] leading-relaxed max-w-xl mb-8 font-normal">
              Handcrafted cakes, pastries, breads and desserts made with premium ingredients and a whole lot of love.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection('menu')}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#3A2A20] hover:bg-[#4E392C] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  if (cartCount > 0) {
                    setIsCartOpen(true);
                  } else {
                    scrollToSection('bestsellers');
                  }
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-[#F5EFE6] text-[#3A2A20] border border-[#DDD2C4] text-sm font-semibold rounded-full shadow-2xs hover:shadow transition-all active:scale-[0.98] flex items-center justify-center"
              >
                Order Now
              </button>
            </div>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-10 mt-8 border-t border-[#EAE1D5] w-full max-w-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F4EDE2] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#8B5A3C]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#2C1F18]">6:00 AM</p>
                  <p className="text-[11px] text-[#7B6A5E]">First Batch</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F4EDE2] flex items-center justify-center shrink-0">
                  <Wheat className="w-4 h-4 text-[#8B5A3C]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#2C1F18]">100% Pure</p>
                  <p className="text-[11px] text-[#7B6A5E]">Real Butter</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F4EDE2] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-[#8B5A3C]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#2C1F18]">4.9★ Stars</p>
                  <p className="text-[11px] text-[#7B6A5E]">Over 50k Fans</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with Floating Decorative Elements */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Main Visual Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-[4/3] sm:aspect-[16/11]">
                <ImageWithFallback
                  src={heroImg}
                  alt="Artisanal croissants, chocolate cakes, and pastries spread"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  fallbackTitle="Artisanal Bakery Spread"
                />
                
                {/* Soft gradient bottom scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 hidden sm:block">
                  <p className="text-xs font-medium tracking-wide uppercase text-[#F3E5D4]">Handcrafted Daily In Small Batches</p>
                  <p className="text-sm font-serif font-light text-white">From slow-fermented boules to delicate Parisian viennoiseries.</p>
                </div>
              </div>

              {/* Floating Badge 1: Freshly Baked */}
              <div className="absolute -top-4 -left-3 sm:-top-5 sm:-left-5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#EBE2D5] flex items-center gap-3 animate-float duration-300">
                <div className="w-9 h-9 rounded-xl bg-[#F6EDE2] flex items-center justify-center text-lg shadow-inner">
                  🥐
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2C1F18] leading-tight">Freshly Baked</p>
                  <p className="text-[10px] text-[#8B5A3C] font-medium">Warm From The Oven</p>
                </div>
              </div>

              {/* Floating Badge 2: 100% Handmade */}
              <div className="absolute -bottom-4 -right-3 sm:-bottom-5 sm:-right-5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#EBE2D5] flex items-center gap-3 animate-float-delayed duration-300">
                <div className="w-9 h-9 rounded-xl bg-[#F6EDE2] flex items-center justify-center text-lg shadow-inner">
                  ❤️
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2C1F18] leading-tight">100% Handmade</p>
                  <p className="text-[10px] text-[#8B5A3C] font-medium">No Artificial Additives</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
