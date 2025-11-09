"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Calendar, Moon, Sparkles } from "lucide-react";

interface MoonPhaseResult {
  phaseName: string;
  phaseNameHindi: string;
  illumination: number;
  emoji: string;
  description: string;
  characteristics: string[];
  spiritualSignificance: string;
  recommendations: string[];
}

// Calculate moon phase based on date
const calculateMoonPhase = (date: Date): MoonPhaseResult => {
  // Known new moon date (reference point)
  const knownNewMoon = new Date('2000-01-06T18:14:00Z');
  const synodicMonth = 29.53058867; // days in a lunar cycle
  
  const daysSinceNewMoon = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const phase = ((daysSinceNewMoon % synodicMonth) + synodicMonth) % synodicMonth;
  
  const illumination = Math.round((1 - Math.cos((phase / synodicMonth) * 2 * Math.PI)) * 50);
  
  // Determine phase name
  let phaseName = "";
  let phaseNameHindi = "";
  let emoji = "";
  let description = "";
  let characteristics: string[] = [];
  let spiritualSignificance = "";
  let recommendations: string[] = [];
  
  if (phase < 1.84566) {
    phaseName = "New Moon";
    phaseNameHindi = "अमावस्या (New Moon)";
    emoji = "🌑";
    description = "चंद्रमा पूरी तरह से अदृश्य है। यह नई शुरुआत और नए इरादों का समय है।";
    characteristics = [
      "नई शुरुआत और नए संकल्प के लिए सर्वोत्तम समय",
      "आंतरिक चिंतन और आत्म-अवलोकन का समय",
      "नए प्रोजेक्ट्स और योजनाओं की शुरुआत के लिए शुभ",
      "ऊर्जा स्तर कम हो सकता है, आराम की आवश्यकता"
    ];
    spiritualSignificance = "अमावस्या को पितरों का दिन माना जाता है। यह पूर्वजों को याद करने और उनका आशीर्वाद लेने का समय है।";
    recommendations = [
      "नए संकल्प लें और लक्ष्य निर्धारित करें",
      "ध्यान और योग का अभ्यास करें",
      "पितरों के लिए तर्पण करें",
      "भारी काम से बचें, हल्का भोजन करें",
      "शिव पूजा विशेष फलदायी है"
    ];
  } else if (phase < 7.38264) {
    phaseName = "Waxing Crescent";
    phaseNameHindi = "शुक्ल पक्ष प्रारंभ (Waxing Crescent)";
    emoji = "🌒";
    description = "चंद्रमा धीरे-धीरे बढ़ रहा है। यह विकास और विस्तार का समय है।";
    characteristics = [
      "विकास और प्रगति की शुरुआत",
      "नए कौशल सीखने का अच्छा समय",
      "सकारात्मक ऊर्जा में वृद्धि",
      "योजनाओं को क्रियान्वित करने का समय"
    ];
    spiritualSignificance = "शुक्ल पक्ष की शुरुआत शुभ कार्यों के लिए अनुकूल मानी जाती है।";
    recommendations = [
      "नए प्रोजेक्ट्स पर काम शुरू करें",
      "सकारात्मक दृष्टिकोण बनाए रखें",
      "गणेश पूजा करें",
      "व्यापार विस्तार की योजना बनाएं",
      "स्वास्थ्य पर ध्यान दें"
    ];
  } else if (phase < 9.22831) {
    phaseName = "First Quarter";
    phaseNameHindi = "शुक्ल पक्ष चतुर्थी (First Quarter)";
    emoji = "🌓";
    description = "चंद्रमा आधा प्रकाशित है। यह निर्णय लेने और चुनौतियों का सामना करने का समय है।";
    characteristics = [
      "निर्णय लेने की क्षमता बढ़ती है",
      "चुनौतियों का सामना करने का समय",
      "कार्य में गति और प्रगति",
      "आत्मविश्वास में वृद्धि"
    ];
    spiritualSignificance = "यह समय संतुलन और समन्वय का प्रतीक है। कठिन निर्णय लेने की शक्ति मिलती है।";
    recommendations = [
      "महत्वपूर्ण निर्णय लें",
      "बाधाओं को दूर करने के प्रयास करें",
      "हनुमान चालीसा का पाठ करें",
      "व्यायाम और शारीरिक गतिविधियां बढ़ाएं",
      "समस्याओं का समाधान खोजें"
    ];
  } else if (phase < 14.76529) {
    phaseName = "Waxing Gibbous";
    phaseNameHindi = "शुक्ल पक्ष मध्य (Waxing Gibbous)";
    emoji = "🌔";
    description = "चंद्रमा लगभग पूर्ण है। यह परिणाम और उपलब्धियों के करीब पहुंचने का समय है।";
    characteristics = [
      "लक्ष्य प्राप्ति के करीब",
      "कड़ी मेहनत फलदायी होगी",
      "धैर्य और लगन की आवश्यकता",
      "सफलता निकट है"
    ];
    spiritualSignificance = "पूर्णिमा के करीब आना शुभ संकेत है। यह समय अंतिम प्रयासों के लिए अनुकूल है।";
    recommendations = [
      "लक्ष्यों पर केंद्रित रहें",
      "धैर्य बनाए रखें",
      "लक्ष्मी पूजा करें",
      "बचत और निवेश पर ध्यान दें",
      "अंतिम प्रयास करें"
    ];
  } else if (phase < 16.61096) {
    phaseName = "Full Moon";
    phaseNameHindi = "पूर्णिमा (Full Moon)";
    emoji = "🌕";
    description = "चंद्रमा पूर्ण रूप से प्रकाशित है। यह पूर्णता, समाप्ति और उत्सव का समय है।";
    characteristics = [
      "भावनाएं और ऊर्जा चरम पर",
      "स्पष्टता और दृष्टि में वृद्धि",
      "रिश्तों में तीव्रता",
      "रचनात्मकता का उच्चतम स्तर",
      "कृतज्ञता व्यक्त करने का समय"
    ];
    spiritualSignificance = "पूर्णिमा अत्यंत शुभ मानी जाती है। व्रत, पूजा और दान का विशेष महत्व है।";
    recommendations = [
      "सत्यनारायण व्रत रखें",
      "दान-पुण्य करें",
      "मंदिर जाएं और पूजा करें",
      "ध्यान और आध्यात्मिक अभ्यास करें",
      "परिवार के साथ समय बिताएं",
      "कृतज्ञता व्यक्त करें"
    ];
  } else if (phase < 22.14893) {
    phaseName = "Waning Gibbous";
    phaseNameHindi = "कृष्ण पक्ष प्रारंभ (Waning Gibbous)";
    emoji = "🌖";
    description = "चंद्रमा घटना शुरू हो गया है। यह साझा करने और आभार व्यक्त करने का समय है।";
    characteristics = [
      "ज्ञान साझा करने का समय",
      "दूसरों की मदद करें",
      "कृतज्ञता और आभार व्यक्त करें",
      "आत्म-चिंतन करें"
    ];
    spiritualSignificance = "यह समय दान और सेवा के लिए विशेष अनुकूल है। दूसरों की सहायता पुण्य फल देती है।";
    recommendations = [
      "दान करें और सेवा करें",
      "अपनी उपलब्धियों पर विचार करें",
      "गुरु पूजा करें",
      "ज्ञान और अनुभव साझा करें",
      "धन्यवाद दें"
    ];
  } else if (phase < 23.99460) {
    phaseName = "Last Quarter";
    phaseNameHindi = "कृष्ण पक्ष अष्टमी (Last Quarter)";
    emoji = "🌗";
    description = "चंद्रमा आधा रह गया है। यह छोड़ने और मुक्त होने का समय है।";
    characteristics = [
      "पुराने को छोड़ने का समय",
      "सफाई और पुनर्गठन",
      "भावनात्मक मुक्ति",
      "आत्म-मूल्यांकन करें"
    ];
    spiritualSignificance = "यह समय पुरानी आदतों और नकारात्मकता को छोड़ने के लिए है। शनि देव की पूजा फलदायी है।";
    recommendations = [
      "पुरानी आदतें छोड़ें",
      "घर और जीवन की सफाई करें",
      "शनि देव की पूजा करें",
      "क्षमा करें और आगे बढ़ें",
      "भूत को जाने दें"
    ];
  } else {
    phaseName = "Waning Crescent";
    phaseNameHindi = "कृष्ण पक्ष अंत (Waning Crescent)";
    emoji = "🌘";
    description = "चंद्रमा लगभग अदृश्य हो रहा है। यह आराम और तैयारी का समय है।";
    characteristics = [
      "आराम और पुनर्स्थापना का समय",
      "आंतरिक शांति खोजें",
      "नई शुरुआत की तैयारी करें",
      "ऊर्जा संरक्षण करें"
    ];
    spiritualSignificance = "अमावस्या के निकट आना आत्म-चिंतन और शांति का समय है। शिव साधना विशेष फलदायी है।";
    recommendations = [
      "आराम करें और नींद पूरी लें",
      "योग और ध्यान करें",
      "शिव पूजा करें",
      "नई योजनाओं की तैयारी करें",
      "स्वास्थ्य पर ध्यान दें"
    ];
  }
  
  return {
    phaseName,
    phaseNameHindi,
    illumination,
    emoji,
    description,
    characteristics,
    spiritualSignificance,
    recommendations
  };
};

export default function MoonPhaseCalculatorPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [result, setResult] = useState<MoonPhaseResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    // Simulate calculation delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const date = new Date(selectedDate);
    const moonPhase = calculateMoonPhase(date);
    setResult(moonPhase);
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
                <Moon className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              चंद्र कला कैलकुलेटर
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              किसी भी तारीख का चंद्रमा का चरण जानें
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
                तारीख चुनें
              </h2>

              <form onSubmit={handleCalculate} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    तारीख (Date) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCalculating}
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 disabled:bg-gray-400 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {isCalculating ? "गणना हो रही है..." : "चंद्र कला देखें"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="py-12 bg-gradient-to-b from-[#FFD700]/10 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Moon Phase Display */}
              <div className="bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-8 text-center">
                <div className="text-8xl mb-4">{result.emoji}</div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
                  {result.phaseNameHindi}
                </h2>
                <p className="text-xl text-gray-600 mb-4">{result.phaseName}</p>
                <div className="inline-block bg-[#FFD700]/20 px-6 py-3 rounded-full">
                  <p className="text-lg font-semibold text-black">
                    प्रकाशित: {result.illumination}%
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-8">
                <h3 className="text-2xl font-bold text-black mb-4">विवरण</h3>
                <p className="text-gray-700 text-lg">{result.description}</p>
              </div>

              {/* Characteristics */}
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] mb-8">
                <h3 className="text-2xl font-bold text-black mb-6">विशेषताएं</h3>
                <ul className="space-y-3">
                  {result.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-[#FFD700] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Spiritual Significance */}
              <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFF200]/20 rounded-xl p-6 md:p-8 mb-8">
                <h3 className="text-2xl font-bold text-black mb-4">
                  आध्यात्मिक महत्व
                </h3>
                <p className="text-gray-800 text-lg">{result.spiritualSignificance}</p>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] rounded-xl p-6 md:p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-black mb-6">
                  सुझाव और उपाय
                </h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, index) => (
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
                  व्यक्तिगत ज्योतिषीय परामर्श के लिए
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
              चंद्र कला का महत्व
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                चंद्रमा की कलाएं हमारे जीवन पर गहरा प्रभाव डालती हैं। चंद्रमा हमारी भावनाओं,
                मन और अंतर्ज्ञान को नियंत्रित करता है। विभिन्न चंद्र कलाओं में विभिन्न ऊर्जाएं
                और प्रभाव होते हैं।
              </p>
              <p>
                पूर्णिमा और अमावस्या विशेष रूप से शक्तिशाली समय होते हैं। पूर्णिमा उच्च ऊर्जा
                और पूर्णता का प्रतीक है, जबकि अमावस्या नई शुरुआत और आंतरिक चिंतन का समय है।
              </p>
              <p>
                चंद्र कलाओं के अनुसार अपनी गतिविधियों को समायोजित करने से आप प्रकृति के
                साथ तालमेल बिठा सकते हैं और बेहतर परिणाम प्राप्त कर सकते हैं।
              </p>
              <p className="font-semibold text-black">
                नोट: यह गणना वैज्ञानिक और ज्योतिषीय सिद्धांतों पर आधारित है। व्यक्तिगत
                मार्गदर्शन के लिए हमारे अनुभवी ज्योतिषियों से संपर्क करें।
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
