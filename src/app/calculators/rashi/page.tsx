"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Moon, Calendar, Clock, MapPin } from "lucide-react";

export default function RashiCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [result, setResult] = useState<{
    rashi: string;
    rashiHindi: string;
    rashiLord: string;
    nakshatra: string;
    element: string;
    quality: string;
    emotionalNature: string;
    strengths: string[];
    challenges: string[];
    luckyDay: string;
    luckyColor: string;
  } | null>(null);

  const rashiData = [
    {
      sign: "Aries",
      signHindi: "मेष राशि (Mesh)",
      lord: "मंगल (Mars)",
      element: "अग्नि (Fire)",
      quality: "चर (Cardinal)",
      nakshatra: "अश्विनी, भरणी, कृतिका",
      startDay: 21,
      startMonth: 3,
      endDay: 19,
      endMonth: 4,
      emotionalNature: "तीव्र भावनाएं, त्वरित प्रतिक्रिया",
      strengths: ["साहसी", "जोशीला", "स्वतंत्र", "ऊर्जावान"],
      challenges: ["अधीर", "आवेगी", "आक्रामक"],
      luckyDay: "मंगलवार",
      luckyColor: "लाल"
    },
    {
      sign: "Taurus",
      signHindi: "वृषभ राशि (Vrishabh)",
      lord: "शुक्र (Venus)",
      element: "पृथ्वी (Earth)",
      quality: "स्थिर (Fixed)",
      nakshatra: "कृतिका, रोहिणी, मृगशिरा",
      startDay: 20,
      startMonth: 4,
      endDay: 20,
      endMonth: 5,
      emotionalNature: "स्थिर भावनाएं, भरोसेमंद",
      strengths: ["धैर्यवान", "व्यावहारिक", "विश्वसनीय", "कलात्मक"],
      challenges: ["जिद्दी", "अत्यधिक भोग", "बदलाव से डर"],
      luckyDay: "शुक्रवार",
      luckyColor: "हरा और गुलाबी"
    },
    {
      sign: "Gemini",
      signHindi: "मिथुन राशि (Mithun)",
      lord: "बुध (Mercury)",
      element: "वायु (Air)",
      quality: "द्विस्वभाव (Mutable)",
      nakshatra: "मृगशिरा, आर्द्रा, पुनर्वसु",
      startDay: 21,
      startMonth: 5,
      endDay: 20,
      endMonth: 6,
      emotionalNature: "बदलती भावनाएं, बौद्धिक",
      strengths: ["अनुकूल", "बुद्धिमान", "संचारक", "जिज्ञासु"],
      challenges: ["अस्थिर", "सतही", "अनिर्णयात्मक"],
      luckyDay: "बुधवार",
      luckyColor: "पीला"
    },
    {
      sign: "Cancer",
      signHindi: "कर्क राशि (Kark)",
      lord: "चंद्र (Moon)",
      element: "जल (Water)",
      quality: "चर (Cardinal)",
      nakshatra: "पुनर्वसु, पुष्य, अश्लेषा",
      startDay: 21,
      startMonth: 6,
      endDay: 22,
      endMonth: 7,
      emotionalNature: "गहरी भावनाएं, संवेदनशील",
      strengths: ["देखभाल करने वाला", "सहज", "वफादार", "सुरक्षात्मक"],
      challenges: ["अति संवेदनशील", "मूडी", "अतीत में रहना"],
      luckyDay: "सोमवार",
      luckyColor: "सफेद और चांदी"
    },
    {
      sign: "Leo",
      signHindi: "सिंह राशि (Simha)",
      lord: "सूर्य (Sun)",
      element: "अग्नि (Fire)",
      quality: "स्थिर (Fixed)",
      nakshatra: "मघा, पूर्वा फाल्गुनी, उत्तरा फाल्गुनी",
      startDay: 23,
      startMonth: 7,
      endDay: 22,
      endMonth: 8,
      emotionalNature: "गर्व, नाटकीय भावनाएं",
      strengths: ["आत्मविश्वासी", "उदार", "रचनात्मक", "नेतृत्व"],
      challenges: ["अहंकारी", "हावी", "ध्यान चाहने वाला"],
      luckyDay: "रविवार",
      luckyColor: "सुनहरा"
    },
    {
      sign: "Virgo",
      signHindi: "कन्या राशि (Kanya)",
      lord: "बुध (Mercury)",
      element: "पृथ्वी (Earth)",
      quality: "द्विस्वभाव (Mutable)",
      nakshatra: "उत्तरा फाल्गुनी, हस्त, चित्रा",
      startDay: 23,
      startMonth: 8,
      endDay: 22,
      endMonth: 9,
      emotionalNature: "नियंत्रित, विश्लेषणात्मक",
      strengths: ["विस्तार-उन्मुख", "व्यावहारिक", "मेहनती", "सेवाभावी"],
      challenges: ["अति आलोचनात्मक", "चिंताजनक", "पूर्णतावादी"],
      luckyDay: "बुधवार",
      luckyColor: "नीला और हरा"
    },
    {
      sign: "Libra",
      signHindi: "तुला राशि (Tula)",
      lord: "शुक्र (Venus)",
      element: "वायु (Air)",
      quality: "चर (Cardinal)",
      nakshatra: "चित्रा, स्वाति, विशाखा",
      startDay: 23,
      startMonth: 9,
      endDay: 22,
      endMonth: 10,
      emotionalNature: "संतुलित, सामंजस्यपूर्ण",
      strengths: ["कूटनीतिक", "न्यायप्रिय", "सामाजिक", "कलात्मक"],
      challenges: ["अनिर्णयात्मक", "दूसरों पर निर्भर", "टकराव से बचना"],
      luckyDay: "शुक्रवार",
      luckyColor: "गुलाबी और हल्का नीला"
    },
    {
      sign: "Scorpio",
      signHindi: "वृश्चिक राशि (Vrishchik)",
      lord: "मंगल (Mars)",
      element: "जल (Water)",
      quality: "स्थिर (Fixed)",
      nakshatra: "विशाखा, अनुराधा, ज्येष्ठा",
      startDay: 23,
      startMonth: 10,
      endDay: 21,
      endMonth: 11,
      emotionalNature: "तीव्र, गहरी भावनाएं",
      strengths: ["जुनूनी", "दृढ़निश्चयी", "वफादार", "परिवर्तनकारी"],
      challenges: ["ईर्ष्यालु", "जुनूनी", "प्रतिशोधी"],
      luckyDay: "मंगलवार",
      luckyColor: "लाल और काला"
    },
    {
      sign: "Sagittarius",
      signHindi: "धनु राशि (Dhanu)",
      lord: "गुरु (Jupiter)",
      element: "अग्नि (Fire)",
      quality: "द्विस्वभाव (Mutable)",
      nakshatra: "मूल, पूर्वाषाढ़ा, उत्तराषाढ़ा",
      startDay: 22,
      startMonth: 11,
      endDay: 21,
      endMonth: 12,
      emotionalNature: "आशावादी, स्वतंत्र",
      strengths: ["साहसी", "ईमानदार", "दार्शनिक", "आशावादी"],
      challenges: ["बेतुका", "अनियमित", "अधीर"],
      luckyDay: "गुरुवार",
      luckyColor: "बैंगनी"
    },
    {
      sign: "Capricorn",
      signHindi: "मकर राशि (Makar)",
      lord: "शनि (Saturn)",
      element: "पृथ्वी (Earth)",
      quality: "चर (Cardinal)",
      nakshatra: "उत्तराषाढ़ा, श्रवण, धनिष्ठा",
      startDay: 22,
      startMonth: 12,
      endDay: 19,
      endMonth: 1,
      emotionalNature: "नियंत्रित, गंभीर",
      strengths: ["महत्वाकांक्षी", "अनुशासित", "जिम्मेदार", "धैर्यवान"],
      challenges: ["निराशावादी", "कठोर", "भावनाओं को दबाना"],
      luckyDay: "शनिवार",
      luckyColor: "काला और भूरा"
    },
    {
      sign: "Aquarius",
      signHindi: "कुंभ राशि (Kumbh)",
      lord: "शनि (Saturn)",
      element: "वायु (Air)",
      quality: "स्थिर (Fixed)",
      nakshatra: "धनिष्ठा, शतभिषा, पूर्वाभाद्रपद",
      startDay: 20,
      startMonth: 1,
      endDay: 18,
      endMonth: 2,
      emotionalNature: "विचलित, बौद्धिक",
      strengths: ["नवोन्मेषी", "मानवीय", "स्वतंत्र", "प्रगतिशील"],
      challenges: ["अलग", "जिद्दी", "भावनात्मक रूप से अनुपलब्ध"],
      luckyDay: "शनिवार",
      luckyColor: "नीला"
    },
    {
      sign: "Pisces",
      signHindi: "मीन राशि (Meen)",
      lord: "गुरु (Jupiter)",
      element: "जल (Water)",
      quality: "द्विस्वभाव (Mutable)",
      nakshatra: "पूर्वाभाद्रपद, उत्तराभाद्रपद, रेवती",
      startDay: 19,
      startMonth: 2,
      endDay: 20,
      endMonth: 3,
      emotionalNature: "सहानुभूतिपूर्ण, सहज",
      strengths: ["कल्पनाशील", "सहानुभूतिपूर्ण", "आध्यात्मिक", "कलात्मक"],
      challenges: ["पलायनवादी", "अति संवेदनशील", "अव्यावहारिक"],
      luckyDay: "गुरुवार",
      luckyColor: "समुद्री हरा"
    }
  ];

  const calculateRashi = (e: React.FormEvent) => {
    e.preventDefault();

    if (!birthDate || !birthTime || !birthPlace) {
      return;
    }

    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let foundRashi = rashiData[0];

    for (const rashi of rashiData) {
      if (
        (month === rashi.startMonth && day >= rashi.startDay) ||
        (month === rashi.endMonth && day <= rashi.endDay) ||
        (rashi.startMonth > rashi.endMonth &&
          ((month === rashi.startMonth && day >= rashi.startDay) ||
            (month === rashi.endMonth && day <= rashi.endDay)))
      ) {
        foundRashi = rashi;
        break;
      }
    }

    setResult({
      rashi: foundRashi.sign,
      rashiHindi: foundRashi.signHindi,
      rashiLord: foundRashi.lord,
      nakshatra: foundRashi.nakshatra,
      element: foundRashi.element,
      quality: foundRashi.quality,
      emotionalNature: foundRashi.emotionalNature,
      strengths: foundRashi.strengths,
      challenges: foundRashi.challenges,
      luckyDay: foundRashi.luckyDay,
      luckyColor: foundRashi.luckyColor
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
                <Moon className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              राशि कैलकुलेटर
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              अपनी चंद्र राशि (Moon Sign) जानें
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={calculateRashi} className="space-y-6">
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
                      placeholder="उदाहरण: दिल्ली, भारत"
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
                  राशि की गणना करें
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
                    <Moon className="w-16 h-16 text-black" />
                  </div>
                  <h2 className="text-3xl font-bold text-black mb-2">
                    आपकी चंद्र राशि
                  </h2>
                  <p className="text-4xl font-bold text-[#FFD700] mb-1">
                    {result.rashiHindi}
                  </p>
                  <p className="text-xl text-gray-600">{result.rashi}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">राशि स्वामी</p>
                    <p className="text-xl font-bold text-black">{result.rashiLord}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-5 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">तत्व</p>
                    <p className="text-xl font-bold text-black">{result.element}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">गुण</p>
                    <p className="text-xl font-bold text-black">{result.quality}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">नक्षत्र</p>
                    <p className="text-lg font-bold text-black">{result.nakshatra}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#FFD700]/10 to-transparent p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-black mb-2">
                      भावनात्मक स्वभाव:
                    </h3>
                    <p className="text-gray-700">{result.emotionalNature}</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-black mb-3">
                      शक्तियां:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.strengths.map((strength, index) => (
                        <span
                          key={index}
                          className="bg-[#FFD700] text-black px-4 py-2 rounded-full text-sm font-semibold"
                        >
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-black mb-3">
                      चुनौतियां:
                    </h3>
                    <ul className="space-y-2">
                      {result.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-5 rounded-lg">
                      <p className="text-sm font-semibold text-gray-600 mb-1">भाग्यशाली दिन</p>
                      <p className="text-xl font-bold text-black">{result.luckyDay}</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-lg">
                      <p className="text-sm font-semibold text-gray-600 mb-1">भाग्यशाली रंग</p>
                      <p className="text-xl font-bold text-black">{result.luckyColor}</p>
                    </div>
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
