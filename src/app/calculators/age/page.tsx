"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { useState } from "react";
import { Calendar, Clock } from "lucide-react";

export default function AgeCalculatorPage() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateAge = (e: React.FormEvent) => {
    e.preventDefault();
    
    const birthDate = new Date(dob);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    
    // Calculate next birthday
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.floor((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    setResult({
      years,
      months,
      days,
      totalDays,
      totalMonths,
      totalWeeks,
      totalHours,
      totalMinutes,
      daysToNextBirthday,
      nextBirthdayAge: years + 1
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
                <Clock className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              आयु कैलकुलेटर
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              अपनी सटीक उम्र जानें
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <form onSubmit={calculateAge} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    जन्म तिथि <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  उम्र की गणना करें
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {result && (
        <section className="py-12 bg-gradient-to-b from-[#FFD700]/10 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
                <h3 className="text-2xl font-bold text-black mb-6 text-center">आपकी उम्र</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#FFD700] mb-2">{result.years}</div>
                    <div className="text-gray-700 font-semibold">वर्ष</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#FFD700] mb-2">{result.months}</div>
                    <div className="text-gray-700 font-semibold">महीने</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#FFD700] mb-2">{result.days}</div>
                    <div className="text-gray-700 font-semibold">दिन</div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">कुल महीने</h4>
                  <div className="text-3xl font-bold text-black">{result.totalMonths.toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">कुल सप्ताह</h4>
                  <div className="text-3xl font-bold text-black">{result.totalWeeks.toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">कुल दिन</h4>
                  <div className="text-3xl font-bold text-black">{result.totalDays.toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">कुल घंटे</h4>
                  <div className="text-3xl font-bold text-black">{result.totalHours.toLocaleString()}</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] rounded-xl p-8 shadow-lg mt-6 text-center">
                <h4 className="text-xl font-bold text-black mb-2">अगले जन्मदिन तक</h4>
                <div className="text-4xl font-bold text-black mb-2">{result.daysToNextBirthday} दिन</div>
                <p className="text-gray-800">आप {result.nextBirthdayAge} वर्ष के हो जाएंगे!</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
