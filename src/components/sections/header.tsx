"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  Globe, 
  User, 
  Menu, 
  X, 
  Star,
  Mail,
  Gift,
  PenTool,
  Sparkles,
  Eye,
  Calculator,
  Shield
} from "lucide-react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleMobileSection = (section: string) => {
    setMobileOpenSection(mobileOpenSection === section ? null : section);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border">
      {/* Desktop Navigation - Top Bar */}
      <div className="hidden lg:block border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-black">Astro</span>
              <span className="text-2xl font-bold text-[#FFD700]">Pari</span>
            </Link>

            {/* Main Navigation */}
            <nav className="flex items-center space-x-6">
              <Link href="/kundli" className="text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors">
                Free Kundli
              </Link>
              <Link href="/matching" className="text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors">
                Kundli Matching
              </Link>
              <Link href="/compatibility" className="text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors">
                Compatibility
              </Link>

              {/* Calculators Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('calculators')}
                  className="flex items-center gap-1 text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors"
                >
                  Calculators <ChevronDown className="h-4 w-4" />
                </button>
                {openDropdown === 'calculators' && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-lg shadow-lg border border-border py-2 max-h-[400px] overflow-y-auto">
                    <Link href="/calculators/love" className="block px-4 py-2 text-sm hover:bg-gray-100">Love Calculator</Link>
                    <Link href="/calculators/atmakaraka-darakaraka" className="block px-4 py-2 text-sm hover:bg-gray-100">Atmakaraka and Darakaraka Calculator</Link>
                    <Link href="/calculators/numerology" className="block px-4 py-2 text-sm hover:bg-gray-100">Numerology Calculator</Link>
                    <Link href="/calculators/sun-sign" className="block px-4 py-2 text-sm hover:bg-gray-100">Sun Sign Calculator</Link>
                    <Link href="/calculators/rising-sign" className="block px-4 py-2 text-sm hover:bg-gray-100">Rising Sign Calculator / Ascendant Calculator</Link>
                    <Link href="/calculators/rashi" className="block px-4 py-2 text-sm hover:bg-gray-100">Rashi Calculator</Link>
                    <Link href="/calculators/dasha" className="block px-4 py-2 text-sm hover:bg-gray-100">Dasha Calculator</Link>
                    <Link href="/calculators/transit-chart" className="block px-4 py-2 text-sm hover:bg-gray-100">Transit Chart Calculator</Link>
                    <Link href="/calculators/name-compatibility" className="block px-4 py-2 text-sm hover:bg-gray-100">Name Compatibility Calculator</Link>
                    <Link href="/calculators/age" className="block px-4 py-2 text-sm hover:bg-gray-100">Age Calculator</Link>
                    <Link href="/calculators/mulank" className="block px-4 py-2 text-sm hover:bg-gray-100">Mulank Calculator</Link>
                    <Link href="/calculators/mobile-numerology" className="block px-4 py-2 text-sm hover:bg-gray-100">Mobile Number Numerology Calculator</Link>
                    <Link href="/calculators/destiny-number" className="block px-4 py-2 text-sm hover:bg-gray-100">Destiny Number Calculator</Link>
                    <Link href="/calculators/lucky-name-numerology" className="block px-4 py-2 text-sm hover:bg-gray-100">Lucky Name Numerology Calculator</Link>
                    <Link href="/calculators/friendship" className="block px-4 py-2 text-sm hover:bg-gray-100">Friendship Calculator</Link>
                    <Link href="/calculators/kaal-sarp-dosh" className="block px-4 py-2 text-sm hover:bg-gray-100">Kaal Sarp Dosh Calculator</Link>
                    <Link href="/calculators/ishta-devata" className="block px-4 py-2 text-sm hover:bg-gray-100">Ishta Devata Calculator</Link>
                    <Link href="/calculators/lo-shu-grid" className="block px-4 py-2 text-sm hover:bg-gray-100">Lo Shu Grid Calculator</Link>
                    <Link href="/calculators/nakshatra" className="block px-4 py-2 text-sm hover:bg-gray-100">Nakshatra Calculator</Link>
                    <Link href="/calculators/mangal-dosha" className="block px-4 py-2 text-sm hover:bg-gray-100">Mangal Dosha Calculator</Link>
                    <Link href="/calculators/shani-sade-sati" className="block px-4 py-2 text-sm hover:bg-gray-100">Shani Sade Sati Calculator</Link>
                    <Link href="/calculators/moon-phase" className="block px-4 py-2 text-sm hover:bg-gray-100">Moon Phase Calculator</Link>
                    <Link href="/calculators/birth-chart" className="block px-4 py-2 text-sm hover:bg-gray-100">Birth Chart Calculator / Natal Chart Calculator</Link>
                    <Link href="/calculators/flames" className="block px-4 py-2 text-sm hover:bg-gray-100">Flames Calculator</Link>
                    <Link href="/calculators/lucky-vehicle-number" className="block px-4 py-2 text-sm hover:bg-gray-100">Lucky Vehicle Number Calculator</Link>
                  </div>
                )}
              </div>

              {/* Horoscopes Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('horoscopes')}
                  className="flex items-center gap-1 text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors"
                >
                  Horoscopes <ChevronDown className="h-4 w-4" />
                </button>
                {openDropdown === 'horoscopes' && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-border py-2 max-h-[400px] overflow-y-auto">
                    <Link href="/horoscope/2025" className="block px-4 py-2 text-sm hover:bg-gray-100">Horoscope 2025</Link>
                    <Link href="/horoscope/today" className="block px-4 py-2 text-sm hover:bg-gray-100">Today's Horoscope</Link>
                    <Link href="/horoscope/weekly" className="block px-4 py-2 text-sm hover:bg-gray-100">Weekly Horoscope</Link>
                    <Link href="/horoscope/monthly" className="block px-4 py-2 text-sm hover:bg-gray-100">Monthly Horoscope</Link>
                    <Link href="/horoscope/yearly" className="block px-4 py-2 text-sm hover:bg-gray-100">Yearly Horoscope</Link>
                    <Link href="/horoscope/daily" className="block px-4 py-2 text-sm hover:bg-gray-100">Daily Horoscope</Link>
                    <Link href="/kundli" className="block px-4 py-2 text-sm hover:bg-gray-100">Free Kundali</Link>
                    <Link href="/horoscope/tomorrow" className="block px-4 py-2 text-sm hover:bg-gray-100">Tomorrow's Horoscope</Link>
                    <Link href="/horoscope/yesterday" className="block px-4 py-2 text-sm hover:bg-gray-100">Yesterday's Horoscope</Link>
                    <Link href="/horoscope/chinese" className="block px-4 py-2 text-sm hover:bg-gray-100">Chinese Horoscope</Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors">
                <Globe className="h-4 w-4" />
                Eng
              </button>
              <button className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white font-semibold px-6 py-2 rounded-full transition-all">
                <Shield className="h-4 w-4" />
                Admin
              </button>
              <button className="flex items-center gap-2 bg-[#FFD700] hover:bg-[#FFED4E] text-black font-semibold px-6 py-2 rounded-full transition-all">
                <User className="h-4 w-4" />
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Bottom Bar */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center space-x-8 h-14">
            {/* Best Astrologers Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('astrologers')}
                className="flex items-center gap-1 text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors"
              >
                Best Astrologers <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === 'astrologers' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-border py-2">
                  <Link href="/astrologers/top" className="block px-4 py-2 text-sm hover:bg-gray-100">Top Astrologers</Link>
                  <Link href="/astrologers/vedic" className="block px-4 py-2 text-sm hover:bg-gray-100">Vedic Astrologers</Link>
                  <Link href="/astrologers/tarot" className="block px-4 py-2 text-sm hover:bg-gray-100">Tarot Readers</Link>
                  <Link href="/astrologers/numerology" className="block px-4 py-2 text-sm hover:bg-gray-100">Numerologists</Link>
                  <Link href="/astrologers/vastu" className="block px-4 py-2 text-sm hover:bg-gray-100">Vastu Consultants</Link>
                </div>
              )}
            </div>

            <Link href="/chat" className="text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors">
              Chat with Astrologer
            </Link>
            <Link href="/talk" className="text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors">
              Talk to Astrologer
            </Link>
            <Link href="/panditji" className="text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors">
              Book Panditji
            </Link>
            <Link href="/astromall" className="text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors">
              Astromall
            </Link>
            <Link href="/store" className="text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors">
              AstroPari Store
            </Link>

            {/* Blogs Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('blogs')}
                className="flex items-center gap-1 text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors"
              >
                Blogs <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === 'blogs' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-border py-2">
                  <Link href="/blogs/astrology" className="block px-4 py-2 text-sm hover:bg-gray-100">Astrology Articles</Link>
                  <Link href="/blogs/predictions" className="block px-4 py-2 text-sm hover:bg-gray-100">Horoscope Predictions</Link>
                  <Link href="/blogs/zodiac" className="block px-4 py-2 text-sm hover:bg-gray-100">Zodiac Tips</Link>
                  <Link href="/blogs/spiritual" className="block px-4 py-2 text-sm hover:bg-gray-100">Spiritual Guidance</Link>
                  <Link href="/blogs/festivals" className="block px-4 py-2 text-sm hover:bg-gray-100">Festival Dates</Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-1">
              <span className="text-xl font-bold text-black">Astro</span>
              <span className="text-xl font-bold text-[#FFD700]">Pari</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <button className="bg-black hover:bg-gray-900 text-white font-semibold px-4 py-2 rounded-full transition-all text-sm">
                Admin
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Sidebar */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-black">Menu</h2>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="px-4 py-4 space-y-1">
                {/* Language Selector */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-blue-500 mb-2">
                    <Globe className="h-4 w-4" />
                    <span className="font-medium">LANGUAGE</span>
                  </div>
                  <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm">English</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Best Astrologers */}
                <button
                  onClick={() => toggleMobileSection('astrologers')}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium text-black">Best Astrologers</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpenSection === 'astrologers' ? 'rotate-180' : ''}`} />
                </button>

                {/* Astromall */}
                <Link
                  href="/astromall"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Mail className="h-5 w-5 text-teal-500" />
                  <span className="font-medium text-black">Astromall</span>
                </Link>

                {/* AstroPari Store */}
                <Link
                  href="/store"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Gift className="h-5 w-5 text-pink-500" />
                  <span className="font-medium text-black">AstroPari Store</span>
                </Link>

                {/* Blogs */}
                <button
                  onClick={() => toggleMobileSection('blogs')}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <PenTool className="h-5 w-5 text-orange-500" />
                    <span className="font-medium text-black">Blogs</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpenSection === 'blogs' ? 'rotate-180' : ''}`} />
                </button>

                {/* Quick Access Section */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 px-4 py-2">QUICK ACCESS</div>
                  
                  <Link
                    href="/kundli"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-medium text-black">Free Kundli</span>
                  </Link>

                  <Link
                    href="/matching"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-medium text-black">Kundli Matching</span>
                  </Link>

                  <Link
                    href="/compatibility"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-medium text-black">Compatibility</span>
                  </Link>
                </div>

                {/* Calculators Section */}
                <div className="pt-2">
                  <button
                    onClick={() => toggleMobileSection('calculators')}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Calculator className="h-5 w-5 text-gray-700" />
                      <span className="font-medium text-black">Calculators</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpenSection === 'calculators' ? 'rotate-180' : ''}`} />
                  </button>

                  {mobileOpenSection === 'calculators' && (
                    <div className="pl-8 space-y-1 mt-1 max-h-[400px] overflow-y-auto">
                      <Link
                        href="/calculators/love"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Love Calculator
                      </Link>
                      <Link
                        href="/calculators/atmakaraka-darakaraka"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Atmakaraka and Darakaraka Calculator
                      </Link>
                      <Link
                        href="/calculators/numerology"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Numerology Calculator
                      </Link>
                      <Link
                        href="/calculators/sun-sign"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Sun Sign Calculator
                      </Link>
                      <Link
                        href="/calculators/rising-sign"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Rising Sign Calculator / Ascendant Calculator
                      </Link>
                      <Link
                        href="/calculators/rashi"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Rashi Calculator
                      </Link>
                      <Link
                        href="/calculators/dasha"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Dasha Calculator
                      </Link>
                      <Link
                        href="/calculators/transit-chart"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Transit Chart Calculator
                      </Link>
                      <Link
                        href="/calculators/name-compatibility"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Name Compatibility Calculator
                      </Link>
                      <Link
                        href="/calculators/age"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Age Calculator
                      </Link>
                      <Link
                        href="/calculators/mulank"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Mulank Calculator
                      </Link>
                      <Link
                        href="/calculators/mobile-numerology"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Mobile Number Numerology Calculator
                      </Link>
                      <Link
                        href="/calculators/destiny-number"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Destiny Number Calculator
                      </Link>
                      <Link
                        href="/calculators/lucky-name-numerology"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Lucky Name Numerology Calculator
                      </Link>
                      <Link
                        href="/calculators/friendship"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Friendship Calculator
                      </Link>
                      <Link
                        href="/calculators/kaal-sarp-dosh"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Kaal Sarp Dosh Calculator
                      </Link>
                      <Link
                        href="/calculators/ishta-devata"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Ishta Devata Calculator
                      </Link>
                      <Link
                        href="/calculators/lo-shu-grid"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Lo Shu Grid Calculator
                      </Link>
                      <Link
                        href="/calculators/nakshatra"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Nakshatra Calculator
                      </Link>
                      <Link
                        href="/calculators/mangal-dosha"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Mangal Dosha Calculator
                      </Link>
                      <Link
                        href="/calculators/shani-sade-sati"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Shani Sade Sati Calculator
                      </Link>
                      <Link
                        href="/calculators/moon-phase"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Moon Phase Calculator
                      </Link>
                      <Link
                        href="/calculators/birth-chart"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Birth Chart Calculator / Natal Chart Calculator
                      </Link>
                      <Link
                        href="/calculators/flames"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Flames Calculator
                      </Link>
                      <Link
                        href="/calculators/lucky-vehicle-number"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Lucky Vehicle Number Calculator
                      </Link>
                    </div>
                  )}
                </div>

                {/* Horoscopes Section */}
                <div className="pt-2">
                  <button
                    onClick={() => toggleMobileSection('horoscopes')}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-purple-500" />
                      <span className="font-medium text-black">Horoscopes</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpenSection === 'horoscopes' ? 'rotate-180' : ''}`} />
                  </button>

                  {mobileOpenSection === 'horoscopes' && (
                    <div className="pl-8 space-y-1 mt-1 max-h-[400px] overflow-y-auto">
                      <Link
                        href="/horoscope/2025"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Horoscope 2025
                      </Link>
                      <Link
                        href="/horoscope/today"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Today's Horoscope
                      </Link>
                      <Link
                        href="/horoscope/weekly"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Weekly Horoscope
                      </Link>
                      <Link
                        href="/horoscope/monthly"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Monthly Horoscope
                      </Link>
                      <Link
                        href="/horoscope/yearly"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Yearly Horoscope
                      </Link>
                      <Link
                        href="/horoscope/daily"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Daily Horoscope
                      </Link>
                      <Link
                        href="/kundli"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Free Kundali
                      </Link>
                      <Link
                        href="/horoscope/tomorrow"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Tomorrow's Horoscope
                      </Link>
                      <Link
                        href="/horoscope/yesterday"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Yesterday's Horoscope
                      </Link>
                      <Link
                        href="/horoscope/chinese"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Chinese Horoscope
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
};