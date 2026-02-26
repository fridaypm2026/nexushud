/**
 * ProfileDemo.tsx
 * 
 * Demo/example component showing how to use the Profile & Social system
 * This can be imported into your main App to test the profile system
 */

import React, { useState } from 'react';
import { ProfilePage } from './ProfilePage';
import { ProfileEditor } from './ProfileEditor';
import { ThemeCustomizer } from './ThemeCustomizer';
import { ProfileCard } from './ProfileCard';
import type { UserProfile, Friend } from './profileTypes';

export const ProfileDemo: React.FC = () => {
  const [mode, setMode] = useState<'page' | 'editor' | 'theme' | 'cards'>('page');

  // Demo friends for the cards view
  const demoFriends: Friend[] = [
    {
      id: '1',
      username: 'CyberAgent_01',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cyber',
      status: 'Building the metaverse',
      isOnline: true,
    },
    {
      id: '2',
      username: 'NeonDreamer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neon',
      status: 'Coding in the matrix',
      isOnline: true,
    },
    {
      id: '3',
      username: 'QuantumDev',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quantum',
      status: 'Away',
      isOnline: false,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      {/* Navigation */}
      <nav
        style={{
          padding: '1rem 2rem',
          background: 'rgba(10, 10, 15, 0.95)',
          borderBottom: '1px solid #00d4ff',
          display: 'flex',
          gap: '1rem',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <NavButton active={mode === 'page'} onClick={() => setMode('page')}>
          Profile Page
        </NavButton>
        <NavButton active={mode === 'editor'} onClick={() => setMode('editor')}>
          Profile Editor
        </NavButton>
        <NavButton active={mode === 'theme'} onClick={() => setMode('theme')}>
          Theme Customizer
        </NavButton>
        <NavButton active={mode === 'cards'} onClick={() => setMode('cards')}>
          Profile Cards
        </NavButton>
      </nav>

      {/* Content */}
      <div style={{ padding: '2rem 0' }}>
        {mode === 'page' && (
          <ProfilePage onEdit={() => setMode('editor')} />
        )}

        {mode === 'editor' && (
          <ProfileEditor
            onSave={(profile: UserProfile) => {
              console.log('Profile saved:', profile);
              setMode('page');
            }}
            onCancel={() => setMode('page')}
          />
        )}

        {mode === 'theme' && (
          <ThemeCustomizer
            onApply={(theme) => {
              console.log('Theme applied:', theme);
            }}
          />
        )}

        {mode === 'cards' && (
          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              padding: '2rem',
            }}
          >
            <h2
              style={{
                color: '#00d4ff',
                fontSize: '1.5rem',
                marginBottom: '2rem',
                textShadow: '0 0 20px #00d4ff',
              }}
            >
              Profile Cards Demo
            </h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {demoFriends.map((friend) => (
                <ProfileCard
                  key={friend.id}
                  profile={friend}
                  onClick={() => alert(`Viewing ${friend.username}'s profile`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Simple nav button component
const NavButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      padding: '0.75rem 1.5rem',
      background: active ? '#00d4ff' : 'rgba(0, 212, 255, 0.1)',
      border: `1px solid ${active ? '#00d4ff' : 'rgba(0, 212, 255, 0.3)'}`,
      color: active ? '#0a0a0f' : '#00d4ff',
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
    }}
  >
    {children}
  </button>
);

export default ProfileDemo;
