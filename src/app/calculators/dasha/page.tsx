"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Clock, Calendar, MapPin } from "lucide-react";

type DashaResult = {
  planet: string;
  planetHindi: string;
  startDate: string;
  endDate: string;
  years: number;
  currentAge: number;
  effects: string[];
  remedies: string[];
  subDashas: Array<{
    planet: string;
    planetHindi: string;
    duration: string;
  }>;
};

export default function DashaCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [result, setResult] = useState<{
    currentDasha: DashaResult;
    upcomingDasha: DashaResult;
  } | null>(null);

  const dashaSequence = [
    { planet: "Sun", planetHindi: "सूर्य", years: 6 },
    { planet: "Moon", planetHindi: "चंद्र", years: 10 },
    { planet: "Mars", planetHindi: "मंगल", years: 7 },
    { planet: "Rahu", planetHindi: "राहु", years: 18 },
    { planet: "Jupiter", planetHindi: "गुरु", years: 16 },
    { planet: "Saturn", planetHindi: "शनि", years: 19 },
    { planet: "Mercury", planetHindi: "बुध", years: 17 },
    { planet: "Ketu", planetHindi: "केतु", years: 7 },
    { planet: "Venus", planetHindi: "शुक्र", years: 20 }
  ];

  const dashaEffects: Record<string, string[]> = {
    "Sun": ["आत्मविश्वास में वृद्धि", "सत्ता और पद प्राप्ति", "पिता से संबंध", "सरकारी कार्यों में सफलता"],
    "Moon": ["मानसिक शांति", "माता से संबंध", "यात्राएं", "भावनात्मक विकास"],
    "Mars": ["ऊर्जा और साहस", "भूमि-संपत्ति लाभ", "भाइयों से संबंध", "प्रतिस्पर्धा में सफलता"],
    "Rahu": ["अचानक परिवर्तन", "विदेश यात्रा", "तकनीकी ज्ञान", "भौतिक लाभ"],
    "Jupiter": ["ज्ञान और शिक्षा", "आध्यात्मिक विकास", "विवाह और संतान", "धन-समृद्धि"],
    "Saturn": ["कठिन परिश्रम", "जिम्मेदारियां", "धैर्य की परीक्षा", "देरी से फल"],
    "Mercury": ["बुद्धि और संचार", "व्यापार में सफलता", "शिक्षा में उन्नति", "लेखन कार्य"],
    "Ketu": ["आध्यात्मिकता", "अलगाव की भावना", "पुराने कर्मों के फल", "मोक्ष की ओर"],
    "Venus": ["प्रेम और रोमांस", "विलासिता", "कला में रुचि", "वैवाहिक सुख"]
  };

  const dashaRemedies: Record<string, string[]> = {
    "Sun": ["सूर्योदय के समय सूर्य को जल अर्पित करें", "रूबी या माणिक धारण करें", "पिता की सेवा करें"],
    "Moon": ["सोमवार को व्रत रखें", "मोती धारण करें", "माता की सेवा करें"],
    "Mars": ["मंगलवार को हनुमान जी की पूजा करें", "मूंगा धारण करें", "भूमि दान करें"],
    "Rahu": ["राहु के मंत्र का जाप करें", "गोमेद धारण करें", "काले कुत्ते को भोजन दें"],
    "Jupiter": ["गुरुवार को व्रत रखें", "पुखराज धारण करें", "गुरुजनों की सेवा करें"],
    "Saturn": ["शनिवार को शनि देव की पूजा करें", "नीलम धारण करें (विशेषज्ञ से परामर्श के बाद)", "गरीबों की सहायता करें"],
    "Mercury": ["बुधवार को व्रत रखें", "पन्ना धारण करें", "विद्यार्थियों की मदद करें"],
    "Ketu": ["केतु के मंत्र का जाप करें", "लहसुनिया धारण करें", "ध्यान और योग करें"],
    "Venus": ["शुक्रवार को लक्ष्मी जी की पूजा करें", "हीरा या सफेद नग धारण करें", "स्त्रियों का सम्मान करें"]
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const calculateDasha = (e: React.FormEvent) => {
    e.preventDefault();

    if (!birthDate || !birthTime || !birthPlace) {
      return;
    }

    const age = calculateAge(birthDate);
    
    // Calculate which dasha based on age
    let totalYears = 0;
    let currentDashaIndex = 0;
    
    // Total cycle is 120 years, find current position
    const effectiveAge = age % 120;
    
    for (let i = 0; i < dashaSequence.length; i++) {
      if (totalYears + dashaSequence[i].years > effectiveAge) {
        currentDashaIndex = i;
        break;
      }
      totalYears += dashaSequence[i].years;
    }

    const currentDashaData = dashaSequence[currentDashaIndex];
    const upcomingDashaIndex = (currentDashaIndex + 1) % dashaSequence.length;
    const upcomingDashaData = dashaSequence[upcomingDashaIndex];

    const yearsSinceStart = effectiveAge - totalYears;
    const yearsRemaining = currentDashaData.years - yearsSinceStart;

    const birth = new Date(birthDate);
    const currentDashaStart = new Date(birth);
    currentDashaStart.setFullYear(birth.getFullYear() + totalYears);
    
    const currentDashaEnd = new Date(currentDashaStart);
    currentDashaEnd.setFullYear(currentDashaStart.getFullYear() + currentDashaData.years);

    const upcomingDashaStart = new Date(currentDashaEnd);
    const upcomingDashaEnd = new Date(upcomingDashaStart);
    upcomingDashaEnd.setFullYear(upcomingDashaStart.getFullYear() + upcomingDashaData.years);

    // Generate sub-dashas for current dasha
    const subDashas = dashaSequence.slice(0, 5).map((dasha) => ({
      planet: dasha.planet,
      planetHindi: dasha.planetHindi,
      duration: `${Math.round(currentDashaData.years * dasha.years / 120 * 12)} महीने`
    }));

    setResult({
      currentDasha: {
        planet: currentDashaData.planet,
        planetHindi: currentDashaData.planetHindi,
        startDate: currentDashaStart.toLocaleDateString('hi-IN'),
        endDate: currentDashaEnd.toLocaleDateString('hi-IN'),
        years: currentDashaData.years,
        currentAge: age,
        effects: dashaEffects[currentDashaData.planet],
        remedies: dashaRemedies[currentDashaData.planet],
        subDashas
      },
      upcomingDasha: {
        planet: upcomingDashaData.planet,
        planetHindi: upcomingDashaData.planetHindi,
        startDate: upcomingDashaStart.toLocaleDateString('hi-IN'),
        endDate: upcomingDashaEnd.toLocaleDateString('hi-IN'),
        years: upcomingDashaData.years,
        currentAge: age,
        effects: dashaEffects[upcomingDashaData.planet],
        remedies: dashaRemedies[upcomingDashaData.planet],
        subDashas: []
      }
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
                <Clock className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              दशा कैलकुलेटर
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              अपनी वर्तमान और आगामी ग्रह दशा जानें
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={calculateDasha} className="space-y-6">
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    जन्म समय <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      required
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    जन्म स्थान <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="उदाहरण: जयपुर, राजस्थान"
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  दशा की गणना करें
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {result && (
        <section className="py-12 bg-gradient-to-b from-[#FFD700]/10 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Current Dasha */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <div className="inline-block bg-gradient-to-r from-[#FFD700] to-[#FFF200] p-6 rounded-full mb-4">
                    <Clock className="w-16 h-16 text-black" />
                  </div>
                  <h2 className="text-3xl font-bold text-black mb-2">
                    वर्तमान महादशा
                  </h2>
                  <p className="text-4xl font-bold text-[#FFD700] mb-1">
                    {result.currentDasha.planetHindi} दशा
                  </p>
                  <p className="text-xl text-gray-600">{result.currentDasha.planet} Mahadasha</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">प्रारंभ तिथि</p>
                    <p className="text-lg font-bold text-black">{result.currentDasha.startDate}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-5 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">समाप्ति तिथि</p>
                    <p className="text-lg font-bold text-black">{result.currentDasha.endDate}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">कुल अवधि</p>
                    <p className="text-lg font-bold text-black">{result.currentDasha.years} वर्ष</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#FFD700]/10 to-transparent p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-black mb-3">
                      दशा प्रभाव:
                    </h3>
                    <ul className="space-y-2">
                      {result.currentDasha.effects.map((effect, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></span>
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-black mb-3">
                      उपाय:
                    </h3>
                    <ul className="space-y-2">
                      {result.currentDasha.remedies.map((remedy, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          {remedy}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-black mb-3">
                      अंतर्दशा (Sub-periods):
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {result.currentDasha.subDashas.map((subDasha, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                          <p className="font-semibold text-black">{subDasha.planetHindi}</p>
                          <p className="text-sm text-gray-600">{subDasha.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Dasha */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-black mb-4 text-center">
                  आगामी महादशा
                </h2>
                <p className="text-3xl font-bold text-[#FFD700] mb-1 text-center">
                  {result.upcomingDasha.planetHindi} दशा
                </p>
                <p className="text-lg text-gray-600 mb-6 text-center">{result.upcomingDasha.planet} Mahadasha</p>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">प्रारंभ</p>
                    <p className="text-base font-bold text-black">{result.upcomingDasha.startDate}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">समाप्ति</p>
                    <p className="text-base font-bold text-black">{result.upcomingDasha.endDate}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">अवधि</p>
                    <p className="text-base font-bold text-black">{result.upcomingDasha.years} वर्ष</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-bold text-black mb-2">मुख्य प्रभाव:</h4>
                  <ul className="space-y-1">
                    {result.upcomingDasha.effects.slice(0, 3).map((effect, index) => (
                      <li key={index} className="flex items-center text-gray-700 text-sm">
                        <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full mr-2"></span>
                        {effect}
                      </li>
                    ))}
                  </ul>
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
