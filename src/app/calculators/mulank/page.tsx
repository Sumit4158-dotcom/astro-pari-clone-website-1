"use client";

import { useState } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Calculator } from "lucide-react";
import { toast } from "sonner";

export default function MulankCalculator() {
  const [day, setDay] = useState("");
  const [result, setResult] = useState<{
    mulank: number;
    description: string;
  } | null>(null);

  const calculateMulank = (birthDay: number): number => {
    let sum = birthDay;
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;
  };

  const getMulankDescription = (mulank: number): string => {
    const descriptions: { [key: number]: string } = {
      1: "Sun rules this number. You are ambitious, independent, and natural leaders. You have strong willpower and determination.",
      2: "Moon rules this number. You are emotional, sensitive, and intuitive. You value relationships and harmony.",
      3: "Jupiter rules this number. You are optimistic, creative, and expressive. You have excellent communication skills.",
      4: "Rahu rules this number. You are practical, disciplined, and hardworking. You prefer stability and structure.",
      5: "Mercury rules this number. You are versatile, adventurous, and quick-thinking. You love change and freedom.",
      6: "Venus rules this number. You are loving, artistic, and responsible. You value beauty and harmony.",
      7: "Ketu rules this number. You are spiritual, analytical, and introspective. You seek knowledge and wisdom.",
      8: "Saturn rules this number. You are ambitious, organized, and persistent. You value material success.",
      9: "Mars rules this number. You are courageous, energetic, and compassionate. You are natural humanitarians."
    };
    return descriptions[mulank] || "Invalid Mulank number";
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const birthDay = parseInt(day);
    
    if (isNaN(birthDay) || birthDay < 1 || birthDay > 31) {
      toast.error("Please enter a valid day (1-31)");
      return;
    }

    const mulank = calculateMulank(birthDay);
    const description = getMulankDescription(mulank);

    setResult({ mulank, description });
  };

  const handleReset = () => {
    setDay("");
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
              <Calculator className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-black mb-3">Mulank Calculator</h1>
            <p className="text-gray-600 text-lg">
              Calculate your Mulank (Driver Number) based on your birth date
            </p>
          </div>

          {/* Info Section */}
          <div className="bg-[#FFF9E6] border-l-4 border-[#FFD700] p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-black mb-2">What is Mulank?</h3>
            <p className="text-gray-700 text-sm">
              Mulank, also known as the Driver Number or Moolank, is one of the most important numbers in Vedic numerology. 
              It is calculated from your birth date (day only) and represents your basic nature, personality traits, and how you present yourself to the world.
            </p>
          </div>

          {/* Calculator Form */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label htmlFor="day" className="block text-sm font-semibold text-black mb-2">
                  Birth Day (Date of Birth)
                </label>
                <input
                  type="number"
                  id="day"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="Enter day (1-31)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: If born on 15th, enter 15
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                >
                  Calculate Mulank
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
            <div className="bg-gradient-to-br from-[#FFD700] to-[#FFF200] rounded-xl shadow-xl p-8 mb-8 animate-fadeIn">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-black mb-2">Your Mulank</h2>
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-4">
                  <span className="text-5xl font-bold text-black">{result.mulank}</span>
                </div>
              </div>
              
              <div className="bg-white/90 rounded-lg p-6">
                <h3 className="font-bold text-black mb-3 text-lg">Personality Traits</h3>
                <p className="text-gray-700 leading-relaxed">{result.description}</p>
              </div>
            </div>
          )}

          {/* How it works */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-black mb-4 text-lg">How Mulank is Calculated</h3>
            <div className="space-y-3 text-gray-700">
              <p>Mulank is calculated by reducing your birth date (day) to a single digit:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>If you are born on 1st to 9th: Your Mulank is the same as your birth date</li>
                <li>If you are born on 10th to 31st: Add the digits until you get a single digit</li>
              </ul>
              <div className="bg-white rounded-lg p-4 mt-4">
                <p className="font-semibold text-black mb-2">Examples:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Birth Date: 5 → Mulank = 5</li>
                  <li>• Birth Date: 15 → 1 + 5 = 6 → Mulank = 6</li>
                  <li>• Birth Date: 28 → 2 + 8 = 10 → 1 + 0 = 1 → Mulank = 1</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}