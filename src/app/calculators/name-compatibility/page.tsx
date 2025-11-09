"use client";

import { useState } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";

export default function NameCompatibilityCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [compatibility, setCompatibility] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState("");

  const calculateNameNumber = (name: string): number => {
    const letterValues: { [key: string]: number } = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
      'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
      'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    };

    const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
    let sum = 0;
    
    for (let char of cleanName) {
      sum += letterValues[char] || 0;
    }

    // Reduce to single digit
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }

    return sum;
  };

  const calculateCompatibility = () => {
    if (!name1.trim() || !name2.trim()) return;

    const num1 = calculateNameNumber(name1);
    const num2 = calculateNameNumber(name2);

    // Calculate compatibility based on numerology
    const difference = Math.abs(num1 - num2);
    let compatibilityScore = 0;

    if (difference === 0) compatibilityScore = 100;
    else if (difference === 1 || difference === 8) compatibilityScore = 90;
    else if (difference === 2 || difference === 7) compatibilityScore = 80;
    else if (difference === 3 || difference === 6) compatibilityScore = 70;
    else if (difference === 4 || difference === 5) compatibilityScore = 60;

    setCompatibility(compatibilityScore);

    // Generate analysis
    let analysisText = "";
    if (compatibilityScore >= 80) {
      analysisText = "Excellent Match! You two share a strong natural connection. Your energies complement each other beautifully, creating harmony and understanding in your relationship.";
    } else if (compatibilityScore >= 60) {
      analysisText = "Good Match! You have a solid foundation for a relationship. With effort and understanding, you can build something wonderful together.";
    } else {
      analysisText = "Moderate Match! While there may be challenges, every relationship requires work. Focus on communication and understanding each other's differences.";
    }

    analysisText += `\n\n${name1}'s Name Number: ${num1}\n${name2}'s Name Number: ${num2}`;

    setAnalysis(analysisText);
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return "from-green-400 to-emerald-500";
    if (score >= 60) return "from-yellow-400 to-orange-500";
    return "from-orange-500 to-red-500";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] rounded-3xl p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black text-center">
            Name Compatibility Calculator
          </h1>
          <p className="text-center text-gray-700 mt-4">
            Discover the compatibility between two names using numerology
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="name1" className="text-lg font-semibold">
                First Person's Name
              </Label>
              <Input
                id="name1"
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="Enter first name"
                className="mt-2 text-lg"
              />
            </div>

            <div className="flex justify-center">
              <Heart className="w-8 h-8 text-[#FFD700]" fill="#FFD700" />
            </div>

            <div>
              <Label htmlFor="name2" className="text-lg font-semibold">
                Second Person's Name
              </Label>
              <Input
                id="name2"
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="Enter second name"
                className="mt-2 text-lg"
              />
            </div>

            <Button
              onClick={calculateCompatibility}
              className="w-full bg-black text-white hover:bg-gray-800 text-lg py-6 rounded-full"
            >
              Calculate Compatibility
            </Button>
          </div>
        </div>

        {compatibility !== null && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Compatibility Results</h2>
            
            <div className={`bg-gradient-to-r ${getCompatibilityColor(compatibility)} rounded-xl p-8 text-white text-center mb-6 shadow-md`}>
              <div className="text-6xl font-bold mb-2">{compatibility}%</div>
              <div className="text-2xl font-semibold">Compatibility Score</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Analysis</h3>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {analysis}
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-[#FFD700] p-6 rounded-r-xl">
              <h3 className="text-lg font-bold mb-2 text-gray-900">Note</h3>
              <p className="text-gray-700 text-sm">
                Name compatibility is based on numerology principles. While it provides insights, 
                remember that successful relationships require communication, trust, and mutual respect 
                beyond numerical compatibility.
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
