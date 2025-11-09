"use client";

import { useState } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Calendar, Clock, MapPin, Moon } from "lucide-react";
import { toast } from "sonner";

const rashis = [
  "Aries (मेष)", "Taurus (वृषभ)", "Gemini (मिथुन)", "Cancer (कर्क)",
  "Leo (सिंह)", "Virgo (कन्या)", "Libra (तुला)", "Scorpio (वृश्चिक)",
  "Sagittarius (धनु)", "Capricorn (मकर)", "Aquarius (कुंभ)", "Pisces (मीन)"
];

export default function ShaniSadeSatiCalculator() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    place: "",
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const calculateSadeSati = () => {
    if (!formData.date || !formData.time || !formData.place) {
      toast.error("कृपया सभी जानकारी भरें / Please fill all details");
      return;
    }

    setLoading(true);

    // Simulate calculation
    setTimeout(() => {
      const birthDate = new Date(`${formData.date}T${formData.time}`);
      const currentDate = new Date();
      const monthIndex = birthDate.getMonth();
      
      // Calculate Moon Rashi (simplified calculation)
      const moonRashi = rashis[monthIndex % 12];
      const moonRashiIndex = monthIndex % 12;
      
      // Current Saturn position (simplified - changes every 2.5 years)
      const yearsSinceBirth = currentDate.getFullYear() - birthDate.getFullYear();
      const saturnCyclePosition = Math.floor((yearsSinceBirth / 2.5) % 12);
      
      // Sade Sati occurs when Saturn transits 12th, 1st, and 2nd house from Moon
      const isSadeSati = 
        saturnCyclePosition === (moonRashiIndex + 11) % 12 || // 12th house
        saturnCyclePosition === moonRashiIndex || // 1st house
        saturnCyclePosition === (moonRashiIndex + 1) % 12; // 2nd house
      
      let phase = "नहीं चल रहा / Not Running";
      let phaseNumber = 0;
      let yearsRemaining = 0;
      
      if (isSadeSati) {
        if (saturnCyclePosition === (moonRashiIndex + 11) % 12) {
          phase = "प्रथम चरण / First Phase (Rising/Dhayya)";
          phaseNumber = 1;
          yearsRemaining = 2.5;
        } else if (saturnCyclePosition === moonRashiIndex) {
          phase = "द्वितीय चरण / Second Phase (Peak)";
          phaseNumber = 2;
          yearsRemaining = 5.0; // 2.5 remaining + next phase
        } else {
          phase = "तृतीय चरण / Third Phase (Setting/Dhayya)";
          phaseNumber = 3;
          yearsRemaining = 2.5;
        }
      }

      setResult({
        isSadeSati,
        moonRashi,
        currentSaturnPosition: rashis[saturnCyclePosition],
        phase,
        phaseNumber,
        yearsRemaining: yearsRemaining.toFixed(1),
        effects: getSadeSatiEffects(phaseNumber),
        remedies: getSadeSatiRemedies(),
        guidance: getPhaseGuidance(phaseNumber),
      });
      setLoading(false);
    }, 1500);
  };

  const getSadeSatiEffects = (phase: number) => {
    if (phase === 0) {
      return [
        "जीवन सामान्य गति से चल रहा है / Life is running normally",
        "कोई विशेष बाधा नहीं / No major obstacles",
      ];
    }

    const phaseEffects: { [key: number]: string[] } = {
      1: [
        "स्वास्थ्य संबंधी समस्याएं / Health-related issues",
        "मानसिक तनाव और चिंता / Mental stress and anxiety",
        "पारिवारिक समस्याएं / Family problems",
        "करियर में बाधाएं / Career obstacles",
      ],
      2: [
        "गंभीर स्वास्थ्य समस्याएं / Serious health issues",
        "वित्तीय नुकसान / Financial losses",
        "संबंधों में तनाव / Stress in relationships",
        "व्यापार में हानि / Business losses",
        "प्रतिष्ठा को खतरा / Threat to reputation",
        "अत्यधिक मानसिक दबाव / Extreme mental pressure",
      ],
      3: [
        "धीरे-धीरे सुधार / Gradual improvement",
        "संतान संबंधी चिंता / Concerns related to children",
        "आर्थिक स्थिति में सुधार / Financial situation improving",
        "करियर में स्थिरता / Career stability",
      ],
    };

    return phaseEffects[phase] || [];
  };

  const getSadeSatiRemedies = () => {
    return [
      "शनिवार का व्रत रखें / Observe Saturday fast",
      "हनुमान चालीसा का पाठ करें / Recite Hanuman Chalisa",
      "शनि देव को तेल और काले तिल चढ़ाएं / Offer oil and black sesame to Lord Shani",
      "नीलम पत्थर धारण करें (ज्योतिषी से परामर्श के बाद) / Wear Blue Sapphire (after astrologer consultation)",
      "गरीबों को काले कपड़े दान करें / Donate black clothes to poor",
      "शनि मंत्र जाप: ॐ शं शनैश्चराय नमः / Chant Shani mantra: Om Sham Shanaishcharaya Namah",
      "पीपल के पेड़ की पूजा करें / Worship Peepal tree",
      "काली उड़द दाल दान करें / Donate black gram dal",
      "शनि स्तोत्र का पाठ करें / Recite Shani Stotra",
      "कर्म में ईमानदारी बनाए रखें / Maintain honesty in actions",
    ];
  };

  const getPhaseGuidance = (phase: number) => {
    const guidance: { [key: number]: string } = {
      0: "आप साढ़े साती के दौर में नहीं हैं। जीवन सामान्य रूप से चल रहा है। अपने कर्मों को अच्छा रखें और ईमानदारी से जीवन जिएं।",
      1: "प्रथम चरण (ढैय्या) शुरू हो गया है। सावधानी बरतें, धैर्य रखें, और नियमित उपाय करें। यह समय परीक्षा का है।",
      2: "द्वितीय चरण (पीक) चल रहा है। यह सबसे कठिन समय है। अत्यधिक सावधानी, धैर्य, और भक्ति की आवश्यकता है। नियमित उपाय अवश्य करें।",
      3: "तृतीय चरण (ढैय्या) चल रहा है। स्थिति में सुधार हो रहा है। उपाय जारी रखें और सकारात्मक रहें। जल्द ही अच्छे दिन आएंगे।",
    };

    return guidance[phase] || "";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Moon className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              Shani Sade Sati Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            शनि साढ़े साती कैलकुलेटर - जानें क्या आप साढ़े साती के दौर में हैं
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Check if you are currently going through Shani Sade Sati period (7.5 years of Saturn transit)
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Calculator Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-black mb-6 text-center">
              अपनी जन्म विवरण दर्ज करें / Enter Your Birth Details
            </h2>

            <div className="space-y-6">
              {/* Date Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  जन्म तिथि / Birth Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                />
              </div>

              {/* Time Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  जन्म समय / Birth Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                />
              </div>

              {/* Place Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  जन्म स्थान / Birth Place
                </label>
                <input
                  type="text"
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  placeholder="e.g., Mumbai, Maharashtra"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                />
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateSadeSati}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? "गणना हो रही है... / Calculating..." : "साढ़े साती की जाँच करें / Check Sade Sati"}
              </button>
            </div>
          </div>

          {/* Result Card */}
          {result && (
            <div className={`rounded-2xl shadow-xl border-2 p-8 animate-fadeIn ${
              result.isSadeSati ? 'bg-blue-50 border-blue-400' : 'bg-green-50 border-green-400'
            }`}>
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                  result.isSadeSati ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  <Moon className={`h-10 w-10 ${result.isSadeSati ? 'text-blue-600' : 'text-green-600'}`} />
                </div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  {result.isSadeSati ? "साढ़े साती चल रही है / Sade Sati Running" : "साढ़े साती नहीं है / No Sade Sati"}
                </h2>
                <div className={`text-2xl font-bold mb-2 ${result.isSadeSati ? 'text-blue-600' : 'text-green-600'}`}>
                  {result.phase}
                </div>
                <p className="text-lg text-gray-600 mb-2">
                  आपकी चंद्र राशि / Your Moon Rashi: <span className="font-bold">{result.moonRashi}</span>
                </p>
                <p className="text-md text-gray-500">
                  शनि की वर्तमान स्थिति / Current Saturn Position: {result.currentSaturnPosition}
                </p>
                {result.isSadeSati && (
                  <p className="text-md text-gray-600 mt-2">
                    शेष समय (लगभग) / Time Remaining (Approx): {result.yearsRemaining} वर्ष / years
                  </p>
                )}
              </div>

              {result.isSadeSati && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-md mb-6">
                    <h3 className="font-bold text-lg text-black mb-3 flex items-center gap-2">
                      <span className="text-2xl">ℹ️</span>
                      मार्गदर्शन / Guidance
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {result.guidance}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="font-bold text-lg text-black mb-3 flex items-center gap-2">
                        <span className="text-2xl">⚠️</span>
                        प्रभाव / Effects
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {result.effects.map((effect: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="font-bold text-lg text-black mb-3 flex items-center gap-2">
                        <span className="text-2xl">🙏</span>
                        उपाय / Remedies
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700 max-h-[300px] overflow-y-auto">
                        {result.remedies.slice(0, 6).map((remedy: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">{index + 1}.</span>
                            <span>{remedy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-black mb-3 flex items-center gap-2">
                      <span className="text-2xl">📋</span>
                      अतिरिक्त उपाय / Additional Remedies
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {result.remedies.slice(6).map((remedy: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-orange-500 font-bold">{index + 7}.</span>
                          <span>{remedy}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!result.isSadeSati && (
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <p className="text-lg text-gray-700">
                    आप साढ़े साती के दौर में नहीं हैं। आपका जीवन सामान्य रूप से चल रहा है।
                  </p>
                  <p className="text-md text-gray-600 mt-2">
                    You are not going through Sade Sati period. Your life is running normally.
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    अच्छे कर्म करते रहें और ईमानदारी से जीवन जिएं। / Keep doing good deeds and live honestly.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-black mb-4">शनि साढ़े साती के बारे में / About Shani Sade Sati</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>साढ़े साती क्या है? / What is Sade Sati?</strong><br />
                शनि साढ़े साती एक 7.5 वर्ष की अवधि है जब शनि ग्रह चंद्र राशि से 12वें, 1ले, और 2रे घर में गोचर करता है।
              </p>
              <p>
                <strong>तीन चरण / Three Phases:</strong><br />
                • प्रथम ढैय्या (2.5 वर्ष): 12वें घर में / First Dhayya in 12th house<br />
                • पीक (2.5 वर्ष): 1ले घर में - सबसे कठिन / Peak in 1st house - Most difficult<br />
                • तृतीय ढैय्या (2.5 वर्ष): 2रे घर में / Third Dhayya in 2nd house
              </p>
              <p>
                <strong>महत्वपूर्ण / Important:</strong><br />
                साढ़े साती हमेशा नकारात्मक नहीं होती। यह कर्म सुधार का समय है। सही उपाय और सकारात्मक दृष्टिकोण से इसे पार किया जा सकता है।
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}