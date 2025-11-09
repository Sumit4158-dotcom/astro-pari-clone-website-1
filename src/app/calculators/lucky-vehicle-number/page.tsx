"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Car, Calendar } from "lucide-react";

export default function LuckyVehicleNumberPage() {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [result, setResult] = useState<{
    luckyNumbers: number[];
    description: string;
  } | null>(null);

  const calculateLuckyNumber = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert date to digits and calculate life path number
    const digits = dateOfBirth.replace(/\D/g, '');
    let sum = 0;
    
    for (let digit of digits) {
      sum += parseInt(digit);
    }
    
    // Reduce to single digit (life path number)
    while (sum > 9 && sum !== 11 && sum !== 22) {
      sum = sum.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
    }
    
    const lifePath = sum;
    
    // Generate lucky vehicle numbers based on life path number
    const luckyNumbers: number[] = [];
    const descriptions: { [key: number]: string } = {
      1: 'आपके लिए वाहन संख्या 1, 10, 19, 28, 37, 46, 55 शुभ हैं। सूर्य आपका शासक ग्रह है।',
      2: 'आपके लिए वाहन संख्या 2, 11, 20, 29, 38, 47, 56 शुभ हैं। चंद्रमा आपका शासक ग्रह है।',
      3: 'आपके लिए वाहन संख्या 3, 12, 21, 30, 39, 48, 57 शुभ हैं। गुरु (बृहस्पति) आपका शासक ग्रह है।',
      4: 'आपके लिए वाहन संख्या 4, 13, 22, 31, 40, 49, 58 शुभ हैं। राहु आपका शासक ग्रह है।',
      5: 'आपके लिए वाहन संख्या 5, 14, 23, 32, 41, 50, 59 शुभ हैं। बुध आपका शासक ग्रह है।',
      6: 'आपके लिए वाहन संख्या 6, 15, 24, 33, 42, 51, 60 शुभ हैं। शुक्र आपका शासक ग्रह है।',
      7: 'आपके लिए वाहन संख्या 7, 16, 25, 34, 43, 52, 61 शुभ हैं। केतु आपका शासक ग्रह है।',
      8: 'आपके लिए वाहन संख्या 8, 17, 26, 35, 44, 53, 62 शुभ हैं। शनि आपका शासक ग्रह है।',
      9: 'आपके लिए वाहन संख्या 9, 18, 27, 36, 45, 54, 63 शुभ हैं। मंगल आपका शासक ग्रह है।',
      11: 'आपके लिए वाहन संख्या 11, 29, 38, 47, 56 शुभ हैं। मास्टर नंबर 11 विशेष ऊर्जा लाता है।',
      22: 'आपके लिए वाहन संख्या 22, 44, 55, 66, 77 शुभ हैं। मास्टर नंबर 22 महान शक्ति का प्रतीक है।'
    };
    
    // Generate lucky numbers
    for (let i = 0; i < 7; i++) {
      luckyNumbers.push(lifePath + (i * 9));
    }
    
    setResult({
      luckyNumbers,
      description: descriptions[lifePath] || descriptions[lifePath % 9 || 9]
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
                <Car className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Lucky Vehicle Number Calculator
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              अपनी जन्म तिथि से शुभ वाहन संख्या जानें
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={calculateLuckyNumber} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    जन्म तिथि <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  शुभ वाहन संख्या जानें
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
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    आपकी शुभ वाहन संख्याएं
                  </h3>
                </div>
                
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                  {result.luckyNumbers.map((num, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-[#FFD700] to-[#FFF200] rounded-lg p-4 text-center"
                    >
                      <span className="text-2xl font-bold text-black">{num}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 text-center leading-relaxed">
                    {result.description}
                  </p>
                </div>
                
                <div className="mt-6 text-center text-sm text-gray-600">
                  <p>💡 सुझाव: इन संख्याओं वाले वाहन आपके लिए सौभाग्य और समृद्धि लाएंगे।</p>
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
