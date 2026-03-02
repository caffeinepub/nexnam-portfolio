import React from 'react';
import { Target, Eye, Heart, CheckCircle } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';
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

function StatCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(target, 2000);
  return (
    <div
      ref={ref}
      className="text-center p-6 rounded-2xl gradient-border"
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="font-heading font-bold text-4xl md:text-5xl gradient-text mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium" style={{ color: '#B0B8D0' }}>{label}</div>
    </div>
  );
}

const timelineItems = [
  { year: '2022', title: 'Founded', desc: 'NexNam was born with a vision to build world-class digital products for startups.' },
  { year: '2023', title: 'First 10 Clients', desc: 'Delivered 15+ projects across FinTech, HealthTech, and SaaS verticals.' },
  { year: '2024', title: 'AI Integration', desc: 'Expanded into AI-powered platforms and launched our proprietary dev framework.' },
  { year: '2025', title: 'Global Scale', desc: 'Serving 30+ clients worldwide with a team of 20+ expert engineers and designers.' },
];

const cards = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'To empower startups and digital businesses with cutting-edge web applications that drive growth, efficiency, and competitive advantage in the digital era.',
    color: '#6C63FF',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    desc: 'To become the most trusted technology partner for the next generation of digital-first companies, building products that shape the future of the internet.',
    color: '#00D4FF',
  },
  {
    icon: Heart,
    title: 'Core Values',
    desc: 'Innovation, transparency, and excellence guide everything we do. We believe in long-term partnerships built on trust, quality, and measurable results.',
    color: '#FF6B6B',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#050510' }}>
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6C63FF 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <span className="inline-block font-medium text-sm tracking-widest uppercase mb-4" style={{ color: '#6C63FF' }}>
              About NexNam
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              We Build Digital Products{' '}
              <span className="gradient-text">That Matter</span>
            </h2>
          </AnimatedSection>
        </div>

        {/* Story + Stats */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Story */}
          <div>
            <AnimatedSection delay={0}>
              <h3 className="font-heading font-bold text-2xl text-white mb-4">Who We Are</h3>
              <p className="leading-relaxed mb-6" style={{ color: '#B0B8D0' }}>
                NexNam is a modern web application development company founded by engineers and designers who believe that great software can change the world. We specialize in building scalable SaaS products, AI-powered platforms, and high-performance web applications.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h3 className="font-heading font-bold text-2xl text-white mb-4">What We Build</h3>
              <p className="leading-relaxed mb-6" style={{ color: '#B0B8D0' }}>
                From complex enterprise dashboards to consumer-facing mobile apps, we craft digital experiences that are fast, beautiful, and built to scale. Our stack is always modern, our code always clean.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h3 className="font-heading font-bold text-2xl text-white mb-4">Why We Build It</h3>
              <p className="leading-relaxed mb-8" style={{ color: '#B0B8D0' }}>
                We believe every startup deserves access to world-class engineering. Our mission is to level the playing field by giving ambitious founders the technical firepower they need to compete and win.
              </p>
              <div className="flex flex-col gap-3">
                {['Agile development methodology', 'Transparent communication', 'Post-launch support & maintenance'].map((item) => (
                  <div key={item} className="flex items-center gap-3" style={{ color: '#B0B8D0' }}>
                    <CheckCircle size={18} style={{ color: '#6C63FF', flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard target={50} suffix="+" label="Projects Delivered" />
            <StatCard target={30} suffix="+" label="Happy Clients" />
            <StatCard target={3} suffix="+" label="Years Experience" />
            <StatCard target={100} suffix="%" label="Satisfaction Rate" />
          </div>
        </div>

        {/* Mission / Vision / Values Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {cards.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.1}>
              <div
                className="rounded-2xl p-8 h-full transition-all duration-300 group cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${card.color}40`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${card.color}15`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${card.color}20`, border: `1px solid ${card.color}40` }}
                >
                  <card.icon size={24} style={{ color: card.color }} />
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">{card.title}</h3>
                <p className="leading-relaxed text-sm" style={{ color: '#B0B8D0' }}>{card.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Timeline */}
        <AnimatedSection delay={0}>
          <h3 className="font-heading font-bold text-2xl text-center text-white mb-12">
            Our Growth Journey
          </h3>
          <div className="relative">
            <div
              className="hidden md:block absolute top-8 left-0 right-0 h-px opacity-30"
              style={{ background: 'linear-gradient(90deg, #6C63FF, #00D4FF, #6C63FF)' }}
            />
            <div className="grid md:grid-cols-4 gap-8">
              {timelineItems.map((item, i) => (
                <AnimatedSection key={item.year} delay={i * 0.1}>
                  <div className="relative flex flex-col items-center text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center font-heading font-bold text-sm mb-4 relative z-10"
                      style={{
                        background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                        boxShadow: '0 0 20px rgba(108, 99, 255, 0.4)',
                      }}
                    >
                      {item.year}
                    </div>
                    <h4 className="font-heading font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#B0B8D0' }}>{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
