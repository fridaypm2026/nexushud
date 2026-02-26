import React, { useState } from 'react';
import { HudPanel } from '../hud/HudPanel';
import styles from './WidgetWrapper.module.css';

export interface WidgetWrapperProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  isMinimized?: boolean;
}

export const WidgetWrapper: React.FC<WidgetWrapperProps> = ({
  title,
  children,
  onClose,
  onMinimize,
  isMinimized = false,
}) => {
  const [minimized, setMinimized] = useState(isMinimized);

  const handleMinimize = () => {
    setMinimized(!minimized);
    if (onMinimize) {
      onMinimize();
    }
  };

  return (
    <div className={styles.widgetWrapper}>
      <div className={styles.titleBar}>
        <span className={styles.title}>{title}</span>
        <div className={styles.controls}>
          <button
            className={styles.controlBtn}
            onClick={handleMinimize}
            title={minimized ? 'Maximize' : 'Minimize'}
          >
            {minimized ? '□' : '_'}
          </button>
          {onClose && (
            <button
              className={styles.controlBtn}
              onClick={onClose}
              title="Close"
            >
              ×
            </button>
          )}
        </div>
      </div>
      <div className={`${styles.content} ${minimized ? styles.minimized : ''}`}>
        <HudPanel>
          {children}
        </HudPanel>
      </div>
      <div className={styles.resizeHandle} />
    </div>
  );
};
