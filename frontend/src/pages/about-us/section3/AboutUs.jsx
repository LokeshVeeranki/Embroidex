import React from 'react';
import styles from './AboutUs.module.css';

// Premium Custom Engineering SVGs
const Icons = {
  Clipboard: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
  ),
  Message: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  Truck: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polyline points="16 8 20 8 23 11 23 16 16 16"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
  ),
  Check: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  WhatsApp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
};

const AboutUs3 = () => {
  const whatsappNumber = "917207528651";

  const steps = [
    {
      icon: <Icons.Clipboard />,
      title: "Browse & Select",
      desc: "Explore a curated range of computerized embroidery machines with detailed industrial specs."
    },
    {
      icon: <Icons.Message />,
      title: "Direct Inquiry",
      desc: "Connect instantly via WhatsApp for real-time pricing, machine history, and technical footage."
    },
    {
      icon: <Icons.Truck />,
      title: "Logistics & Setup",
      desc: "Secure delivery to your factory followed by on-site installation and expert operator training."
    }
  ];

  return (
    <section className={styles.aboutThree}>
      <div className={styles.container}>
        <div className={styles.splitWrapper}>
          
          {/* Header Content */}
          <div className={styles.headerContent}>
            <div className={styles.subHeadingWrapper}>
              <span className={styles.subHeadingLine}></span>
              <span className={styles.subHeading}>The Procurement Process</span>
            </div>
            <h2 className={styles.mainHeading}>Your Journey to <br/><span className={styles.accentText}>Industrial Excellence.</span></h2>
            <p className={styles.aboutDescription}>
              We have engineered the simplest path to acquiring high-end textile machinery. From initial technical inquiry to full-scale production, Smart Stitch is your engineering partner.
            </p>
            
            <div className={styles.trustMarkers}>
              <div className={styles.marker}>
                <div className={styles.markerIcon}><Icons.Check /></div>
                <span>Pan-India Dealer Network</span>
              </div>
              <div className={styles.marker}>
                <div className={styles.markerIcon}><Icons.Check /></div>
                <span>Transparent Pricing</span>
              </div>
              <div className={styles.marker}>
                <div className={styles.markerIcon}><Icons.Check /></div>
                <span>On-site Maintenance</span>
              </div>
            </div>
          </div>

          {/* Process Steps Grid */}
          <div className={styles.processGrid}>
            {steps.map((step, index) => (
              <div key={index} className={styles.processModule}>
                <div className={styles.moduleWatermark}>0{index + 1}</div>
                <div className={styles.moduleIconBox}>
                  {step.icon}
                </div>
                <div className={styles.moduleText}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Industrial Partner Banner (Plaque Style) */}
        <div className={styles.partnerPlaque}>
          <div className={styles.plaqueOverlay}></div>
          <div className={styles.plaqueGlassBorder}></div>
          
          <div className={styles.plaqueContent}>
            <h3 className={styles.plaqueTitle}>Are you a Machinery Dealer?</h3>
            <p className={styles.plaqueDesc}>Join our elite digital network to showcase your computerized embroidery solutions to thousands of textile businesses across India.</p>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I am interested in partnering as a dealer.")}`} 
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

export default AboutUs3;