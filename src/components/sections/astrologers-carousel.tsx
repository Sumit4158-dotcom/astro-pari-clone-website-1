"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const astrologers = [
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_14.png",
    name: "Dr. Rajesh Kumar",
    specialty: "Vedic"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_15.png",
    name: "Priya Sharma",
    specialty: "Tarot"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_16.png",
    name: "Vikram Singh",
    specialty: "Numerology"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_17.png",
    name: "Anita Desai",
    specialty: "Palmistry"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_18.png",
    name: "Suresh Patel",
    specialty: "KP System"
  }
];

export const AstrologersCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 260;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="bg-[#FFE500] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-3 uppercase tracking-wide">
          Our Astrologers
        </h2>
        <p className="text-center text-gray-800 mb-10 text-lg">
          13000+ Best Astrologers from India for Online Consultation
        </p>

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
            {astrologers.map((astrologer, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[240px] bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 snap-start"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-[120px] h-[120px] rounded-full border-4 border-[#FFD700] overflow-hidden mb-4">
                    <Image
                      src={astrologer.image}
                      alt={astrologer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-black mb-1 text-[17px]">
                    {astrologer.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {astrologer.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
