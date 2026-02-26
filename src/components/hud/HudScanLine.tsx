import React from 'react';
import styles from './HudScanLine.module.css';

export interface HudScanLineProps {
  speed?: 'slow' | 'normal' | 'fast';
  color?: string;
  height?: number; // height of the scan line in pixels
  opacity?: number; // 0-1
  className?: string;
}

export const HudScanLine: React.FC<HudScanLineProps> = ({
  speed = 'normal',
  color = 'var(--hud-primary)',
  height = 2,
  opacity = 0.6,
  className = '',
}) => {
  const duration = {
    slow: '4s',
    normal: '2s',
    fast: '1s',
  }[speed];

  return (
    <div 
      className={`${styles.scanline} ${className}`}
      style={{
        background: `linear-gradient(to bottom, 
          transparent, 
          ${color} 50%, 
          transparent
        )`,
        height: `${height}px`,
        opacity,
        animationDuration: duration,
      }}
    />
  );
};
