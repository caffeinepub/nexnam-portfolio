import React, { useEffect, useState } from 'react';
import { ArrowDown, Zap, ArrowRight } from 'lucide-react';
import Hero3DBackground from './Hero3DBackground';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
  };

  const itemStyle = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#050510' }}
    >
      {/* Background image layer */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(108, 99, 255, 0.12) 0%, rgba(5, 5, 16, 0.6) 60%, rgba(5, 5, 16, 0.95) 100%)',
        }}
      />

      {/* 3D Background */}
      <Hero3DBackground />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center">
          {/* Badge */}
          <div style={itemStyle(0.3)}>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(108, 99, 255, 0.2)',
                color: '#B0B8D0',
              }}
            >
              <Zap size={14} style={{ color: '#6C63FF' }} />
              Building the Future of Web
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#00D4FF', animation: 'pulse 2s infinite' }}
              />
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 max-w-5xl"
            style={itemStyle(0.45)}
          >
            We Build{' '}
            <span className="gradient-text">Future-Ready</span>
            <br />
            Web Applications
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl md:text-2xl max-w-2xl mb-10 leading-relaxed"
            style={{ ...itemStyle(0.6), color: '#B0B8D0' }}
          >
            Empowering startups with scalable, AI-driven digital products.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 items-center"
            style={itemStyle(0.75)}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary flex items-center gap-2 text-base"
            >
              Start Your Project
              <ArrowRight size={18} />
            </a>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-outline flex items-center gap-2 text-base"
            >
              View Our Work
            </a>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap justify-center gap-8 mt-16 pt-8"
            style={{
              ...itemStyle(0.9),
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {[
              { value: '50+', label: 'Projects Delivered' },
              { value: '30+', label: 'Happy Clients' },
              { value: '3+', label: 'Years Experience' },
              { value: '100%', label: 'Satisfaction Rate' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-bold text-2xl gradient-text">{stat.value}</div>
                <div className="text-sm mt-1" style={{ color: '#B0B8D0' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-colors group"
        style={{
          color: '#B0B8D0',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s ease 1.5s, color 0.2s ease',
        }}
        aria-label="Scroll down"
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#B0B8D0'; }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            animation: 'bounce-slow 1.5s ease-in-out infinite',
          }}
        >
          <ArrowDown size={16} />
        </div>
      </button>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
