import React from 'react';
import styles from './HudCircularGauge.module.css';

export interface HudCircularGaugeProps {
  value: number; // 0-100
  label?: string;
  color?: string;
  size?: number; // diameter in pixels
  className?: string;
}

export const HudCircularGauge: React.FC<HudCircularGaugeProps> = ({
  value,
  label,
  color = 'var(--hud-primary)',
  size = 120,
  className = '',
}) => {
  const clampedValue = Math.max(0, Math.min(100, value));
  const circumference = 2 * Math.PI * 45; // radius = 45
  const offset = circumference - (clampedValue / 100) * circumference;

  return (
    <div 
      className={`${styles.gauge} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg className={styles.svg} viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className={styles.background}
          cx="50"
          cy="50"
          r="45"
        />
        
        {/* Progress circle */}
        <circle
          className={styles.progress}
          cx="50"
          cy="50"
          r="45"
          style={{
            stroke: color,
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
        
        {/* Inner glow circle */}
        <circle
          className={styles.glow}
          cx="50"
          cy="50"
          r="35"
          style={{
            stroke: color,
          }}
        />
      </svg>
      
      <div className={styles.content}>
        <div 
          className={styles.value}
          style={{ color }}
        >
          {Math.round(clampedValue)}%
        </div>
        {label && (
          <div className={styles.label}>{label}</div>
        )}
      </div>
    </div>
  );
};
