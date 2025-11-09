"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { FileText, Check } from "lucide-react";
import { useState } from "react";

export default function KundliPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    second: "00",
    birthPlace: ""
  });

  const [showKundli, setShowKundli] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowKundli(true);
    // Scroll to kundli result
    setTimeout(() => {
      document.getElementById('kundli-result')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Kundli</h1>
              <p className="text-gray-600">
                Generate your detailed birth chart and get personalized insights
              </p>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 md:p-8">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-full bg-[#FFD700] flex items-center justify-center">
                  <FileText className="w-8 h-8 text-black" />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Full Name */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    />
                  </div>

                  {/* Gender */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] bg-white"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Day */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Day <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="day"
                      value={formData.day}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] bg-white"
                    >
                      <option value="">Day</option>
                      {days.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>

                  {/* Month */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Month <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="month"
                      value={formData.month}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] bg-white"
                    >
                      <option value="">Month</option>
                      {months.map((month, idx) => (
                        <option key={month} value={idx + 1}>{month}</option>
                      ))}
                    </select>
                  </div>

                  {/* Year */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="YYYY"
                      min="1900"
                      max="2025"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    />
                  </div>

                  {/* Hour */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Hour <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="hour"
                      value={formData.hour}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] bg-white"
                    >
                      <option value="">Hour</option>
                      {hours.map(hour => (
                        <option key={hour} value={hour}>{hour}</option>
                      ))}
                    </select>
                  </div>

                  {/* Minute */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Minute <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="minute"
                      value={formData.minute}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] bg-white"
                    >
                      <option value="">Minute</option>
                      {minutes.map(minute => (
                        <option key={minute} value={minute}>{minute}</option>
                      ))}
                    </select>
                  </div>

                  {/* Second */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Second
                    </label>
                    <select
                      name="second"
                      value={formData.second}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] bg-white"
                    >
                      {minutes.map(second => (
                        <option key={second} value={second}>{second}</option>
                      ))}
                    </select>
                  </div>

                  {/* Birth Place */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Birth Place <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="birthPlace"
                      value={formData.birthPlace}
                      onChange={handleChange}
                      placeholder="Enter your birth place"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-900 transition-colors"
                >
                  Generate Free Kundli
                </button>
              </form>

              {/* What You'll Get Section */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">What You'll Get:</h3>
                <ul className="space-y-3">
                  {[
                    "Detailed birth chart (Janam Kundli)",
                    "Planetary positions and their effects",
                    "Dasha predictions for different life phases",
                    "Personalized remedies and suggestions"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Kundli Result Section */}
            {showKundli && (
              <div id="kundli-result" className="mt-12 bg-[#f9f9f9] rounded-xl p-6 md:p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Your Kundli Report</h2>
                
                {/* Personal Details */}
                <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    Personal Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">Name:</span> {formData.fullName}</div>
                    <div><span className="font-medium">Gender:</span> {formData.gender}</div>
                    <div><span className="font-medium">Birth Date:</span> {formData.day}/{formData.month}/{formData.year}</div>
                    <div><span className="font-medium">Birth Time:</span> {formData.hour}:{formData.minute}:{formData.second}</div>
                    <div className="md:col-span-2"><span className="font-medium">Birth Place:</span> {formData.birthPlace}</div>
                  </div>
                </div>

                {/* Birth Chart */}
                <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Birth Chart (Janam Kundli)</h3>
                  <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                    {[
                      "12", "1", "2", "3",
                      "11", "", "", "4",
                      "10", "", "", "5",
                      "9", "8", "7", "6"
                    ].map((house, idx) => (
                      <div
                        key={idx}
                        className={`aspect-square border-2 border-gray-300 flex items-center justify-center font-semibold ${
                          house === "" ? "bg-[#FFD700]" : "bg-white"
                        }`}
                      >
                        {house}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Planetary Positions */}
                <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Planetary Positions</h3>
                  <div className="space-y-3">
                    {[
                      { planet: "Sun (Surya)", position: "Aries", house: "1st House", effect: "Strong leadership qualities" },
                      { planet: "Moon (Chandra)", position: "Taurus", house: "2nd House", effect: "Emotional stability" },
                      { planet: "Mars (Mangal)", position: "Gemini", house: "3rd House", effect: "Courage and determination" },
                      { planet: "Mercury (Budh)", position: "Cancer", house: "4th House", effect: "Good communication" },
                      { planet: "Jupiter (Guru)", position: "Leo", house: "5th House", effect: "Wisdom and prosperity" },
                      { planet: "Venus (Shukra)", position: "Virgo", house: "6th House", effect: "Artistic abilities" }
                    ].map((item, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-3 last:border-0">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-gray-900">{item.planet}</span>
                          <span className="text-sm text-gray-600">{item.house}</span>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="text-[#FFD700] font-medium">{item.position}</span> - {item.effect}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dasha Predictions */}
                <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Dasha Predictions</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-[#f9f9f9] rounded-lg">
                      <h4 className="font-semibold mb-2">Current Dasha: Jupiter (Guru) Mahadasha</h4>
                      <p className="text-sm text-gray-700">
                        This is a favorable period for growth, learning, and spiritual development. 
                        You may experience positive changes in career and personal life.
                      </p>
                    </div>
                    <div className="p-4 bg-[#f9f9f9] rounded-lg">
                      <h4 className="font-semibold mb-2">Upcoming: Saturn (Shani) Mahadasha</h4>
                      <p className="text-sm text-gray-700">
                        A period requiring discipline and hard work. Focus on building strong foundations 
                        and long-term goals.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Remedies */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Personalized Remedies</h3>
                  <ul className="space-y-3">
                    {[
                      "Wear a Ruby gemstone for strengthening Sun's positive effects",
                      "Recite Gayatri Mantra daily for mental peace",
                      "Donate food to the needy on Thursdays",
                      "Practice meditation during sunrise for spiritual growth",
                      "Keep a small plant of Tulsi (Holy Basil) at home"
                    ].map((remedy, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{remedy}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Consultation CTA */}
                <div className="mt-8 bg-[#FFD700] rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Want Detailed Insights?</h3>
                  <p className="text-gray-800 mb-4">
                    Talk to our expert astrologers for personalized guidance
                  </p>
                  <a
                    href="/chat"
                    className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition-colors"
                  >
                    Chat with Astrologer
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}