import { HeroSection1 } from "@/components/sections/hero-section1";
import { HeroSection2 } from "@/components/sections/hero-section2";
import { CompaniesSection } from "@/components/sections/companies-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { generateStructuredData } from "@/lib/seo";
// Import the new component
import { WarmWelcome } from "@/components/sections/warm-welcome"; 
import Countries from "@/components/sections/countries";
import { StatsSection } from "@/components/sections/stats-section";

export default function HomePage() {
  const personStructuredData = generateStructuredData("person", {});

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personStructuredData),
        }}
      />
      <div className="min-h-screen">
          <HeroSection1 />
          <HeroSection2 />
          <StatsSection />

          <CompaniesSection />
          <Countries/>
          <TestimonialsSection />

        
        {/* The Welcome Message */}
        <WarmWelcome />
      </div>
    </>
  );
}