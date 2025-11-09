"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const celebrities = [
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_10.png",
    name: "Mandira Bedi",
    testimonial: "AstroPari has been incredibly accurate"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_11.png",
    name: "Shweta Tiwari",
    testimonial: "Best astrology service I've tried"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_12.png",
    name: "Bharti Singh",
    testimonial: "Trusted advisor for my decisions"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_13.png",
    name: "Ranbir Kapoor",
    testimonial: "Professional and insightful"
  }
];

export const CelebrityTestimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10 uppercase tracking-wide">
          Our Celebrity Customers
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
            {celebrities.map((celebrity, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] rounded-xl overflow-hidden snap-start group cursor-pointer"
              >
                <div className="relative h-80 w-full">
                  <Image
                    src={celebrity.image}
                    alt={celebrity.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-8 h-8 text-black fill-black ml-1" />
                    </div>
                  </div>
                  {/* Name Badge */}
                  <div className="absolute bottom-3 left-3 bg-[#FFD700] px-4 py-2 rounded-full">
                    <span className="text-sm font-semibold text-black">
                      {celebrity.name}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-700 text-center px-2">
                  {celebrity.testimonial}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
