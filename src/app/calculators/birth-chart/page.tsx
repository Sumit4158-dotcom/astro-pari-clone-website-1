"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Calendar, Clock, MapPin, User, Star } from "lucide-react";

interface BirthChartData {
  name: string;
  date: string;
  time: string;
  place: string;
}

interface ChartResults {
  sunSign: string;
  moonSign: string;
  ascendant: string;
  planetaryPositions: {
    planet: string;
    sign: string;
    house: number;
  }[];
  doshaAnalysis: {
    mangalDosha: string;
    kalSarpDosha: string;
    pitruDosha: string;
  };
  strengths: string[];
  challenges: string[];
  recommendations: string[];
}

// Calculation helper functions
const getZodiacSign = (date: string): string => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "मेष राशि (Aries)";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "वृषभ राशि (Taurus)";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "मिथुन राशि (Gemini)";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "कर्क राशि (Cancer)";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "सिंह राशि (Leo)";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "कन्या राशि (Virgo)";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "तुला राशि (Libra)";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "वृश्चिक राशि (Scorpio)";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "धनु राशि (Sagittarius)";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "मकर राशि (Capricorn)";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "कुम्भ राशि (Aquarius)";
  return "मीन राशि (Pisces)";
};

const getAscendant = (time: string): string => {
  if (!time) return "मेष लग्न (Aries Ascendant)";
  const [hours] = time.split(':').map(Number);
  const ascendants = [
    "मेष लग्न (Aries)",
    "वृषभ लग्न (Taurus)",
    "मिथुन लग्न (Gemini)",
    "कर्क लग्न (Cancer)",
    "सिंह लग्न (Leo)",
    "कन्या लग्न (Virgo)",
    "तुला लग्न (Libra)",
    "वृश्चिक लग्न (Scorpio)",
    "धनु लग्न (Sagittarius)",
    "मकर लग्न (Capricorn)",
    "कुम्भ लग्न (Aquarius)",
    "मीन लग्न (Pisces)",
  ];
  return ascendants[Math.floor(hours / 2) % 12];
};

const getMoonSign = (date: string): string => {
  const signs = [
    "मेष राशि (Aries)",
    "वृषभ राशि (Taurus)",
    "मिथुन राशि (Gemini)",
    "कर्क राशि (Cancer)",
    "सिंह राशि (Leo)",
    "कन्या राशि (Virgo)",
    "तुला राशि (Libra)",
    "वृश्चिक राशि (Scorpio)",
    "धनु राशि (Sagittarius)",
    "मकर राशि (Capricorn)",
    "कुम्भ राशि (Aquarius)",
    "मीन राशि (Pisces)",
  ];
  const d = new Date(date);
  return signs[d.getDate() % 12];
};

const calculatePlanetaryPositions = (date: string, time: string) => {
  const signs = ["मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या", "तुला", "वृश्चिक", "धनु", "मकर", "कुम्भ", "मीन"];
  const d = new Date(date);
  const dayOfYear = Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000);
  
  return [
    { planet: "सूर्य (Sun)", sign: signs[Math.floor(dayOfYear / 30) % 12], house: (dayOfYear % 12) + 1 },
    { planet: "चंद्र (Moon)", sign: signs[(dayOfYear % 12)], house: ((dayOfYear + 2) % 12) + 1 },
    { planet: "मंगल (Mars)", sign: signs[(dayOfYear * 2) % 12], house: ((dayOfYear + 4) % 12) + 1 },
    { planet: "बुध (Mercury)", sign: signs[(dayOfYear + 10) % 12], house: ((dayOfYear + 1) % 12) + 1 },
    { planet: "गुरु (Jupiter)", sign: signs[(dayOfYear / 12) % 12 | 0], house: ((dayOfYear + 9) % 12) + 1 },
    { planet: "शुक्र (Venus)", sign: signs[(dayOfYear + 5) % 12], house: ((dayOfYear + 11) % 12) + 1 },
    { planet: "शनि (Saturn)", sign: signs[(dayOfYear / 30) % 12 | 0], house: ((dayOfYear + 10) % 12) + 1 },
    { planet: "राहु (Rahu)", sign: signs[(11 - (dayOfYear / 18) % 12) | 0], house: ((dayOfYear + 3) % 12) + 1 },
    { planet: "केतु (Ketu)", sign: signs[(5 + (dayOfYear / 18) % 12) | 0], house: ((dayOfYear + 9) % 12) + 1 },
  ];
};

export default function BirthChartPage() {
  const [formData, setFormData] = useState<BirthChartData>({
    name: "",
    date: "",
    time: "",
    place: "",
  });

  const [results, setResults] = useState<ChartResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateBirthChart = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    // Simulate calculation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const sunSign = getZodiacSign(formData.date);
    const moonSign = getMoonSign(formData.date);
    const ascendant = getAscendant(formData.time);
    const planetaryPositions = calculatePlanetaryPositions(formData.date, formData.time);

    // Calculate doshas based on planetary positions
    const mangalHouse = planetaryPositions.find(p => p.planet === "मंगल (Mars)")?.house || 0;
    const hasMangalDosha = [1, 2, 4, 7, 8, 12].includes(mangalHouse);

    const calculatedResults: ChartResults = {
      sunSign,
      moonSign,
      ascendant,
      planetaryPositions,
      doshaAnalysis: {
        mangalDosha: hasMangalDosha ? "हां (Yes)" : "नहीं (No)",
        kalSarpDosha: planetaryPositions[7].house < planetaryPositions[8].house ? "हां (Yes) - आंशिक" : "नहीं (No)",
        pitruDosha: planetaryPositions[7].house === 9 || planetaryPositions[8].house === 9 ? "हां (Yes)" : "नहीं (No)",
      },
      strengths: [
        `${ascendant.split(' ')[0]} की मजबूत स्थिति - अच्छा व्यक्तित्व`,
        `${moonSign.split(' ')[0]} में चंद्रमा - भावनात्मक बुद्धि`,
        "गुरु की स्थिति - ज्ञान और विकास में वृद्धि",
        "सूर्य का प्रभाव - नेतृत्व क्षमता",
      ],
      challenges: [
        hasMangalDosha ? "मंगल दोष - विवाह में सावधानी" : "शनि का प्रभाव - धैर्य की आवश्यकता",
        "राहु-केतु अक्ष - आध्यात्मिक विकास आवश्यक",
        "ग्रहों का संतुलन - नियमित पूजा-पाठ करें",
      ],
      recommendations: [
        `${sunSign.includes("मेष") || sunSign.includes("सिंह") ? "सूर्य" : "चंद्र"} मंत्र का नियमित जाप`,
        hasMangalDosha ? "मंगलवार को हनुमान चालीसा पाठ" : "शनिवार को शनि मंदिर जाएं",
        `${moonSign.includes("वृषभ") || moonSign.includes("तुला") ? "चांदी" : "तांबे"} की अंगूठी धारण करें`,
        "नवग्रह शांति पूजा करवाएं",
        "गायत्री मंत्र का नियमित पाठ",
      ],
    };

    setResults(calculatedResults);
    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-black/10 p-4 rounded-full">
                <Star className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              जन्म कुंडली कैलकुलेटर
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              अपनी जन्म विवरण भरें और अपनी संपूर्ण कुंडली देखें
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <h2 className="text-2xl font-bold text-black mb-6 text-center">
                अपनी जन्म जानकारी भरें
              </h2>

              <form onSubmit={calculateBirthChart} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    नाम (Name) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="अपना नाम दर्ज करें"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Birth Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    जन्म तिथि (Birth Date) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Birth Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    जन्म समय (Birth Time) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Birth Place */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    जन्म स्थान (Birth Place) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.place}
                      onChange={(e) =>
                        setFormData({ ...formData, place: e.target.value })
                      }
                      placeholder="जैसे: दिल्ली, मुंबई, आदि"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isCalculating}
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 disabled:bg-gray-400 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {isCalculating ? "गणना हो रही है..." : "कुंडली बनाएं"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {results && (
        <section className="py-12 bg-gradient-to-b from-[#FFD700]/10 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
                  आपकी जन्म कुंडली
                </h2>
                <p className="text-gray-600">
                  {formData.name} - {formData.date}
                </p>
              </div>

              {/* Basic Info */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                  <h3 className="font-semibold text-gray-700 mb-2">सूर्य राशि</h3>
                  <p className="text-xl font-bold text-black">{results.sunSign}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                  <h3 className="font-semibold text-gray-700 mb-2">चंद्र राशि</h3>
                  <p className="text-xl font-bold text-black">{results.moonSign}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                  <h3 className="font-semibold text-gray-700 mb-2">लग्न</h3>
                  <p className="text-xl font-bold text-black">{results.ascendant}</p>
                </div>
              </div>

              {/* Planetary Positions */}
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-8">
                <h3 className="text-2xl font-bold text-black mb-6">ग्रह स्थिति</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {results.planetaryPositions.map((pos, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-[#FFD700]/10 rounded-lg"
                    >
                      <span className="font-semibold text-black">{pos.planet}</span>
                      <span className="text-gray-700">
                        {pos.sign} - भाव {pos.house}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dosha Analysis */}
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-8">
                <h3 className="text-2xl font-bold text-black mb-6">दोष विश्लेषण</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">मंगल दोष</span>
                    <span className="font-bold text-black">
                      {results.doshaAnalysis.mangalDosha}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">काल सर्प दोष</span>
                    <span className="font-bold text-black">
                      {results.doshaAnalysis.kalSarpDosha}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">पितृ दोष</span>
                    <span className="font-bold text-black">
                      {results.doshaAnalysis.pitruDosha}
                    </span>
                  </div>
                </div>
              </div>

              {/* Strengths */}
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-8">
                <h3 className="text-2xl font-bold text-black mb-6">मजबूत पक्ष</h3>
                <ul className="space-y-3">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#FFD700] rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-8">
                <h3 className="text-2xl font-bold text-black mb-6">सुधार के क्षेत्र</h3>
                <ul className="space-y-3">
                  {results.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] rounded-xl p-6 md:p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-black mb-6">
                  ज्योतिषी की सलाह और उपाय
                </h3>
                <ul className="space-y-3">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-900 font-medium">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="text-center mt-8">
                <p className="text-gray-700 mb-4">
                  विस्तृत विश्लेषण और व्यक्तिगत सलाह के लिए
                </p>
                <button className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg">
                  ज्योतिषी से बात करें
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-6 text-center">
              जन्म कुंडली क्यों महत्वपूर्ण है?
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                जन्म कुंडली आपके जन्म के समय ग्रहों की स्थिति का एक नक्शा है। यह आपके
                व्यक्तित्व, करियर, रिश्ते, स्वास्थ्य और जीवन के अन्य महत्वपूर्ण पहलुओं के
                बारे में मूल्यवान जानकारी प्रदान करती है।
              </p>
              <p>
                एक सटीक जन्म कुंडली विश्लेषण आपको अपनी ताकत और कमजोरियों को समझने में मदद
                करता है, और आपको जीवन में बेहतर निर्णय लेने में सहायता करता है।
              </p>
              <p className="font-semibold text-black">
                नोट: यह एक सामान्य कुंडली विश्लेषण है। विस्तृत और सटीक विश्लेषण के लिए
                हमारे अनुभवी ज्योतिषियों से परामर्श करें।
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
