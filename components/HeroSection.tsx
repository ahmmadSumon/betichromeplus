"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Section {
  title: string;
  subtitle: string;
  bg: string;
  button: string;
}

const sections: Section[] = [
  {
    title: "Discover Your Perfect Style",
    subtitle:
      "Shop the latest collections with exclusive offers. Premium quality, unbeatable comfort — designed for you.",
    bg: "/image/slide1.jpg",
    button: "Shop Now",
  },
  {
    title: "New Arrivals",
    subtitle: "Fresh styles added weekly!",
    bg: "/image/slide2.jpg",
    button: "Explore",
  },
  {
    title: "Trending Products",
    subtitle: "Check what everyone is buying!",
    bg: "/image/slide4.jpg",
    button: "View Products",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger initial animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sections.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sections.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sections.length) % sections.length);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {sections.map((section, i) => (
        <div
          key={i}
          className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-1000 ease-out ${
            i === currentSlide ? "translate-x-0 opacity-100" : i < currentSlide ? "-translate-x-full opacity-0" : "translate-x-full opacity-0"
          }`}
        >
          <img
            src={section.bg}
            alt={section.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
              i === currentSlide ? "scale-100" : "scale-110"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

          <div className="relative z-10 text-center text-white px-6 max-w-5xl">
            <h1 className={`text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tight transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              i === currentSlide && isLoaded
                ? "opacity-100 translate-x-0 blur-0" 
                : "opacity-0 -translate-x-32 blur-sm"
            }`}>
              {section.title}
            </h1>
            <p className={`text-xl md:text-4xl mb-12 font-light leading-relaxed transition-all duration-1200 delay-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              i === currentSlide && isLoaded
                ? "opacity-100 translate-x-0 blur-0" 
                : "opacity-0 translate-x-32 blur-sm"
            }`}>
              {section.subtitle}
            </p>
            <Link href="/all-products">
              <button className={`px-12 py-5 rounded-full bg-white text-black text-lg font-bold hover:scale-110 hover:shadow-2xl hover:bg-gray-100 transition-all duration-1200 delay-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] backdrop-blur-sm ${
                i === currentSlide && isLoaded
                  ? "opacity-100 translate-x-0 translate-y-0 blur-0" 
                  : "opacity-0 translate-x-32 translate-y-8 blur-sm"
              }`}>
                {section.button}
              </button>
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 md:top-1/2 top-3/4 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 ease-out border border-white/20"
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 md:top-1/2 top-3/4 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 ease-out border border-white/20"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-4 h-4 rounded-full transition-all duration-500 ease-out ${
              i === currentSlide ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60 hover:scale-110"
            }`}
          />
        ))}
      </div>

      {/* Footer UI */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-8 max-w-[1600px] mx-auto text-white z-20">
        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold tracking-wider">Follow Us</span>
          <div className="flex gap-5 text-2xl">
            <Link href="https://facebook.com" target="_blank">
              <FaFacebook className="hover:scale-125 hover:text-blue-400 transition-all duration-300 ease-out" />
            </Link>
            <Link href="https://wa.me/8801700000000" target="_blank">
              <FaWhatsapp className="hover:scale-125 hover:text-green-400 transition-all duration-300 ease-out" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <FaInstagram className="hover:scale-125 hover:text-pink-400 transition-all duration-300 ease-out" />
            </Link>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-sm font-medium tracking-wider rotate-90 origin-center">Scroll</span>
          <svg
            className="w-6 h-6 animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
