import Image from "next/image";
import Link from "next/link";
import { Shield, Lock, Users, CreditCard } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#3a3a3a] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* About AstroPari */}
          <div>
            <h3 className="text-[#FFD700] font-bold text-lg mb-4">About AstroPari</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              India's #1 online astrology platform with 13,000+ verified astrologers providing guidance to millions of customers worldwide.
            </p>
          </div>

          {/* Horoscope */}
          <div>
            <h3 className="text-[#FFD700] font-bold text-lg mb-4">Horoscope</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/horoscope/today" className="text-gray-300 hover:text-white hover:underline">
                  Today's Horoscope
                </Link>
              </li>
              <li>
                <Link href="/horoscope/love" className="text-gray-300 hover:text-white hover:underline">
                  Today's Love Horoscope
                </Link>
              </li>
              <li>
                <Link href="/horoscope/yesterday" className="text-gray-300 hover:text-white hover:underline">
                  Yesterday's Horoscope
                </Link>
              </li>
              <li>
                <Link href="/horoscope/tomorrow" className="text-gray-300 hover:text-white hover:underline">
                  Tomorrow's Horoscope
                </Link>
              </li>
              <li>
                <Link href="/horoscope/weekly" className="text-gray-300 hover:text-white hover:underline">
                  Weekly Horoscope
                </Link>
              </li>
              <li>
                <Link href="/horoscope/monthly" className="text-gray-300 hover:text-white hover:underline">
                  Monthly Horoscope
                </Link>
              </li>
            </ul>
          </div>

          {/* Shubh Muhurat */}
          <div>
            <h3 className="text-[#FFD700] font-bold text-lg mb-4">Shubh Muhurat 2025</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/muhurat/annaprashan" className="text-gray-300 hover:text-white hover:underline">
                  Annaprashan Muhurat
                </Link>
              </li>
              <li>
                <Link href="/muhurat/namkaran" className="text-gray-300 hover:text-white hover:underline">
                  Namkaran Muhurat
                </Link>
              </li>
              <li>
                <Link href="/muhurat/vehicle" className="text-gray-300 hover:text-white hover:underline">
                  Car/Bike Muhurat
                </Link>
              </li>
              <li>
                <Link href="/muhurat/marriage" className="text-gray-300 hover:text-white hover:underline">
                  Marriage Muhurat
                </Link>
              </li>
              <li>
                <Link href="/muhurat/gold" className="text-gray-300 hover:text-white hover:underline">
                  Gold Buying Muhurat
                </Link>
              </li>
              <li>
                <Link href="/muhurat/bhoomi" className="text-gray-300 hover:text-white hover:underline">
                  Bhoomi Pujan Muhurat
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-[#FFD700] font-bold text-lg mb-4">Important Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/astromall" className="text-gray-300 hover:text-white hover:underline">
                  Astromall
                </Link>
              </li>
              <li>
                <Link href="/kundli" className="text-gray-300 hover:text-white hover:underline">
                  Free Kundli
                </Link>
              </li>
              <li>
                <Link href="/matching" className="text-gray-300 hover:text-white hover:underline">
                  Match Making
                </Link>
              </li>
              <li>
                <Link href="/horoscope/2025" className="text-gray-300 hover:text-white hover:underline">
                  Horoscope 2025
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-gray-300 hover:text-white hover:underline">
                  Chat with Astrologer
                </Link>
              </li>
              <li>
                <Link href="/talk" className="text-gray-300 hover:text-white hover:underline">
                  Talk to Astrologer
                </Link>
              </li>
            </ul>
          </div>

          {/* Astrology */}
          <div>
            <h3 className="text-[#FFD700] font-bold text-lg mb-4">Astrology</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products/evil-eye" className="text-gray-300 hover:text-white hover:underline">
                  Evil Eye
                </Link>
              </li>
              <li>
                <Link href="/products/rudraksha" className="text-gray-300 hover:text-white hover:underline">
                  Rudraksha
                </Link>
              </li>
              <li>
                <Link href="/products/karungali" className="text-gray-300 hover:text-white hover:underline">
                  Karungali
                </Link>
              </li>
              <li>
                <Link href="/products/gemstones" className="text-gray-300 hover:text-white hover:underline">
                  Buy Gemstones
                </Link>
              </li>
              <li>
                <Link href="/products/yantra" className="text-gray-300 hover:text-white hover:underline">
                  Yantra
                </Link>
              </li>
              <li>
                <Link href="/astrologer/login" className="text-gray-300 hover:text-white hover:underline">
                  For Astrologers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-600 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="font-semibold text-sm">Secure</p>
                <p className="text-xs text-gray-400">SSL Encrypted</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center">
                <Lock className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="font-semibold text-sm">Private</p>
                <p className="text-xs text-gray-400">& Confidential</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center">
                <Users className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="font-semibold text-sm">Verified</p>
                <p className="text-xs text-gray-400">Astrologers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="font-semibold text-sm">Secure</p>
                <p className="text-xs text-gray-400">Payments</p>
              </div>
            </div>
          </div>
        </div>

        {/* App Download */}
        <div className="border-t border-gray-600 pt-8 mb-8">
          <p className="text-center text-sm text-gray-300 mb-4">Download Our App</p>
          <div className="flex justify-center gap-4">
            <Link href="#" className="block">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/803cb165-da39-4029-baa7-294f202ab157-astropari-vercel-app/assets/images/images_19.png"
                alt="Get it on Google Play"
                width={150}
                height={45}
                className="h-[45px] w-auto"
              />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 pt-6 text-center">
          <p className="text-sm text-gray-400">
            Copyright © 2025 AstroPari. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
