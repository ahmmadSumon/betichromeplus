"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLDivElement>(".panel");

      panels.forEach((panel) => {
        const titleWords = panel.querySelectorAll<HTMLElement>(".word");
        const subtitleWords = panel.querySelectorAll<HTMLElement>(".subword");
        const button = panel.querySelector<HTMLButtonElement>("button");
        const bg = panel.querySelector<HTMLImageElement>("img");

        if (!titleWords.length || !subtitleWords.length || !button || !bg)
          return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        // Title animation
        tl.fromTo(
          titleWords,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power4.out", stagger: 0.06 }
        );

        // Subtitle animation
        tl.fromTo(
          subtitleWords,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.03 },
          "-=0.6"
        );

        // Button animation
        tl.fromTo(
          button,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
          "-=0.4"
        );

        // Background parallax
        gsap.fromTo(
          bg,
          { scale: 1.15, y: -60 },
          {
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 0.6 },
          }
        );

        // Pin panel
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {sections.map((section, i) => (
        <div
          key={i}
          className="panel relative w-full h-screen flex items-center justify-center overflow-hidden"
        >
          <img
            src={section.bg}
            alt={section.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Footer UI */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-between items-center px-6 max-w-[1600px] mx-auto text-white z-20">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold">Follow Us</span>
              <div className="flex gap-4 text-xl">
                <Link href="https://facebook.com" target="_blank">
                  <FaFacebook className="hover:scale-125 transition" />
                </Link>
                <Link href="https://wa.me/8801700000000" target="_blank">
                  <FaWhatsapp className="hover:scale-125 transition" />
                </Link>
                <Link href="https://instagram.com" target="_blank">
                  <FaInstagram className="hover:scale-125 transition" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-sm rotate-90 tracking-wider">Scroll</span>
              <svg
                className="w-6 h-6 animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 text-center text-white px-6 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              {section.title.split(" ").map((word, idx) => (
                <span key={idx} className="word inline-block mr-2 opacity-0">
                  {word}
                </span>
              ))}
            </h1>

            <p className="text-lg md:text-3xl mb-8">
              {section.subtitle.split(" ").map((word, idx) => (
                <span key={idx} className="subword inline-block mr-1 opacity-0">
                  {word}
                </span>
              ))}
            </p>

            {/* Button linking to /all-products */}
            <Link href="/all-products">
              <button className="px-10 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 hover:bg-gray-200 transition">
                {section.button}
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
