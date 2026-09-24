import React from 'react';
import bakerImg from '../assets/images/bakery_story_baker_1790261950995.jpg';
import bakeryInteriorImg from '../assets/images/bakery_interior_cafe_1790262747306.jpg';
import { ImageWithFallback } from './ImageWithFallback';
import { Heart, Award, Sparkles, Coffee } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const stats = [
    { value: '10+', label: 'Years of Baking', subtext: 'Established 2016' },
    { value: '50K+', label: 'Happy Customers', subtext: 'Across the city' },
    { value: '100+', label: 'Fresh Products', subtext: 'Rotated seasonally' },
    { value: '4.9★', label: 'Customer Rating', subtext: 'Over 12,000+ reviews' },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Side: Layered images */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image: Chef/Baker in atelier */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-[4/3] sm:aspect-[1/1]">
                <ImageWithFallback
                  src={bakerImg}
                  alt="Pastry Chef Julian dusting flour over artisan sourdough"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  fallbackTitle="Master Baker in Atelier"
                />
              </div>

              {/* Secondary Floating Card: Bakery interior preview */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 w-48 sm:w-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white hidden sm:block">
                <div className="aspect-[4/3]">
                  <ImageWithFallback
                    src={bakeryInteriorImg}
                    alt="Warm bakery dining room"
                    className="w-full h-full object-cover"
                    fallbackTitle="Cozy Atelier Interior"
                  />
                </div>
                <div className="p-2.5 bg-white text-left">
                  <p className="font-serif text-xs font-bold text-[#2C1F18]">24 Baker Street</p>
                  <p className="text-[10px] text-[#8B5A3C]">Atelier & Tasting Salon</p>
                </div>
              </div>

              {/* Floating Quote Stamp */}
              <div className="absolute -top-4 -left-4 bg-[#3A2A20] text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-2 max-w-[200px]">
                <Heart className="w-5 h-5 text-[#E5A88B] shrink-0" />
                <span className="text-[11px] font-serif leading-tight">
                  "Every crumb baked with pure French butter & passion."
                </span>
              </div>

            </div>
          </div>

          {/* Story Side */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-xs uppercase tracking-widest text-[#8B5A3C] font-semibold mb-2">
              Our Journey & Philosophy
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2C1F18] font-bold tracking-tight mb-6 leading-tight">
              Made With Love, <br />
              <span className="font-normal italic text-[#8B5A3C] font-editorial">
                Served With Joy.
              </span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#5E4C40] leading-relaxed">
              <p>
                Crème & Crust started with a simple idea — that freshly baked food can turn an ordinary day into a special one. From buttery croissants to celebration cakes, every item is prepared in small batches using quality ingredients.
              </p>
              <p>
                We source our butter from Normandy, our cocoa exclusively from Belgian master roasters, and our wheat from heritage slow-grown farms. We believe in letting yeast rise at its natural tempo, yielding unmatched honeycomb textures and aromas that make you pause.
              </p>
            </div>

            {/* Small Statistics Grid with Animated Appearance */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#EAE1D5] w-full">
              {stats.map((st, i) => (
                <div key={i} className="text-left">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1F18] tracking-tight tabular-nums block">
                    {st.value}
                  </span>
                  <span className="text-xs font-semibold text-[#5A483D] block mt-0.5">
                    {st.label}
                  </span>
                  <span className="text-[10px] text-[#8C7A6E] block mt-0.5">
                    {st.subtext}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F3EBE1] flex items-center justify-center">
                <Coffee className="w-5 h-5 text-[#8B5A3C]" />
              </div>
              <p className="text-xs text-[#7A685A] font-serif italic">
                Come for the warm croissants, stay for the cozy conversations.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
