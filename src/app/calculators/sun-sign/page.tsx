"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Sun, Calendar } from "lucide-react";

export default function SunSignCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{
    sign: string;
    signHindi: string;
    element: string;
    rulingPlanet: string;
    dateRange: string;
    traits: string[];
    luckyColor: string;
    luckyNumber: number;
  } | null>(null);

  const zodiacSigns = [
    {
      sign: "Aries",
      signHindi: "मेष (Mesh)",
      element: "अग्नि (Fire)",
      rulingPlanet: "मंगल (Mars)",
      startMonth: 3,
      startDay: 21,
      endMonth: 4,
      endDay: 19,
      dateRange: "21 मार्च - 19 अप्रैल",
      traits: ["साहसी", "ऊर्जावान", "आत्मविश्वासी", "नेतृत्वकर्ता"],
      luckyColor: "लाल (Red)",
      luckyNumber: 9,
    },
    {
      sign: "Taurus",
      signHindi: "वृषभ (Vrishabh)",
      element: "पृथ्वी (Earth)",
      rulingPlanet: "शुक्र (Venus)",
      startMonth: 4,
      startDay: 20,
      endMonth: 5,
      endDay: 20,
      dateRange: "20 अप्रैल - 20 मई",
      traits: ["स्थिर", "विश्वसनीय", "धैर्यवान", "व्यावहारिक"],
      luckyColor: "हरा (Green)",
      luckyNumber: 6,
    },
    {
      sign: "Gemini",
      signHindi: "मिथुन (Mithun)",
      element: "वायु (Air)",
      rulingPlanet: "बुध (Mercury)",
      startMonth: 5,
      startDay: 21,
      endMonth: 6,
      endDay: 20,
      dateRange: "21 मई - 20 जून",
      traits: ["बुद्धिमान", "जिज्ञासु", "मिलनसार", "अनुकूल"],
      luckyColor: "पीला (Yellow)",
      luckyNumber: 5,
    },
    {
      sign: "Cancer",
      signHindi: "कर्क (Kark)",
      element: "जल (Water)",
      rulingPlanet: "चंद्र (Moon)",
      startMonth: 6,
      startDay: 21,
      endMonth: 7,
      endDay: 22,
      dateRange: "21 जून - 22 जुलाई",
      traits: ["भावुक", "संवेदनशील", "देखभाल करने वाला", "रक्षात्मक"],
      luckyColor: "सफेद (White)",
      luckyNumber: 2,
    },
    {
      sign: "Leo",
      signHindi: "सिंह (Simha)",
      element: "अग्नि (Fire)",
      rulingPlanet: "सूर्य (Sun)",
      startMonth: 7,
      startDay: 23,
      endMonth: 8,
      endDay: 22,
      dateRange: "23 जुलाई - 22 अगस्त",
      traits: ["आत्मविश्वासी", "उदार", "रचनात्मक", "नाटकीय"],
      luckyColor: "सुनहरा (Gold)",
      luckyNumber: 1,
    },
    {
      sign: "Virgo",
      signHindi: "कन्या (Kanya)",
      element: "पृथ्वी (Earth)",
      rulingPlanet: "बुध (Mercury)",
      startMonth: 8,
      startDay: 23,
      endMonth: 9,
      endDay: 22,
      dateRange: "23 अगस्त - 22 सितंबर",
      traits: ["विश्लेषणात्मक", "व्यावहारिक", "मेहनती", "विस्तार-उन्मुख"],
      luckyColor: "नीला (Blue)",
      luckyNumber: 5,
    },
    {
      sign: "Libra",
      signHindi: "तुला (Tula)",
      element: "वायु (Air)",
      rulingPlanet: "शुक्र (Venus)",
      startMonth: 9,
      startDay: 23,
      endMonth: 10,
      endDay: 22,
      dateRange: "23 सितंबर - 22 अक्टूबर",
      traits: ["संतुलित", "न्यायप्रिय", "कूटनीतिक", "सामाजिक"],
      luckyColor: "गुलाबी (Pink)",
      luckyNumber: 6,
    },
    {
      sign: "Scorpio",
      signHindi: "वृश्चिक (Vrishchik)",
      element: "जल (Water)",
      rulingPlanet: "मंगल (Mars)",
      startMonth: 10,
      startDay: 23,
      endMonth: 11,
      endDay: 21,
      dateRange: "23 अक्टूबर - 21 नवंबर",
      traits: ["जुनूनी", "रहस्यमय", "दृढ़निश्चयी", "वफादार"],
      luckyColor: "लाल (Red)",
      luckyNumber: 9,
    },
    {
      sign: "Sagittarius",
      signHindi: "धनु (Dhanu)",
      element: "अग्नि (Fire)",
      rulingPlanet: "गुरु (Jupiter)",
      startMonth: 11,
      startDay: 22,
      endMonth: 12,
      endDay: 21,
      dateRange: "22 नवंबर - 21 दिसंबर",
      traits: ["आशावादी", "स्वतंत्र", "साहसी", "दार्शनिक"],
      luckyColor: "बैंगनी (Purple)",
      luckyNumber: 3,
    },
    {
      sign: "Capricorn",
      signHindi: "मकर (Makar)",
      element: "पृथ्वी (Earth)",
      rulingPlanet: "शनि (Saturn)",
      startMonth: 12,
      startDay: 22,
      endMonth: 1,
      endDay: 19,
      dateRange: "22 दिसंबर - 19 जनवरी",
      traits: ["महत्वाकांक्षी", "अनुशासित", "जिम्मेदार", "धैर्यवान"],
      luckyColor: "काला (Black)",
      luckyNumber: 8,
    },
    {
      sign: "Aquarius",
      signHindi: "कुंभ (Kumbh)",
      element: "वायु (Air)",
      rulingPlanet: "शनि (Saturn)",
      startMonth: 1,
      startDay: 20,
      endMonth: 2,
      endDay: 18,
      dateRange: "20 जनवरी - 18 फरवरी",
      traits: ["नवोन्मेषी", "स्वतंत्र", "मानवीय", "बौद्धिक"],
      luckyColor: "नीला (Blue)",
      luckyNumber: 4,
    },
    {
      sign: "Pisces",
      signHindi: "मीन (Meen)",
      element: "जल (Water)",
      rulingPlanet: "गुरु (Jupiter)",
      startMonth: 2,
      startDay: 19,
      endMonth: 3,
      endDay: 20,
      dateRange: "19 फरवरी - 20 मार्च",
      traits: ["कल्पनाशील", "सहानुभूतिपूर्ण", "कलात्मक", "सहज"],
      luckyColor: "समुद्री हरा (Sea Green)",
      luckyNumber: 3,
    },
  ];

  const calculateSunSign = (e: React.FormEvent) => {
    e.preventDefault();

    const date = new Date(birthDate);
    const month = date.getMonth() + 1; // 1-12
    const day = date.getDate();

    let foundSign = zodiacSigns[0]; // Default

    for (const zodiac of zodiacSigns) {
      if (
        (month === zodiac.startMonth && day >= zodiac.startDay) ||
        (month === zodiac.endMonth && day <= zodiac.endDay) ||
        (zodiac.startMonth > zodiac.endMonth &&
          ((month === zodiac.startMonth && day >= zodiac.startDay) ||
            (month === zodiac.endMonth && day <= zodiac.endDay)))
      ) {
        foundSign = zodiac;
        break;
      }
    }

    setResult({
      sign: foundSign.sign,
      signHindi: foundSign.signHindi,
      element: foundSign.element,
      rulingPlanet: foundSign.rulingPlanet,
      dateRange: foundSign.dateRange,
      traits: foundSign.traits,
      luckyColor: foundSign.luckyColor,
      luckyNumber: foundSign.luckyNumber,
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
                <Sun className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              सूर्य राशि कैलकुलेटर
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              अपनी जन्म तिथि से सूर्य राशि जानें
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={calculateSunSign} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    जन्म तिथि <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  सूर्य राशि की गणना करें
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {result && (
        <section className="py-12 bg-gradient-to-b from-[#FFD700]/10 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <div className="inline-block bg-gradient-to-r from-[#FFD700] to-[#FFF200] p-6 rounded-full mb-4">
                    <Sun className="w-16 h-16 text-black" />
                  </div>
                  <h2 className="text-3xl font-bold text-black mb-2">
                    आपकी सूर्य राशि
                  </h2>
                  <p className="text-4xl font-bold text-[#FFD700] mb-1">
                    {result.signHindi}
                  </p>
                  <p className="text-xl text-gray-600 mb-2">{result.sign}</p>
                  <p className="text-sm text-gray-500">{result.dateRange}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-5 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">तत्व</p>
                    <p className="text-xl font-bold text-black">{result.element}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">स्वामी ग्रह</p>
                    <p className="text-xl font-bold text-black">{result.rulingPlanet}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">भाग्यशाली रंग</p>
                    <p className="text-xl font-bold text-black">{result.luckyColor}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">भाग्यशाली अंक</p>
                    <p className="text-xl font-bold text-black">{result.luckyNumber}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#FFD700]/10 to-transparent p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-black mb-3">
                    विशेषताएं:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="bg-[#FFD700] text-black px-4 py-2 rounded-full text-sm font-semibold"
                      >
                        {trait}
                      </span>
                    ))}
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
