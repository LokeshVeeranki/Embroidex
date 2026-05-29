import React from 'react';
import styles from './AboutUs.module.css';

// Premium custom SVGs to match the industrial/tech aesthetic
const Icons = {
  Cpu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
  ),
  Factory: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>
  ),
  Users: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  )
};

const AboutUs1 = () => {
  return (
    <section className={styles.aboutHero}>
      
      {/* Subtle Engineering Dot Grid */}
      <div className={styles.dotGrid}></div>

      {/* Premium Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerWatermark}>LEGACY</div>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>
            About <span className={styles.accentText}>Smart Stitch.</span>
          </h1>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentGrid}>
          
          {/* Left: Typography & Dashboard Cards */}
          <div className={styles.textContent}>
            <div className={styles.taglineWrapper}>
              <span className={styles.taglineLine}></span>
              <span className={styles.tagline}>The Smart Stitch Legacy</span>
            </div>
            
            <h2 className={styles.heading}>
              India's Premier Marketplace for <br />
              <span className={styles.accentText}>Embroidery Innovation.</span>
            </h2>
            
            <p className={styles.description}>
              Founded with a vision to revolutionize the textile manufacturing sector, Smart Stitch Enterprises serves as the ultimate bridge between world-class embroidery technology and ambitious factory owners. 
            </p>
            <p className={styles.description}>
              Whether you are looking for high-speed computerized multi-head arrays for industrial production or a reliable single-head machine for a boutique setup, we provide the elite inventory and lifetime technical support you need to scale.
            </p>

            {/* Interactive Expertise Cards */}
            <div className={styles.expertiseGrid}>
              <div className={styles.expertCard}>
                <div className={styles.iconGlowBox}>
                  <Icons.Cpu />
                </div>
                <div className={styles.expertText}>
                  <h4>Computerized Logic</h4>
                  <p>Latest OEM software integration</p>
                </div>
              </div>
              
              <div className={styles.expertCard}>
                <div className={styles.iconGlowBox}>
                  <Icons.Factory />
                </div>
                <div className={styles.expertText}>
                  <h4>Industrial Scale</h4>
                  <p>Engineered for 24/7 production</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Architectural Image Composition */}
          <div className={styles.visualSide}>
            <div className={styles.imageArchitecturalFrame}></div>
            <div className={styles.mainImageWrapper}>
              <img 
                src="https://i.ytimg.com/vi/V7CJulgIUrc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAP-xKDapF8VrV_nQq1R173qdm4Cw" 
                alt="Industrial Embroidery Machine Setup" 
                className={styles.mainImage}
              />
              <div className={styles.imageGradientMask}></div>
            </div>

            {/* Floating Glassmorphism Stat Widget */}
            <div className={styles.glassStatWidget}>
              <div className={styles.statIconWrapper}>
                <Icons.Users />
              </div>
              <div className={styles.statContent}>
                <h3>1500+</h3>
                <p>Satisfied Clients</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs1;