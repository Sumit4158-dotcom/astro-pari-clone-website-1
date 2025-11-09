"use client";

import { useState } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Transit {
  planet: string;
  sign: string;
  effect: string;
  color: string;
}

export default function TransitChartCalculator() {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [transits, setTransits] = useState<Transit[]>([]);

  const calculateTransits = () => {
    if (!dateOfBirth || !currentDate) return;

    const birthDate = new Date(dateOfBirth);
    const transitDate = new Date(currentDate);
    const daysDiff = Math.floor((transitDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

    // Simplified planetary transit calculations
    const planets = [
      { name: "Sun", cycle: 30, signs: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"] },
      { name: "Moon", cycle: 2.5, signs: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"] },
      { name: "Mercury", cycle: 88, signs: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"] },
      { name: "Venus", cycle: 225, signs: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"] },
      { name: "Mars", cycle: 687, signs: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"] },
      { name: "Jupiter", cycle: 4333, signs: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"] },
      { name: "Saturn", cycle: 10759, signs: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"] }
    ];

    const effects: { [key: string]: string } = {
      "Sun": "Energy, vitality, and self-expression are highlighted",
      "Moon": "Emotions, intuition, and domestic matters are emphasized",
      "Mercury": "Communication, learning, and short travels are favored",
      "Venus": "Love, relationships, and artistic pursuits are enhanced",
      "Mars": "Action, courage, and physical energy are amplified",
      "Jupiter": "Growth, expansion, and good fortune are indicated",
      "Saturn": "Discipline, responsibility, and hard work are required"
    };

    const colors: { [key: string]: string } = {
      "Sun": "from-orange-400 to-yellow-500",
      "Moon": "from-blue-300 to-indigo-400",
      "Mercury": "from-green-400 to-teal-500",
      "Venus": "from-pink-400 to-rose-500",
      "Mars": "from-red-500 to-orange-600",
      "Jupiter": "from-purple-400 to-indigo-500",
      "Saturn": "from-gray-600 to-slate-700"
    };

    const calculatedTransits: Transit[] = planets.map(planet => {
      const signIndex = Math.floor((daysDiff / planet.cycle) * 12) % 12;
      return {
        planet: planet.name,
        sign: planet.signs[signIndex],
        effect: effects[planet.name],
        color: colors[planet.name]
      };
    });

    setTransits(calculatedTransits);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] rounded-3xl p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black text-center">
            Transit Chart Calculator
          </h1>
          <p className="text-center text-gray-700 mt-4">
            Discover current planetary influences on your life
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="birthDate" className="text-lg font-semibold">
                Your Date of Birth
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="mt-2 text-lg"
              />
            </div>

            <div>
              <Label htmlFor="transitDate" className="text-lg font-semibold">
                Transit Date (Current Date or Future)
              </Label>
              <Input
                id="transitDate"
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="mt-2 text-lg"
              />
            </div>

            <Button
              onClick={calculateTransits}
              className="w-full bg-black text-white hover:bg-gray-800 text-lg py-6 rounded-full"
            >
              Calculate Transits
            </Button>
          </div>
        </div>

        {transits.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Current Planetary Transits</h2>
            
            <div className="space-y-4">
              {transits.map((transit, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${transit.color} rounded-xl p-6 text-white shadow-md`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold">{transit.planet}</h3>
                    <span className="text-xl font-semibold bg-white/20 px-4 py-1 rounded-full">
                      {transit.sign}
                    </span>
                  </div>
                  <p className="text-white/90">{transit.effect}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">How to Use This Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Pay attention to planets in your birth sign for personal impact</li>
                <li>• Jupiter transits bring growth and opportunity</li>
                <li>• Saturn transits require patience and hard work</li>
                <li>• Mercury retrograde affects communication</li>
                <li>• Venus transits enhance relationships and creativity</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
