"use client";

import { useState } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Smartphone } from "lucide-react";
import { toast } from "sonner";

export default function MobileNumerologyCalculator() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [result, setResult] = useState<{
    number: number;
    description: string;
    lucky: boolean;
  } | null>(null);

  const calculateMobileNumerology = (mobile: string): number => {
    const digits = mobile.replace(/\D/g, '');
    let sum = digits.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    return sum;
  };

  const getNumberDescription = (num: number): { description: string; lucky: boolean } => {
    const info: { [key: number]: { description: string; lucky: boolean } } = {
      1: {
        description: "Ruled by Sun. This number brings leadership, independence, and success. Great for business and career growth. It attracts positive energy and new opportunities.",
        lucky: true
      },
      2: {
        description: "Ruled by Moon. This number represents emotions and relationships. It brings harmony but can cause mood swings. Good for creative professionals.",
        lucky: false
      },
      3: {
        description: "Ruled by Jupiter. This is an excellent number bringing prosperity, wisdom, and growth. It enhances communication and attracts wealth.",
        lucky: true
      },
      4: {
        description: "Ruled by Rahu. This number can bring sudden changes and instability. It may cause delays and obstacles. Not recommended for important dealings.",
        lucky: false
      },
      5: {
        description: "Ruled by Mercury. This is a very fortunate number bringing quick success, intelligence, and versatility. Excellent for business and communication.",
        lucky: true
      },
      6: {
        description: "Ruled by Venus. This number attracts luxury, love, and artistic success. Good for relationships and creative ventures. Brings material comfort.",
        lucky: true
      },
      7: {
        description: "Ruled by Ketu. This number is spiritual but can bring isolation and misunderstandings. May cause delays in material gains. Better for spiritual pursuits.",
        lucky: false
      },
      8: {
        description: "Ruled by Saturn. This number can bring delays, obstacles, and hard work. It requires patience and persistence. Not ideal for quick success.",
        lucky: false
      },
      9: {
        description: "Ruled by Mars. This number brings energy, courage, and aggression. Can cause conflicts and accidents. Use with caution in professional dealings.",
        lucky: false
      }
    };
    
    return info[num] || { description: "Invalid number", lucky: false };
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanNumber = mobileNumber.replace(/\D/g, '');
    
    if (cleanNumber.length < 10) {
      toast.error("Please enter a valid mobile number (at least 10 digits)");
      return;
    }

    const numerologyNumber = calculateMobileNumerology(cleanNumber);
    const { description, lucky } = getNumberDescription(numerologyNumber);

    setResult({ number: numerologyNumber, description, lucky });
  };

  const handleReset = () => {
    setMobileNumber("");
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
              <Smartphone className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-black mb-3">Mobile Number Numerology Calculator</h1>
            <p className="text-gray-600 text-lg">
              Discover the numerological significance of your mobile number
            </p>
          </div>

          {/* Info Section */}
          <div className="bg-[#FFF9E6] border-l-4 border-[#FFD700] p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-black mb-2">Why Mobile Number Numerology Matters?</h3>
            <p className="text-gray-700 text-sm">
              Your mobile number is something you use constantly throughout the day. According to numerology, 
              the vibrations of your mobile number can significantly impact your life, relationships, career, and overall luck. 
              Choosing the right mobile number can attract positive energy and success.
            </p>
          </div>

          {/* Calculator Form */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label htmlFor="mobile" className="block text-sm font-semibold text-black mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter your mobile number (e.g., 9876543210)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent text-lg tracking-wider"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter 10-digit mobile number (country code optional)
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                >
                  Calculate Numerology
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
            <div className={`rounded-xl shadow-xl p-8 mb-8 animate-fadeIn ${
              result.lucky 
                ? 'bg-gradient-to-br from-green-400 to-green-500' 
                : 'bg-gradient-to-br from-orange-400 to-orange-500'
            }`}>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 mb-4">
                  <h2 className="text-2xl font-bold text-white">Your Mobile Number Vibration</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    result.lucky ? 'bg-green-900 text-white' : 'bg-orange-900 text-white'
                  }`}>
                    {result.lucky ? '✓ Lucky' : '⚠ Caution'}
                  </span>
                </div>
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-4">
                  <span className="text-5xl font-bold text-black">{result.number}</span>
                </div>
              </div>
              
              <div className="bg-white/95 rounded-lg p-6">
                <h3 className="font-bold text-black mb-3 text-lg">Number Analysis</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{result.description}</p>
                
                {!result.lucky && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                    <p className="text-sm text-orange-800">
                      <strong>Recommendation:</strong> Consider choosing a different mobile number with vibrations of 1, 3, 5, or 6 for better results.
                    </p>
                  </div>
                )}
                
                {result.lucky && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                    <p className="text-sm text-green-800">
                      <strong>Excellent Choice!</strong> This number has positive vibrations that can support your success and wellbeing.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* How it works */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-black mb-4 text-lg">How Mobile Numerology is Calculated</h3>
            <div className="space-y-3 text-gray-700">
              <p>The calculation involves adding all digits of your mobile number and reducing to a single digit:</p>
              <div className="bg-white rounded-lg p-4 mt-4">
                <p className="font-semibold text-black mb-2">Example:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Mobile: 9876543210</li>
                  <li>• Sum: 9+8+7+6+5+4+3+2+1+0 = 45</li>
                  <li>• Reduce: 4+5 = 9</li>
                  <li>• <strong>Result: Your mobile number vibration is 9</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Lucky Numbers */}
          <div className="bg-gradient-to-r from-[#FFD700] to-[#FFF200] rounded-xl p-6">
            <h3 className="font-bold text-black mb-4 text-lg">Lucky Mobile Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1, 3, 5, 6].map((num) => (
                <div key={num} className="bg-white rounded-lg p-3 text-center shadow">
                  <div className="text-2xl font-bold text-black">{num}</div>
                  <div className="text-xs text-gray-600 mt-1">Fortunate</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}