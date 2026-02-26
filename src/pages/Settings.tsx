import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAllWidgets } from '../components/widgets/widgetRegistry';
import { AiSettings } from '../components/settings';
import { HudGlowText } from '../components/hud';

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [visibleWidgets, setVisibleWidgets] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState<'general' | 'ai' | 'widgets'>('general');
  const allWidgets = getAllWidgets();

  useEffect(() => {
    const saved = localStorage.getItem('nexushud-widget-visibility');
    if (saved) {
      try {
        setVisibleWidgets(JSON.parse(saved));
      } catch {
        const defaults: Record<string, boolean> = {};
        allWidgets.forEach(w => defaults[w.id] = true);
        setVisibleWidgets(defaults);
      }
    } else {
      const defaults: Record<string, boolean> = {};
      allWidgets.forEach(w => defaults[w.id] = true);
      setVisibleWidgets(defaults);
    }
  }, []);

  const toggleWidgetVisibility = (widgetId: string) => {
    const updated = { ...visibleWidgets, [widgetId]: !visibleWidgets[widgetId] };
    setVisibleWidgets(updated);
    localStorage.setItem('nexushud-widget-visibility', JSON.stringify(updated));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sections = [
    { id: 'general' as const, label: 'General', icon: '⚙️' },
    { id: 'ai' as const, label: 'AI Models', icon: '🤖' },
    { id: 'widgets' as const, label: 'Widgets', icon: '🧩' },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold">
        <HudGlowText>Settings</HudGlowText>
      </h1>

      {/* Section tabs */}
      <div className="flex gap-2">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSection === s.id
                ? 'bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
            }`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeSection === 'general' && (
        <>
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">Enable desktop notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[var(--color-bg-tertiary)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-accent-primary)]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">HUD Overlay</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">Show corner brackets and scan line</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-[var(--color-bg-tertiary)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-accent-primary)]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Compact Mode</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">Reduce spacing and padding</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[var(--color-bg-tertiary)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-accent-primary)]"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-bg-secondary)] border border-red-500/30 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-400">Danger Zone</h2>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Logout
            </button>
          </div>
        </>
      )}

      {/* AI Settings */}
      {activeSection === 'ai' && <AiSettings />}

      {/* Widget Visibility */}
      {activeSection === 'widgets' && (
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Widget Visibility</h2>
          <p className="text-[var(--color-text-secondary)] mb-4">Show or hide widgets on your dashboard.</p>
          <div className="space-y-3">
            {allWidgets.map((widget) => (
              <div key={widget.id} className="flex items-center justify-between p-3 bg-[var(--color-bg-tertiary)] rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{widget.icon}</span>
                  <span className="font-medium">{widget.name}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={visibleWidgets[widget.id] !== false}
                    onChange={() => toggleWidgetVisibility(widget.id)}
                  />
                  <div className="w-11 h-6 bg-[var(--color-bg-primary)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-accent-primary)]"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
