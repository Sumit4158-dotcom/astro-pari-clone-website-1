"use client";

import { useState } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoShuGridCalculator() {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [grid, setGrid] = useState<number[][]>([]);
  const [analysis, setAnalysis] = useState<string>("");

  const calculateLoShuGrid = () => {
    if (!dateOfBirth) return;

    // Extract digits from date of birth
    const digits = dateOfBirth.replace(/\D/g, "").split("").map(Number);
    
    // Initialize 3x3 grid with zeros
    const loShuGrid = [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6]
    ];

    // Count occurrences of each digit
    const digitCount: { [key: number]: number } = {};
    digits.forEach(digit => {
      if (digit >= 1 && digit <= 9) {
        digitCount[digit] = (digitCount[digit] || 0) + 1;
      }
    });

    // Create result grid with counts
    const resultGrid = loShuGrid.map(row =>
      row.map(num => digitCount[num] || 0)
    );

    setGrid(resultGrid);

    // Generate analysis
    let analysisText = "Lo Shu Grid Analysis:\n\n";
    
    // Check planes
    const topRow = resultGrid[0].reduce((a, b) => a + b, 0);
    const middleRow = resultGrid[1].reduce((a, b) => a + b, 0);
    const bottomRow = resultGrid[2].reduce((a, b) => a + b, 0);
    
    if (topRow > 3) analysisText += "• Strong Mental Plane - Excellent thinking abilities\n";
    if (middleRow > 3) analysisText += "• Strong Emotional Plane - Good emotional balance\n";
    if (bottomRow > 3) analysisText += "• Strong Practical Plane - Strong practical skills\n";
    
    // Check for missing numbers
    const missingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => !digitCount[n]);
    if (missingNumbers.length > 0) {
      analysisText += `\nMissing Numbers: ${missingNumbers.join(", ")}\n`;
      analysisText += "Work on developing qualities associated with these numbers.\n";
    }

    setAnalysis(analysisText);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] rounded-3xl p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black text-center">
            Lo Shu Grid Calculator
          </h1>
          <p className="text-center text-gray-700 mt-4">
            Discover your personality traits through ancient Chinese numerology
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="dob" className="text-lg font-semibold">
                Enter Your Date of Birth
              </Label>
              <Input
                id="dob"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="mt-2 text-lg"
              />
            </div>

            <Button
              onClick={calculateLoShuGrid}
              className="w-full bg-black text-white hover:bg-gray-800 text-lg py-6 rounded-full"
            >
              Calculate Lo Shu Grid
            </Button>
          </div>
        </div>

        {grid.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Your Lo Shu Grid</h2>
            
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
              {grid.flat().map((count, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gradient-to-br from-[#FFD700] to-[#FFF200] rounded-xl flex flex-col items-center justify-center shadow-md"
                >
                  <div className="text-3xl font-bold text-black">
                    {[4, 9, 2, 3, 5, 7, 8, 1, 6][index]}
                  </div>
                  <div className="text-xl font-semibold text-gray-700 mt-2">
                    ({count})
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Analysis</h3>
              <pre className="whitespace-pre-wrap text-gray-700 font-sans">
                {analysis}
              </pre>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
