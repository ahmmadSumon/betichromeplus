"use client";

import React from "react";
import { FaTruck, FaShieldAlt, FaCreditCard, FaTshirt } from "react-icons/fa";

const features = [
  {
    title: "FREE DELIVERY",
    subtitle: "Free delivery over 2000 BDT shopping.",
    icon: <FaTruck className="w-12 h-12 text-red-500" />,
  },
  {
    title: "EASY Policies",
    subtitle: "Delivery/Return in easy way",
    icon: <FaShieldAlt className="w-12 h-12 text-red-500" />,
  },
  {
    title: "Secure Payment",
    subtitle: "COD/bKash/Cards",
    icon: <FaCreditCard className="w-12 h-12 text-red-500" />,
  },
  {
    title: "Over Thousands Styles",
    subtitle: "Everything you need",
    icon: <FaTshirt className="w-12 h-12 text-red-500" />,
  },
];

const FeatureCard = ({ title, subtitle, icon }: typeof features[0]) => {
  return (
    <div className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="mb-2">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
};

export const FeaturesSection = () => {
  return (
    <section className="w-full  py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            subtitle={feature.subtitle}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  );
};
