"use client";

import { useState } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import { toast } from "sonner";

const nakshatras = [
  { name: "Ashwini (अश्विनी)", lord: "Ketu", deity: "Ashwini Kumars", symbol: "Horse's Head", range: "0° - 13°20'", rashi: "Aries" },
  { name: "Bharani (भरणी)", lord: "Venus", deity: "Yama", symbol: "Yoni", range: "13°20' - 26°40'", rashi: "Aries" },
  { name: "Krittika (कृत्तिका)", lord: "Sun", deity: "Agni", symbol: "Razor/Flame", range: "26°40' - 40°", rashi: "Aries/Taurus" },
  { name: "Rohini (रोहिणी)", lord: "Moon", deity: "Brahma", symbol: "Chariot/Ox Cart", range: "40° - 53°20'", rashi: "Taurus" },
  { name: "Mrigashira (मृगशिरा)", lord: "Mars", deity: "Soma", symbol: "Deer's Head", range: "53°20' - 66°40'", rashi: "Taurus/Gemini" },
  { name: "Ardra (आर्द्रा)", lord: "Rahu", deity: "Rudra", symbol: "Teardrop/Diamond", range: "66°40' - 80°", rashi: "Gemini" },
  { name: "Punarvasu (पुनर्वसु)", lord: "Jupiter", deity: "Aditi", symbol: "Quiver of Arrows", range: "80° - 93°20'", rashi: "Gemini/Cancer" },
  { name: "Pushya (पुष्य)", lord: "Saturn", deity: "Brihaspati", symbol: "Cow's Udder", range: "93°20' - 106°40'", rashi: "Cancer" },
  { name: "Ashlesha (अश्लेषा)", lord: "Mercury", deity: "Nagas", symbol: "Serpent", range: "106°40' - 120°", rashi: "Cancer" },
  { name: "Magha (मघा)", lord: "Ketu", deity: "Pitris", symbol: "Royal Throne", range: "120° - 133°20'", rashi: "Leo" },
  { name: "Purva Phalguni (पूर्वा फाल्गुनी)", lord: "Venus", deity: "Bhaga", symbol: "Hammock/Bed", range: "133°20' - 146°40'", rashi: "Leo" },
  { name: "Uttara Phalguni (उत्तरा फाल्गुनी)", lord: "Sun", deity: "Aryaman", symbol: "Bed/Cot", range: "146°40' - 160°", rashi: "Leo/Virgo" },
  { name: "Hasta (हस्त)", lord: "Moon", deity: "Savitar", symbol: "Hand", range: "160° - 173°20'", rashi: "Virgo" },
  { name: "Chitra (चित्रा)", lord: "Mars", deity: "Vishwakarma", symbol: "Bright Jewel/Pearl", range: "173°20' - 186°40'", rashi: "Virgo/Libra" },
  { name: "Swati (स्वाति)", lord: "Rahu", deity: "Vayu", symbol: "Young Sprout", range: "186°40' - 200°", rashi: "Libra" },
  { name: "Vishakha (विशाखा)", lord: "Jupiter", deity: "Indra-Agni", symbol: "Triumphal Arch", range: "200° - 213°20'", rashi: "Libra/Scorpio" },
  { name: "Anuradha (अनुराधा)", lord: "Saturn", deity: "Mitra", symbol: "Lotus Flower", range: "213°20' - 226°40'", rashi: "Scorpio" },
  { name: "Jyeshtha (ज्येष्ठा)", lord: "Mercury", deity: "Indra", symbol: "Earring/Umbrella", range: "226°40' - 240°", rashi: "Scorpio" },
  { name: "Moola (मूल)", lord: "Ketu", deity: "Nirrti", symbol: "Bunch of Roots", range: "240° - 253°20'", rashi: "Sagittarius" },
  { name: "Purva Ashadha (पूर्वाषाढ़ा)", lord: "Venus", deity: "Apah", symbol: "Elephant Tusk/Fan", range: "253°20' - 266°40'", rashi: "Sagittarius" },
  { name: "Uttara Ashadha (उत्तराषाढ़ा)", lord: "Sun", deity: "Vishvadevas", symbol: "Elephant Tusk", range: "266°40' - 280°", rashi: "Sagittarius/Capricorn" },
  { name: "Shravana (श्रवण)", lord: "Moon", deity: "Vishnu", symbol: "Ear/Three Footprints", range: "280° - 293°20'", rashi: "Capricorn" },
  { name: "Dhanishta (धनिष्ठा)", lord: "Mars", deity: "Eight Vasus", symbol: "Drum/Flute", range: "293°20' - 306°40'", rashi: "Capricorn/Aquarius" },
  { name: "Shatabhisha (शतभिषा)", lord: "Rahu", deity: "Varuna", symbol: "Empty Circle/1000 Flowers", range: "306°40' - 320°", rashi: "Aquarius" },
  { name: "Purva Bhadrapada (पूर्वाभाद्रपद)", lord: "Jupiter", deity: "Aja Ekapada", symbol: "Sword/Two Front Legs of Bed", range: "320° - 333°20'", rashi: "Aquarius/Pisces" },
  { name: "Uttara Bhadrapada (उत्तराभाद्रपद)", lord: "Saturn", deity: "Ahir Budhnya", symbol: "Back Legs of Bed/Twins", range: "333°20' - 346°40'", rashi: "Pisces" },
  { name: "Revati (रेवती)", lord: "Mercury", deity: "Pushan", symbol: "Fish/Drum", range: "346°40' - 360°", rashi: "Pisces" },
];

export default function NakshatraCalculator() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    place: "",
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const calculateNakshatra = () => {
    if (!formData.date || !formData.time || !formData.place) {
      toast.error("कृपया सभी जानकारी भरें / Please fill all details");
      return;
    }

    setLoading(true);

    // Simulate calculation
    setTimeout(() => {
      // Calculate moon longitude (simplified - in real scenario, use astronomical library)
      const birthDate = new Date(`${formData.date}T${formData.time}`);
      const dayOfYear = Math.floor((birthDate.getTime() - new Date(birthDate.getFullYear(), 0, 0).getTime()) / 86400000);
      
      // Simulate moon position (0-360 degrees)
      const moonLongitude = ((dayOfYear * 13.176) % 360);
      
      // Each nakshatra is 13.333... degrees (360/27)
      const nakshatraIndex = Math.floor(moonLongitude / 13.333);
      const nakshatra = nakshatras[nakshatraIndex];
      
      // Calculate pada (quarter) - each nakshatra has 4 padas
      const positionInNakshatra = moonLongitude % 13.333;
      const pada = Math.floor((positionInNakshatra / 13.333) * 4) + 1;

      setResult({
        nakshatra,
        pada,
        moonLongitude: moonLongitude.toFixed(2),
        characteristics: getNakshatraCharacteristics(nakshatra.name),
      });
      setLoading(false);
    }, 1500);
  };

  const getNakshatraCharacteristics = (name: string) => {
    const characteristics: { [key: string]: any } = {
      "Ashwini (अश्विनी)": {
        nature: "हल्का, तेज़, और चंचल / Light, swift, and active",
        qualities: "चिकित्सा कला, घुड़सवारी, यात्रा / Healing arts, horsemanship, travel",
        favorable: "नई शुरुआत, उपचार कार्य / New beginnings, healing work",
      },
      "Bharani (भरणी)": {
        nature: "उग्र और तीव्र / Fierce and intense",
        qualities: "रचनात्मकता, धैर्य, कठोर परिश्रम / Creativity, patience, hard work",
        favorable: "नया निर्माण, कला कार्य / New creation, artistic work",
      },
      "Rohini (रोहिणी)": {
        nature: "स्थिर और सुंदर / Fixed and beautiful",
        qualities: "कला, सौंदर्य, धन / Art, beauty, wealth",
        favorable: "विवाह, व्यापार, कला / Marriage, business, arts",
      },
    };

    return characteristics[name] || {
      nature: "संतुलित और शुभ / Balanced and auspicious",
      qualities: "आध्यात्मिक विकास / Spiritual growth",
      favorable: "सामान्य कार्य / General activities",
    };
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="h-10 w-10 text-[#FFD700]" />
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              Nakshatra Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            नक्षत्र कैलकुलेटर - अपना जन्म नक्षत्र जानें
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Discover your birth nakshatra (lunar mansion) and its significance in Vedic astrology
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Calculator Card */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-8 mb-8">
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                />
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateNakshatra}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? "गणना हो रही है... / Calculating..." : "नक्षत्र की गणना करें / Calculate Nakshatra"}
              </button>
            </div>
          </div>

          {/* Result Card */}
          {result && (
            <div className="bg-white rounded-2xl shadow-xl border-2 border-yellow-400 p-8 animate-fadeIn">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4">
                  <Star className="h-10 w-10 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  आपका नक्षत्र / Your Nakshatra
                </h2>
                <div className="text-4xl font-bold text-yellow-600 mb-2">
                  {result.nakshatra.name}
                </div>
                <p className="text-lg text-gray-600">
                  पाद / Pada: {result.pada} | चंद्र देशांतर / Moon Longitude: {result.moonLongitude}°
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-black mb-3">नक्षत्र विवरण / Nakshatra Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">स्वामी / Lord:</span> {result.nakshatra.lord}</p>
                    <p><span className="font-semibold">देवता / Deity:</span> {result.nakshatra.deity}</p>
                    <p><span className="font-semibold">प्रतीक / Symbol:</span> {result.nakshatra.symbol}</p>
                    <p><span className="font-semibold">राशि / Rashi:</span> {result.nakshatra.rashi}</p>
                    <p><span className="font-semibold">सीमा / Range:</span> {result.nakshatra.range}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-black mb-3">विशेषताएं / Characteristics</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">स्वभाव / Nature:</span> {result.characteristics.nature}</p>
                    <p><span className="font-semibold">गुण / Qualities:</span> {result.characteristics.qualities}</p>
                    <p><span className="font-semibold">अनुकूल कार्य / Favorable For:</span> {result.characteristics.favorable}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6">
                <h3 className="font-bold text-lg text-black mb-3">📌 नक्षत्र का महत्व / Importance of Nakshatra</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  नक्षत्र वैदिक ज्योतिष में अत्यंत महत्वपूर्ण है। यह आपके स्वभाव, भावनाओं, और जीवन के विभिन्न पहलुओं को प्रभावित करता है। 
                  प्रत्येक नक्षत्र के अपने विशिष्ट गुण, शक्तियां, और प्रभाव होते हैं। नक्षत्र के आधार पर शुभ मुहूर्त, नामकरण, और विवाह मिलान भी किया जाता है।
                </p>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-black mb-4">नक्षत्र के बारे में / About Nakshatras</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>नक्षत्र क्या है? / What is Nakshatra?</strong><br />
                नक्षत्र चंद्रमा की 27 स्थितियां हैं जो राशि चक्र में विभाजित हैं। प्रत्येक नक्षत्र 13°20' का होता है।
              </p>
              <p>
                <strong>महत्व / Importance:</strong><br />
                • व्यक्तित्व और स्वभाव निर्धारण / Personality and nature determination<br />
                • विवाह मिलान / Marriage compatibility<br />
                • मुहूर्त चयन / Auspicious timing selection<br />
                • नामकरण संस्कार / Naming ceremony
              </p>
              <p>
                <strong>27 नक्षत्र / 27 Nakshatras:</strong><br />
                अश्विनी से रेवती तक - प्रत्येक का अपना स्वामी ग्रह, देवता, और विशेष गुण है।
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}