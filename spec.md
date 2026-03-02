# Specification

## Summary
**Goal:** Add an integrated admin panel and connect public-facing site sections to a persistent backend so site content can be managed dynamically.

**Planned changes:**
- Add a Motoko backend actor with stable storage for founder info, portfolio projects, services, and contact form submissions; expose query and update functions plus a hardcoded admin authentication check (username: admin, password: Nikhil@123)
- Add a `/admin` route in the existing SPA with a login screen gating access to a dashboard
- Admin dashboard includes tabbed/sidebar sections for: editing founder info (name, title, bio, photo URL), managing projects (add/edit/delete), managing services (add/edit/delete), and viewing contact form submissions
- Update `TeamSection`, `PortfolioSection`, `ServicesSection`, and `CTASection` to fetch content from the backend actor instead of using hardcoded static data
- Show loading states in public-facing sections while data is being fetched
- Contact form submissions in `CTASection` are saved via a backend call and viewable in the admin panel

**User-visible outcome:** Admins can navigate to `/admin`, log in, and manage all site content (founder info, projects, services) which immediately reflects on the public-facing portfolio site; contact form submissions are also stored and viewable in the admin panel.
