import React from 'react';
import { SiLinkedin } from 'react-icons/si';
import { Quote } from 'lucide-react';
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

const team = [
  {
    initials: 'AM',
    name: 'Alex Morgan',
    role: 'CEO & Founder',
    bio: 'Alex is a serial entrepreneur and full-stack engineer with 10+ years of experience building digital products. Before founding NexNam, he led engineering teams at two successful SaaS startups. He is passionate about using technology to solve real-world problems at scale.',
    gradientStyle: 'linear-gradient(135deg, #6C63FF 0%, #00D4FF 100%)',
    roleColor: '#6C63FF',
    avatar: '/assets/generated/avatar-alex.dim_200x200.png',
  },
  {
    initials: 'SC',
    name: 'Sarah Chen',
    role: 'CTO & Co-Founder',
    bio: 'Sarah is a systems architect and AI specialist with a background in distributed computing. She has shipped products used by millions of users and holds patents in machine learning optimization. At NexNam, she leads all technical strategy and innovation.',
    gradientStyle: 'linear-gradient(135deg, #00D4FF 0%, #6C63FF 100%)',
    roleColor: '#00D4FF',
    avatar: '/assets/generated/avatar-sarah.dim_200x200.png',
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#050510' }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #6C63FF 0%, #00D4FF 40%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <span className="inline-block font-medium text-sm tracking-widest uppercase mb-4" style={{ color: '#6C63FF' }}>
              The Team
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              Meet the <span className="gradient-text">Founders</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#B0B8D0' }}>
              Two builders on a mission to redefine what's possible in digital product development.
            </p>
          </AnimatedSection>
        </div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {team.map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 0.15}>
              <div
                className="rounded-2xl p-8 text-center group transition-all duration-300 relative overflow-hidden cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = '0 30px 80px rgba(108, 99, 255, 0.15)';
                  el.style.borderColor = 'rgba(108, 99, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                  el.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                {/* Avatar */}
                <div className="relative inline-block mb-6">
                  <div
                    className="w-24 h-24 rounded-full mx-auto overflow-hidden"
                    style={{
                      background: member.gradientStyle,
                      padding: '2px',
                      boxShadow: `0 0 30px ${member.roleColor}40`,
                    }}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-900 flex items-center justify-center">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          img.style.display = 'none';
                          const parent = img.parentElement;
                          if (parent) {
                            const span = document.createElement('span');
                            span.className = 'font-heading font-bold text-2xl text-white';
                            span.textContent = member.initials;
                            parent.appendChild(span);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2"
                    style={{ backgroundColor: '#00D4FF', borderColor: '#0a0a1a' }}
                  />
                </div>

                <h3 className="font-heading font-bold text-xl text-white mb-1">{member.name}</h3>
                <p className="text-sm font-medium mb-4" style={{ color: member.roleColor }}>
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#B0B8D0' }}>{member.bio}</p>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#B0B8D0',
                  }}
                  onClick={(e) => e.preventDefault()}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#B0B8D0'; }}
                >
                  <SiLinkedin size={16} style={{ color: '#0A66C2' }} />
                  Connect on LinkedIn
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Vision Quote */}
        <AnimatedSection delay={0.2}>
          <div
            className="max-w-3xl mx-auto text-center relative rounded-2xl p-10"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(108, 99, 255, 0.2)',
            }}
          >
            <Quote
              size={48}
              className="absolute top-6 left-6 opacity-20"
              style={{ color: '#6C63FF' }}
            />
            <Quote
              size={48}
              className="absolute bottom-6 right-6 opacity-20 rotate-180"
              style={{ color: '#00D4FF' }}
            />
            <p className="text-xl md:text-2xl font-heading italic text-white leading-relaxed">
              "We don't just write code — we build the digital infrastructure that powers tomorrow's most successful companies. Every line of code we write is a step toward a more connected, intelligent world."
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #6C63FF)' }} />
              <span className="text-sm font-medium" style={{ color: '#B0B8D0' }}>Alex & Sarah, NexNam Founders</span>
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #00D4FF, transparent)' }} />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
