import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

const AboutSection = lazy(() => import('./components/AboutSection'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const PortfolioSection = lazy(() => import('./components/PortfolioSection'));
const TeamSection = lazy(() => import('./components/TeamSection'));
const TechnologySection = lazy(() => import('./components/TechnologySection'));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));
const ProcessSection = lazy(() => import('./components/ProcessSection'));
const CTASection = lazy(() => import('./components/CTASection'));
const Footer = lazy(() => import('./components/Footer'));

const SectionFallback = () => (
  <div className="flex items-center justify-center py-32">
    <div
      className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
      style={{ borderColor: '#6C63FF', borderTopColor: 'transparent' }}
    />
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050510' }}>
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <PortfolioSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TeamSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TechnologySection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProcessSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CTASection />
        </Suspense>
      </main>
      <Suspense fallback={<div />}>
        <Footer />
      </Suspense>
    </div>
  );
}
