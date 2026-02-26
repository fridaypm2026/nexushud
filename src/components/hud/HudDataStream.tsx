import React, { useEffect, useState } from 'react';
import styles from './HudDataStream.module.css';

export interface HudDataStreamProps {
  speed?: 'slow' | 'normal' | 'fast';
  density?: 'low' | 'medium' | 'high';
  className?: string;
}

const generateRandomChar = (): string => {
  const chars = '0123456789ABCDEFabcdef<>[]{}()';
  return chars[Math.floor(Math.random() * chars.length)];
};

const generateLine = (length: number): string => {
  return Array.from({ length }, () => generateRandomChar()).join('');
};

export const HudDataStream: React.FC<HudDataStreamProps> = ({
  speed = 'normal',
  density = 'medium',
  className = '',
}) => {
  const [lines, setLines] = useState<string[]>([]);

  const lineCount = {
    low: 3,
    medium: 5,
    high: 8,
  }[density];

  const interval = {
    slow: 200,
    normal: 100,
    fast: 50,
  }[speed];

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setLines(prevLines => {
        const newLines = [...prevLines];
        if (newLines.length >= lineCount) {
          newLines.shift();
        }
        newLines.push(generateLine(40 + Math.floor(Math.random() * 20)));
        return newLines;
      });
    }, interval);

    return () => clearInterval(updateInterval);
  }, [lineCount, interval]);

  return (
    <div className={`${styles.stream} ${styles[speed]} ${className}`}>
      {lines.map((line, index) => (
        <div
          key={`${index}-${line.substring(0, 5)}`}
          className={styles.line}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};
