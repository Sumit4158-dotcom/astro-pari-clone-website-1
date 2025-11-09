"use client";

import { Sun, Grid, Heart, Link as LinkIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    title: "Today's Horoscope",
    description: "Get your daily horoscope predictions",
    icon: Sun,
    href: "/horoscope"
  },
  {
    title: "Free Kundli",
    description: "Generate your birth chart for free",
    icon: Grid,
    href: "/kundli"
  },
  {
    title: "Compatibility",
    description: "Check your relationship compatibility",
    icon: Heart,
    href: "/compatibility"
  },
  {
    title: "Kundli Matching",
    description: "Match kundlis for marriage",
    icon: LinkIcon,
    href: "/matching"
  }
];

export const ComplimentaryServices = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="bg-[#f9f9f9] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase tracking-wide">
          Complimentary Astrology Services
        </h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors hidden md:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors hidden md:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <a
                  key={service.title}
                  href={service.href}
                  className="flex-shrink-0 w-[300px] bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow snap-start"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-[#FFE500] flex items-center justify-center">
                      <Icon className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-[17px] font-bold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-[14px] text-gray-600">
                      {service.description}
                    </p>
                    <div className="w-16 h-1 bg-[#FFD700] rounded-full" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
