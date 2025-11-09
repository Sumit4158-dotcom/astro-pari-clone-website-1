"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Calendar, Clock, MapPin, AlertTriangle } from "lucide-react";

export default function KaalSarpDoshPage() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    place: ""
  });
  const [result, setResult] = useState<{
    hasKaalSarpDosh: boolean;
    type: string;
    description: string;
    effects: string[];
    remedies: string[];
  } | null>(null);

  const calculateKaalSarpDosh = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simplified calculation based on date and time
    const date = new Date(formData.date + 'T' + formData.time);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    
    // Calculate based on lunar position simulation
    const lunarPosition = (day + month + hour) % 12;
    const rahuPosition = (day * 7 + month * 3 + year) % 12;
    const ketuPosition = (rahuPosition + 6) % 12;
    
    // Simplified check: if planets are hemmed between Rahu and Ketu
    const planetPositions = [
      (day + month) % 12, // Sun
      (day * 2 + month) % 12, // Moon
      (day + month * 2) % 12, // Mars
      (day * 3 + month) % 12, // Mercury
      (day + month * 3) % 12, // Jupiter
      (day * 2 + month * 2) % 12, // Venus
      (day + month * 4) % 12  // Saturn
    ];
    
    // Check if all planets are between Rahu and Ketu
    let allBetween = true;
    for (let planet of planetPositions) {
      if (rahuPosition < ketuPosition) {
        if (planet < rahuPosition || planet > ketuPosition) {
          allBetween = false;
          break;
        }
      } else {
        if (planet < rahuPosition && planet > ketuPosition) {
          allBetween = false;
          break;
        }
      }
    }
    
    const hasKaalSarpDosh = allBetween;
    
    // Determine type based on Rahu position
    const types = [
      'अनंत काल सर्प दोष',
      'कुलिक काल सर्प दोष',
      'वासुकी काल सर्प दोष',
      'शंखपाल काल सर्प दोष',
      'पद्म काल सर्प दोष',
      'महापद्म काल सर्प दोष',
      'तक्षक काल सर्प दोष',
      'कर्कोटक काल सर्प दोष',
      'शंखचूड़ काल सर्प दोष',
      'घातक काल सर्प दोष',
      'विषधर काल सर्प दोष',
      'शेषनाग काल सर्प दोष'
    ];
    
    const type = types[rahuPosition];
    
    const description = hasKaalSarpDosh 
      ? `आपकी कुंडली में ${type} है। यह तब होता है जब सभी ग्रह राहु और केतु के बीच फंस जाते हैं।`
      : 'आपकी कुंडली में काल सर्प दोष नहीं है। आपके सभी ग्रह राहु-केतु की अक्ष से मुक्त हैं।';
    
    const effects = hasKaalSarpDosh ? [
      'विवाह में देरी या वैवाहिक जीवन में समस्याएं',
      'करियर में अप्रत्याशित बाधाएं और उतार-चढ़ाव',
      'मानसिक अशांति और बुरे सपने',
      'धन संबंधी समस्याएं और आर्थिक अस्थिरता',
      'स्वास्थ्य संबंधी चिंताएं, विशेष रूप से पुरानी बीमारियां',
      'संतान प्राप्ति में कठिनाई'
    ] : [
      'आपका जीवन सुचारू रूप से चलेगा',
      'करियर में स्थिरता और विकास',
      'अच्छे स्वास्थ्य और मानसिक शांति',
      'संबंधों में सामंजस्य'
    ];
    
    const remedies = hasKaalSarpDosh ? [
      '🙏 महामृत्युंजय मंत्र का जाप करें',
      '🕉️ राहु-केतु की शांति के लिए पूजा करवाएं',
      '🐍 नागपंचमी पर नाग देवता की पूजा करें',
      '📿 रुद्राक्ष धारण करें (विशेषकर 8 मुखी)',
      '⭐ प्रतिदिन नियमित रूप से राहु स्तोत्र का पाठ करें',
      '🌊 त्र्यंबकेश्वर या उज्जैन में काल सर्प दोष पूजा करवाएं',
      '🕯️ शनिवार को हनुमान जी की पूजा करें',
      '💧 पानी में दूध मिलाकर शिवलिंग पर अर्पित करें'
    ] : [
      '🙏 नियमित रूप से ध्यान और प्रार्थना करें',
      '⭐ अपने इष्ट देव की नियमित पूजा करें',
      '📚 धर्मिक ग्रंथों का अध्ययन करें',
      '💝 दान-पुण्य करते रहें'
    ];
    
    setResult({
      hasKaalSarpDosh,
      type: hasKaalSarpDosh ? type : 'कोई दोष नहीं',
      description,
      effects,
      remedies
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
                <AlertTriangle className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Kaal Sarp Dosh Calculator
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              जानें क्या आपकी कुंडली में काल सर्प दोष है
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={calculateKaalSarpDosh} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    नाम <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="अपना नाम दर्ज करें"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                  />
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
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
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
                      placeholder="जन्म स्थान दर्ज करें"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  काल सर्प दोष की जांच करें
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {result && (
        <section className="py-12 bg-gradient-to-b from-[#FFD700]/10 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className={`rounded-xl p-8 shadow-lg ${result.hasKaalSarpDosh ? 'bg-red-50 border-2 border-red-200' : 'bg-green-50 border-2 border-green-200'}`}>
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{result.hasKaalSarpDosh ? '🐍' : '✅'}</div>
                  <h3 className="text-2xl font-bold text-black mb-2">{formData.name}</h3>
                  <div className={`inline-block px-6 py-3 rounded-full font-bold text-lg ${result.hasKaalSarpDosh ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                    {result.type}
                  </div>
                </div>
                
                <p className="text-center text-gray-700 text-lg leading-relaxed mb-6">
                  {result.description}
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-black mb-4 flex items-center">
                  <span className="mr-2">📋</span>
                  प्रभाव
                </h4>
                <ul className="space-y-3">
                  {result.effects.map((effect, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#FFD700] mr-2 mt-1">•</span>
                      <span className="text-gray-700">{effect}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h4 className="text-xl font-bold text-black mb-4 flex items-center">
                  <span className="mr-2">💡</span>
                  उपाय
                </h4>
                <div className="space-y-3">
                  {result.remedies.map((remedy, index) => (
                    <div key={index} className="flex items-start bg-gradient-to-r from-[#FFD700]/10 to-transparent p-4 rounded-lg">
                      <span className="text-gray-700">{remedy}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#FFD700] to-[#FFF200] rounded-xl p-6 text-center">
                <p className="text-black font-semibold text-lg">
                  ⚠️ नोट: यह एक सामान्य गणना है। सटीक विश्लेषण के लिए किसी अनुभवी ज्योतिषी से परामर्श करें।
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
