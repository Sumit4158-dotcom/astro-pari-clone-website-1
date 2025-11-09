"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";

interface BirthDetails {
  name: string;
  date: string;
  time: string;
  place: string;
}

interface CompatibilityResult {
  score: number;
  guna: number;
  message: string;
  details: {
    varna: number;
    vashya: number;
    tara: number;
    yoni: number;
    graha: number;
    gana: number;
    bhakoot: number;
    nadi: number;
  };
}

export default function MatchingPage() {
  const [boy, setBoy] = useState<BirthDetails>({
    name: "",
    date: "",
    time: "",
    place: "",
  });

  const [girl, setGirl] = useState<BirthDetails>({
    name: "",
    date: "",
    time: "",
    place: "",
  });

  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateCompatibility = () => {
    if (!boy.name || !boy.date || !boy.time || !boy.place) {
      alert("कृपया लड़के की सभी जानकारी भरें");
      return;
    }
    if (!girl.name || !girl.date || !girl.time || !girl.place) {
      alert("कृपया लड़की की सभी जानकारी भरें");
      return;
    }

    setIsCalculating(true);

    // Simulate calculation
    setTimeout(() => {
      const varna = Math.floor(Math.random() * 2);
      const vashya = Math.floor(Math.random() * 3);
      const tara = Math.floor(Math.random() * 4);
      const yoni = Math.floor(Math.random() * 5);
      const graha = Math.floor(Math.random() * 6);
      const gana = Math.floor(Math.random() * 7);
      const bhakoot = Math.floor(Math.random() * 8);
      const nadi = Math.floor(Math.random() * 9);

      const totalGuna = varna + vashya + tara + yoni + graha + gana + bhakoot + nadi;
      const score = Math.round((totalGuna / 36) * 100);

      let message = "";
      if (score >= 80) {
        message = "उत्तम मेल! यह जोड़ी बहुत अच्छी है।";
      } else if (score >= 60) {
        message = "अच्छा मेल! यह रिश्ता सफल हो सकता है।";
      } else if (score >= 40) {
        message = "औसत मेल। कुछ चुनौतियां हो सकती हैं।";
      } else {
        message = "कम मेल। ज्योतिषी से परामर्श लें।";
      }

      setResult({
        score,
        guna: totalGuna,
        message,
        details: { varna, vashya, tara, yoni, graha, gana, bhakoot, nadi },
      });
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4 py-12">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              कुंडली मिलान
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              गुण मिलान के आधार पर जानें अपनी कुंडली का मेल
            </p>
          </div>

          {/* Form Section */}
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Boy's Details */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  लड़के की जानकारी
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    नाम
                  </label>
                  <input
                    type="text"
                    value={boy.name}
                    onChange={(e) => setBoy({ ...boy, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="पूरा नाम दर्ज करें"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    जन्म तिथि
                  </label>
                  <input
                    type="date"
                    value={boy.date}
                    onChange={(e) => setBoy({ ...boy, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />
                    जन्म समय
                  </label>
                  <input
                    type="time"
                    value={boy.time}
                    onChange={(e) => setBoy({ ...boy, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    जन्म स्थान
                  </label>
                  <input
                    type="text"
                    value={boy.place}
                    onChange={(e) => setBoy({ ...boy, place: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="शहर का नाम"
                  />
                </div>
              </div>

              {/* Girl's Details */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  लड़की की जानकारी
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    नाम
                  </label>
                  <input
                    type="text"
                    value={girl.name}
                    onChange={(e) => setGirl({ ...girl, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="पूरा नाम दर्ज करें"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    जन्म तिथि
                  </label>
                  <input
                    type="date"
                    value={girl.date}
                    onChange={(e) => setGirl({ ...girl, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />
                    जन्म समय
                  </label>
                  <input
                    type="time"
                    value={girl.time}
                    onChange={(e) => setGirl({ ...girl, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    जन्म स्थान
                  </label>
                  <input
                    type="text"
                    value={girl.place}
                    onChange={(e) => setGirl({ ...girl, place: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="शहर का नाम"
                  />
                </div>
              </div>
            </div>

            {/* Check Button */}
            <div className="text-center mt-8">
              <button
                onClick={calculateCompatibility}
                disabled={isCalculating}
                className="bg-black text-white px-12 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isCalculating ? "गणना हो रही है..." : "मिलान करें"}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="max-w-6xl mx-auto bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl shadow-xl p-8 animate-fade-in">
              <div className="text-center mb-8">
                <div className="inline-block bg-white rounded-full p-8 shadow-lg mb-4">
                  <div className="text-6xl font-bold text-yellow-600">
                    {result.score}%
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {result.guna}/36 गुण मेल
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {result.message}
                </h3>
                <p className="text-gray-600">
                  {boy.name} और {girl.name} की कुंडली का विश्लेषण
                </p>
              </div>

              {/* Guna Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white rounded-xl p-4 text-center shadow">
                  <div className="text-2xl font-bold text-yellow-600">{result.details.varna}/1</div>
                  <div className="text-sm text-gray-600">वर्ण</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow">
                  <div className="text-2xl font-bold text-yellow-600">{result.details.vashya}/2</div>
                  <div className="text-sm text-gray-600">वश्य</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow">
                  <div className="text-2xl font-bold text-yellow-600">{result.details.tara}/3</div>
                  <div className="text-sm text-gray-600">तारा</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow">
                  <div className="text-2xl font-bold text-yellow-600">{result.details.yoni}/4</div>
                  <div className="text-sm text-gray-600">योनि</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow">
                  <div className="text-2xl font-bold text-yellow-600">{result.details.graha}/5</div>
                  <div className="text-sm text-gray-600">ग्रह मैत्री</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow">
                  <div className="text-2xl font-bold text-yellow-600">{result.details.gana}/6</div>
                  <div className="text-sm text-gray-600">गण</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow">
                  <div className="text-2xl font-bold text-yellow-600">{result.details.bhakoot}/7</div>
                  <div className="text-sm text-gray-600">भकूट</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow">
                  <div className="text-2xl font-bold text-yellow-600">{result.details.nadi}/8</div>
                  <div className="text-sm text-gray-600">नाड़ी</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-all duration-300">
                  विस्तृत रिपोर्ट डाउनलोड करें
                </button>
                <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 border-2 border-gray-200">
                  ज्योतिषी से परामर्श लें
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}