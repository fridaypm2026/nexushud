import React, { useState, useEffect } from 'react';
import styles from './ClockWidget.module.css';

export const ClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTimezone = (date: Date) => {
    const tzString = date.toLocaleTimeString('en-US', { timeZoneName: 'short' });
    const match = tzString.match(/\b[A-Z]{3,4}\b/);
    return match ? match[0] : 'UTC';
  };

  return (
    <div className={styles.clockWidget}>
      <div className={styles.timeDisplay}>
        {formatTime(time)}
      </div>
      <div className={styles.dateDisplay}>
        {formatDate(time)}
      </div>
      <div className={styles.timezoneDisplay}>
        {formatTimezone(time)}
      </div>
    </div>
  );
};
