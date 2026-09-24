/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BakeryProvider } from './context/BakeryContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { BestSellers } from './components/BestSellers';
import { MenuSection } from './components/MenuSection';
import { SpecialOffer } from './components/SpecialOffer';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GallerySection } from './components/GallerySection';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramSection } from './components/InstagramSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/ToastContainer';

export default function App() {
  return (
    <BakeryProvider>
      <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2C1F18] selection:bg-[#E8D8C8] selection:text-[#3C2A21]">
        {/* Sticky Header */}
        <Navbar />

        {/* Main Landing Flow */}
        <main className="flex-1">
          <Hero />
          <CategorySection />
          <BestSellers />
          <MenuSection />
          <SpecialOffer />
          <AboutSection />
          <WhyChooseUs />
          <GallerySection />
          <CustomerReviews />
          <InstagramSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Overlays & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
        <ToastContainer />
      </div>
    </BakeryProvider>
  );
}
