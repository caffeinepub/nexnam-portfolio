import React from 'react';
import { SiX, SiLinkedin, SiGithub, SiDribbble } from 'react-icons/si';
import { Heart } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: SiX, href: '#', label: 'Twitter/X' },
  { icon: SiLinkedin, href: '#', label: 'LinkedIn' },
  { icon: SiGithub, href: '#', label: 'GitHub' },
  { icon: SiDribbble, href: '#', label: 'Dribbble' },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const appId =
    typeof window !== 'undefined'
      ? encodeURIComponent(window.location.hostname)
      : 'nexnam';
  const caffeineUrl = `https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`;

  return (
    <footer className="relative" style={{ backgroundColor: '#050510' }}>
      {/* Top gradient border */}
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, #6C63FF, #00D4FF, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 mb-4 w-fit"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                  boxShadow: '0 0 15px rgba(108, 99, 255, 0.3)',
                }}
              >
                <span className="text-white font-heading font-bold text-sm">N</span>
              </div>
              <span className="font-heading font-bold text-xl gradient-text">NexNam</span>
            </a>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: '#B0B8D0' }}>
              Building future-ready web applications for startups and digital businesses worldwide.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => e.preventDefault()}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#B0B8D0',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = '#FFFFFF';
                    el.style.borderColor = 'rgba(108, 99, 255, 0.4)';
                    el.style.background = 'rgba(108, 99, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = '#B0B8D0';
                    el.style.borderColor = 'rgba(255,255,255,0.1)';
                    el.style.background = 'rgba(255,255,255,0.05)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Navigation</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-sm transition-colors duration-200 w-fit"
                  style={{ color: '#B0B8D0' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#B0B8D0';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Get In Touch</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@nexnam.io"
                className="text-sm transition-colors duration-200 w-fit"
                style={{ color: '#B0B8D0' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#6C63FF';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#B0B8D0';
                }}
              >
                hello@nexnam.io
              </a>
              <p className="text-sm" style={{ color: '#B0B8D0' }}>
                Available Mon–Fri, 9am–6pm EST
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 w-fit"
                style={{
                  background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                  color: 'white',
                  boxShadow: '0 0 15px rgba(108, 99, 255, 0.3)',
                }}
              >
                Start a Project
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-sm" style={{ color: '#B0B8D0' }}>
            © {new Date().getFullYear()} NexNam. All rights reserved.
          </p>
          <p className="text-sm flex items-center gap-1" style={{ color: '#B0B8D0' }}>
            Built with{' '}
            <Heart size={14} fill="#FF6B6B" style={{ color: '#FF6B6B' }} />{' '}
            using{' '}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors duration-200"
              style={{ color: '#6C63FF' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#00D4FF';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#6C63FF';
              }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
