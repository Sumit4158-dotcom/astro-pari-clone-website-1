import Link from "next/link";
import { MessageSquare, Phone, ShoppingCart, Link as LinkIcon } from "lucide-react";

const services = [
  {
    title: "Chat with Astrologer",
    icon: MessageSquare,
    iconBg: "#FF6B9D",
    href: "/chat"
  },
  {
    title: "Talk to Astrologer",
    icon: Phone,
    iconBg: "#00D4AA",
    href: "/talk"
  },
  {
    title: "AstroPari Shop",
    icon: ShoppingCart,
    iconBg: "#4A90E2",
    href: "/shop"
  },
  {
    title: "Book a Pooja",
    icon: LinkIcon,
    iconBg: "#FF9F43",
    href: "/pooja"
  }
];

export const ServiceCards = () => {
  return (
    <section className="container mx-auto px-4 py-10 md:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.title}
              href={service.href}
              className="group bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: service.iconBg }}
                >
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-[17px] font-semibold text-gray-900">
                  {service.title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
