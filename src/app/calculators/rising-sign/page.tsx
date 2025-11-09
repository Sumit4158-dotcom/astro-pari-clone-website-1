"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Sunrise, Calendar, Clock, MapPin } from "lucide-react";

export default function RisingSignCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [result, setResult] = useState<{
    risingSign: string;
    risingSignHindi: string;
    ascendantLord: string;
    element: string;
    characteristics: string[];
    physicalTraits: string[];
    lifeApproach: string;
  } | null>(null);

  const risingSignsData = [
    {
      sign: "Aries",
      signHindi: "मेष लग्न (Mesh Lagna)",
      ascendantLord: "मंगल (Mars)",
      element: "अग्नि (Fire)",
      startHour: 0,
      endHour: 2,
      characteristics: ["साहसी", "स्वतंत्र", "प्रत्यक्ष", "ऊर्जावान"],
      physicalTraits: ["मजबूत शरीर", "तीव्र नजर", "आत्मविश्वास से भरा"],
      lifeApproach: "सीधे और साहसिक तरीके से जीवन में आगे बढ़ते हैं"
    },
    {
      sign: "Taurus",
      signHindi: "वृषभ लग्न (Vrishabh Lagna)",
      ascendantLord: "शुक्र (Venus)",
      element: "पृथ्वी (Earth)",
      startHour: 2,
      endHour: 4,
      characteristics: ["स्थिर", "व्यावहारिक", "कलात्मक", "धैर्यवान"],
      physicalTraits: ["आकर्षक व्यक्तित्व", "सुंदर आँखें", "मजबूत बनावट"],
      lifeApproach: "धीरे-धीरे और स्थिर तरीके से लक्ष्य प्राप्त करते हैं"
    },
    {
      sign: "Gemini",
      signHindi: "मिथुन लग्न (Mithun Lagna)",
      ascendantLord: "बुध (Mercury)",
      element: "वायु (Air)",
      startHour: 4,
      endHour: 6,
      characteristics: ["बुद्धिमान", "संचार कुशल", "अनुकूल", "जिज्ञासु"],
      physicalTraits: ["युवा दिखने वाला", "तेज चाल", "अभिव्यंजक हाथ"],
      lifeApproach: "जिज्ञासा और संचार के माध्यम से जीवन का अन्वेषण करते हैं"
    },
    {
      sign: "Cancer",
      signHindi: "कर्क लग्न (Kark Lagna)",
      ascendantLord: "चंद्र (Moon)",
      element: "जल (Water)",
      startHour: 6,
      endHour: 8,
      characteristics: ["भावुक", "देखभाल करने वाला", "सहज", "सुरक्षात्मक"],
      physicalTraits: ["गोल चेहरा", "कोमल आँखें", "पोषक उपस्थिति"],
      lifeApproach: "भावनाओं और सहज ज्ञान के साथ जीवन का अनुभव करते हैं"
    },
    {
      sign: "Leo",
      signHindi: "सिंह लग्न (Simha Lagna)",
      ascendantLord: "सूर्य (Sun)",
      element: "अग्नि (Fire)",
      startHour: 8,
      endHour: 10,
      characteristics: ["आत्मविश्वासी", "नेतृत्वकर्ता", "उदार", "नाटकीय"],
      physicalTraits: ["राजसी उपस्थिति", "शक्तिशाली निर्माण", "प्रभावशाली व्यक्तित्व"],
      lifeApproach: "आत्मविश्वास और रचनात्मकता के साथ जीवन का नेतृत्व करते हैं"
    },
    {
      sign: "Virgo",
      signHindi: "कन्या लग्न (Kanya Lagna)",
      ascendantLord: "बुध (Mercury)",
      element: "पृथ्वी (Earth)",
      startHour: 10,
      endHour: 12,
      characteristics: ["विश्लेषणात्मक", "व्यावहारिक", "सेवाभावी", "विस्तार-उन्मुख"],
      physicalTraits: ["साफ-सुथरा", "युवा दिखाई", "स्वास्थ्य के प्रति जागरूक"],
      lifeApproach: "व्यावहारिकता और सेवा के माध्यम से जीवन को सुधारते हैं"
    },
    {
      sign: "Libra",
      signHindi: "तुला लग्न (Tula Lagna)",
      ascendantLord: "शुक्र (Venus)",
      element: "वायु (Air)",
      startHour: 12,
      endHour: 14,
      characteristics: ["संतुलित", "कूटनीतिक", "कलात्मक", "सामाजिक"],
      physicalTraits: ["सुंदर चेहरा", "सममित विशेषताएं", "आकर्षक मुस्कान"],
      lifeApproach: "सामंजस्य और संतुलन की खोज में जीवन जीते हैं"
    },
    {
      sign: "Scorpio",
      signHindi: "वृश्चिक लग्न (Vrishchik Lagna)",
      ascendantLord: "मंगल (Mars)",
      element: "जल (Water)",
      startHour: 14,
      endHour: 16,
      characteristics: ["तीव्र", "रहस्यमय", "परिवर्तनकारी", "दृढ़निश्चयी"],
      physicalTraits: ["चुंबकीय उपस्थिति", "तेज नजर", "शक्तिशाली ऊर्जा"],
      lifeApproach: "गहराई और परिवर्तन के साथ जीवन का अनुभव करते हैं"
    },
    {
      sign: "Sagittarius",
      signHindi: "धनु लग्न (Dhanu Lagna)",
      ascendantLord: "गुरु (Jupiter)",
      element: "अग्नि (Fire)",
      startHour: 16,
      endHour: 18,
      characteristics: ["आशावादी", "साहसी", "दार्शनिक", "स्वतंत्र"],
      physicalTraits: ["लम्बा कद", "खुला चेहरा", "एथलेटिक बनावट"],
      lifeApproach: "साहसिक और दार्शनिक दृष्टिकोण से जीवन का अन्वेषण करते हैं"
    },
    {
      sign: "Capricorn",
      signHindi: "मकर लग्न (Makar Lagna)",
      ascendantLord: "शनि (Saturn)",
      element: "पृथ्वी (Earth)",
      startHour: 18,
      endHour: 20,
      characteristics: ["महत्वाकांक्षी", "अनुशासित", "जिम्मेदार", "परिपक्व"],
      physicalTraits: ["मजबूत हड्डी संरचना", "गंभीर उपस्थिति", "समय के साथ बेहतर"],
      lifeApproach: "अनुशासन और दृढ़ संकल्प के साथ सफलता की ओर बढ़ते हैं"
    },
    {
      sign: "Aquarius",
      signHindi: "कुंभ लग्न (Kumbh Lagna)",
      ascendantLord: "शनि (Saturn)",
      element: "वायु (Air)",
      startHour: 20,
      endHour: 22,
      characteristics: ["नवोन्मेषी", "स्वतंत्र", "मानवीय", "बौद्धिक"],
      physicalTraits: ["अनोखी विशेषताएं", "लम्बा कद", "विशिष्ट शैली"],
      lifeApproach: "नवाचार और मानवता के लिए जीवन जीते हैं"
    },
    {
      sign: "Pisces",
      signHindi: "मीन लग्न (Meen Lagna)",
      ascendantLord: "गुरु (Jupiter)",
      element: "जल (Water)",
      startHour: 22,
      endHour: 24,
      characteristics: ["कल्पनाशील", "सहानुभूतिपूर्ण", "आध्यात्मिक", "सहज"],
      physicalTraits: ["सपने जैसी आँखें", "कोमल विशेषताएं", "आकर्षक उपस्थिति"],
      lifeApproach: "आध्यात्मिकता और सहानुभूति के साथ जीवन का अनुभव करते हैं"
    }
  ];

  const calculateRisingSign = (e: React.FormEvent) => {
    e.preventDefault();

    if (!birthDate || !birthTime || !birthPlace) {
      return;
    }

    // Extract hour from time
    const [hours] = birthTime.split(":").map(Number);
    
    // Find rising sign based on birth time (simplified calculation)
    // In real astrology, this requires exact latitude, longitude, and complex calculations
    let foundSign = risingSignsData[0];

    for (const signData of risingSignsData) {
      if (hours >= signData.startHour && hours < signData.endHour) {
        foundSign = signData;
        break;
      }
    }

    setResult({
      risingSign: foundSign.sign,
      risingSignHindi: foundSign.signHindi,
      ascendantLord: foundSign.ascendantLord,
      element: foundSign.element,
      characteristics: foundSign.characteristics,
      physicalTraits: foundSign.physicalTraits,
      lifeApproach: foundSign.lifeApproach
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
                <Sunrise className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              राइजिंग साइन / लग्न कैलकुलेटर
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              अपनी जन्म तिथि, समय और स्थान से लग्न (Ascendant) जानें
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={calculateRisingSign} className="space-y-6">
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
                      placeholder="उदाहरण: मुंबई, महाराष्ट्र"
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
                  लग्न की गणना करें
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
                    <Sunrise className="w-16 h-16 text-black" />
                  </div>
                  <h2 className="text-3xl font-bold text-black mb-2">
                    आपका राइजिंग साइन (लग्न)
                  </h2>
                  <p className="text-4xl font-bold text-[#FFD700] mb-1">
                    {result.risingSignHindi}
                  </p>
                  <p className="text-xl text-gray-600">{result.risingSign}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">लग्नेश</p>
                    <p className="text-xl font-bold text-black">{result.ascendantLord}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-5 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">तत्व</p>
                    <p className="text-xl font-bold text-black">{result.element}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#FFD700]/10 to-transparent p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-black mb-3">
                      व्यक्तित्व विशेषताएं:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.characteristics.map((trait, index) => (
                        <span
                          key={index}
                          className="bg-[#FFD700] text-black px-4 py-2 rounded-full text-sm font-semibold"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-black mb-3">
                      शारीरिक विशेषताएं:
                    </h3>
                    <ul className="space-y-2">
                      {result.physicalTraits.map((trait, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></span>
                          {trait}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-black mb-3">
                      जीवन दृष्टिकोण:
                    </h3>
                    <p className="text-gray-700">{result.lifeApproach}</p>
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
