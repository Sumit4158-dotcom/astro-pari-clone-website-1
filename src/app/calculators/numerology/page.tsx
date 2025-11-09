"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Hash, Calendar, User } from "lucide-react";

export default function NumerologyCalculatorPage() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateLifePathNumber = (date: string): number => {
    const digits = date.replace(/\D/g, '');
    let sum = 0;
    for (const digit of digits) {
      sum += parseInt(digit);
    }
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return sum;
  };

  const calculateDestinyNumber = (fullName: string): number => {
    const values: any = {
      a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,
      j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,
      s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8
    };
    let sum = 0;
    for (const char of fullName.toLowerCase().replace(/\s/g, '')) {
      if (values[char]) sum += values[char];
    }
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return sum;
  };

  const getNumberMeaning = (num: number): string => {
    const meanings: any = {
      1: "नेतृत्व और स्वतंत्रता",
      2: "सहयोग और संतुलन",
      3: "रचनात्मकता और अभिव्यक्ति",
      4: "स्थिरता और व्यवस्था",
      5: "स्वतंत्रता और परिवर्तन",
      6: "जिम्मेदारी और देखभाल",
      7: "आध्यात्मिकता और ज्ञान",
      8: "शक्ति और सफलता",
      9: "मानवता और करुणा",
      11: "आध्यात्मिक दूत",
      22: "मास्टर बिल्डर",
      33: "मास्टर शिक्षक"
    };
    return meanings[num] || "विशेष";
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const lifePath = calculateLifePathNumber(dob);
    const destiny = calculateDestinyNumber(name);
    
    setResult({
      lifePathNumber: lifePath,
      destinyNumber: destiny,
      lifePathMeaning: getNumberMeaning(lifePath),
      destinyMeaning: getNumberMeaning(destiny)
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-black/10 p-4 rounded-full">
                <Hash className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              अंक ज्योतिष कैलकुलेटर
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              अपने जीवन पथ और भाग्य अंक जानें
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={calculate} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    पूरा नाम <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="अपना पूरा नाम दर्ज करें"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    जन्म तिथि <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  अंक गणना करें
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {result && (
        <section className="py-12 bg-gradient-to-b from-[#FFD700]/10 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-black mb-4">जीवन पथ अंक</h3>
                <div className="text-5xl font-bold text-[#FFD700] mb-2">
                  {result.lifePathNumber}
                </div>
                <p className="text-lg text-gray-700">{result.lifePathMeaning}</p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-black mb-4">भाग्य अंक</h3>
                <div className="text-5xl font-bold text-[#FFD700] mb-2">
                  {result.destinyNumber}
                </div>
                <p className="text-lg text-gray-700">{result.destinyMeaning}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
