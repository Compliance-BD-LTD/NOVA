import React from "react";

import { FaIndustry, FaTools, FaWarehouse, FaGlobe } from "react-icons/fa";

const cards = [
  {
    icon: <FaIndustry />,
    title: "Expert Equipment Provider",
    desc: "UK’s leading stockist of quality used manufacturing machinery.",
    bg: "https://source.unsplash.com/500x300/?machinery"
  },
  {
    icon: <FaTools />,
    title: "Tailored Solutions",
    desc: "Customized pump and process equipment based on client needs.",
    bg: "https://source.unsplash.com/500x300/?custom"
  },
  {
    icon: <FaWarehouse />,
    title: "Extensive Inventory",
    desc: "Over 2000 items available for immediate dispatch in stockyard.",
    bg: "https://source.unsplash.com/500x300/?warehouse"
  },
  {
    icon: <FaGlobe />,
    title: "Global Exports",
    desc: "Delivering precision industry gear worldwide from the UK.",
    bg: "https://source.unsplash.com/500x300/?export"
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1340px] mx-auto px-4">
        <h2 className="text-5xl text-center font-bold mb-8 text-gray-800">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <div
              key={i}
              className="relative group cursor-pointer h-[250px] rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
            >
              <div
                className="absolute inset-0 bg-[length:150%] bg-center opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                style={{ backgroundImage: `url(${c.bg})`, backgroundColor: "#0284c7" }}
              />
              <div className="relative z-10 flex flex-col justify-center items-center h-full p-6 text-center">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full text-white mb-4">
                  {c.icon}
                </div>
                <h4 className="font-semibold text-lg text-gray-900 group-hover:text-white">{c.title}</h4>
                <p className="text-sm text-gray-600 group-hover:text-white mt-2">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
