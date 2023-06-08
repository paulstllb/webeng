import React from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './home.module.css';

export default function Home() {
  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <div className={styles.container}>
      <animated.div style={animationProps} className={styles.content}>
        <h1 className={styles.title}>Home</h1>
        <p className={styles.description}>Willkommen auf der Startseite</p>
        <div className={styles.points}>
          <h2 className={styles.pointTitle}>Punkte:</h2>
          <ul className={styles.pointList}>
            <li>Weather</li>
            <li>RSS</li>
            <li>React</li>
            <li>Canvas</li>
            <li>evt Docker</li>
            
          </ul>
        <h4 style={{marginTop:"6vm"}}> mit einem Klick auf den oberen rechten Strich könne sie die Navigation schließen oder öffnen</h4>
        </div>
      </animated.div>
    </div>
  );
}

