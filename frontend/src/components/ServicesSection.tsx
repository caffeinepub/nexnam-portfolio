import React, { useRef, useState } from 'react';
import { Globe, Package, Palette, Brain, Zap } from 'lucide-react';
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

interface TiltCardProps {
  children: React.ReactNode;
  color: string;
}

function TiltCard({ children, color }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: transform || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: transform ? 'transform 0.1s ease' : 'transform 0.4s ease',
        transformStyle: 'preserve-3d',
        height: '100%',
      }}
    >
      <div
        className="h-full rounded-2xl p-8 cursor-default relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(16px)',
          border: isHovered ? `1px solid ${color}40` : '1px solid rgba(255,255,255,0.08)',
          boxShadow: isHovered ? `0 0 30px ${color}20, 0 20px 60px rgba(0,0,0,0.3)` : 'none',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Glow effect */}
        {isHovered && (
          <div
            className="absolute pointer-events-none"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
              left: `${glowPos.x}%`,
              top: `${glowPos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}

const services = [
  {
    icon: Globe,
    title: 'Custom Web Application Development',
    desc: 'We architect and build bespoke web applications tailored to your exact business requirements — from MVPs to enterprise-grade platforms.',
    color: '#6C63FF',
    tags: ['React', 'Node.js', 'TypeScript'],
  },
  {
    icon: Package,
    title: 'SaaS Product Development',
    desc: 'End-to-end SaaS product development with multi-tenancy, subscription billing, analytics dashboards, and scalable cloud infrastructure.',
    color: '#00D4FF',
    tags: ['SaaS', 'AWS', 'Stripe'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'Pixel-perfect, user-centered design systems that convert. We create interfaces that are both beautiful and intuitive.',
    color: '#FF6B6B',
    tags: ['Figma', 'Design Systems', 'Prototyping'],
  },
  {
    icon: Brain,
    title: 'AI Integration',
    desc: 'Supercharge your product with AI capabilities — LLM integrations, intelligent automation, recommendation engines, and predictive analytics.',
    color: '#6C63FF',
    tags: ['OpenAI', 'LangChain', 'ML'],
  },
  {
    icon: Zap,
    title: 'Performance & Optimization',
    desc: 'We audit, optimize, and scale your existing applications for maximum speed, reliability, and cost efficiency.',
    color: '#00D4FF',
    tags: ['Core Web Vitals', 'CDN', 'Caching'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#050510' }}>
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(108, 99, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(108, 99, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <span className="inline-block font-medium text-sm tracking-widest uppercase mb-4" style={{ color: '#6C63FF' }}>
              Our Services
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              What We <span className="gradient-text">Build</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#B0B8D0' }}>
              From concept to deployment, we deliver end-to-end digital solutions that drive real business outcomes.
            </p>
          </AnimatedSection>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.08}>
              <TiltCard color={service.color}>
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: `${service.color}15`,
                    border: `1px solid ${service.color}30`,
                  }}
                >
                  <service.icon size={26} style={{ color: service.color }} />
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#B0B8D0' }}>{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${service.color}15`,
                        color: service.color,
                        border: `1px solid ${service.color}25`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className="absolute bottom-6 right-6 font-heading font-bold text-5xl opacity-5"
                  style={{ color: service.color }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
