"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Users, User } from "lucide-react";

export default function FriendshipCalculatorPage() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<{
    percentage: number;
    message: string;
    level: string;
  } | null>(null);

  const calculateFriendship = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate based on name compatibility
    let n1 = name1.toLowerCase().replace(/\s/g, '');
    let n2 = name2.toLowerCase().replace(/\s/g, '');
    
    // Count common characters
    let commonChars = 0;
    let tempN2 = n2;
    
    for (let char of n1) {
      if (tempN2.includes(char)) {
        commonChars++;
        tempN2 = tempN2.replace(char, '');
      }
    }
    
    // Calculate name length compatibility
    const lengthDiff = Math.abs(n1.length - n2.length);
    const avgLength = (n1.length + n2.length) / 2;
    
    // Calculate percentage (weighted formula)
    const commonScore = (commonChars / avgLength) * 40;
    const lengthScore = (1 - (lengthDiff / avgLength)) * 30;
    
    // Add random factor for uniqueness (based on ASCII values)
    let asciiSum = 0;
    for (let char of (n1 + n2)) {
      asciiSum += char.charCodeAt(0);
    }
    const randomScore = (asciiSum % 30) + 1;
    
    const percentage = Math.min(100, Math.round(commonScore + lengthScore + randomScore));
    
    // Determine friendship level and message
    let level = '';
    let message = '';
    
    if (percentage >= 90) {
      level = 'सच्चे दोस्त (Best Friends Forever)';
      message = 'आप दोनों एक-दूसरे के सच्चे दोस्त हैं! आपकी दोस्ती अटूट है।';
    } else if (percentage >= 75) {
      level = 'बहुत अच्छे दोस्त (Great Friends)';
      message = 'आप दोनों बेहतरीन दोस्त हैं और एक-दूसरे को अच्छी तरह समझते हैं।';
    } else if (percentage >= 60) {
      level = 'अच्छे दोस्त (Good Friends)';
      message = 'आप दोनों अच्छे दोस्त हैं और साथ में मजे करते हैं।';
    } else if (percentage >= 45) {
      level = 'दोस्त (Friends)';
      message = 'आप दोनों दोस्त हैं और अच्छा समय बिताते हैं।';
    } else if (percentage >= 30) {
      level = 'जान-पहचान (Acquaintances)';
      message = 'आप दोनों एक-दूसरे को जानते हैं, दोस्ती और गहरी हो सकती है।';
    } else {
      level = 'नए परिचित (New Friends)';
      message = 'आप दोनों को एक-दूसरे को और बेहतर जानने की जरूरत है।';
    }
    
    setResult({ percentage, message, level });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-black/10 p-4 rounded-full">
                <Users className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Friendship Calculator
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              अपनी दोस्ती की मजबूती जानें
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={calculateFriendship} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    आपका नाम <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name1}
                      onChange={(e) => setName1(e.target.value)}
                      placeholder="अपना नाम दर्ज करें"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    दोस्त का नाम <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name2}
                      onChange={(e) => setName2(e.target.value)}
                      placeholder="दोस्त का नाम दर्ज करें"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Friendship गणना करें
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {result && (
        <section className="py-12 bg-gradient-to-b from-[#FFD700]/10 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-black mb-4">
                    {name1} & {name2}
                  </h3>
                  
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <svg className="transform -rotate-90" width="192" height="192">
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="#E5E7EB"
                        strokeWidth="16"
                        fill="none"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="#FFD700"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${(result.percentage / 100) * 502.4} 502.4`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-black">{result.percentage}%</div>
                        <div className="text-sm text-gray-600 mt-1">Friendship</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#FFD700] to-[#FFF200] rounded-lg p-4 mb-4">
                    <p className="text-xl font-bold text-black">{result.level}</p>
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed">{result.message}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">👥</div>
                    <p className="text-sm text-gray-600">
                      {result.percentage >= 70 ? 'मजबूत बंधन' : 'बढ़ती दोस्ती'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">
                      {result.percentage >= 90 ? '💯' : result.percentage >= 70 ? '🌟' : '✨'}
                    </div>
                    <p className="text-sm text-gray-600">
                      {result.percentage >= 90 ? 'परफेक्ट मैच' : result.percentage >= 70 ? 'बहुत अच्छा' : 'अच्छा'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
