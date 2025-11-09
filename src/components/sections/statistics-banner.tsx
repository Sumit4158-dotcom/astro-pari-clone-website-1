export const StatisticsBanner = () => {
  const stats = [
    { value: "46,434+", label: "Total Astrologers" },
    { value: "1326 Million", label: "Total Chat/Call Minutes" },
    { value: "105.7 Million", label: "Total Customers" }
  ];

  return (
    <section className="bg-[#2d2d2d] py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFD700] mb-2">
                {stat.value}
              </div>
              <div className="text-base md:text-lg text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
