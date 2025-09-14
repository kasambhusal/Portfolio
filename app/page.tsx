import { HeroSection } from "@/components/sections/hero-section";
import { CompaniesSection } from "@/components/sections/companies-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { Footer } from "@/components/footer";
import { ErrorBoundary } from "@/components/error-boundary";
import { generateStructuredData } from "@/lib/seo";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";

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
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div className="py-20" />}>
          <CompaniesSection />
        </ErrorBoundary>

        <ErrorBoundary>
          <StatsSection />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div className="py-20" />}>
            <TestimonialsSection />
        </ErrorBoundary>

        <Footer />
      </div>
    </>
  );
}
