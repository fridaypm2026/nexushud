import React, { useState, useEffect } from 'react';
import styles from './WeatherWidget.module.css';

interface WeatherData {
  current_condition: Array<{
    temp_F: string;
    temp_C: string;
    weatherDesc: Array<{ value: string }>;
    weatherIconUrl: Array<{ value: string }>;
    humidity: string;
    windspeedMiles: string;
    FeelsLikeF: string;
  }>;
  nearest_area: Array<{
    areaName: Array<{ value: string }>;
    country: Array<{ value: string }>;
  }>;
}

export const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://wttr.in/?format=j1');
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data: WeatherData = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 1800000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className={styles.weatherWidget}>
        <div className={styles.loading}>Loading weather...</div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className={styles.weatherWidget}>
        <div className={styles.error}>Error: {error || 'No data'}</div>
      </div>
    );
  }

  const current = weather.current_condition[0];
  const location = weather.nearest_area[0];

  return (
    <div className={styles.weatherWidget}>
      <div className={styles.location}>
        {location.areaName[0].value}, {location.country[0].value}
      </div>
      
      <div className={styles.tempDisplay}>
        <span className={styles.temp}>{current.temp_F}°F</span>
        <span className={styles.tempC}>({current.temp_C}°C)</span>
      </div>
      
      <div className={styles.condition}>
        {current.weatherDesc[0].value}
      </div>
      
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.label}>Feels like:</span>
          <span className={styles.value}>{current.FeelsLikeF}°F</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Humidity:</span>
          <span className={styles.value}>{current.humidity}%</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Wind:</span>
          <span className={styles.value}>{current.windspeedMiles} mph</span>
        </div>
      </div>
    </div>
  );
};
