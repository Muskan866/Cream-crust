import React, { useState, useEffect } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Sparkles, Gift, ArrowRight } from 'lucide-react';
import bakeryInteriorImg from '../assets/images/bakery_interior_cafe_1790262747306.jpg';

export const SpecialOffer: React.FC = () => {
  const { applyCoupon, scrollToSection, addToast } = useBakery();

  // Target countdown: 2 days, 14 hours, 36 minutes, 22 seconds from now
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const handleClaimOffer = () => {
    applyCoupon('WELCOME15');
    addToast('15% OFF Unlocked! 🎉', 'Code WELCOME15 applied to your bag.');
    scrollToSection('menu');
  };

  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-[#241913] text-[#FDFBF7]">
      {/* Bakery photographic background with elegant dark contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={bakeryInteriorImg}
          alt="Bakery background"
          className="w-full h-full object-cover object-center filter brightness-[0.22] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F140E] via-[#241913]/70 to-[#1F140E]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A3528] text-[#E8D4C0] text-xs font-semibold uppercase tracking-wider mb-6 border border-[#644B3A]">
          <Gift className="w-3.5 h-3.5 text-[#F2C288]" />
          <span>Limited Time Welcome Treat</span>
        </div>

        {/* Heading & Subheading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          A Little More Sweetness
        </h2>
        <p className="text-base sm:text-xl text-[#DFCEBE] max-w-xl mx-auto mb-8 font-light">
          Get <span className="font-semibold text-white underline decoration-[#C29267] decoration-2 underline-offset-4">15% OFF</span> your first order. Use code <strong className="text-[#F2C288] font-mono tracking-wider">WELCOME15</strong> at checkout.
        </p>

        {/* Real Ticking Countdown Timer */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 my-8">
          <div className="flex flex-col items-center bg-[#3D2C22] border border-[#5A4334] rounded-2xl px-3 sm:px-5 py-3 min-w-[64px] sm:min-w-[80px] shadow-lg">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-white tabular-nums">
              {formatNumber(timeLeft.days)}
            </span>
            <span className="text-[10px] sm:text-xs text-[#B9A696] uppercase tracking-wider mt-1">Days</span>
          </div>

          <span className="text-xl sm:text-3xl font-serif text-[#C29267] font-bold">:</span>

          <div className="flex flex-col items-center bg-[#3D2C22] border border-[#5A4334] rounded-2xl px-3 sm:px-5 py-3 min-w-[64px] sm:min-w-[80px] shadow-lg">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-white tabular-nums">
              {formatNumber(timeLeft.hours)}
            </span>
            <span className="text-[10px] sm:text-xs text-[#B9A696] uppercase tracking-wider mt-1">Hours</span>
          </div>

          <span className="text-xl sm:text-3xl font-serif text-[#C29267] font-bold">:</span>

          <div className="flex flex-col items-center bg-[#3D2C22] border border-[#5A4334] rounded-2xl px-3 sm:px-5 py-3 min-w-[64px] sm:min-w-[80px] shadow-lg">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-white tabular-nums">
              {formatNumber(timeLeft.minutes)}
            </span>
            <span className="text-[10px] sm:text-xs text-[#B9A696] uppercase tracking-wider mt-1">Mins</span>
          </div>

          <span className="text-xl sm:text-3xl font-serif text-[#C29267] font-bold">:</span>

          <div className="flex flex-col items-center bg-[#3D2C22] border border-[#5A4334] rounded-2xl px-3 sm:px-5 py-3 min-w-[64px] sm:min-w-[80px] shadow-lg">
            <span className="font-serif text-2xl sm:text-4xl font-bold text-[#F2C288] tabular-nums">
              {formatNumber(timeLeft.seconds)}
            </span>
            <span className="text-[10px] sm:text-xs text-[#B9A696] uppercase tracking-wider mt-1">Secs</span>
          </div>
        </div>

        {/* Claim Offer CTA Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleClaimOffer}
            className="px-8 py-4 bg-[#F2C288] hover:bg-[#E5B57A] text-[#2C1F18] font-bold text-sm sm:text-base rounded-full shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] flex items-center gap-2 group"
          >
            <span>Claim Offer Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-xs text-[#A89686] mt-4">
          *Applicable for all fresh baked cakes, pastry boxes, breads and viennoiseries on first order.
        </p>

      </div>
    </section>
  );
};
