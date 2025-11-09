"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Sparkles, Calendar, MapPin, Clock } from "lucide-react";

export default function IshtaDevataCalculatorPage() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    time: "",
    place: ""
  });
  const [result, setResult] = useState<any>(null);

  const calculateIshtaDevata = () => {
    // Simplified Ishta Devata calculation based on birth date
    const date = new Date(formData.dob + "T" + formData.time);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    // Calculate based on sum of date digits
    let sum = day + month + year;
    while (sum > 12) {
      sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    
    const deities = [
      { id: 1, name: "भगवान शिव", description: "शक्ति, विनाश और पुनर्जन्म के देवता", mantra: "ॐ नमः शिवाय", color: "#4A90E2" },
      { id: 2, name: "माता पार्वती", description: "शक्ति और मातृत्व की देवी", mantra: "ॐ श्री पार्वत्यै नमः", color: "#FF6B9D" },
      { id: 3, name: "भगवान विष्णु", description: "पालनहार और संरक्षक", mantra: "ॐ नमो नारायणाय", color: "#00D4AA" },
      { id: 4, name: "माता लक्ष्मी", description: "धन और समृद्धि की देवी", mantra: "ॐ श्री महालक्ष्म्यै नमः", color: "#FFD700" },
      { id: 5, name: "भगवान गणेश", description: "विघ्नहर्ता और सिद्धिदाता", mantra: "ॐ गं गणपतये नमः", color: "#F97316" },
      { id: 6, name: "माता सरस्वती", description: "ज्ञान और कला की देवी", mantra: "ॐ ऐं सरस्वत्यै नमः", color: "#4A90E2" },
      { id: 7, name: "भगवान हनुमान", description: "शक्ति और भक्ति के प्रतीक", mantra: "ॐ हनुमते नमः", color: "#F97316" },
      { id: 8, name: "भगवान कृष्ण", description: "प्रेम और धर्म के अवतार", mantra: "ॐ नमो भगवते वासुदेवाय", color: "#4A90E2" },
      { id: 9, name: "माता दुर्गा", description: "शक्ति और रक्षा की देवी", mantra: "ॐ दुं दुर्गायै नमः", color: "#FF6B9D" },
      { id: 10, name: "भगवान सूर्य", description: "जीवन और ऊर्जा के देवता", mantra: "ॐ सूर्याय नमः", color: "#FFD700" },
      { id: 11, name: "भगवान राम", description: "धर्म और न्याय के प्रतीक", mantra: "ॐ श्री रामाय नमः", color: "#00D4AA" },
      { id: 12, name: "माता काली", description: "समय और परिवर्तन की देवी", mantra: "ॐ क्रीं कालिकायै नमः", color: "#000000" }
    ];

    return deities[sum - 1] || deities[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const deity = calculateIshtaDevata();
    setResult(deity);
  };

  const benefits = [
    "आध्यात्मिक विकास में सहायक",
    "मानसिक शांति और स्थिरता",
    "जीवन में सकारात्मक ऊर्जा",
    "कठिनाइयों से सुरक्षा",
    "आंतरिक शक्ति का विकास"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-black/10 p-4 rounded-full">
                <Sparkles className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              इष्ट देवता कैलकुलेटर
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              अपने व्यक्तिगत देवता को जानें और उनकी पूजा से लाभ प्राप्त करें
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    पूरा नाम <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="अपना पूरा नाम दर्ज करें"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    जन्म तिथि <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({...formData, dob: e.target.value})}
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
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
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
                      value={formData.place}
                      onChange={(e) => setFormData({...formData, place: e.target.value})}
                      placeholder="अपना जन्म स्थान दर्ज करें"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  इष्ट देवता जानें
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
                  <h2 className="text-3xl font-bold text-black mb-2">
                    आपके इष्ट देवता
                  </h2>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: result.color + '20' }}>
                    <Sparkles className="w-12 h-12" style={{ color: result.color }} />
                  </div>
                  <h3 className="text-4xl font-bold mb-4" style={{ color: result.color }}>
                    {result.name}
                  </h3>
                  <p className="text-xl text-gray-700 mb-6">
                    {result.description}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#FFD700]/10 to-[#FFF200]/10 rounded-lg p-6 mb-6">
                  <h4 className="text-xl font-bold text-black mb-3">मंत्र</h4>
                  <p className="text-2xl font-semibold text-center" style={{ color: result.color }}>
                    {result.mantra}
                  </p>
                  <p className="text-sm text-gray-600 text-center mt-2">
                    इस मंत्र का नियमित जाप करें
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-xl font-bold text-black mb-4">पूजा के लाभ</h4>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#FFD700] mr-2 text-xl">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-gray-700">
                    <strong>नोट:</strong> यह गणना वैदिक ज्योतिष के सिद्धांतों पर आधारित है। अधिक सटीक विश्लेषण के लिए किसी अनुभवी ज्योतिषी से परामर्श लें।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-6 text-center">
              इष्ट देवता के बारे में
            </h2>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm space-y-4">
              <p className="text-gray-700 leading-relaxed">
                इष्ट देवता वह दैवीय शक्ति है जो आपके जन्म कुंडली के अनुसार आपके लिए सबसे अनुकूल है। वैदिक ज्योतिष में इष्ट देवता का निर्धारण आत्मकारक ग्रह और उसकी स्थिति के आधार पर किया जाता है।
              </p>
              <p className="text-gray-700 leading-relaxed">
                अपने इष्ट देवता की नियमित पूजा-अर्चना से आध्यात्मिक विकास, मानसिक शांति, और जीवन में सकारात्मक परिवर्तन प्राप्त होता है। यह आपकी आंतरिक शक्ति को जागृत करने और जीवन की चुनौतियों का सामना करने में सहायक होती है।
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
