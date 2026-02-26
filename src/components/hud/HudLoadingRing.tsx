import React from 'react';
import styles from './HudLoadingRing.module.css';

export interface HudLoadingRingProps {
  size?: number; // diameter in pixels
  color?: string;
  className?: string;
}

export const HudLoadingRing: React.FC<HudLoadingRingProps> = ({
  size = 60,
  color = 'var(--hud-primary)',
  className = '',
}) => {
  return (
    <div 
      className={`${styles.ring} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg className={styles.svg} viewBox="0 0 100 100">
        {/* Outer rotating ring */}
        <circle
          className={styles.outer}
          cx="50"
          cy="50"
          r="45"
          style={{ stroke: color }}
        />
        
        {/* Middle ring */}
        <circle
          className={styles.middle}
          cx="50"
          cy="50"
          r="35"
          style={{ stroke: color }}
        />
        
        {/* Inner core */}
        <circle
          className={styles.core}
          cx="50"
          cy="50"
          r="20"
          style={{ fill: color }}
        />
        
        {/* Arc reactor arcs */}
        <circle
          className={styles.arc}
          cx="50"
          cy="50"
          r="28"
          style={{ stroke: color }}
        />
      </svg>
    </div>
  );
};
