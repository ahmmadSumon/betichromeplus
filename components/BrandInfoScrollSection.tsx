"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const BrandInfoScrollSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
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
        <div className={`backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"
        }`}>
          {/* BRAND */}
          <h2 className={`text-3xl md:text-4xl font-extrabold text-white mb-4 transition-all duration-800 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}>
            Betichrome Fashion Ltd.
          </h2>

          <p className={`text-white/90 text-lg leading-relaxed max-w-3xl transition-all duration-800 delay-400 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}>
            Betichrome Fashion Ltd. provides elegant and lucrative outfit items
            sourced both locally & globally. Proudly made in Bangladesh with a
            commitment to quality and modern fashion.
          </p>

          {/* DIVIDER */}
          <div className={`my-8 h-px w-full bg-white/20 transition-all duration-600 delay-600 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`} />

          {/* SOCIAL LINKS */}
          <div className={`flex gap-4 mb-8 transition-all duration-800 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <Link href="https://instagram.com" target="_blank">
              <div className="p-3 rounded-full bg-white/10 border border-white/20 text-white text-xl hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer">
                <FaInstagram />
              </div>
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <div className="p-3 rounded-full bg-white/10 border border-white/20 text-white text-xl hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer">
                <FaTwitter />
              </div>
            </Link>
            <Link href="https://youtube.com" target="_blank">
              <div className="p-3 rounded-full bg-white/10 border border-white/20 text-white text-xl hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer">
                <FaYoutube />
              </div>
            </Link>
            <Link href="https://facebook.com" target="_blank">
              <div className="p-3 rounded-full bg-white/10 border border-white/20 text-white text-xl hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer">
                <FaFacebook />
              </div>
            </Link>
          </div>

          {/* CONTACT */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90 transition-all duration-800 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
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
          <div className={`mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 transition-all duration-800 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <div>
              <h4 className="text-white font-semibold mb-3">
                Services & Help
              </h4>
              <ul className="space-y-2 text-white/80">
                <li><Link href="/support" className="hover:text-white hover:translate-x-1 transition-all duration-200">Customer Support</Link></li>
                <li><Link href="/returns" className="hover:text-white hover:translate-x-1 transition-all duration-200">Returns</Link></li>
                <li><Link href="/delivery" className="hover:text-white hover:translate-x-1 transition-all duration-200">Delivery Info</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Menu</h4>
              <ul className="space-y-2 text-white/80">
                <li><Link href="/men" className="hover:text-white hover:translate-x-1 transition-all duration-200">Men</Link></li>
                <li><Link href="/women" className="hover:text-white hover:translate-x-1 transition-all duration-200">Women</Link></li>
                <li><Link href="/accessories" className="hover:text-white hover:translate-x-1 transition-all duration-200">Accessories</Link></li>
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
