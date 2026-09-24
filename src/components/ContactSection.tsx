import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { addToast } = useBakery();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast('Message Sent! ✉️', 'Thank you for reaching out. We will get back to you shortly.');
      setForm({ name: '', email: '', message: '' });
    }, 700);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F8F4EE] border-t border-[#EAE0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#8B5A3C] font-semibold">
            We Would Love To Hear From You
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2C1F18] font-bold tracking-tight mt-1">
            Visit Our Bakery
          </h2>
          <p className="text-sm text-[#6E5A4D] mt-2">
            Have a custom celebration cake inquiry, event catering request, or just want to say hi? Stop by or drop us a note.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Contact Cards & Hours & Embedded-Style Map */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quick Details Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E0D4] shadow-xs space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#F6EDE2] text-[#8B5A3C] flex items-center justify-center shrink-0 shadow-inner">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#2C1F18]">Our Atelier Location</h4>
                  <p className="text-xs sm:text-sm text-[#6A594D] mt-0.5">
                    24 Baker Street, Downtown District, Mumbai 400001
                  </p>
                  <p className="text-xs text-[#8B5A3C] mt-1 font-medium">Near Central Garden Fountain</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#F6EDE2] text-[#8B5A3C] flex items-center justify-center shrink-0 shadow-inner">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#2C1F18]">Call / WhatsApp</h4>
                  <a
                    href="tel:+919876543210"
                    className="text-xs sm:text-sm text-[#6A594D] hover:text-[#8B5A3C] transition-colors mt-0.5 block"
                  >
                    +91 98765 43210
                  </a>
                  <span className="text-[11px] text-[#8A796D]">Instant pre-orders & party catering</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#F6EDE2] text-[#8B5A3C] flex items-center justify-center shrink-0 shadow-inner">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#2C1F18]">Email Us</h4>
                  <a
                    href="mailto:hello@cremeandcrust.com"
                    className="text-xs sm:text-sm text-[#6A594D] hover:text-[#8B5A3C] transition-colors mt-0.5 block"
                  >
                    hello@cremeandcrust.com
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="pt-6 border-t border-[#F2ECE1]">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-[#8B5A3C]" />
                  <h4 className="font-serif text-sm font-bold text-[#2C1F18] uppercase tracking-wider">
                    Opening Hours
                  </h4>
                </div>
                <div className="space-y-1.5 text-xs text-[#635246]">
                  <div className="flex justify-between py-1 border-b border-[#F7F2EB]">
                    <span className="font-medium text-[#2C1F18]">Monday – Friday</span>
                    <span className="tabular-nums">8:00 AM – 9:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium text-[#2C1F18]">Saturday – Sunday</span>
                    <span className="tabular-nums">9:00 AM – 10:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded-Style Map Section */}
            <div className="relative rounded-3xl overflow-hidden border border-[#E9E0D4] bg-[#EFE9E0] h-56 shadow-xs flex flex-col justify-end p-5">
              {/* Stylized vector map aesthetic background */}
              <div className="absolute inset-0 bg-[#E8E2D8] opacity-80 pointer-events-none">
                <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#BAAA9C" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <path d="M-50,120 Q180,40 400,160 T900,90" fill="none" stroke="#FFFFFF" strokeWidth="12" />
                  <path d="M120,-30 L220,300" fill="none" stroke="#F5EDE4" strokeWidth="16" />
                </svg>
              </div>

              {/* Map Marker Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#3A2A20] text-white flex items-center justify-center shadow-2xl border-2 border-white animate-bounce duration-1000">
                  <MapPin className="w-5 h-5 text-[#F2C288]" />
                </div>
                <div className="mt-1 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-bold text-[#2C1F18] shadow-md border border-[#E2D6C6]">
                  Crème & Crust
                </div>
              </div>

              {/* Bottom bar on map */}
              <div className="relative z-10 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-white/40 flex items-center justify-between text-xs text-[#4A392D]">
                <span>24 Baker Street, Downtown</span>
                <span className="text-[#8B5A3C] font-semibold">Open Now · Closes 9 PM</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E0D4] shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-[#2C1F18] mb-2">
                Send Us a Note
              </h3>
              <p className="text-xs sm:text-sm text-[#6C5B4F] mb-6">
                Have questions about custom wedding cakes, bulk gifts, or dietary preferences? Leave a message below.
              </p>

              {isSubmitted ? (
                <div className="p-8 text-center bg-[#F7FBF7] border border-[#D5EAD6] rounded-2xl animate-in zoom-in-95 duration-200">
                  <CheckCircle2 className="w-12 h-12 text-[#2E7D32] mx-auto mb-3" />
                  <h4 className="font-serif text-xl font-bold text-[#2C1F18]">
                    Message Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5B6D5C] mt-2">
                    Thank you for reaching out to Crème & Crust. A member of our bakehouse team will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 px-5 py-2 text-xs font-semibold bg-[#3A2A20] text-white rounded-full hover:bg-[#523C2E] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#4E3D31] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Kapoor"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#FBF9F5] border border-[#DDD0C2] text-[#2C1F18] focus:outline-none focus:border-[#8B5A3C] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4E3D31] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ananya@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#FBF9F5] border border-[#DDD0C2] text-[#2C1F18] focus:outline-none focus:border-[#8B5A3C] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4E3D31] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your celebration, order inquiry, or feedback..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#FBF9F5] border border-[#DDD0C2] text-[#2C1F18] focus:outline-none focus:border-[#8B5A3C] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#3A2A20] hover:bg-[#523C2E] disabled:bg-[#7D6B5E] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
