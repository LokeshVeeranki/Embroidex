import React from 'react';
import { Target, Eye, ShieldCheck, Zap, Star } from 'lucide-react';
import styles from './Home.module.css';

// --- CONFIGURATION DATA ---
const EXPERTISE_CARDS = [
  {
    id: 'mission',
    title: 'Our Mission',
    description: 'To provide high-quality, precision embroidery machines that empower textile entrepreneurs across India.',
    Icon: Target,
  },
  {
    id: 'vision',
    title: 'Our Vision',
    description: 'To be the most trusted name in textile machinery, known for innovation, durability, and robust customer support.',
    Icon: Eye,
  }
];

const FEATURE_PILLS = [
  { id: 'quality', label: 'Certified Quality', Icon: ShieldCheck },
  { id: 'support', label: 'Expert Tech Support', Icon: Zap }
];

const Home2 = () => {
  return (
    <section className={styles.aboutSection} aria-labelledby="about-heading">
      <div className={styles.aboutContainer}>
        
        {/* Left Side: Premium Image Composition */}
        <figure className={styles.imageSide}>
          <div className={styles.imageBackdrop} aria-hidden="true" />
          
          <div className={styles.imageWrapper}>
            <img 
              src="https://image.made-in-china.com/202f0j00VOcWJvkFSPYl/High-Precision-1-Head-Embroidery-Machine-with-15-Needles-for-Home-Use.webp" 
              alt="Close-up of High Precision 15-Needle Embroidery Machine" 
              className={styles.mainAboutImage}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.imageGradientOverlay} aria-hidden="true" />
          </div>

          {/* Floating Glassmorphism Badge */}
          <figcaption className={styles.glassExperienceBadge}>
            <div className={styles.badgeIconWrapper}>
              <Star size={28} strokeWidth={2.5} aria-hidden="true" />
            </div>
            <div className={styles.badgeTextWrapper}>
              <span className={styles.badgeNumber}>20+</span>
              <span className={styles.badgeText}>Years of<br/>Excellence</span>
            </div>
          </figcaption>
        </figure>

        {/* Right Side: High-End Content */}
        <div className={styles.contentSide}>
          
          <header className={styles.headerBlock}>
            <div className={styles.subHeadingWrapper}>
              <span className={styles.subHeadingLine} aria-hidden="true" />
              <span className={styles.subHeading}>About Our Enterprise</span>
            </div>
            <h2 id="about-heading" className={styles.sectionHeading}>
              Leading Experts in <span className={styles.accentText}>Industrial</span> Embroidery Solutions.
            </h2>
          </header>
          
          <p className={styles.aboutDescription}>
            <strong>Smart Stitch Enterprises</strong> is India's premier platform for high-performance embroidery machinery. We specialize in providing cutting-edge technology for the textile industry, empowering businesses with world-class computerized solutions and relentless reliability.
          </p>

          {/* Mission & Vision Dashboard Cards */}
          <div className={styles.cardsGrid}>
            {EXPERTISE_CARDS.map(({ id, title, description, Icon }) => (
              <article key={id} className={styles.missionCard}>
                <div className={styles.cardIconGlow}>
                  <Icon size={24} strokeWidth={2} aria-hidden="true" />
                </div>
                <div className={styles.cardContent}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Sophisticated Feature Badges */}
          <div className={styles.featurePills} aria-label="Key Features">
            {FEATURE_PILLS.map(({ id, label, Icon }) => (
              <div key={id} className={styles.pill}>
                <div className={styles.pillIcon}>
                  <Icon size={18} strokeWidth={2.5} aria-hidden="true" />
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Home2;