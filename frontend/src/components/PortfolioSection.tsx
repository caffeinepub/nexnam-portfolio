import React from 'react';
import { ArrowUpRight } from 'lucide-react';
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

const projects = [
  {
    name: 'FinTech Dashboard',
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    color: '#6C63FF',
    screenGradient: 'linear-gradient(135deg, rgba(108,99,255,0.3), rgba(30,20,80,0.8))',
    problem: 'Complex financial data scattered across 5 legacy systems with no unified view.',
    solution: 'Built a real-time unified dashboard with advanced analytics, alerts, and reporting.',
    result: '60% reduction in reporting time, $2M in operational savings.',
    category: 'FinTech',
  },
  {
    name: 'AI SaaS Platform',
    tags: ['Next.js', 'OpenAI', 'PostgreSQL', 'Stripe'],
    color: '#00D4FF',
    screenGradient: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(10,30,60,0.8))',
    problem: 'Manual content workflows consuming 40+ hours per week for marketing teams.',
    solution: 'AI-powered content generation platform with workflow automation and team collaboration.',
    result: '300% increase in content output, 10x faster time-to-publish.',
    category: 'AI / SaaS',
  },
  {
    name: 'E-commerce Web App',
    tags: ['React', 'GraphQL', 'MongoDB', 'AWS'],
    color: '#FF6B6B',
    screenGradient: 'linear-gradient(135deg, rgba(255,107,107,0.3), rgba(60,20,20,0.8))',
    problem: 'Outdated storefront with 8-second load times and 70% cart abandonment rate.',
    solution: 'Rebuilt with headless architecture, edge caching, and personalized recommendations.',
    result: '4x faster load times, 45% reduction in cart abandonment, 180% revenue growth.',
    category: 'E-commerce',
  },
  {
    name: 'Healthcare Portal',
    tags: ['React', 'Node.js', 'HIPAA', 'WebRTC'],
    color: '#6C63FF',
    screenGradient: 'linear-gradient(135deg, rgba(0,200,150,0.3), rgba(10,40,30,0.8))',
    problem: 'Fragmented patient-doctor communication with no secure digital channel.',
    solution: 'HIPAA-compliant telehealth portal with video consultations, records, and scheduling.',
    result: '5,000+ patients onboarded in 3 months, 95% patient satisfaction score.',
    category: 'HealthTech',
  },
];

function DeviceMockup({ color, screenGradient }: { color: string; screenGradient: string }) {
  return (
    <div className="relative w-full flex justify-center items-end pb-4">
      <div className="relative w-full max-w-xs">
        {/* Screen */}
        <div
          className="relative rounded-t-lg overflow-hidden"
          style={{
            background: '#0a0a1a',
            border: `1px solid ${color}30`,
            borderBottom: 'none',
            paddingTop: '62%',
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: screenGradient }}
          >
            <div className="w-full h-full p-3 flex flex-col gap-2">
              <div className="flex gap-2 items-center mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgba(255,100,100,0.6)' }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgba(255,200,50,0.6)' }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgba(50,200,100,0.6)' }} />
                <div className="flex-1 h-2 rounded-full ml-2" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
              </div>
              <div className="flex gap-2 flex-1">
                <div className="w-1/4 flex flex-col gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-2 rounded" style={{ width: `${60 + i * 8}%`, backgroundColor: 'rgba(255,255,255,0.1)' }} />
                  ))}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 h-8 rounded-lg"
                        style={{ backgroundColor: `${color}20`, border: `1px solid ${color}30` }}
                      />
                    ))}
                  </div>
                  <div
                    className="flex-1 rounded-lg"
                    style={{ backgroundColor: `${color}10`, border: `1px solid ${color}20` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05), transparent)' }}
          />
        </div>
        {/* Keyboard base */}
        <div
          className="h-3 rounded-b-lg"
          style={{
            background: 'linear-gradient(180deg, #1a1a2e, #0d0d1a)',
            border: `1px solid ${color}20`,
            borderTop: 'none',
          }}
        />
        <div className="flex justify-center mt-1">
          <div
            className="w-12 h-2 rounded-sm"
            style={{ backgroundColor: `${color}15`, border: `1px solid ${color}20` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="work" className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#050510' }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6C63FF 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <span className="inline-block font-medium text-sm tracking-widest uppercase mb-4" style={{ color: '#6C63FF' }}>
              Portfolio
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              Our <span className="gradient-text">Work</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#B0B8D0' }}>
              Real projects, real results. Here's a selection of our most impactful work.
            </p>
          </AnimatedSection>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <AnimatedSection key={project.name} delay={i * 0.1}>
              <div
                className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(-8px)';
                  el.style.boxShadow = `0 30px 80px ${project.color}20, 0 0 40px ${project.color}10`;
                  el.style.borderColor = `${project.color}30`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                  el.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                {/* Device Mockup */}
                <div className="p-6 pb-0" style={{ backgroundColor: `${project.color}05` }}>
                  <DeviceMockup color={project.color} screenGradient={project.screenGradient} />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                    style={{
                      backgroundColor: `${project.color}15`,
                      color: project.color,
                      border: `1px solid ${project.color}25`,
                    }}
                  >
                    {project.category}
                  </span>

                  <h3 className="font-heading font-bold text-xl text-white mb-4">{project.name}</h3>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: '#B0B8D0',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { label: 'Problem', text: project.problem, color: '#FF6B6B' },
                      { label: 'Solution', text: project.solution, color: '#6C63FF' },
                      { label: 'Result', text: project.result, color: '#00D4FF' },
                    ].map((item) => (
                      <div key={item.label} className="flex gap-3">
                        <span
                          className="text-xs font-bold uppercase tracking-wider flex-shrink-0 mt-0.5 w-16"
                          style={{ color: item.color }}
                        >
                          {item.label}
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: '#B0B8D0' }}>{item.text}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 group/btn"
                    style={{ color: project.color }}
                    onMouseEnter={(e) => {
                      const icon = (e.currentTarget as HTMLButtonElement).querySelector('svg');
                      if (icon) {
                        (icon as SVGElement).style.transform = 'translate(2px, -2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      const icon = (e.currentTarget as HTMLButtonElement).querySelector('svg');
                      if (icon) {
                        (icon as SVGElement).style.transform = 'translate(0, 0)';
                      }
                    }}
                  >
                    <span>Explore Case Study</span>
                    <ArrowUpRight size={16} style={{ transition: 'transform 0.2s ease' }} />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
