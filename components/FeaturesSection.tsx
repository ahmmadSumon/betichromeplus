"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaTruck, FaShieldAlt, FaCreditCard, FaTshirt } from "react-icons/fa";

const features = [
  {
    title: "FREE DELIVERY",
    subtitle: "Free delivery over 2000 BDT shopping.",
    icon: <FaTruck className="w-12 h-12 text-red-500" />,
    bgColor: "bg-slate-100",
    iconBg: "bg-red-100",
  },
  {
    title: "EASY Policies",
    subtitle: "Delivery/Return in easy way",
    icon: <FaShieldAlt className="w-12 h-12 text-blue-500" />,
    bgColor: "bg-slate-100",
    iconBg: "bg-blue-100",
  },
  {
    title: "Secure Payment",
    subtitle: "COD/bKash/Cards",
    icon: <FaCreditCard className="w-12 h-12 text-green-500" />,
    bgColor: "bg-slate-100",
    iconBg: "bg-green-100",
  },
  {
    title: "Over Thousands Styles",
    subtitle: "Everything you need",
    icon: <FaTshirt className="w-12 h-12 text-purple-500" />,
    bgColor: "bg-slate-100",
    iconBg: "bg-purple-100",
  },
];

const FeatureCard = ({ title, subtitle, icon, bgColor, iconBg, index, isVisible }: typeof features[0] & { index: number; isVisible: boolean }) => {
  return (
    <div className={`group ${bgColor} rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-all duration-700 ease-out hover:bg-gray-800 hover:scale-105 hover:-translate-y-2 ${
      isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
    }`}
    style={{ transitionDelay: `${index * 150}ms` }}>
      <div className={`w-20 h-20 ${iconBg} rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-white transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 group-hover:text-gray-200 transition-colors duration-300">{subtitle}</p>
    </div>
  );
};

export const FeaturesSection = () => {
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
    <section ref={sectionRef} className="w-full bg-white py-20">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className={`text-center flex flex-col items-center gap-6 mb-12 transition-all duration-800 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="flex items-center justify-center gap-4">
           
            
          </div>
          <h2 className="text-gray-900 text-4xl font-bold capitalize">
            Why Choose Us
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              subtitle={feature.subtitle}
              icon={feature.icon}
              bgColor={feature.bgColor}
              iconBg={feature.iconBg}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
