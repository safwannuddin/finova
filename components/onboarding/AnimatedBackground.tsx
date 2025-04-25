import React from 'react';
import styles from './AnimatedBackground.module.css';

const AnimatedBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.animatedBackground}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default AnimatedBackground;
