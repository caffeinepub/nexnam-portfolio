import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="flex justify-center mb-8">
          <img
            src="/assets/generated/nexnam-logo.dim_120x120.png"
            alt="NexNam Digital"
            className="w-20 h-20 rounded-2xl shadow-2xl"
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
          NexNam <span className="text-gradient">Digital</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          Empowering businesses with cutting-edge digital solutions, blockchain expertise, and strategic corporate development.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#services"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Explore Services
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
