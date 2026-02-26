import { useEffect, useState } from 'react';
import styles from './HudOverlay.module.css';

const HudOverlay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  };

  return (
    <div className={styles.hudOverlay}>
      {/* Corner brackets */}
      <div className={styles.corner} data-corner="tl">
        <svg className={styles.cornerSvg} viewBox="0 0 100 100">
          <polyline
            points="100,20 100,0 0,0 0,100 20,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className={styles.corner} data-corner="tr">
        <svg className={styles.cornerSvg} viewBox="0 0 100 100">
          <polyline
            points="0,20 0,0 100,0 100,100 80,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className={styles.corner} data-corner="bl">
        <svg className={styles.cornerSvg} viewBox="0 0 100 100">
          <polyline
            points="100,80 100,100 0,100 0,0 20,0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className={styles.corner} data-corner="br">
        <svg className={styles.cornerSvg} viewBox="0 0 100 100">
          <polyline
            points="0,80 0,100 100,100 100,0 80,0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Top-right time display */}
      <div className={styles.timeDisplay}>
        <div className={styles.timeLabel}>SYSTEM TIME</div>
        <div className={styles.timeValue}>{formatTime(time)}</div>
        <div className={styles.dateValue}>{formatDate(time)}</div>
      </div>

      {/* Bottom-left version */}
      <div className={styles.versionDisplay}>
        <div className={styles.versionLabel}>NEXUS</div>
        <div className={styles.versionValue}>v1.0.0</div>
      </div>

      {/* Scan line effect */}
      <div className={styles.scanLine} />

      {/* Status indicators (optional decorative elements) */}
      <div className={styles.statusIndicators}>
        <div className={styles.indicator} data-status="active">
          <div className={styles.indicatorDot} />
          <span className={styles.indicatorLabel}>SYS</span>
        </div>
        <div className={styles.indicator} data-status="active">
          <div className={styles.indicatorDot} />
          <span className={styles.indicatorLabel}>NET</span>
        </div>
        <div className={styles.indicator} data-status="active">
          <div className={styles.indicatorDot} />
          <span className={styles.indicatorLabel}>PWR</span>
        </div>
      </div>
    </div>
  );
};

export default HudOverlay;
