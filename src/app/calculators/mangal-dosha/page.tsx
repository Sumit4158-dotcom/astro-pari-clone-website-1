"use client";

import { useState } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Calendar, Clock, MapPin, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function MangalDoshaCalculator() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    place: "",
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const calculateMangalDosha = () => {
    if (!formData.date || !formData.time || !formData.place) {
      toast.error("कृपया सभी जानकारी भरें / Please fill all details");
      return;
    }

    setLoading(true);

    // Simulate calculation
    setTimeout(() => {
      const birthDate = new Date(`${formData.date}T${formData.time}`);
      const dayOfMonth = birthDate.getDate();
      const month = birthDate.getMonth() + 1;
      
      // Simulate Mars position calculation
      // In real scenario, this would use astronomical calculations
      const calculatedValue = (dayOfMonth * month + birthDate.getHours()) % 12;
      
      // Mars in houses 1, 2, 4, 7, 8, 12 creates Mangal Dosha
      const doshaHouses = [1, 2, 4, 7, 8, 12];
      const marsHouse = calculatedValue === 0 ? 12 : calculatedValue;
      const hasMangalDosha = doshaHouses.includes(marsHouse);
      
      // Determine severity
      let severity = "कोई दोष नहीं / No Dosha";
      let severityLevel = 0;
      
      if (hasMangalDosha) {
        if ([1, 4, 7, 8].includes(marsHouse)) {
          severity = "उच्च मांगलिक / High Manglik";
          severityLevel = 3;
        } else if ([2, 12].includes(marsHouse)) {
          severity = "मध्यम मांगलिक / Moderate Manglik";
          severityLevel = 2;
        }
      }

      setResult({
        hasMangalDosha,
        marsHouse,
        severity,
        severityLevel,
        effects: getMangalDoshaEffects(marsHouse, hasMangalDosha),
        remedies: getMangalDoshaRemedies(severityLevel),
        compatibility: getCompatibilityInfo(severityLevel),
      });
      setLoading(false);
    }, 1500);
  };

  const getMangalDoshaEffects = (house: number, hasDosha: boolean) => {
    if (!hasDosha) {
      return [
        "वैवाहिक जीवन में कोई बाधा नहीं / No obstacles in married life",
        "सामान्य जीवन और संबंध / Normal life and relationships",
      ];
    }

    const effects: { [key: number]: string[] } = {
      1: [
        "स्वभाव में उग्रता / Aggressive nature",
        "वैवाहिक जीवन में तनाव / Stress in married life",
        "साथी के साथ मतभेद / Differences with partner",
      ],
      2: [
        "पारिवारिक कलह / Family discord",
        "धन संबंधी समस्याएं / Financial issues",
        "वाणी में कठोरता / Harsh speech",
      ],
      4: [
        "मानसिक तनाव / Mental stress",
        "संपत्ति में बाधा / Property obstacles",
        "माता के साथ मतभेद / Issues with mother",
      ],
      7: [
        "विवाह में विलंब / Delay in marriage",
        "जीवनसाथी के स्वास्थ्य में समस्या / Spouse health issues",
        "वैवाहिक जीवन में कठिनाई / Difficulty in married life",
      ],
      8: [
        "दुर्घटना का भय / Fear of accidents",
        "आयु में कमी की संभावना / Possibility of reduced lifespan",
        "अचानक परिवर्तन / Sudden changes",
      ],
      12: [
        "व्यय में वृद्धि / Increased expenditure",
        "विदेश यात्रा / Foreign travel",
        "शत्रुओं से समस्या / Problems from enemies",
      ],
    };

    return effects[house] || [];
  };

  const getMangalDoshaRemedies = (level: number) => {
    if (level === 0) return [];

    const commonRemedies = [
      "मंगलवार का व्रत रखें / Observe Tuesday fast",
      "हनुमान चालीसा का पाठ करें / Recite Hanuman Chalisa",
      "लाल मसूर दाल दान करें / Donate red lentils",
      "हनुमान मंदिर जाएं / Visit Hanuman temple",
      "मूंगा (Red Coral) धारण करें / Wear Red Coral gemstone",
      "मंगल मंत्र जाप करें: ॐ अं अंगारकाय नमः / Chant Mangal mantra",
    ];

    const highRemedies = [
      "भात पूजा करवाएं / Perform Bhat Puja",
      "मंगल शांति पूजा करवाएं / Perform Mangal Shanti Puja",
      "कुंभ विवाह करें (लड़कियों के लिए) / Kumbh Vivah for girls",
    ];

    return level === 3 ? [...commonRemedies, ...highRemedies] : commonRemedies;
  };

  const getCompatibilityInfo = (level: number) => {
    if (level === 0) {
      return {
        withManglik: "किसी भी व्यक्ति से विवाह कर सकते हैं / Can marry anyone",
        withNonManglik: "शुभ विवाह / Auspicious marriage",
      };
    }

    return {
      withManglik: "दोनों मांगलिक होने पर दोष कट जाता है / Dosha cancels if both are Manglik",
      withNonManglik: "मांगलिक से विवाह करें या उपाय करें / Marry Manglik or perform remedies",
    };
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle className="h-10 w-10 text-red-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              Mangal Dosha Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            मांगलिक दोष कैलकुलेटर - जानें क्या आप मांगलिक हैं
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Check if you have Mangal Dosha (Kuja Dosha) in your Kundli for marriage compatibility
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Calculator Card */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-8 mb-8">
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all"
                />
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateMangalDosha}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? "गणना हो रही है... / Calculating..." : "मांगलिक दोष की जाँच करें / Check Mangal Dosha"}
              </button>
            </div>
          </div>

          {/* Result Card */}
          {result && (
            <div className={`rounded-2xl shadow-xl border-2 p-8 animate-fadeIn ${
              result.hasMangalDosha ? 'bg-red-50 border-red-400' : 'bg-green-50 border-green-400'
            }`}>
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                  result.hasMangalDosha ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  <AlertTriangle className={`h-10 w-10 ${result.hasMangalDosha ? 'text-red-600' : 'text-green-600'}`} />
                </div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  {result.hasMangalDosha ? "मांगलिक दोष है / Mangal Dosha Present" : "मांगलिक दोष नहीं है / No Mangal Dosha"}
                </h2>
                <div className={`text-2xl font-bold mb-2 ${result.hasMangalDosha ? 'text-red-600' : 'text-green-600'}`}>
                  {result.severity}
                </div>
                <p className="text-lg text-gray-600">
                  मंगल का घर / Mars in House: {result.marsHouse}
                </p>
              </div>

              {result.hasMangalDosha && (
                <>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="font-bold text-lg text-black mb-3 flex items-center gap-2">
                        <span className="text-2xl">⚠️</span>
                        प्रभाव / Effects
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {result.effects.map((effect: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="font-bold text-lg text-black mb-3 flex items-center gap-2">
                        <span className="text-2xl">💑</span>
                        विवाह अनुकूलता / Marriage Compatibility
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800">मांगलिक के साथ / With Manglik:</p>
                          <p className="text-gray-600">{result.compatibility.withManglik}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">गैर-मांगलिक के साथ / With Non-Manglik:</p>
                          <p className="text-gray-600">{result.compatibility.withNonManglik}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="font-bold text-lg text-black mb-4 flex items-center gap-2">
                      <span className="text-2xl">🙏</span>
                      उपाय / Remedies
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {result.remedies.map((remedy: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-orange-500 font-bold">{index + 1}.</span>
                          <span>{remedy}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!result.hasMangalDosha && (
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <p className="text-lg text-gray-700">
                    आपकी कुंडली में मांगलिक दोष नहीं है। आप किसी भी व्यक्ति से विवाह कर सकते हैं।
                  </p>
                  <p className="text-md text-gray-600 mt-2">
                    You don't have Mangal Dosha in your Kundli. You can marry anyone without restrictions.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-black mb-4">मांगलिक दोष के बारे में / About Mangal Dosha</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>मांगलिक दोष क्या है? / What is Mangal Dosha?</strong><br />
                जब कुंडली में मंगल ग्रह 1, 2, 4, 7, 8, या 12वें घर में होता है, तो मांगलिक दोष बनता है। इसे कुजा दोष भी कहते हैं।
              </p>
              <p>
                <strong>प्रभाव / Effects:</strong><br />
                • वैवाहिक जीवन में कठिनाइयां / Difficulties in married life<br />
                • विवाह में विलंब / Delay in marriage<br />
                • जीवनसाथी के स्वास्थ्य में समस्या / Health issues to spouse<br />
                • मानसिक तनाव / Mental stress
              </p>
              <p>
                <strong>समाधान / Solution:</strong><br />
                दोनों पक्ष मांगलिक होने पर दोष कट जाता है। उपायों से भी दोष का प्रभाव कम किया जा सकता है।
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}