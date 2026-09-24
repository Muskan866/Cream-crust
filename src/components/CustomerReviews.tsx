import React, { useState, useEffect } from 'react';
import { REVIEWS } from '../data/bakeryData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const CustomerReviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const current = REVIEWS[currentIndex];

  return (
    <section className="py-20 md:py-24 bg-[#FBF8F4] border-t border-[#ECE2D6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#8B5A3C] font-semibold">
            Testimonials & Love
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2C1F18] font-bold tracking-tight mt-1">
            What Our Customers Say
          </h2>
        </div>

        {/* Carousel Container */}
        <div
          className="relative bg-white rounded-3xl p-8 sm:p-12 border border-[#E9DFD2] shadow-xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute top-6 right-8 text-[#EFE5D8]">
            <Quote className="w-16 h-16 opacity-40" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            
            {/* 5 Stars */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#D99A26] text-[#D99A26]" />
              ))}
            </div>

            {/* Review Comment Quote */}
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-[#2C1F18] font-normal leading-relaxed italic min-h-[90px] flex items-center justify-center">
              "{current.comment}"
            </blockquote>

            {/* Customer Profile & Item */}
            <div className="mt-8 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#8B5A3C] shadow-sm mb-3 bg-[#EFE4D6] flex items-center justify-center text-[#5A3B28] font-serif font-bold text-lg">
                {current.name.charAt(0)}
              </div>

              <h4 className="font-serif text-base sm:text-lg font-bold text-[#2C1F18]">
                {current.name}
              </h4>
              <p className="text-xs text-[#8B5A3C] font-medium mt-0.5">
                Ordered: {current.item} · {current.date}
              </p>
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#F2ECE1]">
            {/* Prev button */}
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-[#DDD2C4] hover:bg-[#F6EDE2] text-[#4A3B32] transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination dots */}
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i
                      ? 'w-7 bg-[#8B5A3C]'
                      : 'w-2 bg-[#DDD2C4] hover:bg-[#A8988A]'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-[#DDD2C4] hover:bg-[#F6EDE2] text-[#4A3B32] transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
