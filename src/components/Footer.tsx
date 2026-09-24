import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Instagram, Facebook, Youtube, MessageCircle, Heart, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { scrollToSection, addToast } = useBakery();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setIsSubscribed(true);
    addToast("You're on the list! 🍰", 'Expect secret tasting invitations & weekend specials.');
    setEmail('');
  };

  return (
    <footer className="bg-[#241913] text-[#EDE4DA] pt-16 pb-12 border-t border-[#3D2C22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#3E2D23]">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white block">
              Crème & Crust
            </span>
            <p className="text-xs sm:text-sm text-[#BBA999] leading-relaxed max-w-sm">
              An artisanal boulangerie & patisserie dedicated to old-world techniques, cultured French butter, and joyful gatherings.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#34241B] hover:bg-[#8B5A3C] text-[#E8D9CB] hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#34241B] hover:bg-[#8B5A3C] text-[#E8D9CB] hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-[#34241B] hover:bg-[#8B5A3C] text-[#E8D9CB] hover:text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-[#34241B] hover:bg-[#8B5A3C] text-[#E8D9CB] hover:text-white flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#BBA999]">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('menu')}
                  className="hover:text-white transition-colors"
                >
                  Menu & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('bestsellers')}
                  className="hover:text-white transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="hover:text-white transition-colors"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-xs text-[#BBA999]">
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-white transition-colors"
                >
                  Allergen Transparency
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-white transition-colors"
                >
                  Custom Cake Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <h4 className="font-serif text-base font-bold text-white mb-1">
              Get Fresh Updates
            </h4>
            <p className="text-xs text-[#BBA999] mb-4">
              Subscribe to receive weekly seasonal flavors, tasting room invitations, and exclusive discounts.
            </p>

            {isSubscribed ? (
              <div className="bg-[#302117] border border-[#523B2D] p-4 rounded-xl text-center flex items-center justify-center gap-2 text-xs font-semibold text-[#F2C288] animate-in zoom-in-95">
                <CheckCircle2 className="w-4 h-4 text-[#75B87E]" />
                <span>You're on the list! 🍰</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-[#1A120D] border border-[#422F24] text-white placeholder-[#8A7869] focus:outline-none focus:border-[#C4956C]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#C4956C] hover:bg-[#B3835B] text-[#241913] text-xs font-bold rounded-xl transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-[10px] text-[#8A796C]">
                  We bake treats, not spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E7C6E] gap-4">
          <p>© {new Date().getFullYear()} Crème & Crust Bakery. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#C45E50] fill-[#C45E50]" />
            <span>in our kitchen every dawn</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
