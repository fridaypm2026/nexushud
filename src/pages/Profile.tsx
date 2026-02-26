import { useState } from 'react';
import { ProfilePage, ProfileEditor, ThemeCustomizer } from '../components/profile';
import { HudGlowText } from '../components/hud';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'view' | 'edit' | 'themes'>('view');

  const tabs = [
    { id: 'view' as const, label: 'My Profile', icon: '👤' },
    { id: 'edit' as const, label: 'Edit Profile', icon: '✏️' },
    { id: 'themes' as const, label: 'Themes', icon: '🎨' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <HudGlowText>Profile</HudGlowText>
        </h1>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'view' && <ProfilePage />}
      {activeTab === 'edit' && <ProfileEditor />}
      {activeTab === 'themes' && <ThemeCustomizer />}
    </div>
  );
};

export default Profile;
