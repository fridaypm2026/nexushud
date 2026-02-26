import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEMS...');

  const statusMessages = [
    'INITIALIZING SYSTEMS...',
    'LOADING CORE MODULES...',
    'ESTABLISHING CONNECTIONS...',
    'CALIBRATING INTERFACES...',
    'SYNCING DATA STREAMS...',
    'ACTIVATING HUD SYSTEMS...',
    'SYSTEMS ONLINE',
  ];

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 50;
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + increment, 100);
        
        // Update status message based on progress
        const messageIndex = Math.floor((newProgress / 100) * (statusMessages.length - 1));
        setStatusText(statusMessages[messageIndex]);
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete?.();
          }, 500);
        }
        
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      {/* Arc reactor core */}
      <div className={styles.arcReactor}>
        <div className={styles.arcCore}>
          <div className={styles.arcRing} style={{ '--delay': '0s' } as React.CSSProperties} />
          <div className={styles.arcRing} style={{ '--delay': '0.5s' } as React.CSSProperties} />
          <div className={styles.arcRing} style={{ '--delay': '1s' } as React.CSSProperties} />
          <div className={styles.arcRing} style={{ '--delay': '1.5s' } as React.CSSProperties} />
          
          <div className={styles.arcCenter}>
            <div className={styles.arcInner} />
          </div>
        </div>
        
        {/* Rotating segments */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={styles.arcSegment}
            style={{
              transform: `rotate(${i * 45}deg)`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Status text */}
      <div className={styles.statusText}>
        {statusText}
      </div>

      {/* Progress bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.progressPercent}>
          {Math.floor(progress)}%
        </div>
      </div>

      {/* Corner brackets */}
      <div className={styles.cornerBracket} data-corner="tl" />
      <div className={styles.cornerBracket} data-corner="tr" />
      <div className={styles.cornerBracket} data-corner="bl" />
      <div className={styles.cornerBracket} data-corner="br" />
    </div>
  );
};

export default LoadingScreen;
