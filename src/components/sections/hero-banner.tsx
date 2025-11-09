import Image from "next/image";
import Link from "next/link";

export const HeroBanner = () => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] rounded-3xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
          {/* Left Column - Text Content */}
          <div className="space-y-6 text-center md:text-left">
            <p className="text-sm text-gray-700 font-medium">
              200+ Celebs recommend AstroPari
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
              Chat With Astrologer
            </h1>
            <Link 
              href="/chat"
              className="inline-flex items-center justify-center bg-black text-white font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Chat Now
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_1.png"
                alt="Astrologer in traditional attire"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
