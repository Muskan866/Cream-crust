import React from 'react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: '🥖',
      title: 'Fresh Every Day',
      description: 'Everything is baked fresh in small batches at dawn and hourly throughout the day.',
      accent: '#EFE3D5',
    },
    {
      icon: '❤️',
      title: 'Made With Love',
      description: 'Handcrafted with attention to every detail by passionate master pastry chefs.',
      accent: '#F5E4E0',
    },
    {
      icon: '🌾',
      title: 'Premium Ingredients',
      description: 'Quality ingredients in every recipe: Normandy butter, Valrhona cocoa, and organic grains.',
      accent: '#EBE9D8',
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Fresh treats delivered to your doorstep in temperature-controlled, elegant packaging.',
      accent: '#E5EBF2',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#F9F5EF] border-t border-[#ECE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs uppercase tracking-widest text-[#8B5A3C] font-semibold">
            The Crème & Crust Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C1F18] font-bold tracking-tight mt-1">
            Why Choose Us
          </h2>
          <p className="text-sm text-[#6E5A4D] mt-2">
            No preservatives, no shortcuts, just pure culinary devotion in every single bite.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 border border-[#EAE0D2] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-inner group-hover:scale-110 transition-transform duration-300 bg-[#F6EDE2]">
                {item.icon}
              </div>

              <h3 className="font-serif text-lg font-bold text-[#2C1F18] group-hover:text-[#8B5A3C] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#6C5B4F] mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
