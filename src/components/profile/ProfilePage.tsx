import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import { ProfileCard } from './ProfileCard';
import type { UserProfile } from './profileTypes';
import { DEFAULT_PROFILE, STORAGE_KEYS } from './profileTypes';

export interface ProfilePageProps {
  onEdit?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onEdit: _onEdit }) => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      {/* Banner with Avatar */}
      <div className={styles.banner} style={{ background: profile.bannerGradient }}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarWrapper}>
            <img
              src={profile.avatar}
              alt={profile.username}
              className={styles.avatar}
            />
            {profile.isOnline && <div className={styles.onlineBadge} />}
          </div>
          <div className={styles.userInfo}>
            <h1>{profile.username}</h1>
            <p>{profile.status}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Left Column: Profile Details */}
        <div>
          {/* About Section */}
          <section className={styles.profileSection}>
            <div className={styles.corners}>
              <div className={`${styles.corner} ${styles.topLeft}`} />
              <div className={`${styles.corner} ${styles.topRight}`} />
              <div className={`${styles.corner} ${styles.bottomLeft}`} />
              <div className={`${styles.corner} ${styles.bottomRight}`} />
            </div>
            
            <h2 className={styles.sectionTitle}>About Me</h2>
            <p className={styles.bio}>{profile.bio}</p>

            {/* MySpace-style Activity Fields */}
            <div className={styles.activities}>
              <div className={styles.activity}>
                <span className={styles.activityIcon}>🎵</span>
                <div className={styles.activityContent}>
                  <span className={styles.activityLabel}>Currently Listening</span>
                  <span className={styles.activityText}>
                    {profile.currentlyListening || 'Nothing right now'}
                  </span>
                </div>
              </div>

              <div className={styles.activity}>
                <span className={styles.activityIcon}>📺</span>
                <div className={styles.activityContent}>
                  <span className={styles.activityLabel}>Currently Watching</span>
                  <span className={styles.activityText}>
                    {profile.currentlyWatching || 'Nothing right now'}
                  </span>
                </div>
              </div>

              <div className={styles.activity}>
                <span className={styles.activityIcon}>🎮</span>
                <div className={styles.activityContent}>
                  <span className={styles.activityLabel}>Currently Playing</span>
                  <span className={styles.activityText}>
                    {profile.currentlyPlaying || 'Nothing right now'}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <h3 className={styles.sectionTitle}>Stats</h3>
            <div className={styles.stats}>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{profile.stats.widgetsCreated}</span>
                <span className={styles.statLabel}>Widgets Created</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{profile.stats.daysActive}</span>
                <span className={styles.statLabel}>Days Active</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{profile.stats.themeDownloads}</span>
                <span className={styles.statLabel}>Theme Downloads</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{profile.stats.profileViews}</span>
                <span className={styles.statLabel}>Profile Views</span>
              </div>
            </div>
          </section>

          {/* Top 8 Friends (MySpace!) */}
          <section className={styles.profileSection} style={{ marginTop: '2rem' }}>
            <div className={styles.corners}>
              <div className={`${styles.corner} ${styles.topLeft}`} />
              <div className={`${styles.corner} ${styles.topRight}`} />
              <div className={`${styles.corner} ${styles.bottomLeft}`} />
              <div className={`${styles.corner} ${styles.bottomRight}`} />
            </div>
            
            <h2 className={styles.sectionTitle}>Top 8 Friends</h2>
            
            {profile.topFriends.length > 0 ? (
              <div className={styles.friendsGrid}>
                {profile.topFriends.slice(0, 8).map((friend) => (
                  <div key={friend.id} className={styles.friendCard}>
                    <img
                      src={friend.avatar}
                      alt={friend.username}
                      className={styles.friendAvatar}
                    />
                    <div className={styles.friendName}>{friend.username}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center', padding: '2rem' }}>
                No friends added yet. Start connecting!
              </p>
            )}
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className={styles.sidebar}>
          {/* Visitor Counter */}
          <div className={styles.visitorCounter}>
            <div className={styles.corners}>
              <div className={`${styles.corner} ${styles.topLeft}`} />
              <div className={`${styles.corner} ${styles.topRight}`} />
              <div className={`${styles.corner} ${styles.bottomLeft}`} />
              <div className={`${styles.corner} ${styles.bottomRight}`} />
            </div>
            <span className={styles.counterValue}>
              {profile.visitorCount.toLocaleString()}
            </span>
            <span className={styles.counterLabel}>Profile Visitors</span>
          </div>

          {/* Recent Activity / Online Friends */}
          <section className={styles.profileSection}>
            <div className={styles.corners}>
              <div className={`${styles.corner} ${styles.topLeft}`} />
              <div className={`${styles.corner} ${styles.topRight}`} />
              <div className={`${styles.corner} ${styles.bottomLeft}`} />
              <div className={`${styles.corner} ${styles.bottomRight}`} />
            </div>
            
            <h3 className={styles.sectionTitle}>Online Friends</h3>
            
            {profile.topFriends.filter(f => f.isOnline).length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {profile.topFriends
                  .filter(f => f.isOnline)
                  .slice(0, 5)
                  .map((friend) => (
                    <ProfileCard key={friend.id} profile={friend} />
                  ))}
              </div>
            ) : (
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center', padding: '1rem' }}>
                No friends online
              </p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
};
