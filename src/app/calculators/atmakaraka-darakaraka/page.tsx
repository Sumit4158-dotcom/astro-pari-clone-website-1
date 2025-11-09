"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Star, Calendar, Clock, MapPin } from "lucide-react";

export default function AtmakarakaDarakarakaCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [result, setResult] = useState<{
    atmakaraka: string;
    atmakarakaDegree: number;
    darakaraka: string;
    darakarakaDegree: number;
  } | null>(null);

  const planets = [
    { name: "सूर्य (Sun)", english: "Sun" },
    { name: "चंद्र (Moon)", english: "Moon" },
    { name: "मंगल (Mars)", english: "Mars" },
    { name: "बुध (Mercury)", english: "Mercury" },
    { name: "गुरु (Jupiter)", english: "Jupiter" },
    { name: "शुक्र (Venus)", english: "Venus" },
    { name: "शनि (Saturn)", english: "Saturn" },
  ];

  const calculateKarakas = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulated planetary degrees calculation based on birth data
    // In real implementation, this would use astronomical calculations
    const date = new Date(birthDate);
    const timeParts = birthTime.split(":");
    const hours = parseInt(timeParts[0] || "0");
    const minutes = parseInt(timeParts[1] || "0");

    // Generate pseudo-random but consistent degrees based on input
    const seed = date.getTime() + hours * 3600000 + minutes * 60000 + birthPlace.length * 1000;
    
    const planetaryDegrees = planets.map((planet, index) => {
      const degree = ((seed * (index + 1) * 7) % 30000) / 100; // 0-300 degrees
      return {
        name: planet.name,
        english: planet.english,
        degree: parseFloat(degree.toFixed(2)),
      };
    });

    // Sort by degree to find Atmakaraka (highest) and Darakaraka (lowest)
    const sortedByDegree = [...planetaryDegrees].sort((a, b) => b.degree - a.degree);
    
    const atmakaraka = sortedByDegree[0];
    const darakaraka = sortedByDegree[sortedByDegree.length - 1];

    setResult({
      atmakaraka: atmakaraka.name,
      atmakarakaDegree: atmakaraka.degree,
      darakaraka: darakaraka.name,
      darakarakaDegree: darakaraka.degree,
    });
  };

  const getAtmakarakaDescription = (planet: string) => {
    const descriptions: Record<string, string> = {
      "सूर्य (Sun)": "आत्मकारक सूर्य होने से आप नेतृत्व क्षमता, आत्मविश्वास और स्वाभिमान से भरे हैं। आपका जीवन उद्देश्य अधिकार और पहचान प्राप्त करना है।",
      "चंद्र (Moon)": "आत्मकारक चंद्रमा होने से आप भावनात्मक, संवेदनशील और देखभाल करने वाले हैं। आपका जीवन उद्देश्य मानसिक शांति और भावनात्मक सुरक्षा है।",
      "मंगल (Mars)": "आत्मकारक मंगल होने से आप साहसी, ऊर्जावान और प्रतिस्पर्धी हैं। आपका जीवन उद्देश्य चुनौतियों का सामना करना और विजय प्राप्त करना है।",
      "बुध (Mercury)": "आत्मकारक बुध होने से आप बुद्धिमान, संचारक और विश्लेषणात्मक हैं। आपका जीवन उद्देश्य ज्ञान और कौशल विकसित करना है।",
      "गुरु (Jupiter)": "आत्मकारक गुरु होने से आप ज्ञानी, आध्यात्मिक और उदार हैं। आपका जीवन उद्देश्य शिक्षा और आध्यात्मिकता फैलाना है।",
      "शुक्र (Venus)": "आत्मकारक शुक्र होने से आप कलात्मक, रोमांटिक और सुंदरता प्रेमी हैं। आपका जीवन उद्देश्य प्रेम और सौंदर्य की खोज है।",
      "शनि (Saturn)": "आत्मकारक शनि होने से आप अनुशासित, धैर्यवान और कर्तव्यनिष्ठ हैं। आपका जीवन उद्देश्य कड़ी मेहनत और सेवा है।",
    };
    return descriptions[planet] || "आपका जीवन उद्देश्य आत्म-खोज और विकास है।";
  };

  const getDarakarakaDescription = (planet: string) => {
    const descriptions: Record<string, string> = {
      "सूर्य (Sun)": "दाराकारक सूर्य होने से आपका जीवनसाथी आत्मविश्वासी, नेतृत्वकर्ता और स्वाभिमानी होगा।",
      "चंद्र (Moon)": "दाराकारक चंद्रमा होने से आपका जीवनसाथी भावुक, संवेदनशील और देखभाल करने वाला होगा।",
      "मंगल (Mars)": "दाराकारक मंगल होने से आपका जीवनसाथी साहसी, ऊर्जावान और प्रतिस्पर्धी होगा।",
      "बुध (Mercury)": "दाराकारक बुध होने से आपका जीवनसाथी बुद्धिमान, वाचाल और बहुमुखी होगा।",
      "गुरु (Jupiter)": "दाराकारक गुरु होने से आपका जीवनसाथी ज्ञानी, आध्यात्मिक और उदार होगा।",
      "शुक्र (Venus)": "दाराकारक शुक्र होने से आपका जीवनसाथी आकर्षक, रोमांटिक और कलाप्रेमी होगा।",
      "शनि (Saturn)": "दाराकारक शनि होने से आपका जीवनसाथी अनुशासित, जिम्मेदार और परिपक्व होगा।",
    };
    return descriptions[planet] || "आपका जीवनसाथी संतुलित और समझदार होगा।";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-black/10 p-4 rounded-full">
                <Star className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">
              आत्मकारक और दाराकारक कैलकुलेटर
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              अपने जीवन उद्देश्य और जीवनसाथी के बारे में जानें
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={calculateKarakas} className="space-y-6">
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
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      placeholder="शहर का नाम दर्ज करें"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  कारक ग्रह की गणना करें
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {result && (
        <section className="py-12 bg-gradient-to-b from-[#FFD700]/10 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Atmakaraka Card */}
              <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-[#FFD700]">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-8 h-8 text-[#FFD700]" />
                  <h2 className="text-2xl font-bold text-black">आत्मकारक (Atmakaraka)</h2>
                </div>
                <div className="bg-gradient-to-r from-[#FFD700]/20 to-transparent p-4 rounded-lg mb-4">
                  <p className="text-3xl font-bold text-black mb-1">{result.atmakaraka}</p>
                  <p className="text-sm text-gray-600">Degree: {result.atmakarakaDegree}°</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {getAtmakarakaDescription(result.atmakaraka)}
                </p>
              </div>

              {/* Darakaraka Card */}
              <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-pink-500">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-8 h-8 text-pink-500" />
                  <h2 className="text-2xl font-bold text-black">दाराकारक (Darakaraka)</h2>
                </div>
                <div className="bg-gradient-to-r from-pink-500/20 to-transparent p-4 rounded-lg mb-4">
                  <p className="text-3xl font-bold text-black mb-1">{result.darakaraka}</p>
                  <p className="text-sm text-gray-600">Degree: {result.darakarakaDegree}°</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {getDarakarakaDescription(result.darakaraka)}
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-black mb-3">ℹ️ जानकारी:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>आत्मकारक:</strong> सबसे अधिक अंश वाला ग्रह, जो आपकी आत्मा और जीवन उद्देश्य को दर्शाता है।</li>
                  <li><strong>दाराकारक:</strong> सबसे कम अंश वाला ग्रह, जो आपके जीवनसाथी की प्रकृति को दर्शाता है।</li>
                  <li>ये कारक आपके जीवन की महत्वपूर्ण दिशा और रिश्तों के बारे में मार्गदर्शन प्रदान करते हैं।</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
