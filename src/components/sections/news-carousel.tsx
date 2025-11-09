"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const newsItems = [
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_2.png",
    outlet: "INC42",
    headline: "AstroPari Secures Major Funding Round",
    date: "March 15, 2024"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_3.png",
    outlet: "CXO",
    headline: "Leading Astrology Platform Innovation",
    date: "March 10, 2024"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_4.png",
    outlet: "ET NOW",
    headline: "Digital Astrology Services Boom",
    date: "March 5, 2024"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_5.png",
    outlet: "BUSINESS",
    headline: "AstroPari Reaches 100M Users",
    date: "February 28, 2024"
  }
];

export const NewsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="bg-[#FFE500] py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10 uppercase tracking-wide">
          AstroPari In News
        </h2>

        <div className="relative">
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

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[320px] bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:scale-105 transition-transform duration-300 snap-start"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.headline}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-semibold">
                    {item.outlet}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-black mb-2 line-clamp-2">
                    {item.headline}
                  </h3>
                  <p className="text-sm text-gray-600">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
