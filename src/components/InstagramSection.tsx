import React from 'react';
import { INSTAGRAM_POSTS } from '../data/bakeryData';
import { ImageWithFallback } from './ImageWithFallback';
import { Instagram, Heart } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-[#FDFBF7] border-t border-[#ECE2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#8B5A3C] font-semibold mb-2">
            <Instagram className="w-3.5 h-3.5" />
            <span>Follow Along</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C1F18] font-bold tracking-tight">
            Sweet Moments @cremeandcrust
          </h2>
          <p className="text-xs sm:text-sm text-[#736254] mt-2">
            Tag us in your morning pastry rituals & cake celebrations to get featured.
          </p>
        </div>

        {/* 6 Image Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F5EFE8] border border-[#EAE0D4] block shadow-2xs"
            >
              <ImageWithFallback
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                fallbackTitle="Bakery Instagram"
              />

              {/* Instagram Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-white text-center">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-2">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-white mb-1">
                  <Heart className="w-3 h-3 fill-white" />
                  <span>{post.likes}</span>
                </div>
                <p className="text-[10px] text-[#F3E6D7] line-clamp-2 leading-tight">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
