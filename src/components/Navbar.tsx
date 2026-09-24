import React, { useState, useEffect } from 'react';
import { useBakery } from '../context/BakeryContext';
import { ShoppingBag, Search, Menu as MenuIcon, X, Heart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    scrollToSection,
    searchQuery,
    setSearchQuery,
    wishlist,
  } = useBakery();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Menu', id: 'menu' },
    { label: 'About', id: 'about' },
    { label: 'Best Sellers', id: 'bestsellers' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scrollToSection('menu');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-sm border-b border-[#EFE8DC] py-3.5'
            : 'bg-[#FDFBF7] py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Zone 1: Brand Wordmark */}
            <button
              onClick={() => handleNavClick('hero')}
              className="group text-left focus-visible:outline-none"
            >
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#3A2A20] group-hover:text-[#8B5A3C] transition-colors whitespace-nowrap">
                Crème & Crust
              </span>
            </button>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-sm font-medium text-[#5C493D] hover:text-[#281D17] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#8B5A3C] hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Zone 3: Actions (Search, Wishlist, Cart, Order Now) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Toggle / Form */}
              <div className="relative">
                {showSearchInput ? (
                  <form
                    onSubmit={handleSearchSubmit}
                    className="flex items-center bg-white border border-[#DDD2C4] rounded-full px-3 py-1.5 shadow-sm text-sm focus-within:border-[#8B5A3C] transition-all w-48 sm:w-64 animate-in fade-in zoom-in-95 duration-200"
                  >
                    <Search className="w-4 h-4 text-[#8B6B55] shrink-0 mr-2" />
                    <input
                      type="text"
                      placeholder="Search cakes, breads..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="bg-transparent border-none outline-none w-full text-xs sm:text-sm text-[#3A2A20] placeholder-[#A49488]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSearchInput(false)}
                      className="text-[#99887A] hover:text-[#3A2A20] ml-1 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => {
                      setShowSearchInput(true);
                      scrollToSection('menu');
                    }}
                    aria-label="Search pastries"
                    className="p-2 text-[#5C493D] hover:text-[#281D17] hover:bg-[#F2ECE1] rounded-full transition-colors"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Wishlist indicator (when items saved) */}
              {wishlist.length > 0 && (
                <button
                  onClick={() => scrollToSection('menu')}
                  title={`${wishlist.length} saved favorites`}
                  className="p-2 text-[#8B5A3C] hover:bg-[#F2ECE1] rounded-full transition-colors relative hidden sm:flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 fill-[#8B5A3C] text-[#8B5A3C]" />
                  <span className="absolute -top-0.5 -right-0.5 bg-[#8B5A3C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                </button>
              )}

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping Cart"
                className="relative p-2 text-[#5C493D] hover:text-[#281D17] hover:bg-[#F2ECE1] rounded-full transition-colors flex items-center justify-center"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#8B5A3C] text-white text-[11px] font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center shadow-sm animate-bounce duration-300">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Order Now CTA */}
              <button
                onClick={() => {
                  if (cartCount > 0) {
                    setIsCartOpen(true);
                  } else {
                    scrollToSection('menu');
                  }
                }}
                className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold tracking-wide text-white bg-[#3A2A20] hover:bg-[#523C2E] active:scale-[0.98] rounded-full shadow-sm hover:shadow transition-all whitespace-nowrap"
              >
                Order Now
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 text-[#5C493D] hover:text-[#281D17] hover:bg-[#F2ECE1] rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-[69px] inset-x-0 bg-[#FDFBF7] border-b border-[#E8DFC8] shadow-2xl p-6 transition-all duration-300 animate-in slide-in-from-top-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-left text-base font-medium text-[#4A3B32] hover:text-[#8B5A3C] py-2 border-b border-[#F0E8DC] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (cartCount > 0) {
                      setIsCartOpen(true);
                    } else {
                      scrollToSection('menu');
                    }
                  }}
                  className="w-full py-3 text-center text-sm font-semibold text-white bg-[#3A2A20] hover:bg-[#523C2E] rounded-xl shadow-md transition-colors"
                >
                  Order Now {cartCount > 0 ? `(${cartCount} in Bag)` : ''}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
