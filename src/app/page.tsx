import { Header } from "@/components/sections/header";
import { HeroBanner } from "@/components/sections/hero-banner";
import { ServiceCards } from "@/components/sections/service-cards";
import { ComplimentaryServices } from "@/components/sections/complimentary-services";
import { StatisticsBanner } from "@/components/sections/statistics-banner";
import { NewsCarousel } from "@/components/sections/news-carousel";
import { BlogCarousel } from "@/components/sections/blog-carousel";
import { CelebrityTestimonials } from "@/components/sections/celebrity-testimonials";
import { AstrologersCarousel } from "@/components/sections/astrologers-carousel";
import { ContentSections } from "@/components/sections/content-sections";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroBanner />
      <ServiceCards />
      <ComplimentaryServices />
      <StatisticsBanner />
      <NewsCarousel />
      <BlogCarousel />
      <CelebrityTestimonials />
      <AstrologersCarousel />
      <ContentSections />
      <FAQAccordion />
      <Footer />
    </div>
  );
}