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
            start: "top 75%",
          },
        });

        // Title animation
        tl.fromTo(
          titleWords,
          {
            opacity: 0,
            y: 60,
            rotateX: 90,
            transformPerspective: 800,
            transformOrigin: "top center",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.08,
          }
        );

        // Subtitle animation
        tl.fromTo(
          subtitleWords,
          {
            opacity: 0,
            y: 20,
            rotateX: -45,
            transformPerspective: 600,
            transformOrigin: "bottom center",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.04,
          },
          "-=0.8"
        );

        // Button animation
        tl.fromTo(
          button,
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
            rotateX: -10,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.7,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );

        // Background parallax
        gsap.fromTo(
          bg,
          { scale: 1.1, y: -40 },
          {
            scale: 1,
            y: 0,
            scrollTrigger: {
              trigger: panel,
              scrub: 1.1,
              start: "top bottom",
              end: "bottom top",
            },
          }
        );

        // Pin panel
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: true,
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

          {/* Follow Us and Scroll Indicator */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-between items-center px-6 max-w-[1600px] mx-auto text-white z-20">
            {/* Follow Us on the left */}
            <div className="flex  items-start gap-6 text-3xl">
              <span className="text-sm md:text-base font-bold">Follow Us</span>
              <div className="flex gap-6 text-2xl">
                <Link href="https://facebook.com" target="_blank">
                  <FaFacebook className="hover:scale-125 transition-transform duration-300" />
                </Link>
                <Link href="https://wa.me/8801700000000" target="_blank">
                  <FaWhatsapp className="hover:scale-125 transition-transform duration-300" />
                </Link>
                <Link href="https://instagram.com" target="_blank">
                  <FaInstagram className="hover:scale-125 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Scroll indicator on the right */}
            <div className="flex flex-col items-center gap-2 text-white text-2xl">
              <span className="text-sm md:text-base font-bold rotate-90 tracking-wider">
                Scroll
              </span>
              <svg
                className="w-6 h-6 animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="content relative z-10 text-center text-white px-6">
            <h1 className="title text-5xl md:text-6xl font-extrabold mb-6">
              {section.title.split(" ").map((word, idx) => (
                <span
                  key={idx}
                  className="word inline-block opacity-0 will-change-transform mr-2"
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="subtitle text-lg md:text-2xl mb-8">
              {section.subtitle.split(" ").map((word, idx) => (
                <span
                  key={idx}
                  className="subword inline-block opacity-0 will-change-transform mr-1"
                >
                  {word}
                </span>
              ))}
            </p>

            <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition">
              {section.button}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
