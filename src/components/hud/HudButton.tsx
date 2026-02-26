import React from 'react';
import styles from './HudButton.module.css';

export interface HudButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
  className?: string;
}

export const HudButton: React.FC<HudButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.scanline} />
      <span className={styles.content}>{children}</span>
      <span className={styles.glow} />
    </button>
  );
};
