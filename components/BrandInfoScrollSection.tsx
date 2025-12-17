"use client";

import React from "react";
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const BrandInfoScrollSection = () => {
  return (
    <section
      className="relative w-full bg-center bg-cover overflow-hidden py-20"
      style={{
        backgroundImage: "url('/image/slide1.jpg')",
        clipPath: "inset(0 0 0 0 round 5% 20% 0 10%)",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/20" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* GLASS CARD */}
        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* BRAND */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Betichrome Fashion Ltd.
          </h2>

          <p className="text-white/90 text-lg leading-relaxed max-w-3xl">
            Betichrome Fashion Ltd. provides elegant and lucrative outfit items
            sourced both locally & globally. Proudly made in Bangladesh with a
            commitment to quality and modern fashion.
          </p>

          {/* DIVIDER */}
          <div className="my-8 h-px w-full bg-white/20" />

          {/* SOCIAL LINKS */}
          <div className="flex gap-4 mb-8">
            {[FaInstagram, FaTwitter, FaYoutube, FaFacebook].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="p-3 rounded-full bg-white/10 border border-white/20 text-white text-xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                >
                  <Icon />
                </div>
              )
            )}
          </div>

          {/* CONTACT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
            <div>
              <p className="font-semibold mb-2">Contact</p>
              <p>📧 arifahmmadsumon@gmail.com</p>
              <p>📞 +880 1751-260010</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Address</p>
              <p>📍 E/815, Parbatipur, Dinajpur</p>
            </div>
          </div>

          {/* SECTIONS */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-3">
                Services & Help
              </h4>
              <ul className="space-y-2 text-white/80">
                <li>Customer Support</li>
                <li>Returns</li>
                <li>Delivery Info</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Menu</h4>
              <ul className="space-y-2 text-white/80">
                <li>Men</li>
                <li>Women</li>
                <li>Accessories</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE CURVE FIX */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            clip-path: polygon(0 6%, 100% 0%, 100% 94%, 0% 100%);
          }
        }
      `}</style>
    </section>
  );
};

export default BrandInfoScrollSection;
