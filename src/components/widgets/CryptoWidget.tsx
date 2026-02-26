import React, { useState, useEffect } from 'react';
import styles from './CryptoWidget.module.css';

interface CryptoData {
  bitcoin: { usd: number; usd_24h_change: number };
  ethereum: { usd: number; usd_24h_change: number };
  solana: { usd: number; usd_24h_change: number };
}

interface CryptoItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

export const CryptoWidget: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }
      
      const data: CryptoData = await response.json();
      
      const formattedData: CryptoItem[] = [
        {
          id: 'bitcoin',
          symbol: 'BTC',
          name: 'Bitcoin',
          price: data.bitcoin.usd,
          change24h: data.bitcoin.usd_24h_change,
        },
        {
          id: 'ethereum',
          symbol: 'ETH',
          name: 'Ethereum',
          price: data.ethereum.usd,
          change24h: data.ethereum.usd_24h_change,
        },
        {
          id: 'solana',
          symbol: 'SOL',
          name: 'Solana',
          price: data.solana.usd,
          change24h: data.solana.usd_24h_change,
        },
      ];
      
      setCryptoData(formattedData);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchCryptoData, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  if (loading && cryptoData.length === 0) {
    return (
      <div className={styles.cryptoWidget}>
        <div className={styles.loading}>Loading crypto data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.cryptoWidget}>
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.cryptoWidget}>
      {cryptoData.map((crypto) => (
        <div key={crypto.id} className={styles.cryptoItem}>
          <div className={styles.cryptoHeader}>
            <span className={styles.symbol}>{crypto.symbol}</span>
            <span className={styles.name}>{crypto.name}</span>
          </div>
          <div className={styles.priceRow}>
            <span className={styles.price}>{formatPrice(crypto.price)}</span>
          </div>
          <div className={styles.changeRow}>
            <span
              className={`${styles.change} ${
                crypto.change24h >= 0 ? styles.positive : styles.negative
              }`}
            >
              {formatChange(crypto.change24h)}
            </span>
            <span className={styles.changeLabel}>24h</span>
          </div>
        </div>
      ))}
    </div>
  );
};
