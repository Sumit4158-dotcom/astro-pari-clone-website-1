import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Star, Heart, Briefcase, DollarSign, TrendingUp, Users } from "lucide-react";

const zodiacSigns = [
  {
    name: "Aries",
    nameHindi: "मेष",
    symbol: "♈",
    dates: "March 21 - April 19",
    color: "bg-red-500",
    overview: "2025 brings dynamic energy and new opportunities for Aries natives. Career growth and financial stability are highlighted.",
    love: "Your love life will bloom in 2025. Singles may find their soulmate in the second half of the year. Married couples will experience deeper bonding.",
    career: "Excellent year for career advancement. Promotions and recognition are on the cards. New business ventures will be profitable.",
    finance: "Financial gains through investments and business. Good time to invest in property. Unexpected monetary gains in November-December.",
    health: "Focus on fitness and mental health. Regular exercise and meditation recommended. Minor health issues in March-April.",
    lucky: { color: "Red, Orange", number: "1, 9", day: "Tuesday", month: "May, September" }
  },
  {
    name: "Taurus",
    nameHindi: "वृषभ",
    symbol: "♉",
    dates: "April 20 - May 20",
    color: "bg-green-600",
    overview: "A transformative year for Taurus. Focus on personal growth, relationships, and financial planning will bring positive results.",
    love: "Romantic relationships will strengthen. Perfect time for marriage proposals. Family life will be harmonious and peaceful.",
    career: "Steady progress in career. Job changes in June-July may bring better opportunities. Business partnerships will be beneficial.",
    finance: "Stable financial year. Good returns from long-term investments. Avoid lending money in the first quarter.",
    health: "Generally good health. Pay attention to diet and digestion. Yoga and meditation will help maintain balance.",
    lucky: { color: "Green, White", number: "6, 5", day: "Friday", month: "April, October" }
  },
  {
    name: "Gemini",
    nameHindi: "मिथुन",
    symbol: "♊",
    dates: "May 21 - June 20",
    color: "bg-yellow-500",
    overview: "2025 is a year of communication, learning, and networking for Gemini. Multiple opportunities in various fields will present themselves.",
    love: "Exciting developments in love life. New relationships will blossom. Couples may plan for family expansion.",
    career: "Career takes center stage. Success in creative fields and communication-based work. International opportunities possible.",
    finance: "Multiple income sources will develop. Smart investments will yield good returns. Financial planning is crucial.",
    health: "Maintain work-life balance to avoid stress. Respiratory issues need attention. Regular health checkups advised.",
    lucky: { color: "Yellow, Blue", number: "5, 3", day: "Wednesday", month: "June, November" }
  },
  {
    name: "Cancer",
    nameHindi: "कर्क",
    symbol: "♋",
    dates: "June 21 - July 22",
    color: "bg-blue-400",
    overview: "A nurturing and prosperous year for Cancer natives. Family, home, and emotional well-being take priority with positive outcomes.",
    love: "Deep emotional connections strengthen. Marriage prospects are excellent. Family celebrations and happiness are indicated.",
    career: "Slow but steady career growth. Focus on skill development. Second half brings better opportunities and recognition.",
    finance: "Financial stability improves. Property investments favorable. Savings will increase through careful planning.",
    health: "Emotional health is important. Digestive system needs care. Maintain regular sleep schedule and healthy diet.",
    lucky: { color: "White, Silver", number: "2, 7", day: "Monday", month: "July, December" }
  },
  {
    name: "Leo",
    nameHindi: "सिंह",
    symbol: "♌",
    dates: "July 23 - August 22",
    color: "bg-orange-500",
    overview: "A royal and commanding year for Leo. Leadership opportunities, recognition, and personal achievements will define 2025.",
    love: "Passionate and romantic year ahead. Singles will attract admirers. Married life will be blissful with mutual understanding.",
    career: "Outstanding career year. Promotions, awards, and leadership roles await. Entrepreneurial ventures will succeed.",
    finance: "Excellent financial gains through career and business. Luxury purchases possible. Investments in gold and shares favorable.",
    health: "Heart and spine health needs attention. Regular exercise and stress management crucial. Overall vitality remains high.",
    lucky: { color: "Gold, Orange", number: "1, 4", day: "Sunday", month: "August, January" }
  },
  {
    name: "Virgo",
    nameHindi: "कन्या",
    symbol: "♍",
    dates: "August 23 - September 22",
    color: "bg-green-700",
    overview: "A year of perfection and achievement for Virgo. Attention to detail and analytical skills will bring success in all endeavors.",
    love: "Practical approach to relationships pays off. Long-term commitment and engagement likely. Family support strengthens bonds.",
    career: "Professional excellence recognized. Technical and analytical skills in high demand. Foreign opportunities possible.",
    finance: "Steady income with gradual increase. Investment in education and skills beneficial. Financial discipline brings rewards.",
    health: "Digestive health requires care. Stress management through meditation recommended. Regular health monitoring advised.",
    lucky: { color: "Green, Brown", number: "5, 6", day: "Wednesday", month: "September, March" }
  },
  {
    name: "Libra",
    nameHindi: "तुला",
    symbol: "♎",
    dates: "September 23 - October 22",
    color: "bg-pink-500",
    overview: "Balance and harmony define 2025 for Libra. Partnerships, both personal and professional, will flourish with cooperation.",
    love: "Romantic relationships reach new heights. Marriage and partnerships are highly favored. Social life becomes vibrant.",
    career: "Partnership-based ventures succeed. Creative fields bring recognition. Diplomatic skills open new doors.",
    finance: "Balanced financial year. Joint ventures profitable. Real estate investments favorable in second half.",
    health: "Kidney and lower back health important. Maintain balance in diet and exercise. Avoid excessive stress and anxiety.",
    lucky: { color: "Pink, White", number: "6, 9", day: "Friday", month: "October, April" }
  },
  {
    name: "Scorpio",
    nameHindi: "वृश्चिक",
    symbol: "♏",
    dates: "October 23 - November 21",
    color: "bg-red-700",
    overview: "Transformation and intensity mark 2025 for Scorpio. Deep changes bring positive outcomes in career and personal life.",
    love: "Intense and passionate relationships. Singles find deep connections. Married couples experience renewed intimacy.",
    career: "Major career transformations. Research and investigative work brings success. Leadership positions attainable.",
    finance: "Significant financial gains through inheritance or partnerships. Investment in mutual funds favorable. Hidden income sources.",
    health: "Reproductive and excretory system needs care. Regular detoxification beneficial. Mental health requires attention.",
    lucky: { color: "Maroon, Red", number: "9, 8", day: "Tuesday", month: "November, February" }
  },
  {
    name: "Sagittarius",
    nameHindi: "धनु",
    symbol: "♐",
    dates: "November 22 - December 21",
    color: "bg-purple-600",
    overview: "Expansion and adventure characterize 2025 for Sagittarius. Travel, education, and philosophical pursuits bring fulfillment.",
    love: "Adventurous love life with exciting developments. Long-distance relationships strengthen. Marriage plans materialize.",
    career: "International opportunities and higher education enhance career. Teaching and consulting fields favorable. Business expansion successful.",
    finance: "Financial growth through foreign connections. Good year for speculation. Travel-related expenses increase but worthwhile.",
    health: "Liver and thigh health requires attention. Avoid overindulgence. Outdoor activities and sports beneficial.",
    lucky: { color: "Yellow, Purple", number: "3, 9", day: "Thursday", month: "December, May" }
  },
  {
    name: "Capricorn",
    nameHindi: "मकर",
    symbol: "♑",
    dates: "December 22 - January 19",
    color: "bg-gray-700",
    overview: "Discipline and hard work pay off in 2025 for Capricorn. Professional achievements and social status improve significantly.",
    love: "Serious and committed relationships develop. Marriage based on mutual respect. Family responsibilities increase but manageable.",
    career: "Outstanding professional year. Senior positions and recognition. Government-related work favorable. Business stability.",
    finance: "Strong financial year with steady growth. Property investments highly favorable. Long-term financial security established.",
    health: "Bone and joint health important. Calcium intake crucial. Regular exercise prevents stiffness. Dental checkups advised.",
    lucky: { color: "Black, Brown", number: "8, 4", day: "Saturday", month: "January, June" }
  },
  {
    name: "Aquarius",
    nameHindi: "कुंभ",
    symbol: "♒",
    dates: "January 20 - February 18",
    color: "bg-blue-500",
    overview: "Innovation and humanitarian pursuits define 2025 for Aquarius. Technology, networking, and social causes bring success.",
    love: "Unconventional relationships thrive. Friendship turns into love. Social connections lead to romantic opportunities.",
    career: "Technology and innovation sectors boom. Networking brings opportunities. Freelancing and consulting profitable.",
    finance: "Unexpected gains through technology and networking. Cryptocurrency and innovative investments favorable. Group ventures succeed.",
    health: "Circulatory system and ankles need care. Stay hydrated. Avoid prolonged sitting. Regular movement essential.",
    lucky: { color: "Blue, Gray", number: "4, 8", day: "Saturday", month: "February, July" }
  },
  {
    name: "Pisces",
    nameHindi: "मीन",
    symbol: "♓",
    dates: "February 19 - March 20",
    color: "bg-teal-500",
    overview: "Intuition and spirituality guide 2025 for Pisces. Creative pursuits, healing work, and spiritual growth bring fulfillment.",
    love: "Deeply emotional and spiritual connections. Soulmate connections possible. Compassionate relationships flourish.",
    career: "Creative and healing professions thrive. Artistic talents recognized. Service-oriented work brings satisfaction and success.",
    finance: "Intuitive investments pay off. Creative work monetizes well. Charitable activities bring unexpected returns.",
    health: "Feet and immune system need attention. Spiritual practices enhance well-being. Avoid escapist tendencies.",
    lucky: { color: "Sea Green, Yellow", number: "3, 7", day: "Thursday", month: "March, August" }
  }
];

export default function Horoscope2025Page() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full mb-6">
              <Star className="h-5 w-5 text-black" />
              <span className="text-sm font-medium text-black">Yearly Predictions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              Horoscope 2025
            </h1>
            <p className="text-lg md:text-xl text-gray-800 mb-4">
              होरोस्कोप 2025 - Complete Yearly Astrology Predictions
            </p>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
              Discover what the stars have in store for you in 2025. Get detailed yearly predictions for love, career, finance, and health based on your zodiac sign.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                Welcome to 2025 Horoscope Predictions
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                साल 2025 आपके लिए क्या लेकर आ रहा है? जानिए अपने राशि के अनुसार संपूर्ण वार्षिक भविष्यफल। 
                हमारे विशेषज्ञ ज्योतिषियों ने सभी 12 राशियों के लिए विस्तृत भविष्यवाणियां तैयार की हैं।
              </p>
              <p className="text-gray-700 leading-relaxed">
                The year 2025 brings unique energies and opportunities for each zodiac sign. Our expert astrologers have analyzed planetary positions, transits, and cosmic influences to provide you with accurate and detailed predictions for love, career, finance, and health. Select your zodiac sign below to explore what the year holds for you.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid md:grid-cols-4 gap-4 md:gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-pink-100 mb-4">
                  <Heart className="h-7 w-7 text-pink-600" />
                </div>
                <h3 className="font-semibold text-black mb-2">Love Life</h3>
                <p className="text-sm text-gray-600">Relationship predictions and romantic opportunities</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-4">
                  <Briefcase className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-black mb-2">Career</h3>
                <p className="text-sm text-gray-600">Professional growth and job opportunities</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 mb-4">
                  <DollarSign className="h-7 w-7 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-black mb-2">Finance</h3>
                <p className="text-sm text-gray-600">Money matters and investment guidance</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4">
                  <TrendingUp className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="font-semibold text-black mb-2">Health</h3>
                <p className="text-sm text-gray-600">Wellness tips and health forecasts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zodiac Signs */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Select Your Zodiac Sign
              </h2>
              <p className="text-gray-600">
                अपनी राशि चुनें और जानें 2025 की संपूर्ण भविष्यवाणी
              </p>
            </div>

            <div className="space-y-8">
              {zodiacSigns.map((sign, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden"
                >
                  {/* Sign Header */}
                  <div className={`${sign.color} px-6 py-4 md:px-8 md:py-6`}>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl md:text-6xl">{sign.symbol}</div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white">
                            {sign.name}
                          </h3>
                          <p className="text-white/90 text-lg font-medium">{sign.nameHindi}</p>
                          <p className="text-white/80 text-sm">{sign.dates}</p>
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                        <p className="text-white font-semibold text-sm">Lucky Color</p>
                        <p className="text-white text-sm">{sign.lucky.color}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sign Content */}
                  <div className="p-6 md:p-8">
                    {/* Overview */}
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-black mb-3 flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        Overview 2025
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{sign.overview}</p>
                    </div>

                    {/* Detailed Predictions Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Love */}
                      <div className="bg-pink-50 rounded-xl p-5">
                        <h5 className="font-bold text-black mb-2 flex items-center gap-2">
                          <Heart className="h-5 w-5 text-pink-600" />
                          Love & Relationships
                        </h5>
                        <p className="text-sm text-gray-700 leading-relaxed">{sign.love}</p>
                      </div>

                      {/* Career */}
                      <div className="bg-blue-50 rounded-xl p-5">
                        <h5 className="font-bold text-black mb-2 flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-blue-600" />
                          Career & Business
                        </h5>
                        <p className="text-sm text-gray-700 leading-relaxed">{sign.career}</p>
                      </div>

                      {/* Finance */}
                      <div className="bg-yellow-50 rounded-xl p-5">
                        <h5 className="font-bold text-black mb-2 flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-yellow-600" />
                          Finance & Money
                        </h5>
                        <p className="text-sm text-gray-700 leading-relaxed">{sign.finance}</p>
                      </div>

                      {/* Health */}
                      <div className="bg-green-50 rounded-xl p-5">
                        <h5 className="font-bold text-black mb-2 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          Health & Wellness
                        </h5>
                        <p className="text-sm text-gray-700 leading-relaxed">{sign.health}</p>
                      </div>
                    </div>

                    {/* Lucky Details */}
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Lucky Number</p>
                        <p className="font-bold text-black">{sign.lucky.number}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Lucky Day</p>
                        <p className="font-bold text-black">{sign.lucky.day}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Lucky Month</p>
                        <p className="font-bold text-black">{sign.lucky.month}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Lucky Color</p>
                        <p className="font-bold text-black">{sign.lucky.color}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#FFD700] via-[#FFF200] to-[#FFD700]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Want Personalized Predictions?
            </h2>
            <p className="text-lg text-gray-800 mb-8">
              Get detailed, personalized horoscope readings from our expert astrologers based on your exact birth chart and planetary positions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2">
                <Users className="h-5 w-5" />
                Chat with Astrologer
              </button>
              <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg">
                Get Free Kundli
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
              About 2025 Horoscope Predictions
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                The 2025 horoscope predictions are based on comprehensive astrological analysis of planetary movements, transits, and their impact on each zodiac sign. Our expert astrologers have studied the positions of major planets including Jupiter, Saturn, and other celestial bodies to provide accurate forecasts.
              </p>
              <p className="mb-4">
                <strong>Key Astrological Events in 2025:</strong> The year 2025 will witness several significant planetary transits that will influence all zodiac signs differently. Jupiter's movement will bring expansion and growth opportunities, while Saturn's transit will emphasize discipline and hard work.
              </p>
              <p className="mb-4">
                <strong>How to Use These Predictions:</strong> Read your sun sign predictions for general guidance. For more accurate and personalized insights, consider getting your complete birth chart analysis from our expert astrologers.
              </p>
              <p>
                Remember, astrology is a guiding tool. Your actions, decisions, and free will play the most important role in shaping your destiny. Use these predictions as insights to make informed choices and prepare for the opportunities and challenges ahead.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
