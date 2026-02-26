import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HudGlowText } from '../components/hud';
import styles from './Welcome.module.css';

const Welcome = () => {
  const navigate = useNavigate();
  const [textIndex, setTextIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const fullText = 'NEXUS HUD';

  useEffect(() => {
    if (textIndex < fullText.length) {
      const timer = setTimeout(() => {
        setTextIndex(textIndex + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowButton(true), 500);
    }
  }, [textIndex]);

  const handleInitialize = () => {
    navigate('/login');
  };

  return (
    <div className={styles.welcomeContainer}>
      {/* Animated particles background */}
      <div className={styles.particlesBackground}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Animated grid background */}
      <div className={styles.gridBackground} />

      {/* Boot sequence overlay */}
      <div className={styles.bootSequence}>
        <div className={styles.scanLineVertical} />
        <div className={styles.scanLineHorizontal} />
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <HudGlowText size="large" className={styles.title}>
            {fullText.slice(0, textIndex)}
            {textIndex < fullText.length && <span className={styles.cursor}>_</span>}
          </HudGlowText>
        </div>

        <p className={styles.tagline}>
          Your AI-Powered Command Center
        </p>

        {showButton && (
          <button
            onClick={handleInitialize}
            className={styles.initButton}
          >
            <span className={styles.buttonGlow} />
            <span className={styles.buttonText}>Initialize System</span>
            <div className={styles.buttonBorder} />
          </button>
        )}

        {/* Corner accents */}
        <div className={styles.cornerAccent} data-corner="top-left" />
        <div className={styles.cornerAccent} data-corner="top-right" />
        <div className={styles.cornerAccent} data-corner="bottom-left" />
        <div className={styles.cornerAccent} data-corner="bottom-right" />
      </div>

      {/* Version number */}
      <div className={styles.version}>v1.0.0</div>
    </div>
  );
};

export default Welcome;
