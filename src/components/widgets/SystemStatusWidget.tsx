import React, { useState, useEffect } from 'react';
import { HudCircularGauge } from '../hud/HudCircularGauge';
import styles from './SystemStatusWidget.module.css';

interface SystemMetrics {
  cpu: number;
  ram: number;
  network: number;
}

export const SystemStatusWidget: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 0,
    ram: 0,
    network: 0,
  });

  // Simulate animated system metrics
  useEffect(() => {
    const updateMetrics = () => {
      setMetrics({
        cpu: Math.random() * 30 + 40, // 40-70%
        ram: Math.random() * 25 + 50, // 50-75%
        network: Math.random() * 40 + 20, // 20-60%
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 2000);

    return () => clearInterval(interval);
  }, []);

  const getCpuColor = (value: number) => {
    if (value < 50) return 'rgba(0, 255, 150, 0.9)';
    if (value < 75) return 'rgba(255, 200, 0, 0.9)';
    return 'rgba(255, 80, 80, 0.9)';
  };

  const getRamColor = (value: number) => {
    if (value < 60) return 'rgba(0, 200, 255, 0.9)';
    if (value < 80) return 'rgba(255, 200, 0, 0.9)';
    return 'rgba(255, 80, 80, 0.9)';
  };

  const getNetworkColor = (_value: number) => {
    return 'rgba(150, 100, 255, 0.9)';
  };

  return (
    <div className={styles.systemWidget}>
      <div className={styles.gaugesContainer}>
        <div className={styles.gaugeWrapper}>
          <HudCircularGauge
            value={metrics.cpu}
            label="CPU"
            color={getCpuColor(metrics.cpu)}
            size={100}
          />
        </div>

        <div className={styles.gaugeWrapper}>
          <HudCircularGauge
            value={metrics.ram}
            label="RAM"
            color={getRamColor(metrics.ram)}
            size={100}
          />
        </div>

        <div className={styles.gaugeWrapper}>
          <HudCircularGauge
            value={metrics.network}
            label="Network"
            color={getNetworkColor(metrics.network)}
            size={100}
          />
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Status:</span>
          <span className={styles.detailValue}>ONLINE</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Uptime:</span>
          <span className={styles.detailValue}>24h 15m</span>
        </div>
      </div>
    </div>
  );
};
