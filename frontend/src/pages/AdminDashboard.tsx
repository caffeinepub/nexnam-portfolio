import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import FounderEditor from '../components/admin/FounderEditor';
import ProjectsManager from '../components/admin/ProjectsManager';
import ServicesManager from '../components/admin/ServicesManager';
import ContactSubmissions from '../components/admin/ContactSubmissions';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  User, FolderOpen, Layers, Mail, LogOut, LayoutDashboard, Menu, X, ExternalLink
} from 'lucide-react';

type Section = 'founder' | 'projects' | 'services' | 'contacts';

const navItems: { id: Section; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'founder', label: 'Founder', icon: <User className="w-4 h-4" />, description: 'Edit founder profile' },
  { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-4 h-4" />, description: 'Manage portfolio' },
  { id: 'services', label: 'Services', icon: <Layers className="w-4 h-4" />, description: 'Manage services' },
  { id: 'contacts', label: 'Contacts', icon: <Mail className="w-4 h-4" />, description: 'View submissions' },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('founder');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentNav = navItems.find(n => n.id === activeSection);

  const renderSection = () => {
    switch (activeSection) {
      case 'founder': return <FounderEditor />;
      case 'projects': return <ProjectsManager />;
      case 'services': return <ServicesManager />;
      case 'contacts': return <ContactSubmissions />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-30 flex flex-col
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-display font-bold text-foreground text-sm">Admin Panel</p>
              <p className="text-xs text-muted-foreground">NexNam Digital</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all
                ${activeSection === item.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              {item.icon}
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className={`text-xs ${activeSection === item.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all w-full"
          >
            <ExternalLink className="w-4 h-4" />
            View Website
          </a>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="w-full justify-start gap-2 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border px-4 lg:px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <div>
            <h1 className="font-display font-bold text-foreground text-lg">{currentNav?.label}</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">{currentNav?.description}</p>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
