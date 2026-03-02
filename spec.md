# Specification

## Summary
**Goal:** Build NexNam, a futuristic animated single-page portfolio website for a web agency, featuring a dark design system, 3D hero visuals, scroll-triggered animations, and multiple content sections.

**Planned changes:**

- **Design System:** Configure Tailwind with custom color tokens (`#050510` bg, `#6C63FF` primary, `#00D4FF` secondary, `#FF6B6B` accent), CSS custom properties, Space Grotesk headings, Inter body text, and global smooth scroll.
- **Navbar:** Fixed glassmorphism navbar with gradient "NexNam" logo text, anchor nav links (About, Services, Work, Team, Process, Contact), glowing "Start Project" CTA, and a mobile hamburger menu.
- **Hero Section:** Full-viewport section with headline "We Build Future-Ready Web Applications", subheadline, two CTA buttons, a scroll indicator, React Three Fiber animated wireframe icosahedron with floating particles, and Framer Motion staggered text entrance animations.
- **About Section:** Two-column layout with company story text and scroll-triggered animated stat counters (50+ projects, 30+ clients, 3+ years, 100% satisfaction); three glassmorphism cards for Mission, Vision, Core Values; animated horizontal milestone timeline (2022–2025).
- **Services Section:** Headline "What We Build" with five 3D tilt cards (react-parallax-tilt) using glassmorphism, gradient border on hover, and glow — covering Web App Dev, SaaS, UI/UX, AI Integration, Performance & Optimization.
- **Portfolio Section:** Headline "Our Work" with four project cards (FinTech Dashboard, AI SaaS Platform, E-commerce Web App, Healthcare Portal), each featuring a CSS 3D device mockup, tech tags, Problem/Solution/Result summary, hover lift+glow, and "Explore Case Study" CTA.
- **Team Section:** Two side-by-side cards for Alex Morgan (CEO) and Sarah Chen (CTO) with gradient avatar circles, bios, LinkedIn placeholder links, a centered italic vision quote, and radial gradient glow background.
- **Tech Stack Section:** Headline "Powered By Modern Technology" with 15 technology badges (React, Next.js, Node.js, TypeScript, PostgreSQL, MongoDB, AWS, Docker, OpenAI, Stripe, Tailwind, GraphQL, Redis, Kubernetes, Webflow) using staggered CSS float animations and a subtle grid-lines background.
- **Testimonials Section:** Headline "What Our Clients Say" with an Embla Carousel (auto-scroll), 4–5 glassmorphism testimonial cards each showing a colored avatar, quote, name/role/company, 5-star rating, and a measurable result badge.
- **Process Section:** Headline "How We Work" with five steps (Discover → Design → Develop → Launch → Scale), horizontal on desktop / vertical on mobile, animated connecting line fill on scroll via Framer Motion.
- **CTA / Contact Section:** Headline "Let's Build Your Next Big Digital Product" with a React Hook Form contact form (Name, Email, Project Type, Message, validation, success state), a "Book a Strategy Call" button, benefits bullet list, and bold primary-to-secondary gradient background.
- **Footer:** Dark minimal footer with NexNam logo + tagline, nav links, social icons (Twitter, LinkedIn, GitHub, Dribbble), email `hello@nexnam.io`, copyright line, and a top gradient border.
- **Performance:** React.lazy/Suspense for below-fold sections, Three.js canvas only in the hero, Framer Motion `whileInView` for all scroll animations, mobile-first responsive layouts.

**User-visible outcome:** Visitors see a fully animated, responsive dark-themed agency portfolio SPA with a 3D hero, interactive service and portfolio cards, auto-scrolling testimonials, and a working contact form with validation feedback.
