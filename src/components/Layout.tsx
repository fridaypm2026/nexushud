import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HudGlowText } from './hud';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/widgets', label: 'Widget Store', icon: '🧩' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg-primary)]">
      {/* Sidebar with HUD styling */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0 md:w-20'
        } transition-all duration-300 bg-[var(--color-bg-secondary)] border-r border-[var(--color-accent-primary)]/30 flex flex-col overflow-hidden relative`}
        style={{
          boxShadow: sidebarOpen ? '0 0 20px rgba(0, 212, 255, 0.1)' : 'none',
        }}
      >
        {/* Animated accent line */}
        <div 
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent-primary)] to-transparent opacity-50"
          style={{ animation: 'pulse 2s ease-in-out infinite' }}
        />
        
        <div className="p-4 border-b border-[var(--color-accent-primary)]/20">
          <HudGlowText 
            size="large" 
            pulse
            className={`text-2xl font-bold ${!sidebarOpen ? 'md:hidden' : ''}`}
          >
            NEXUS HUD
          </HudGlowText>
          {!sidebarOpen && (
            <HudGlowText className="hidden md:block text-2xl text-center">
              N
            </HudGlowText>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? 'bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar with HUD styling */}
        <header 
          className="h-16 bg-[var(--color-bg-secondary)] border-b border-[var(--color-accent-primary)]/30 flex items-center justify-between px-6 relative"
          style={{ boxShadow: '0 2px 20px rgba(0, 212, 255, 0.05)' }}
        >
          {/* Animated accent line */}
          <div 
            className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent-primary)] to-transparent opacity-30"
            style={{ animation: 'pulse 3s ease-in-out infinite' }}
          />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-accent-primary)] rounded-full"></span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-sm font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden md:block text-sm font-medium">
                {user?.username || 'Guest'}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-[var(--color-bg-primary)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
