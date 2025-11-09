"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Calculator } from "lucide-react";
import Link from "next/link";

const calculators = [
  {
    name: "Love Calculator",
    icon: "❤️",
    description: "Check love compatibility",
    route: "/calculators/love"
  },
  {
    name: "Atmakaraka and Darakaraka Calculator",
    icon: "🪐",
    description: "Find your soul significator",
    route: "/calculators/atmakaraka-darakaraka"
  },
  {
    name: "Numerology Calculator",
    icon: "🔮",
    description: "Discover your life path number",
    route: "/calculators/numerology"
  },
  {
    name: "Sun Sign Calculator",
    icon: "☀️",
    description: "Find your sun sign",
    route: "/calculators/sun-sign"
  },
  {
    name: "Rising Sign Calculator",
    icon: "🌅",
    description: "Calculate your rising sign",
    route: "/calculators/rising-sign"
  },
  {
    name: "Rashi Calculator",
    icon: "🌟",
    description: "Discover your moon sign",
    route: "/calculators/rashi"
  },
  {
    name: "Dasha Calculator",
    icon: "⏳",
    description: "Calculate planetary periods",
    route: "/calculators/dasha"
  },
  {
    name: "Friendship Calculator",
    icon: "👥",
    description: "Check friendship compatibility",
    route: "/calculators/flames"
  },
  {
    name: "Age Calculator",
    icon: "🎂",
    description: "Calculate your exact age",
    route: "/calculators/age"
  },
  {
    name: "Birth Chart Calculator",
    icon: "⭐",
    description: "Generate your birth chart",
    route: "/calculators/birth-chart"
  }
];

export const CalculatorsCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-6 h-6 text-[#FFD700]" />
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
                Calculators
              </h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base">
              Explore various astrology and numerology calculators
            </p>
          </div>
        </div>

        <div className="relative group">
          {/* Left Navigation Arrow */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-all duration-300 ${
              canScrollLeft
                ? "opacity-100 hover:scale-110"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {calculators.map((calculator, index) => (
              <Link
                key={index}
                href={calculator.route}
                className="flex-shrink-0 w-[280px] md:w-[320px] bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 p-6 cursor-pointer"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFF200] flex items-center justify-center text-4xl shadow-md">
                    {calculator.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {calculator.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {calculator.description}
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="text-[#FFD700] text-sm font-medium hover:underline">
                      Calculate Now →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-all duration-300 ${
              canScrollRight
                ? "opacity-100 hover:scale-110"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Scroll Indicator for Mobile */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {Array.from({ length: Math.ceil(calculators.length / 2) }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gray-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};