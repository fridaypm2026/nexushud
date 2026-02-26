import React from 'react';
import styles from './HudGrid.module.css';

export interface HudGridProps {
  children?: React.ReactNode;
  gridSize?: number; // size of grid cells in pixels
  opacity?: number; // 0-1
  className?: string;
}

export const HudGrid: React.FC<HudGridProps> = ({
  children,
  gridSize = 40,
  opacity = 0.3,
  className = '',
}) => {
  return (
    <div className={`${styles.grid} ${className}`}>
      <div 
        className={styles.background}
        style={{
          backgroundSize: `${gridSize}px ${gridSize}px`,
          opacity,
        }}
      />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
