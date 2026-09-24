import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/bakeryData';
import { ImageWithFallback } from './ImageWithFallback';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null
    );
  }, [activeLightboxIndex]);

  const handlePrev = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null
    );
  }, [activeLightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    if (activeLightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLightboxIndex, handleNext, handlePrev]);

  const currentItem: GalleryItem | null =
    activeLightboxIndex !== null ? GALLERY_ITEMS[activeLightboxIndex] : null;

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#8B5A3C] font-semibold">
            Visual Storytelling
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2C1F18] font-bold tracking-tight mt-1">
            The Bakery Gallery
          </h2>
          <p className="text-sm text-[#6E5A4D] mt-2">
            A peek behind the flour-dusted counter, golden crusts, and warm morning light in our atelier.
          </p>
        </div>

        {/* Gallery Grid (responsive 1-2-3-4 columns with alternating heights for masonry feeling) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {GALLERY_ITEMS.map((item, index) => {
            const isTall = index === 1 || index === 4 || index === 6;

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(index)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#F5EFE8] border border-[#EAE1D4] shadow-xs hover:shadow-xl transition-all duration-300 ${
                  isTall ? 'sm:row-span-2' : ''
                }`}
              >
                <div className={`w-full ${isTall ? 'h-72 sm:h-96' : 'h-64'} overflow-hidden`}>
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    fallbackTitle={item.title}
                  />
                </div>

                {/* Hover overlay with title & expand icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-[#F2DFCE] font-semibold mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-sm sm:text-base font-bold text-white leading-tight">
                    {item.title}
                  </h4>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-[#E6D4C3] line-clamp-1">
                      {item.description}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 ml-2">
                      <Maximize2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {currentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200">
          
          {/* Close button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shadow-lg"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Lightbox Main Image & Caption */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl max-h-[70vh] bg-black">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="mt-4 text-center text-white max-w-lg">
              <span className="text-xs uppercase tracking-widest text-[#F2C288] font-semibold">
                {currentItem.category} · {activeLightboxIndex! + 1} of {GALLERY_ITEMS.length}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1">
                {currentItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#D1C2B4] mt-1">
                {currentItem.description}
              </p>
            </div>
          </div>

        </div>
      )}
    </section>
  );
};
