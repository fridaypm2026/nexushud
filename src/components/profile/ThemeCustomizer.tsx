import React, { useState, useEffect } from 'react';
import styles from './ThemeCustomizer.module.css';
import type { Theme } from './profileTypes';
import { PRESET_THEMES, STORAGE_KEYS } from './profileTypes';

export interface ThemeCustomizerProps {
  onApply?: (theme: Theme) => void;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ onApply }) => {
  const [activeTheme, setActiveTheme] = useState<Theme>(PRESET_THEMES[0]);
  const [customTheme, setCustomTheme] = useState<Theme>({
    id: 'custom',
    name: 'Custom Theme',
    primary: '#00d4ff',
    secondary: '#0088cc',
    accent: '#00ffff',
    background: '#0a0a0f',
    textColor: '#e0e0e0',
  });
  const [savedThemes, setSavedThemes] = useState<Theme[]>([]);

  useEffect(() => {
    // Load custom themes from localStorage
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_THEMES);
    if (saved) {
      try {
        setSavedThemes(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load custom themes:', error);
      }
    }

    // Load active theme
    const activeThemeData = localStorage.getItem(STORAGE_KEYS.THEME);
    if (activeThemeData) {
      try {
        setActiveTheme(JSON.parse(activeThemeData));
      } catch (error) {
        console.error('Failed to load active theme:', error);
      }
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    setActiveTheme(theme);
    
    // Apply CSS variables globally
    const root = document.documentElement;
    root.style.setProperty('--hud-primary', theme.primary);
    root.style.setProperty('--hud-secondary', theme.secondary);
    root.style.setProperty('--hud-accent', theme.accent);
    root.style.setProperty('--hud-background', theme.background);
    root.style.setProperty('--hud-text', theme.textColor);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(theme));
    
    onApply?.(theme);
  };

  const handlePresetClick = (theme: Theme) => {
    applyTheme(theme);
    setCustomTheme(theme);
  };

  const handleCustomColorChange = (field: keyof Theme, value: string) => {
    setCustomTheme((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyCustom = () => {
    applyTheme(customTheme);
  };

  const handleSaveCustom = () => {
    const newTheme = {
      ...customTheme,
      id: `custom-${Date.now()}`,
    };
    
    const updated = [...savedThemes, newTheme];
    setSavedThemes(updated);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_THEMES, JSON.stringify(updated));
    
    alert(`Theme "${newTheme.name}" saved!`);
  };

  const handleLoadCustom = (theme: Theme) => {
    setCustomTheme(theme);
    applyTheme(theme);
  };

  const handleDeleteCustom = (themeId: string) => {
    if (confirm('Delete this custom theme?')) {
      const updated = savedThemes.filter((t) => t.id !== themeId);
      setSavedThemes(updated);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_THEMES, JSON.stringify(updated));
    }
  };

  return (
    <div className={styles.customizer}>
      <div className={styles.grid}>
        {/* Main Panel */}
        <div>
          {/* Preset Themes */}
          <div className={styles.panel}>
            <div className={styles.corners}>
              <div className={`${styles.corner} ${styles.topLeft}`} />
              <div className={`${styles.corner} ${styles.topRight}`} />
              <div className={`${styles.corner} ${styles.bottomLeft}`} />
              <div className={`${styles.corner} ${styles.bottomRight}`} />
            </div>

            <h2 className={styles.title}>Theme Customizer</h2>

            <h3 className={styles.sectionTitle}>Preset Themes</h3>
            <div className={styles.presets}>
              {PRESET_THEMES.map((theme) => (
                <div
                  key={theme.id}
                  className={`${styles.preset} ${
                    activeTheme.id === theme.id ? styles.active : ''
                  }`}
                  onClick={() => handlePresetClick(theme)}
                >
                  <div className={styles.presetColors}>
                    <div
                      className={styles.presetColor}
                      style={{ background: theme.primary }}
                    />
                    <div
                      className={styles.presetColor}
                      style={{ background: theme.secondary }}
                    />
                    <div
                      className={styles.presetColor}
                      style={{ background: theme.accent }}
                    />
                  </div>
                  <span className={styles.presetName}>{theme.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Theme Builder */}
          <div className={`${styles.panel} ${styles.customBuilder}`}>
            <div className={styles.corners}>
              <div className={`${styles.corner} ${styles.topLeft}`} />
              <div className={`${styles.corner} ${styles.topRight}`} />
              <div className={`${styles.corner} ${styles.bottomLeft}`} />
              <div className={`${styles.corner} ${styles.bottomRight}`} />
            </div>

            <h3 className={styles.sectionTitle}>Custom Theme Builder</h3>

            <input
              type="text"
              className={styles.nameInput}
              placeholder="Theme Name"
              value={customTheme.name}
              onChange={(e) =>
                setCustomTheme((prev) => ({ ...prev, name: e.target.value }))
              }
            />

            <div className={styles.colorGrid}>
              <div className={styles.colorField}>
                <label className={styles.label}>Primary Color</label>
                <input
                  type="color"
                  className={styles.colorInput}
                  value={customTheme.primary}
                  onChange={(e) =>
                    handleCustomColorChange('primary', e.target.value)
                  }
                />
                <span className={styles.colorValue}>{customTheme.primary}</span>
              </div>

              <div className={styles.colorField}>
                <label className={styles.label}>Secondary Color</label>
                <input
                  type="color"
                  className={styles.colorInput}
                  value={customTheme.secondary}
                  onChange={(e) =>
                    handleCustomColorChange('secondary', e.target.value)
                  }
                />
                <span className={styles.colorValue}>{customTheme.secondary}</span>
              </div>

              <div className={styles.colorField}>
                <label className={styles.label}>Accent Color</label>
                <input
                  type="color"
                  className={styles.colorInput}
                  value={customTheme.accent}
                  onChange={(e) =>
                    handleCustomColorChange('accent', e.target.value)
                  }
                />
                <span className={styles.colorValue}>{customTheme.accent}</span>
              </div>

              <div className={styles.colorField}>
                <label className={styles.label}>Background</label>
                <input
                  type="color"
                  className={styles.colorInput}
                  value={customTheme.background}
                  onChange={(e) =>
                    handleCustomColorChange('background', e.target.value)
                  }
                />
                <span className={styles.colorValue}>{customTheme.background}</span>
              </div>

              <div className={styles.colorField}>
                <label className={styles.label}>Text Color</label>
                <input
                  type="color"
                  className={styles.colorInput}
                  value={customTheme.textColor}
                  onChange={(e) =>
                    handleCustomColorChange('textColor', e.target.value)
                  }
                />
                <span className={styles.colorValue}>{customTheme.textColor}</span>
              </div>
            </div>

            <div className={styles.buttons}>
              <button
                className={`${styles.button} ${styles.buttonPrimary}`}
                onClick={handleApplyCustom}
              >
                Apply Theme
              </button>
              <button
                className={`${styles.button} ${styles.buttonSuccess}`}
                onClick={handleSaveCustom}
              >
                Save Theme
              </button>
            </div>
          </div>

          {/* Saved Custom Themes */}
          {savedThemes.length > 0 && (
            <div className={`${styles.panel} ${styles.savedThemes}`}>
              <div className={styles.corners}>
                <div className={`${styles.corner} ${styles.topLeft}`} />
                <div className={`${styles.corner} ${styles.topRight}`} />
                <div className={`${styles.corner} ${styles.bottomLeft}`} />
                <div className={`${styles.corner} ${styles.bottomRight}`} />
              </div>

              <h3 className={styles.sectionTitle}>Saved Custom Themes</h3>
              
              <div className={styles.savedThemesList}>
                {savedThemes.map((theme) => (
                  <div key={theme.id} className={styles.savedTheme}>
                    <div className={styles.savedThemeColors}>
                      <div
                        className={styles.savedThemeColor}
                        style={{ background: theme.primary }}
                      />
                      <div
                        className={styles.savedThemeColor}
                        style={{ background: theme.secondary }}
                      />
                      <div
                        className={styles.savedThemeColor}
                        style={{ background: theme.accent }}
                      />
                    </div>
                    <span className={styles.savedThemeName}>{theme.name}</span>
                    <div className={styles.savedThemeActions}>
                      <button
                        className={styles.iconButton}
                        onClick={() => handleLoadCustom(theme)}
                        title="Load theme"
                      >
                        ↻
                      </button>
                      <button
                        className={`${styles.iconButton} ${styles.danger}`}
                        onClick={() => handleDeleteCustom(theme.id)}
                        title="Delete theme"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Preview */}
        <div className={styles.preview}>
          <div className={`${styles.panel} ${styles.previewPanel}`}>
            <div className={styles.corners}>
              <div className={`${styles.corner} ${styles.topLeft}`} />
              <div className={`${styles.corner} ${styles.topRight}`} />
              <div className={`${styles.corner} ${styles.bottomLeft}`} />
              <div className={`${styles.corner} ${styles.bottomRight}`} />
            </div>

            <h3
              className={styles.previewTitle}
              style={{ color: customTheme.primary }}
            >
              Live Preview
            </h3>

            <div
              className={styles.previewSample}
              style={{
                background: customTheme.background,
                border: `1px solid ${customTheme.primary}`,
              }}
            >
              <h2
                className={styles.previewHeading}
                style={{
                  color: customTheme.primary,
                  textShadow: `0 0 20px ${customTheme.primary}`,
                }}
              >
                NexusHUD
              </h2>
              <p
                className={styles.previewText}
                style={{ color: customTheme.textColor }}
              >
                This is how your theme will look across the dashboard. The primary
                color creates the signature glow effect, while the accent adds
                visual interest.
              </p>
              <button
                className={styles.previewButton}
                style={{
                  background: `rgba(${hexToRgb(customTheme.primary)}, 0.2)`,
                  border: `1px solid ${customTheme.primary}`,
                  color: customTheme.primary,
                }}
              >
                Sample Button
              </button>
            </div>

            <div className={styles.previewColors}>
              <div
                className={styles.previewColorSwatch}
                style={{ background: customTheme.primary }}
              >
                PRI
              </div>
              <div
                className={styles.previewColorSwatch}
                style={{ background: customTheme.secondary }}
              >
                SEC
              </div>
              <div
                className={styles.previewColorSwatch}
                style={{ background: customTheme.accent }}
              >
                ACC
              </div>
              <div
                className={styles.previewColorSwatch}
                style={{ background: customTheme.background }}
              >
                BG
              </div>
              <div
                className={styles.previewColorSwatch}
                style={{ background: customTheme.textColor }}
              >
                TXT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : '0, 212, 255';
}
