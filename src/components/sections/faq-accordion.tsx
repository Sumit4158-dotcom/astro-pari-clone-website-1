"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Why Is Astrology So Accurate?",
    answer: "Astrology is based on thousands of years of observation and study of celestial movements and their correlation with human affairs. Our expert Vedic astrologers use precise calculations based on your birth chart to provide accurate predictions and insights."
  },
  {
    question: "Why Should You Choose AstroPari For An Astrology Horoscope?",
    answer: "AstroPari offers 13,000+ verified astrologers, 24/7 availability, complete privacy, and accurate predictions. We have served over 105 million customers with a high satisfaction rate. Our first consultation is free, allowing you to experience our quality service risk-free."
  },
  {
    question: "Is Astrology Prediction True?",
    answer: "Astrology predictions are based on scientific calculations of planetary positions and their influences. While astrology provides guidance and insights, remember that you have free will. Our astrologers provide accurate analysis to help you make informed decisions."
  },
  {
    question: "How Can Online Astrology Help Me In Predicting The Future?",
    answer: "Online astrology consultations provide convenient access to expert astrologers who analyze your birth chart and current planetary transits. This helps you understand upcoming opportunities, challenges, and the best timing for important decisions in your life."
  },
  {
    question: "How reliable is the AstroPari app?",
    answer: "The AstroPari app is highly reliable with 99.9% uptime. All astrologers are verified, and we have strict quality controls. With millions of satisfied users and thousands of positive reviews, we maintain the highest standards of service and accuracy."
  },
  {
    question: "How much does AstroPari cost?",
    answer: "AstroPari offers flexible pricing based on the astrologer's experience and expertise. Chat consultations start from as low as ₹10/min, while talk consultations vary. Your first session includes free minutes to try our service. Check individual astrologer profiles for specific pricing."
  }
];

export const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#f5f5f5] py-16">
      <div className="container max-w-[900px] mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10">
          FAQs
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-[16px] text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                  <p className="text-[15px] text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
