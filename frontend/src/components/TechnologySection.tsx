import React from 'react';
import { useInView } from '../hooks/useInView';

function AnimatedSection({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const technologies = [
  { name: 'React', color: '#61DAFB', emoji: '⚛️' },
  { name: 'Next.js', color: '#FFFFFF', emoji: '▲' },
  { name: 'Node.js', color: '#68A063', emoji: '🟢' },
  { name: 'TypeScript', color: '#3178C6', emoji: '🔷' },
  { name: 'PostgreSQL', color: '#336791', emoji: '🐘' },
  { name: 'MongoDB', color: '#47A248', emoji: '🍃' },
  { name: 'AWS', color: '#FF9900', emoji: '☁️' },
  { name: 'Docker', color: '#2496ED', emoji: '🐳' },
  { name: 'OpenAI', color: '#10A37F', emoji: '🤖' },
  { name: 'Stripe', color: '#635BFF', emoji: '💳' },
  { name: 'Tailwind', color: '#06B6D4', emoji: '🎨' },
  { name: 'GraphQL', color: '#E10098', emoji: '◈' },
  { name: 'Redis', color: '#DC382D', emoji: '⚡' },
  { name: 'Kubernetes', color: '#326CE5', emoji: '☸️' },
  { name: 'Webflow', color: '#4353FF', emoji: '🌊' },
];

export default function TechnologySection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#050510' }}>
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(108, 99, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(108, 99, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #050510 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <span className="inline-block font-medium text-sm tracking-widest uppercase mb-4" style={{ color: '#6C63FF' }}>
              Tech Stack
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              Powered By <span className="gradient-text">Modern Technology</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#B0B8D0' }}>
              We use the best tools available to build fast, scalable, and maintainable applications.
            </p>
          </AnimatedSection>
        </div>

        {/* Tech Grid */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, i) => (
              <div
                key={tech.name}
                className="group"
                style={{
                  animation: `float ${3 + (i % 3) * 0.7}s ease-in-out ${i * 0.15}s infinite`,
                }}
              >
                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-xl cursor-default transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${tech.color}25`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = `0 0 20px ${tech.color}30, 0 0 40px ${tech.color}10`;
                    el.style.borderColor = `${tech.color}50`;
                    el.style.backgroundColor = `${tech.color}08`;
                    el.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = 'none';
                    el.style.borderColor = `${tech.color}25`;
                    el.style.backgroundColor = 'rgba(255,255,255,0.05)';
                    el.style.transform = 'scale(1)';
                  }}
                >
                  <span className="text-xl">{tech.emoji}</span>
                  <span className="font-heading font-semibold text-sm" style={{ color: tech.color }}>
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <p className="text-center text-sm mt-12" style={{ color: '#B0B8D0' }}>
            And many more tools tailored to your project's specific needs
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
