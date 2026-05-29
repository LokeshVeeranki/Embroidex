import React from 'react';
import styles from './AboutUs.module.css';

// Premium custom Engineering SVGs
const Icons = {
  Monitor: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
  ),
  Workflow: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 14a8 8 0 0 1-8 8"/><path d="M18 11c0-5-4-9-9-9s-9 4-9 9 4 9 9 9h.1"/><path d="M9 5c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z"/><path d="M12 12l9-9"/><path d="M18 3h3v3"/></svg>
  ),
  Settings: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Shield: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  Truck: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polyline points="16 8 20 8 23 11 23 16 16 16"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
  ),
  Wrench: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
  )
};

const AboutUs2 = () => {
  const expertise = [
    {
      icon: <Icons.Monitor />,
      title: "Computerized Tech",
      desc: "Specialized in high-precision computerized machines with advanced OEM software integration."
    },
    {
      icon: <Icons.Workflow />,
      title: "Multi-Head Systems",
      desc: "Expertise in scaling production with 2-head to 20-head industrial embroidery setups."
    },
    {
      icon: <Icons.Settings />,
      title: "Industrial Grade",
      desc: "Heavy-duty machinery designed for 24/7 commercial textile manufacturing environments."
    },
    {
      icon: <Icons.Shield />,
      title: "Quality Verification",
      desc: "Every used machine undergoes a rigorous 20-point quality check before listing."
    }
  ];

  return (
    <section className={styles.aboutTwo}>
      <div className={styles.container}>
        
        {/* Top Header Block */}
        <div className={styles.sectionHeader}>
          <div className={styles.subHeadingWrapper}>
            <span className={styles.subHeadingLine}></span>
            <span className={styles.subHeading}>Our Core Expertise</span>
          </div>
          <h2 className={styles.mainHeading}>Why Industrial Brands <br/> Choose Smart Stitch</h2>
        </div>

        {/* Expertise Grid - Left Aligned Tech Style */}
        <div className={styles.expertiseGrid}>
          {expertise.map((item, index) => (
            <div key={index} className={styles.expertCard}>
              <div className={styles.cardWatermark}>{index + 1}</div>
              <div className={styles.iconContainer}>
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Industrial Technical Plaque (Bottom Banner) */}
        <div className={styles.technicalPlaque}>
          <div className={styles.plaqueInnerBorder}></div>
          
          <div className={styles.plaqueItem}>
            <div className={styles.plaqueIcon}><Icons.Truck /></div>
            <div className={styles.plaqueText}>
              <span className={styles.plaqueLabel}>LOGISTICS</span>
              <h4>Pan India Delivery</h4>
              <p>Safe transport of heavy machinery across all states.</p>
            </div>
          </div>

          <div className={styles.plaqueDivider}></div>

          <div className={styles.plaqueItem}>
            <div className={styles.plaqueIcon}><Icons.Wrench /></div>
            <div className={styles.plaqueText}>
              <span className={styles.plaqueLabel}>MAINTENANCE</span>
              <h4>Technician Support</h4>
              <p>On-site installation and lifetime maintenance assistance.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs2;