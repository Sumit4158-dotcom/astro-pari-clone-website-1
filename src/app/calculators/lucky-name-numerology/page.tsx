"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Sparkles, User, Hash } from "lucide-react";

export default function LuckyNameNumerologyPage() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<any>(null);

  // Chaldean Numerology System (most common for lucky names)
  const chaldeanValues: { [key: string]: number } = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 8, g: 3, h: 5, i: 1,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 7, p: 8, q: 1, r: 2,
    s: 3, t: 4, u: 6, v: 6, w: 6, x: 5, y: 1, z: 7
  };

  // Pythagorean System (alternative)
  const pythagoreanValues: { [key: string]: number } = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
  };

  const calculateNameNumber = (fullName: string, system: "chaldean" | "pythagorean" = "chaldean"): any => {
    const values = system === "chaldean" ? chaldeanValues : pythagoreanValues;
    const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
    
    let sum = 0;
    const breakdown: any[] = [];
    
    for (const char of cleanName) {
      const value = values[char] || 0;
      sum += value;
      breakdown.push({ letter: char.toUpperCase(), value });
    }
    
    // Reduce to single digit (keeping master numbers 11, 22, 33)
    let luckyNumber = sum;
    const reductionSteps = [sum];
    
    while (luckyNumber > 9 && luckyNumber !== 11 && luckyNumber !== 22 && luckyNumber !== 33) {
      const digits = luckyNumber.toString().split('');
      luckyNumber = digits.reduce((a, b) => a + parseInt(b), 0);
      reductionSteps.push(luckyNumber);
    }
    
    return {
      breakdown,
      totalSum: sum,
      luckyNumber,
      reductionSteps,
      isMasterNumber: [11, 22, 33].includes(luckyNumber)
    };
  };

  const getNumberMeaning = (num: number): any => {
    const meanings: any = {
      1: {
        hindi: "नेतृत्व, स्वतंत्रता और महत्वाकांक्षा",
        english: "Leadership, Independence & Ambition",
        traits: ["आत्मविश्वासी", "अग्रणी", "रचनात्मक", "मजबूत इच्छाशक्ति"],
        lucky: "रविवार, लाल और सुनहरा रंग",
        advice: "यह नाम नेतृत्व गुणों को बढ़ावा देता है। करियर में उच्च पदों के लिए अच्छा है।"
      },
      2: {
        hindi: "सहयोग, संतुलन और कूटनीति",
        english: "Cooperation, Balance & Diplomacy",
        traits: ["कूटनीतिक", "संवेदनशील", "सहयोगी", "शांतिप्रिय"],
        lucky: "सोमवार, सफेद और चांदी का रंग",
        advice: "यह नाम संबंधों और साझेदारी में सफलता लाता है।"
      },
      3: {
        hindi: "रचनात्मकता, अभिव्यक्ति और आनंद",
        english: "Creativity, Expression & Joy",
        traits: ["कलात्मक", "सामाजिक", "आशावादी", "मनोरंजक"],
        lucky: "गुरुवार, पीला और बैंगनी रंग",
        advice: "यह नाम कला, संचार और मनोरंजन क्षेत्रों में सफलता देता है।"
      },
      4: {
        hindi: "स्थिरता, व्यवस्था और अनुशासन",
        english: "Stability, Organization & Discipline",
        traits: ["व्यवस्थित", "विश्वसनीय", "मेहनती", "व्यावहारिक"],
        lucky: "रविवार और शनिवार, हरा और नीला रंग",
        advice: "यह नाम कठिन परिश्रम और स्थिरता के माध्यम से सफलता दिलाता है।"
      },
      5: {
        hindi: "स्वतंत्रता, परिवर्तन और साहसिक कार्य",
        english: "Freedom, Change & Adventure",
        traits: ["साहसी", "बहुमुखी", "उत्सुक", "अनुकूलनशील"],
        lucky: "बुधवार, हरा रंग",
        advice: "यह नाम यात्रा, व्यापार और नए अनुभवों में सफलता लाता है।"
      },
      6: {
        hindi: "प्रेम, जिम्मेदारी और सेवा",
        english: "Love, Responsibility & Service",
        traits: ["देखभाल करने वाला", "जिम्मेदार", "प्रेमी", "परिवार-उन्मुख"],
        lucky: "शुक्रवार, गुलाबी और नीला रंग",
        advice: "यह नाम परिवार, शिक्षा और सेवा क्षेत्रों में सफलता देता है।"
      },
      7: {
        hindi: "आध्यात्मिकता, ज्ञान और अंतर्दृष्टि",
        english: "Spirituality, Wisdom & Insight",
        traits: ["विश्लेषणात्मक", "आध्यात्मिक", "बुद्धिमान", "अंतर्मुखी"],
        lucky: "सोमवार, बैंगनी और सफेद रंग",
        advice: "यह नाम अनुसंधान, आध्यात्मिकता और शिक्षा में सफलता लाता है।"
      },
      8: {
        hindi: "शक्ति, सफलता और धन",
        english: "Power, Success & Wealth",
        traits: ["महत्वाकांक्षी", "व्यावसायिक", "सफल", "शक्तिशाली"],
        lucky: "शनिवार, काला और नीला रंग",
        advice: "यह नाम व्यापार, वित्त और नेतृत्व में महान सफलता दिलाता है।"
      },
      9: {
        hindi: "मानवता, करुणा और पूर्णता",
        english: "Humanity, Compassion & Completion",
        traits: ["मानवतावादी", "उदार", "करुणामय", "आदर्शवादी"],
        lucky: "मंगलवार, लाल और मैरून रंग",
        advice: "यह नाम सामाजिक कार्य, चिकित्सा और परोपकार में सफलता लाता है।"
      },
      11: {
        hindi: "आध्यात्मिक दूत, प्रबुद्धता (मास्टर नंबर)",
        english: "Spiritual Messenger, Enlightenment (Master Number)",
        traits: ["प्रेरणादायक", "सहज", "आध्यात्मिक", "दूरदर्शी"],
        lucky: "रविवार और सोमवार, सभी रंग",
        advice: "यह एक शक्तिशाली मास्टर नंबर है जो आध्यात्मिक नेतृत्व और प्रेरणा देता है।"
      },
      22: {
        hindi: "मास्टर बिल्डर, व्यावहारिक आदर्शवाद",
        english: "Master Builder, Practical Idealism (Master Number)",
        traits: ["व्यावहारिक", "दूरदर्शी", "निर्माता", "शक्तिशाली"],
        lucky: "सभी दिन, सुनहरा रंग",
        advice: "यह सबसे शक्तिशाली मास्टर नंबर है - बड़े लक्ष्यों को साकार करने की क्षमता।"
      },
      33: {
        hindi: "मास्टर शिक्षक, करुणा का प्रतीक",
        english: "Master Teacher, Symbol of Compassion (Master Number)",
        traits: ["शिक्षक", "चंगा करने वाला", "करुणामय", "आत्म-बलिदानी"],
        lucky: "सभी दिन, हरा और गुलाबी रंग",
        advice: "यह दुर्लभ मास्टर नंबर दूसरों की सेवा और उत्थान के लिए है।"
      }
    };
    return meanings[num] || meanings[1];
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const chaldeanResult = calculateNameNumber(name, "chaldean");
    const pythagoreanResult = calculateNameNumber(name, "pythagorean");
    
    setResult({
      name: name.trim(),
      chaldean: chaldeanResult,
      pythagorean: pythagoreanResult,
      meaning: getNumberMeaning(chaldeanResult.luckyNumber)
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
                <Sparkles className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Lucky Name Numerology Calculator
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              नाम के अनुसार भाग्यशाली अंक और विशेषताएं जानें
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={calculate} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    अपना नाम दर्ज करें <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="उदाहरण: Rahul Kumar"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    अंग्रेजी में अपना पूरा नाम लिखें (बिना किसी विशेष चिह्न के)
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  भाग्यशाली अंक गणना करें
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {result && (
        <>
          <section className="py-12 bg-gradient-to-b from-[#FFD700]/10 to-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Main Lucky Number */}
                <div className="bg-gradient-to-br from-[#FFD700] to-[#FFF200] rounded-2xl p-8 shadow-xl text-center">
                  <h2 className="text-2xl font-bold text-black mb-4">
                    "{result.name}" का भाग्यशाली अंक
                  </h2>
                  <div className="text-7xl font-bold text-black mb-2">
                    {result.chaldean.luckyNumber}
                  </div>
                  {result.chaldean.isMasterNumber && (
                    <div className="inline-block bg-black text-[#FFD700] px-4 py-1 rounded-full text-sm font-semibold mt-2">
                      मास्टर नंबर ⭐
                    </div>
                  )}
                </div>

                {/* Meaning */}
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                    <Hash className="w-6 h-6 text-[#FFD700]" />
                    अंक का अर्थ
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900 mb-2">
                        {result.meaning.hindi}
                      </h4>
                      <p className="text-gray-600 italic">{result.meaning.english}</p>
                    </div>
                    
                    <div className="bg-[#FFF200]/20 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">
                        {result.meaning.advice}
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">मुख्य विशेषताएं:</h5>
                      <div className="grid grid-cols-2 gap-3">
                        {result.meaning.traits.map((trait: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-gray-700">
                            <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                            <span>{trait}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">भाग्यशाली:</span> {result.meaning.lucky}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calculation Breakdown */}
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-black mb-4">
                    गणना विस्तार (Chaldean System)
                  </h3>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">अक्षर मान:</h4>
                    <div className="flex flex-wrap gap-3">
                      {result.chaldean.breakdown.map((item: any, idx: number) => (
                        <div key={idx} className="bg-[#FFD700]/20 px-4 py-2 rounded-lg text-center">
                          <div className="text-lg font-bold text-black">{item.letter}</div>
                          <div className="text-sm text-gray-600">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-semibold">कुल योग:</span> {result.chaldean.totalSum}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">अंतिम अंक:</span>{' '}
                      {result.chaldean.reductionSteps.join(' → ')}
                    </p>
                  </div>
                </div>

                {/* Alternative System */}
                {result.pythagorean.luckyNumber !== result.chaldean.luckyNumber && (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      वैकल्पिक गणना (Pythagorean System)
                    </h3>
                    <p className="text-gray-700">
                      Pythagorean पद्धति में आपका भाग्यशाली अंक:{' '}
                      <span className="text-2xl font-bold text-[#FFD700]">
                        {result.pythagorean.luckyNumber}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      नोट: Chaldean पद्धति अधिक सटीक मानी जाती है
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Information Section */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="prose prose-gray max-w-none">
                  <h2 className="text-2xl font-bold text-black mb-4">
                    Lucky Name Numerology के बारे में
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    नाम अंक ज्योतिष एक प्राचीन विज्ञान है जो बताता है कि आपके नाम में मौजूद
                    अक्षरों की संख्यात्मक ऊर्जा आपके जीवन को कैसे प्रभावित करती है। प्रत्येक
                    अक्षर एक विशेष संख्या से जुड़ा होता है, और इन संख्याओं का योग आपका
                    भाग्यशाली नाम अंक बनता है।
                  </p>
                  
                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">
                    नाम अंक का महत्व
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>आपके व्यक्तित्व और चरित्र को परिभाषित करता है</li>
                    <li>करियर और व्यवसाय में सफलता के लिए मार्गदर्शन देता है</li>
                    <li>रिश्तों और सामाजिक जीवन को प्रभावित करता है</li>
                    <li>भाग्यशाली दिन, रंग और समय बताता है</li>
                    <li>जीवन के चुनौतियों और अवसरों को समझने में मदद करता है</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-black mt-6 mb-3">
                    सही नाम चुनने के टिप्स
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
                    <li>अपने जन्म अंक (Life Path Number) के साथ संगत नाम चुनें</li>
                    <li>व्यवसाय या ब्रांड नाम के लिए अंक 1, 5, या 8 शुभ माने जाते हैं</li>
                    <li>मास्टर नंबर (11, 22, 33) वाले नाम विशेष शक्तिशाली होते हैं</li>
                    <li>नाम की स्पेलिंग में छोटे बदलाव से भी अंक बदल सकता है</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
