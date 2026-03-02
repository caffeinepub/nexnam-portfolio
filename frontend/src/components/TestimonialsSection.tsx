import React, { useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
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

const testimonials = [
  {
    name: 'Marcus Johnson',
    role: 'CEO',
    company: 'FinFlow Inc.',
    quote:
      'NexNam transformed our entire financial platform in just 4 months. The quality of their code and the speed of delivery was unlike anything we had experienced before. They truly feel like an extension of our team.',
    result: '300% Revenue Growth',
    resultColor: '#6C63FF',
    initials: 'MJ',
    avatarGradient: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO',
    company: 'AiDraft',
    quote:
      'The AI platform NexNam built for us became our core product. Their deep understanding of both AI and UX is rare. We went from idea to 1,000 paying customers in under 6 months.',
    result: '1,000 Customers in 6 Months',
    resultColor: '#00D4FF',
    initials: 'PS',
    avatarGradient: 'linear-gradient(135deg, #00D4FF, #6C63FF)',
  },
  {
    name: 'David Park',
    role: 'Founder',
    company: 'ShopNova',
    quote:
      'Our e-commerce conversion rate doubled after NexNam rebuilt our storefront. The performance improvements alone paid for the entire project within the first month. Absolutely exceptional work.',
    result: '2x Conversion Rate',
    resultColor: '#FF6B6B',
    initials: 'DP',
    avatarGradient: 'linear-gradient(135deg, #FF6B6B, #6C63FF)',
  },
  {
    name: 'Dr. Lisa Chen',
    role: 'Medical Director',
    company: 'HealthBridge',
    quote:
      'Building a HIPAA-compliant telehealth platform is incredibly complex. NexNam navigated every regulatory requirement while delivering a beautiful, intuitive product. Our patients love it.',
    result: '95% Patient Satisfaction',
    resultColor: '#6C63FF',
    initials: 'LC',
    avatarGradient: 'linear-gradient(135deg, #6C63FF, #FF6B6B)',
  },
  {
    name: 'Tom Williams',
    role: 'VP Engineering',
    company: 'ScaleUp Labs',
    quote:
      'We hired NexNam to optimize our platform that was struggling under load. They identified bottlenecks we had missed for years and reduced our infrastructure costs by 40% while tripling performance.',
    result: '40% Cost Reduction',
    resultColor: '#00D4FF',
    initials: 'TW',
    avatarGradient: 'linear-gradient(135deg, #00D4FF, #FF6B6B)',
  },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 4000);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    startAutoScroll();
    emblaApi.on('pointerDown', () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    });
    emblaApi.on('pointerUp', () => startAutoScroll());
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [emblaApi, startAutoScroll]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#050510' }}>
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <span className="inline-block font-medium text-sm tracking-widest uppercase mb-4" style={{ color: '#6C63FF' }}>
              Testimonials
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#B0B8D0' }}>
              Don't take our word for it — hear from the founders and teams we've worked with.
            </p>
          </AnimatedSection>
        </div>

        {/* Carousel */}
        <AnimatedSection delay={0.1}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-w-0"
                >
                  <div
                    className="rounded-2xl p-8 h-full flex flex-col"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#FF6B6B" color="#FF6B6B" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-sm leading-relaxed flex-1 mb-6 italic" style={{ color: '#B0B8D0' }}>
                      "{t.quote}"
                    </p>

                    {/* Result Badge */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6 self-start"
                      style={{
                        backgroundColor: `${t.resultColor}15`,
                        color: t.resultColor,
                        border: `1px solid ${t.resultColor}30`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: t.resultColor }}
                      />
                      {t.result}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white flex-shrink-0"
                        style={{ background: t.avatarGradient }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">{t.name}</div>
                        <div className="text-xs" style={{ color: '#B0B8D0' }}>
                          {t.role} · {t.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#B0B8D0',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = '#FFFFFF';
                el.style.borderColor = 'rgba(108, 99, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = '#B0B8D0';
                el.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#B0B8D0',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = '#FFFFFF';
                el.style.borderColor = 'rgba(108, 99, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = '#B0B8D0';
                el.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
