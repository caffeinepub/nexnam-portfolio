import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { useInView } from '../hooks/useInView';

function AnimatedSection({
  children,
  delay = 0,
  className = '',
  direction = 'up' as 'up' | 'left' | 'right',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}) {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });
  const getTransform = () => {
    if (!isInView) {
      if (direction === 'left') return 'translateX(-30px)';
      if (direction === 'right') return 'translateX(30px)';
      return 'translateY(40px)';
    }
    return 'translate(0)';
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

interface FormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

const benefits = [
  'Free 30-minute strategy consultation',
  'Technical feasibility assessment',
  'Custom project roadmap & timeline',
  'Transparent pricing with no hidden fees',
  'Dedicated project manager from day one',
];

export default function CTASection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (_data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitted(true);
    reset();
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(5, 5, 16, 0.95) 40%, rgba(0, 212, 255, 0.1) 100%)',
          backgroundColor: '#050510',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(108, 99, 255, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection delay={0}>
            <span className="inline-block font-medium text-sm tracking-widest uppercase mb-4" style={{ color: '#6C63FF' }}>
              Get Started
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 max-w-3xl mx-auto">
              Let's Build Your Next Big{' '}
              <span className="gradient-text">Digital Product</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#B0B8D0' }}>
              Partner with NexNam to transform your vision into a high-performance digital reality.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <AnimatedSection delay={0.1} direction="left">
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(108, 99, 255, 0.2)',
              }}
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{
                      background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                      boxShadow: '0 0 30px rgba(108, 99, 255, 0.4)',
                    }}
                  >
                    <CheckCircle size={36} className="text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white mb-3">Message Sent!</h3>
                  <p className="mb-6" style={{ color: '#B0B8D0' }}>
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setIsSubmitted(false)} className="btn-outline text-sm">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="font-heading font-bold text-xl text-white mb-6">
                    Tell Us About Your Project
                  </h3>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D0' }}>
                      Full Name <span style={{ color: '#FF6B6B' }}>*</span>
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      placeholder="John Smith"
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-200"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: errors.name ? '1px solid #FF6B6B' : '1px solid rgba(255,255,255,0.1)',
                      }}
                      onFocus={(e) => {
                        if (!errors.name)
                          (e.target as HTMLInputElement).style.borderColor = 'rgba(108, 99, 255, 0.5)';
                      }}
                      onBlur={(e) => {
                        if (!errors.name)
                          (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)';
                      }}
                    />
                    {errors.name && (
                      <p className="text-xs mt-1" style={{ color: '#FF6B6B' }}>
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D0' }}>
                      Email Address <span style={{ color: '#FF6B6B' }}>*</span>
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-200"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: errors.email ? '1px solid #FF6B6B' : '1px solid rgba(255,255,255,0.1)',
                      }}
                      onFocus={(e) => {
                        if (!errors.email)
                          (e.target as HTMLInputElement).style.borderColor = 'rgba(108, 99, 255, 0.5)';
                      }}
                      onBlur={(e) => {
                        if (!errors.email)
                          (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)';
                      }}
                    />
                    {errors.email && (
                      <p className="text-xs mt-1" style={{ color: '#FF6B6B' }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D0' }}>
                      Project Type <span style={{ color: '#FF6B6B' }}>*</span>
                    </label>
                    <select
                      {...register('projectType', { required: 'Please select a project type' })}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none appearance-none cursor-pointer"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: errors.projectType
                          ? '1px solid #FF6B6B'
                          : '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                      }}
                    >
                      <option value="" style={{ backgroundColor: '#0a0a1a' }}>
                        Select project type...
                      </option>
                      <option value="web-app" style={{ backgroundColor: '#0a0a1a' }}>
                        Custom Web Application
                      </option>
                      <option value="saas" style={{ backgroundColor: '#0a0a1a' }}>
                        SaaS Product
                      </option>
                      <option value="ui-ux" style={{ backgroundColor: '#0a0a1a' }}>
                        UI/UX Design
                      </option>
                      <option value="ai" style={{ backgroundColor: '#0a0a1a' }}>
                        AI Integration
                      </option>
                      <option value="optimization" style={{ backgroundColor: '#0a0a1a' }}>
                        Performance Optimization
                      </option>
                      <option value="other" style={{ backgroundColor: '#0a0a1a' }}>
                        Other
                      </option>
                    </select>
                    {errors.projectType && (
                      <p className="text-xs mt-1" style={{ color: '#FF6B6B' }}>
                        {errors.projectType.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D0' }}>
                      Project Details <span style={{ color: '#FF6B6B' }}>*</span>
                    </label>
                    <textarea
                      {...register('message', {
                        required: 'Please describe your project',
                        minLength: {
                          value: 20,
                          message: 'Please provide more details (min 20 characters)',
                        },
                      })}
                      rows={4}
                      placeholder="Tell us about your project, goals, timeline, and budget..."
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none resize-none transition-all duration-200"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: errors.message ? '1px solid #FF6B6B' : '1px solid rgba(255,255,255,0.1)',
                      }}
                      onFocus={(e) => {
                        if (!errors.message)
                          (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(108, 99, 255, 0.5)';
                      }}
                      onBlur={(e) => {
                        if (!errors.message)
                          (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.1)';
                      }}
                    />
                    {errors.message && (
                      <p className="text-xs mt-1" style={{ color: '#FF6B6B' }}>
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div
                          className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                          style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'transparent' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Send Message
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* Right Side */}
          <AnimatedSection delay={0.2} direction="right" className="flex flex-col gap-8">
            {/* Strategy Call CTA */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(108, 99, 255, 0.2))',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                }}
              >
                <Phone size={24} style={{ color: '#00D4FF' }} />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-3">Book a Strategy Call</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#B0B8D0' }}>
                Prefer to talk? Schedule a free 30-minute call with our founders to discuss your project
                and explore how we can help.
              </p>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200"
                style={{
                  border: '1px solid rgba(0, 212, 255, 0.4)',
                  color: '#00D4FF',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'rgba(0, 212, 255, 0.1)';
                  el.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'transparent';
                  el.style.boxShadow = 'none';
                }}
              >
                <Phone size={16} />
                Schedule Free Call
              </a>
            </div>

            {/* Benefits */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h3 className="font-heading font-bold text-lg text-white mb-5">What You Get</h3>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle size={18} style={{ color: '#6C63FF', flexShrink: 0, marginTop: '2px' }} />
                    <span className="text-sm" style={{ color: '#B0B8D0' }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="text-center">
              <p className="text-sm" style={{ color: '#B0B8D0' }}>
                Or email us directly at{' '}
                <a
                  href="mailto:hello@nexnam.io"
                  className="font-semibold gradient-text hover:opacity-80 transition-opacity"
                >
                  hello@nexnam.io
                </a>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
