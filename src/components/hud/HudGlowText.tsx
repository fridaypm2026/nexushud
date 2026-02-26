import React from 'react';
import styles from './HudGlowText.module.css';

export interface HudGlowTextProps {
  children: React.ReactNode;
  color?: string;
  pulse?: boolean;
  flicker?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const HudGlowText: React.FC<HudGlowTextProps> = ({
  children,
  color = 'var(--hud-primary)',
  pulse = false,
  flicker = false,
  size = 'medium',
  className = '',
}) => {
  const classes = [
    styles.text,
    styles[size],
    pulse && styles.pulse,
    flicker && styles.flicker,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span 
      className={classes}
      style={{ 
        color,
        textShadow: `
          0 0 10px ${color},
          0 0 20px ${color},
          0 0 30px ${color}
        `,
      }}
    >
      {children}
    </span>
  );
};
