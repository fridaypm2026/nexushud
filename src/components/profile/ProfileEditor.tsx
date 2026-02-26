import React, { useState, useEffect } from 'react';
import styles from './ProfileEditor.module.css';
import type { UserProfile, Theme } from './profileTypes';
import { DEFAULT_PROFILE, STORAGE_KEYS } from './profileTypes';

export interface ProfileEditorProps {
  onSave?: (profile: UserProfile) => void;
  onCancel?: () => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({
  onSave,
  onCancel,
}) => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    // Load existing profile from localStorage
    const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    }
  }, []);

  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleThemeColorChange = (colorField: keyof Theme, value: string) => {
    setProfile((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        [colorField]: value,
      },
    }));
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    onSave?.(profile);
  };

  const handleCancel = () => {
    // Reload from localStorage to discard changes
    const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (error) {
        setProfile(DEFAULT_PROFILE);
      }
    }
    onCancel?.();
  };

  return (
    <div className={styles.editor}>
      <div className={styles.grid}>
        {/* Edit Form */}
        <div className={styles.form}>
          <div className={styles.corners}>
            <div className={`${styles.corner} ${styles.topLeft}`} />
            <div className={`${styles.corner} ${styles.topRight}`} />
            <div className={`${styles.corner} ${styles.bottomLeft}`} />
            <div className={`${styles.corner} ${styles.bottomRight}`} />
          </div>

          <h2 className={styles.formTitle}>Edit Profile</h2>

          {/* Basic Info */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              className={styles.input}
              value={profile.username}
              onChange={(e) => handleChange('username', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Avatar URL</label>
            <input
              type="text"
              className={styles.input}
              value={profile.avatar}
              onChange={(e) => handleChange('avatar', e.target.value)}
              placeholder="https://example.com/avatar.png"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Status Message</label>
            <input
              type="text"
              className={styles.input}
              value={profile.status}
              onChange={(e) => handleChange('status', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Bio</label>
            <textarea
              className={styles.textarea}
              value={profile.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={4}
            />
          </div>

          {/* MySpace Activity Fields */}
          <div className={styles.formGroup}>
            <label className={styles.label}>🎵 Currently Listening</label>
            <input
              type="text"
              className={styles.input}
              value={profile.currentlyListening}
              onChange={(e) => handleChange('currentlyListening', e.target.value)}
              placeholder="Artist - Song Name"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>📺 Currently Watching</label>
            <input
              type="text"
              className={styles.input}
              value={profile.currentlyWatching}
              onChange={(e) => handleChange('currentlyWatching', e.target.value)}
              placeholder="Movie or TV Show"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>🎮 Currently Playing</label>
            <input
              type="text"
              className={styles.input}
              value={profile.currentlyPlaying}
              onChange={(e) => handleChange('currentlyPlaying', e.target.value)}
              placeholder="Game Title"
            />
          </div>

          {/* Banner Gradient */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Banner Gradient (CSS)</label>
            <input
              type="text"
              className={styles.input}
              value={profile.bannerGradient}
              onChange={(e) => handleChange('bannerGradient', e.target.value)}
              placeholder="linear-gradient(135deg, #0a0a0f 0%, #00d4ff 100%)"
            />
          </div>

          {/* Theme Colors */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Theme Colors</label>
            <div className={styles.colorPickers}>
              <div className={styles.colorPicker}>
                <label className={styles.label}>Primary</label>
                <input
                  type="color"
                  className={styles.colorInput}
                  value={profile.theme.primary}
                  onChange={(e) => handleThemeColorChange('primary', e.target.value)}
                />
                <span className={styles.colorValue}>{profile.theme.primary}</span>
              </div>

              <div className={styles.colorPicker}>
                <label className={styles.label}>Secondary</label>
                <input
                  type="color"
                  className={styles.colorInput}
                  value={profile.theme.secondary}
                  onChange={(e) => handleThemeColorChange('secondary', e.target.value)}
                />
                <span className={styles.colorValue}>{profile.theme.secondary}</span>
              </div>

              <div className={styles.colorPicker}>
                <label className={styles.label}>Accent</label>
                <input
                  type="color"
                  className={styles.colorInput}
                  value={profile.theme.accent}
                  onChange={(e) => handleThemeColorChange('accent', e.target.value)}
                />
                <span className={styles.colorValue}>{profile.theme.accent}</span>
              </div>

              <div className={styles.colorPicker}>
                <label className={styles.label}>Background</label>
                <input
                  type="color"
                  className={styles.colorInput}
                  value={profile.theme.background}
                  onChange={(e) => handleThemeColorChange('background', e.target.value)}
                />
                <span className={styles.colorValue}>{profile.theme.background}</span>
              </div>

              <div className={styles.colorPicker}>
                <label className={styles.label}>Text</label>
                <input
                  type="color"
                  className={styles.colorInput}
                  value={profile.theme.textColor}
                  onChange={(e) => handleThemeColorChange('textColor', e.target.value)}
                />
                <span className={styles.colorValue}>{profile.theme.textColor}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.buttons}>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={handleSave}
            >
              Save Changes
            </button>
            <button className={styles.button} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div className={styles.preview}>
          <div className={styles.corners}>
            <div className={`${styles.corner} ${styles.topLeft}`} />
            <div className={`${styles.corner} ${styles.topRight}`} />
            <div className={`${styles.corner} ${styles.bottomLeft}`} />
            <div className={`${styles.corner} ${styles.bottomRight}`} />
          </div>

          <h3 className={styles.previewTitle}>Live Preview</h3>

          {/* Preview Banner */}
          <div
            className={styles.previewBanner}
            style={{ background: profile.bannerGradient }}
          >
            <img
              src={profile.avatar}
              alt={profile.username}
              className={styles.previewAvatar}
            />
          </div>

          {/* Preview Content */}
          <div className={styles.previewContent}>
            <h2 className={styles.previewUsername}>{profile.username}</h2>
            <p className={styles.previewStatus}>{profile.status}</p>
            <p className={styles.previewBio}>{profile.bio}</p>

            {/* Preview Activities */}
            {profile.currentlyListening && (
              <div className={styles.previewActivity}>
                <span>🎵</span>
                <span className={styles.previewActivityLabel}>Listening:</span>
                <span className={styles.previewActivityText}>
                  {profile.currentlyListening}
                </span>
              </div>
            )}

            {profile.currentlyWatching && (
              <div className={styles.previewActivity}>
                <span>📺</span>
                <span className={styles.previewActivityLabel}>Watching:</span>
                <span className={styles.previewActivityText}>
                  {profile.currentlyWatching}
                </span>
              </div>
            )}

            {profile.currentlyPlaying && (
              <div className={styles.previewActivity}>
                <span>🎮</span>
                <span className={styles.previewActivityLabel}>Playing:</span>
                <span className={styles.previewActivityText}>
                  {profile.currentlyPlaying}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
