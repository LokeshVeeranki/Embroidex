import React from 'react';
import styles from './Home.module.css';

// Premium custom SVGs tailored to the industrial theme
const Icons = {
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  ),
  Search: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  Shield: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  Factory: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>
  ),
  Message: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.5 8.5 0 0 1 8.5 7.9z"/></svg>
  ),
  WhatsApp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
};

const Home4 = () => {
  const whatsappNumber = "917207528651";

  return (
    <section className={styles.advantageSection}>
      <div className={styles.advantageContainer}>
        
        {/* Upper Content Section */}
        <div className={styles.splitWrapper}>
          
          {/* Left: Typography & Trust Markers */}
          <div className={styles.textContent}>
            <div className={styles.subHeadingWrapper}>
              <span className={styles.subHeadingLine}></span>
              <span className={styles.subHeading}>The Smart Stitch Advantage</span>
            </div>
            
            <h2 className={styles.mainHeading}>
              Transforming <span className={styles.accentText}>Textile</span> <br /> 
              Manufacturing in India.
            </h2>
            
            <p className={styles.description}>
              We bridge the gap between textile entrepreneurs and world-class machine manufacturers. Whether you are upgrading to a high-speed multi-head array or starting with a single-head boutique setup, we guarantee transparency, verified technology, and direct OEM access.
            </p>
            
            <div className={styles.trustList}>
              <div className={styles.trustItem}>
                <div className={styles.checkGlow}><Icons.Check /></div>
                <span>100% Certified Computerized Embroidery Machines</span>
              </div>
              <div className={styles.trustItem}>
                <div className={styles.checkGlow}><Icons.Check /></div>
                <span>Direct Access to Top Brands (Ricoma, Tajima, Brother)</span>
              </div>
              <div className={styles.trustItem}>
                <div className={styles.checkGlow}><Icons.Check /></div>
                <span>Pan-India Installation & Lifetime Technical Support</span>
              </div>
            </div>
          </div>

          {/* Right: The "Precision Thread" Timeline */}
          <div className={styles.timelineWrapper}>
            <div className={styles.timelineLine}></div>

            <div className={styles.stepCard}>
              <div className={styles.stepNode}></div>
              <span className={styles.stepWatermark}>01</span>
              <div className={styles.stepIconBox}><Icons.Search /></div>
              <div className={styles.stepContent}>
                <h3>Discover</h3>
                <p>Browse detailed technical specs of single-head, multi-head, and specialized industrial machines.</p>
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNode}></div>
              <span className={styles.stepWatermark}>02</span>
              <div className={styles.stepIconBox}><Icons.Shield /></div>
              <div className={styles.stepContent}>
                <h3>Verify</h3>
                <p>Review certified condition reports, video demonstrations, and genuine dealer ratings before committing.</p>
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNode}></div>
              <span className={styles.stepWatermark}>03</span>
              <div className={styles.stepIconBox}><Icons.Factory /></div>
              <div className={styles.stepContent}>
                <h3>Scale</h3>
                <p>Procure at the best price with seamless logistics, factory setup, and on-site operator training.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Massive Industrial Dealer Banner */}
        <div className={styles.dealerPlaque}>
          <div className={styles.plaqueOverlay}></div>
          <div className={styles.plaqueBorder}></div>
          
          <div className={styles.plaqueContent}>
            <h3 className={styles.plaqueTitle}>Are you a Machinery OEM or Distributor?</h3>
            <p className={styles.plaqueDesc}>
              Join India’s fastest-growing digital network for textile machinery. Showcase your computerized embroidery machines to thousands of verified buyers and scale your nationwide sales seamlessly.
            </p>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Smart Stitch, I am interested in partnering as a dealer/distributor on your platform.")}`} 
              className={styles.plaqueBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.WhatsApp />
              <span>Partner With Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Home4;