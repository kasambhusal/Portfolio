import { HeroSection } from "@/components/sections/hero-section";
import { CompaniesSection } from "@/components/sections/companies-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { generateStructuredData } from "@/lib/seo";
// Import the new component
import { WarmWelcome } from "@/components/sections/warm-welcome"; 

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
          <HeroSection />
          <CompaniesSection />
          <StatsSection />
          <TestimonialsSection />

        
        {/* The Welcome Message */}
        <WarmWelcome />
      </div>
    </>
  );
}