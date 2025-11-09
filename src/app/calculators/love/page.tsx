"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Heart, User } from "lucide-react";

export default function LoveCalculatorPage() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateLove = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Love calculation algorithm
    const combined = (name1 + name2).toLowerCase().replace(/\s/g, '');
    let sum = 0;
    for (let i = 0; i < combined.length; i++) {
      sum += combined.charCodeAt(i);
    }
    const lovePercentage = (sum % 101);
    setResult(lovePercentage);
  };

  const getCompatibilityMessage = (percentage: number) => {
    if (percentage >= 90) return "अद्भुत जोड़ी! 💕 आप दोनों एक दूसरे के लिए बने हैं।";
    if (percentage >= 70) return "बहुत अच्छी अनुकूलता! ❤️ आपका रिश्ता मजबूत हो सकता है।";
    if (percentage >= 50) return "अच्छी संभावना! 💖 थोड़े प्रयास से बेहतर हो सकता है।";
    if (percentage >= 30) return "चुनौतीपूर्ण! 💔 समझ और संवाद जरूरी है।";
    return "मुश्किल! 💭 धैर्य और प्रयास की जरूरत है।";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-black/10 p-4 rounded-full">
                <Heart className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              प्यार कैलकुलेटर
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              अपनी और अपने पार्टनर की अनुकूलता जानें
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={calculateLove} className="space-y-6">
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
                    पार्टनर का नाम <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name2}
                      onChange={(e) => setName2(e.target.value)}
                      placeholder="पार्टनर का नाम दर्ज करें"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  प्यार की गणना करें
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {result !== null && (
        <section className="py-12 bg-gradient-to-b from-[#FFD700]/10 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-black mb-4">
                  {name1} ❤️ {name2}
                </h2>
                <div className="mb-6">
                  <div className="text-6xl font-bold text-[#FFD700] mb-2">
                    {result}%
                  </div>
                  <p className="text-xl text-gray-700">
                    {getCompatibilityMessage(result)}
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-red-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${result}%` }}
                  ></div>
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
