"use client";

import { useState } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Star } from "lucide-react";
import { toast } from "sonner";

export default function DestinyNumberCalculator() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<{
    destinyNumber: number;
    description: string;
    lifePath: string;
  } | null>(null);

  const calculateDestinyNumber = (d: number, m: number, y: number): number => {
    let sum = d + m + y;
    
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    return sum;
  };

  const getDestinyDescription = (num: number): { description: string; lifePath: string } => {
    const info: { [key: number]: { description: string; lifePath: string } } = {
      1: {
        description: "The Leader - You are born to lead and inspire others. Independent, ambitious, and innovative, you have strong willpower and determination. You create your own path and don't follow others.",
        lifePath: "Focus on leadership roles, entrepreneurship, and innovation. Your destiny is to be a pioneer and motivator."
      },
      2: {
        description: "The Diplomat - You are sensitive, intuitive, and cooperative. You excel in partnerships and teamwork. Peace, harmony, and balance are important to you. You have strong emotional intelligence.",
        lifePath: "Seek careers in counseling, mediation, partnerships, and supportive roles. Your destiny is to bring people together."
      },
      3: {
        description: "The Creative - You are expressive, optimistic, and artistic. Communication is your strength. You have natural creativity and charm. You inspire others with your enthusiasm and joy.",
        lifePath: "Pursue arts, entertainment, writing, or communication fields. Your destiny is to express and create beauty."
      },
      4: {
        description: "The Builder - You are practical, disciplined, and hardworking. You value stability, order, and tradition. You build strong foundations and are reliable and trustworthy.",
        lifePath: "Excel in management, organization, construction, or systematic work. Your destiny is to create lasting structures."
      },
      5: {
        description: "The Adventurer - You love freedom, change, and new experiences. Versatile and adaptable, you thrive on variety. You are curious and progressive, always seeking knowledge and adventure.",
        lifePath: "Explore travel, sales, marketing, or dynamic careers. Your destiny is to experience life fully and promote change."
      },
      6: {
        description: "The Nurturer - You are responsible, caring, and compassionate. Home and family are priorities. You have artistic sensibilities and a strong sense of duty. You create harmony and beauty.",
        lifePath: "Focus on teaching, healing, counseling, or creative arts. Your destiny is to nurture and care for others."
      },
      7: {
        description: "The Seeker - You are analytical, spiritual, and introspective. You seek truth and wisdom. You have strong intuition and prefer depth over superficiality. Solitude helps you grow.",
        lifePath: "Pursue research, spirituality, philosophy, or analysis. Your destiny is to seek and share knowledge and wisdom."
      },
      8: {
        description: "The Powerhouse - You are ambitious, authoritative, and goal-oriented. Material success and power motivate you. You have strong organizational and business skills. You achieve through determination.",
        lifePath: "Excel in business, finance, leadership, or executive roles. Your destiny is to achieve material success and authority."
      },
      9: {
        description: "The Humanitarian - You are compassionate, generous, and idealistic. You care deeply about humanity and want to make the world better. You have wisdom beyond your years and strong intuition.",
        lifePath: "Engage in humanitarian work, healing, arts, or social causes. Your destiny is to serve humanity and bring transformation."
      },
      11: {
        description: "The Illuminator (Master Number) - You are highly intuitive, spiritual, and inspirational. You have psychic abilities and can inspire others. You are sensitive and visionary with a higher purpose.",
        lifePath: "Focus on spiritual teaching, inspiration, and enlightenment. Your destiny is to illuminate and uplift humanity."
      },
      22: {
        description: "The Master Builder (Master Number) - You can turn dreams into reality on a grand scale. You combine spiritual insight with practical ability. You build lasting legacies that benefit many.",
        lifePath: "Create large-scale projects that benefit society. Your destiny is to build something of lasting significance."
      },
      33: {
        description: "The Master Teacher (Master Number) - You embody compassion and healing at the highest level. You are selfless and devoted to uplifting others. You have the ability to heal and transform lives.",
        lifePath: "Dedicate yourself to teaching, healing, and serving humanity. Your destiny is to be a beacon of love and compassion."
      }
    };
    
    return info[num] || { description: "Invalid number", lifePath: "" };
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const birthDay = parseInt(day);
    const birthMonth = parseInt(month);
    const birthYear = parseInt(year);
    
    if (isNaN(birthDay) || birthDay < 1 || birthDay > 31) {
      toast.error("Please enter a valid day (1-31)");
      return;
    }
    
    if (isNaN(birthMonth) || birthMonth < 1 || birthMonth > 12) {
      toast.error("Please enter a valid month (1-12)");
      return;
    }
    
    if (isNaN(birthYear) || birthYear < 1900 || birthYear > new Date().getFullYear()) {
      toast.error("Please enter a valid year");
      return;
    }

    const destinyNumber = calculateDestinyNumber(birthDay, birthMonth, birthYear);
    const { description, lifePath } = getDestinyDescription(destinyNumber);

    setResult({ destinyNumber, description, lifePath });
  };

  const handleReset = () => {
    setDay("");
    setMonth("");
    setYear("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFD700] rounded-full mb-4">
              <Star className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-black mb-3">Destiny Number Calculator</h1>
            <p className="text-gray-600 text-lg">
              Discover your life path and destiny through numerology
            </p>
          </div>

          {/* Info Section */}
          <div className="bg-[#FFF9E6] border-l-4 border-[#FFD700] p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-black mb-2">What is Destiny Number?</h3>
            <p className="text-gray-700 text-sm">
              Your Destiny Number, also known as Bhagyank or Life Path Number, is calculated from your complete birth date 
              (day + month + year). It reveals your life purpose, natural talents, challenges, and the path you're meant to follow. 
              This number influences your entire life journey and major life decisions.
            </p>
          </div>

          {/* Calculator Form */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="day" className="block text-sm font-semibold text-black mb-2">
                    Day
                  </label>
                  <input
                    type="number"
                    id="day"
                    min="1"
                    max="31"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    placeholder="DD"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="month" className="block text-sm font-semibold text-black mb-2">
                    Month
                  </label>
                  <input
                    type="number"
                    id="month"
                    min="1"
                    max="12"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    placeholder="MM"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-semibold text-black mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    id="year"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="YYYY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                >
                  Calculate Destiny Number
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Result */}
          {result && (
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-xl p-8 mb-8 animate-fadeIn">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">Your Destiny Number</h2>
                <div className="inline-flex items-center justify-center w-28 h-28 bg-white rounded-full shadow-lg mb-4">
                  <span className="text-6xl font-bold text-purple-600">{result.destinyNumber}</span>
                </div>
                {(result.destinyNumber === 11 || result.destinyNumber === 22 || result.destinyNumber === 33) && (
                  <div className="inline-block px-4 py-2 bg-yellow-400 text-black font-bold rounded-full text-sm">
                    ✨ Master Number
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/95 rounded-lg p-6">
                  <h3 className="font-bold text-black mb-3 text-lg">Your Personality</h3>
                  <p className="text-gray-700 leading-relaxed">{result.description}</p>
                </div>
                
                <div className="bg-white/95 rounded-lg p-6">
                  <h3 className="font-bold text-black mb-3 text-lg">Your Life Path</h3>
                  <p className="text-gray-700 leading-relaxed">{result.lifePath}</p>
                </div>
              </div>
            </div>
          )}

          {/* How it works */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-black mb-4 text-lg">How Destiny Number is Calculated</h3>
            <div className="space-y-3 text-gray-700">
              <p>Add all digits from your complete birth date (day + month + year) and reduce to a single digit:</p>
              <div className="bg-white rounded-lg p-4 mt-4">
                <p className="font-semibold text-black mb-2">Example: Born on 15th August 1990</p>
                <ul className="space-y-1 text-sm">
                  <li>• Day: 15 (1+5 = 6)</li>
                  <li>• Month: 8</li>
                  <li>• Year: 1990 (1+9+9+0 = 19 → 1+9 = 10 → 1+0 = 1)</li>
                  <li>• Total: 6 + 8 + 1 = 15</li>
                  <li>• Final: 1 + 5 = 6</li>
                  <li>• <strong>Destiny Number = 6</strong></li>
                </ul>
              </div>
              <p className="text-sm italic mt-3">
                Note: Master numbers 11, 22, and 33 are not reduced further as they carry special spiritual significance.
              </p>
            </div>
          </div>

          {/* Master Numbers */}
          <div className="bg-gradient-to-r from-[#FFD700] to-[#FFF200] rounded-xl p-6">
            <h3 className="font-bold text-black mb-3 text-lg">Master Numbers</h3>
            <p className="text-gray-800 mb-4 text-sm">
              Master numbers (11, 22, 33) are considered special in numerology as they carry higher spiritual vibrations and greater potential.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-2xl font-bold text-purple-600 mb-1">11</div>
                <div className="text-xs font-semibold text-gray-600">The Illuminator</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-2xl font-bold text-purple-600 mb-1">22</div>
                <div className="text-xs font-semibold text-gray-600">The Master Builder</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-2xl font-bold text-purple-600 mb-1">33</div>
                <div className="text-xs font-semibold text-gray-600">The Master Teacher</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}