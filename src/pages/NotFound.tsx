import { Link } from 'react-router-dom';
import { HudPanel } from '../components/hud';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.scanLines} />
      <div className={styles.glitchOverlay} />
      
      <HudPanel className={styles.panel}>
        <div className={styles.content}>
          <div className={styles.errorCode}>
            <span className={styles.glitchText} data-text="404">404</span>
          </div>
          
          <h1 className={styles.title}>
            <span className={styles.glitchText} data-text="SIGNAL LOST">
              SIGNAL LOST
            </span>
          </h1>
          
          <div className={styles.subtitle}>
            <span className={styles.glitchText} data-text="SECTOR NOT FOUND">
              SECTOR NOT FOUND
            </span>
          </div>
          
          <p className={styles.description}>
            The requested module could not be located in the NEXUS network.
          </p>
          
          <div className={styles.statusContainer}>
            <div className={styles.statusLine}>
              <span className={styles.statusLabel}>STATUS:</span>
              <span className={styles.statusValue}>DISCONNECTED</span>
            </div>
            <div className={styles.statusLine}>
              <span className={styles.statusLabel}>LOCATION:</span>
              <span className={styles.statusValue}>UNKNOWN</span>
            </div>
            <div className={styles.statusLine}>
              <span className={styles.statusLabel}>SYSTEMS:</span>
              <span className={styles.statusValue}>OFFLINE</span>
            </div>
          </div>
          
          <Link to="/" className={styles.returnButton}>
            <span className={styles.buttonInner}>
              <span className={styles.buttonIcon}>◄</span>
              Return to Base
            </span>
          </Link>
        </div>
      </HudPanel>
      
      {/* Distortion effect elements */}
      <div className={styles.staticNoise} />
    </div>
  );
};

export default NotFound;
