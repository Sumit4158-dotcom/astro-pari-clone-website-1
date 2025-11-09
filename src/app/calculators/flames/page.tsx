"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Flame, User } from "lucide-react";

export default function FlamesCalculatorPage() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<string>("");

  const calculateFlames = (e: React.FormEvent) => {
    e.preventDefault();
    
    let n1 = name1.toLowerCase().replace(/\s/g, '');
    let n2 = name2.toLowerCase().replace(/\s/g, '');
    
    // Remove common characters
    for (let char of n1) {
      if (n2.includes(char)) {
        n1 = n1.replace(char, '');
        n2 = n2.replace(char, '');
      }
    }
    
    const count = n1.length + n2.length;
    const flames = ['Friends', 'Lovers', 'Affectionate', 'Marriage', 'Enemies', 'Siblings'];
    let index = 0;
    let flamesList = [...flames];
    
    while (flamesList.length > 1) {
      index = (index + count - 1) % flamesList.length;
      flamesList.splice(index, 1);
      if (index === flamesList.length) index = 0;
    }
    
    const flamesHindi: any = {
      'Friends': 'दोस्त (Friends) - आप दोनों बेहतरीन दोस्त बन सकते हैं!',
      'Lovers': 'प्रेमी (Lovers) - आप दोनों एक दूसरे से प्यार करते हैं!',
      'Affectionate': 'स्नेही (Affectionate) - आपके बीच गहरा स्नेह है!',
      'Marriage': 'विवाह (Marriage) - आप दोनों शादी के लिए बने हैं!',
      'Enemies': 'दुश्मन (Enemies) - रिश्ता चुनौतीपूर्ण हो सकता है!',
      'Siblings': 'भाई-बहन (Siblings) - आप भाई-बहन जैसे हैं!'
    };
    
    setResult(flamesHindi[flamesList[0]]);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-black/10 p-4 rounded-full">
                <Flame className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              FLAMES कैलकुलेटर
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              अपने रिश्ते का प्रकार जानें
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={calculateFlames} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    पहला नाम <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name1}
                      onChange={(e) => setName1(e.target.value)}
                      placeholder="पहला नाम दर्ज करें"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    दूसरा नाम <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name2}
                      onChange={(e) => setName2(e.target.value)}
                      placeholder="दूसरा नाम दर्ज करें"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  FLAMES गणना करें
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
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <h3 className="text-2xl font-bold text-black mb-4">
                  {name1} & {name2}
                </h3>
                <div className="text-6xl mb-6">
                  {result.includes('Friends') && '👫'}
                  {result.includes('Lovers') && '💑'}
                  {result.includes('Affectionate') && '🤗'}
                  {result.includes('Marriage') && '💍'}
                  {result.includes('Enemies') && '😡'}
                  {result.includes('Siblings') && '👨‍👩‍👧‍👦'}
                </div>
                <p className="text-xl text-gray-700 font-semibold">{result}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
