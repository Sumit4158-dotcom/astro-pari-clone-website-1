"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Eye, User } from "lucide-react";

const blogPosts = [
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_6.png",
    title: "Understanding Your Birth Chart: A Complete Guide",
    author: "Priya Sharma",
    date: "March 18, 2024",
    views: "12.5K"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_7.png",
    title: "Vedic Astrology: Ancient Wisdom for Modern Life",
    author: "Rajesh Kumar",
    date: "March 15, 2024",
    views: "8.3K"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_8.png",
    title: "Mercury Retrograde: What It Means for You",
    author: "Anita Desai",
    date: "March 12, 2024",
    views: "15.2K"
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_9.png",
    title: "Love Compatibility: Signs That Match Perfectly",
    author: "Vikram Singh",
    date: "March 10, 2024",
    views: "20.1K"
  }
];

export const BlogCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 370;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3 uppercase tracking-wide">
            Latest From Blog
          </h2>
          <p className="text-gray-600">
            Top Astrologers. 24 * 7 customer support. Happy to help
          </p>
        </div>

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
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[350px] bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 snap-start"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.views}
                  </div>
                  <div className="absolute top-3 left-3 bg-[#FFD700] px-3 py-1 rounded-full text-xs font-semibold text-black">
                    Astrotalk
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-black mb-3 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
