import React from 'react';
import styles from './HudPanel.module.css';

export interface HudPanelProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'success';
  className?: string;
}

export const HudPanel: React.FC<HudPanelProps> = ({
  title,
  children,
  variant = 'default',
  className = '',
}) => {
  return (
    <div className={`${styles.panel} ${styles[variant]} ${className}`}>
      <div className={styles.corners}>
        <div className={`${styles.corner} ${styles.topLeft}`} />
        <div className={`${styles.corner} ${styles.topRight}`} />
        <div className={`${styles.corner} ${styles.bottomLeft}`} />
        <div className={`${styles.corner} ${styles.bottomRight}`} />
      </div>
      {title && (
        <div className={styles.header}>
          <div className={styles.titleBar} />
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.titleBar} />
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
