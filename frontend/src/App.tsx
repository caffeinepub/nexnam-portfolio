import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';

// ─── Public site sections ───────────────────────────────────────────────────
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import TeamSection from './components/TeamSection';
import CTASection from './components/CTASection';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

function isAdminRoute() {
  return window.location.pathname.startsWith('/admin');
}

function PublicSite() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <TeamSection />
      <CTASection />
      <footer className="bg-card border-t border-border py-8 px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} NexNam Digital. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Built with ❤️ using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'nexnam-digital')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

function AppRouter() {
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (path.startsWith('/admin')) {
    return (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    );
  }

  return <PublicSite />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster />
    </QueryClientProvider>
  );
}
