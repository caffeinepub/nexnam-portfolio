import React, { useRef, useState, useEffect } from 'react';
import { Search, Pencil, Code2, Rocket, TrendingUp } from 'lucide-react';
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

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover',
    desc: 'We deep-dive into your business, users, and goals. Through workshops and research, we define the problem space and success metrics.',
    color: '#6C63FF',
  },
  {
    number: '02',
    icon: Pencil,
    title: 'Design',
    desc: 'Our designers craft pixel-perfect wireframes and prototypes. We iterate rapidly based on feedback until the design is exactly right.',
    color: '#00D4FF',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Develop',
    desc: 'Our engineers build with clean, tested, scalable code. Weekly sprints with demos keep you in the loop at every stage.',
    color: '#6C63FF',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch',
    desc: 'We handle deployment, monitoring, and performance tuning. Your product goes live with zero downtime and full observability.',
    color: '#00D4FF',
  },
  {
    number: '05',
    icon: TrendingUp,
    title: 'Scale',
    desc: "Post-launch, we optimize, iterate, and scale. We're your long-term technical partner, not just a one-time vendor.",
    color: '#FF6B6B',
  },
];

function AnimatedLine() {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.8;
      const end = -rect.height * 0.3;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      setLineWidth(progress * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative mb-12">
      <div className="absolute top-8 left-0 right-0 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} />
      <div
        ref={lineRef}
        className="absolute top-8 left-0 h-px transition-none"
        style={{
          width: `${lineWidth}%`,
          background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
          boxShadow: '0 0 10px rgba(108, 99, 255, 0.5)',
        }}
      />
    </div>
  );
}

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#050510' }}>
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <span className="inline-block font-medium text-sm tracking-widest uppercase mb-4" style={{ color: '#6C63FF' }}>
              Our Process
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              How We <span className="gradient-text">Work</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#B0B8D0' }}>
              A proven, transparent process that delivers results on time and on budget.
            </p>
          </AnimatedSection>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          <AnimatedLine />
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 0.12}>
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 relative z-10"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
                      border: `2px solid ${step.color}50`,
                      boxShadow: `0 0 20px ${step.color}20`,
                    }}
                  >
                    <step.icon size={24} style={{ color: step.color }} />
                  </div>
                  <span
                    className="font-heading font-bold text-xs tracking-widest mb-2"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </span>
                  <h3 className="font-heading font-bold text-white text-lg mb-3">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#B0B8D0' }}>{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden">
          <div className="relative">
            <div
              className="absolute left-8 top-0 bottom-0 w-px"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            />
            <div className="space-y-10">
              {steps.map((step, i) => (
                <AnimatedSection key={step.title} delay={i * 0.1}>
                  <div className="flex gap-6 pl-4">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
                        border: `2px solid ${step.color}50`,
                      }}
                    >
                      <step.icon size={16} style={{ color: step.color }} />
                    </div>
                    <div className="flex-1 pb-2">
                      <span
                        className="font-heading font-bold text-xs tracking-widest"
                        style={{ color: step.color }}
                      >
                        {step.number}
                      </span>
                      <h3 className="font-heading font-bold text-white text-lg mb-2">{step.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#B0B8D0' }}>{step.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
