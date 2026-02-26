import React from 'react';
import styles from './NewsWidget.module.css';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  category: string;
}

const PLACEHOLDER_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'AI Breakthrough: New Model Achieves Human-Level Reasoning',
    source: 'Tech News',
    time: '2h ago',
    category: 'Technology',
  },
  {
    id: '2',
    title: 'Crypto Markets Rally as Bitcoin Hits New All-Time High',
    source: 'Finance Daily',
    time: '4h ago',
    category: 'Finance',
  },
  {
    id: '3',
    title: 'SpaceX Successfully Launches Lunar Mission',
    source: 'Space Today',
    time: '6h ago',
    category: 'Space',
  },
  {
    id: '4',
    title: 'Quantum Computing Reaches Major Milestone',
    source: 'Science Weekly',
    time: '8h ago',
    category: 'Science',
  },
  {
    id: '5',
    title: 'New Climate Agreement Signed by 50 Nations',
    source: 'World News',
    time: '10h ago',
    category: 'Environment',
  },
  {
    id: '6',
    title: 'Virtual Reality Gaming Sees Record Growth',
    source: 'Gaming Wire',
    time: '12h ago',
    category: 'Gaming',
  },
];

export const NewsWidget: React.FC = () => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technology: 'rgba(0, 255, 255, 0.8)',
      Finance: 'rgba(0, 255, 150, 0.8)',
      Space: 'rgba(150, 100, 255, 0.8)',
      Science: 'rgba(255, 150, 0, 0.8)',
      Environment: 'rgba(100, 255, 100, 0.8)',
      Gaming: 'rgba(255, 100, 150, 0.8)',
    };
    return colors[category] || 'rgba(0, 255, 255, 0.8)';
  };

  return (
    <div className={styles.newsWidget}>
      <div className={styles.newsHeader}>
        <span className={styles.headerTitle}>Latest Updates</span>
        <span className={styles.headerBadge}>LIVE</span>
      </div>

      <div className={styles.newsScroll}>
        {PLACEHOLDER_NEWS.map((item) => (
          <div key={item.id} className={styles.newsItem}>
            <div className={styles.newsContent}>
              <div className={styles.newsTitle}>{item.title}</div>
              <div className={styles.newsMeta}>
                <span
                  className={styles.category}
                  style={{ color: getCategoryColor(item.category) }}
                >
                  {item.category}
                </span>
                <span className={styles.source}>{item.source}</span>
                <span className={styles.time}>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
