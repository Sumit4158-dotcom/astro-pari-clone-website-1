"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Heart, Star, Users } from "lucide-react";

interface BirthDetails {
  name: string;
  date: string;
  time: string;
  place: string;
}

interface CompatibilityResult {
  score: number;
  percentage: number;
  category: string;
  strengths: string[];
  challenges: string[];
  advice: string;
}

export default function CompatibilityPage() {
  const [person1, setPerson1] = useState<BirthDetails>({
    name: "",
    date: "",
    time: "",
    place: "",
  });
  
  const [person2, setPerson2] = useState<BirthDetails>({
    name: "",
    date: "",
    time: "",
    place: "",
  });

  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateCompatibility = () => {
    if (!person1.name || !person1.date || !person2.name || !person2.date) {
      alert("कृपया दोनों की जानकारी भरें");
      return;
    }

    setLoading(true);
    
    // Simulate calculation
    setTimeout(() => {
      const score = Math.floor(Math.random() * 36) + 1;
      const percentage = Math.round((score / 36) * 100);
      
      let category = "";
      if (percentage >= 75) category = "उत्कृष्ट";
      else if (percentage >= 60) category = "बहुत अच्छा";
      else if (percentage >= 50) category = "अच्छा";
      else category = "औसत";

      setResult({
        score,
        percentage,
        category,
        strengths: [
          "मानसिक समझ बहुत अच्छी है",
          "आर्थिक स्थिति में सुधार",
          "पारिवारिक जीवन सुखमय",
          "आपसी विश्वास मजबूत"
        ],
        challenges: [
          "कभी-कभी विचारों में मतभेद",
          "संचार को बेहतर बनाने की जरूरत"
        ],
        advice: "आपकी जोड़ी बहुत अच्छी है। एक दूसरे का सम्मान और समझदारी से रिश्ते को और मजबूत बनाया जा सकता है।"
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
                Compatibility Check
              </h1>
              <p className="text-lg text-gray-800">
                अपने और अपने साथी की जन्म जानकारी के आधार पर कुंडली मिलान करें
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Person 1 Form */}
              <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">आपकी जानकारी</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      नाम (Name) *
                    </label>
                    <input
                      type="text"
                      value={person1.name}
                      onChange={(e) => setPerson1({...person1, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                      placeholder="अपना नाम लिखें"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      जन्म तिथि (Birth Date) *
                    </label>
                    <input
                      type="date"
                      value={person1.date}
                      onChange={(e) => setPerson1({...person1, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      जन्म समय (Birth Time)
                    </label>
                    <input
                      type="time"
                      value={person1.time}
                      onChange={(e) => setPerson1({...person1, time: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      जन्म स्थान (Birth Place)
                    </label>
                    <input
                      type="text"
                      value={person1.place}
                      onChange={(e) => setPerson1({...person1, place: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                      placeholder="शहर का नाम"
                    />
                  </div>
                </div>
              </div>

              {/* Person 2 Form */}
              <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-full bg-pink-500 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">साथी की जानकारी</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      नाम (Name) *
                    </label>
                    <input
                      type="text"
                      value={person2.name}
                      onChange={(e) => setPerson2({...person2, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                      placeholder="साथी का नाम लिखें"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      जन्म तिथि (Birth Date) *
                    </label>
                    <input
                      type="date"
                      value={person2.date}
                      onChange={(e) => setPerson2({...person2, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      जन्म समय (Birth Time)
                    </label>
                    <input
                      type="time"
                      value={person2.time}
                      onChange={(e) => setPerson2({...person2, time: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      जन्म स्थान (Birth Place)
                    </label>
                    <input
                      type="text"
                      value={person2.place}
                      onChange={(e) => setPerson2({...person2, place: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                      placeholder="शहर का नाम"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center mt-8">
              <button
                onClick={calculateCompatibility}
                disabled={loading}
                className="bg-black text-white px-12 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "गणना हो रही है..." : "कम्पेटिबिलिटी जांचें"}
              </button>
            </div>

            {/* Results Section */}
            {result && (
              <div className="mt-12 bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] rounded-xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-black">
                    कम्पेटिबिलिटी रिपोर्ट
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-black">
                    <Heart className="h-6 w-6" />
                    <span className="text-xl">{person1.name} & {person2.name}</span>
                  </div>
                </div>

                {/* Score Display */}
                <div className="bg-white rounded-xl p-8 mb-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center h-32 w-32 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFF200] mb-4">
                      <div className="text-4xl font-bold text-black">
                        {result.percentage}%
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{result.category}</h3>
                    <p className="text-gray-600">
                      गुण मिलान: {result.score}/36
                    </p>
                  </div>
                </div>

                {/* Strengths */}
                <div className="bg-white rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-6 w-6 text-green-600" />
                    <h3 className="text-xl font-bold">मजबूत पक्ष</h3>
                  </div>
                  <ul className="space-y-2">
                    {result.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenges */}
                <div className="bg-white rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-6 w-6 text-orange-600" />
                    <h3 className="text-xl font-bold">सुधार के क्षेत्र</h3>
                  </div>
                  <ul className="space-y-2">
                    {result.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span className="text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Advice */}
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">ज्योतिषी की सलाह</h3>
                  <p className="text-gray-700 leading-relaxed">{result.advice}</p>
                </div>

                {/* CTA */}
                <div className="text-center mt-8">
                  <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
                    विस्तृत रिपोर्ट के लिए ज्योतिषी से बात करें
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                कुंडली मिलान क्यों जरूरी है?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-[#FFD700] flex items-center justify-center mb-4 mx-auto">
                    <Heart className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">
                    सुखी वैवाहिक जीवन
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    कुंडली मिलान से वैवाहिक जीवन में सुख और समृद्धि का पता चलता है
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-[#FFD700] flex items-center justify-center mb-4 mx-auto">
                    <Users className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">
                    आपसी समझ
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    दोनों की सोच और विचारधारा में कितनी समानता है, यह जानें
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-[#FFD700] flex items-center justify-center mb-4 mx-auto">
                    <Star className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">
                    भविष्य की जानकारी
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    आने वाले समय में किन बातों का ध्यान रखना जरूरी है
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}