import React from 'react';
import styles from './ProfileCard.module.css';
import type { Friend, UserProfile } from './profileTypes';

export interface ProfileCardProps {
  profile: Friend | UserProfile;
  onClick?: () => void;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onClick,
  className = '',
}) => {
  return (
    <div className={`${styles.card} ${className}`} onClick={onClick}>
      {/* Corner decorations */}
      <div className={`${styles.corner} ${styles.topLeft}`} />
      <div className={`${styles.corner} ${styles.bottomRight}`} />
      
      {/* Avatar with online indicator */}
      <div className={styles.avatarContainer}>
        <img
          src={profile.avatar}
          alt={profile.username}
          className={styles.avatar}
        />
        <div
          className={`${styles.onlineIndicator} ${
            profile.isOnline ? styles.online : styles.offline
          }`}
        />
      </div>
      
      {/* User info */}
      <div className={styles.info}>
        <h4 className={styles.username}>{profile.username}</h4>
        <p className={styles.status}>{profile.status}</p>
      </div>
    </div>
  );
};
