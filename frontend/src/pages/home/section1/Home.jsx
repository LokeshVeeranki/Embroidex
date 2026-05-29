import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, ShieldCheck, TrendingUp } from 'lucide-react';
import styles from './Home.module.css';

// --- CUSTOM BRAND ICONS ---
const WhatsAppBrandIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Home1 = () => {
  const whatsappNumber = "917207528651";

  return (
    <main className={styles.homeContainer}>
      {/* Subtle Engineering Grid Background */}
      <div className={styles.dotGrid} aria-hidden="true" />

      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroContainer}>
          
          {/* LEFT: Massive Typography & CTA */}
          <div className={styles.heroContent}>
            <div className={`${styles.badge} ${styles.animateFadeUp} ${styles.delay1}`}>
              <Sparkles size={16} strokeWidth={2.5} aria-hidden="true" />
              <span>Next-Gen Embroidery Machinery</span>
            </div>
            
            <h1 id="hero-heading" className={`${styles.mainHeading} ${styles.animateFadeUp} ${styles.delay2}`}>
              Scale Production. <br />
              <span className={styles.accentText}>Multiply Yield.</span>
            </h1>
            
            <p className={`${styles.description} ${styles.animateFadeUp} ${styles.delay3}`}>
              Equip your facility with India’s most advanced computerized multi-head machines. Built for relentless speed, uncompromised precision, and lifetime reliability.
            </p>

            <div className={`${styles.heroBtns} ${styles.animateFadeUp} ${styles.delay4}`}>
              <Link to="/machines" className={styles.btnPrimary} aria-label="Explore all machines">
                <span>Explore Machines</span>
                <span className={styles.btnIconWrapper}>
                  <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" />
                </span>
              </Link>
              <a 
                href={`https://wa.me/${whatsappNumber}`} 
                className={styles.btnWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start live chat on WhatsApp"
              >
                <WhatsAppBrandIcon size={22} />
                <span>Live Chat</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Premium Visual Composition */}
          <figure className={`${styles.visualShowcase} ${styles.animateFadeIn} ${styles.delay5}`}>
            
            {/* Ambient Backlight */}
            <div className={styles.imageGlow} aria-hidden="true" />

            {/* Main Hero Image */}
            <div className={styles.mainImageContainer}>
              <img 
                src="https://images.jdmagicbox.com/quickquotes/images_main/-0q2g4qsk.jpg" 
                alt="State-of-the-art Industrial Embroidery Machine" 
                className={styles.mainImage}
                fetchpriority="high"
                decoding="async"
              />
              <div className={styles.imageGradientMask} aria-hidden="true" />
            </div>

            {/* Floating Glass UI Card 1 (Top Left) */}
            <figcaption className={`${styles.glassCard} ${styles.cardOne}`}>
              <div className={styles.cardIconBox}>
                <ShieldCheck size={24} strokeWidth={2} aria-hidden="true" />
              </div>
              <div className={styles.cardText}>
                <h4>Lifetime Support</h4>
                <p>24/7 Technical assistance</p>
              </div>
            </figcaption>

            {/* Floating Glass UI Card 2 (Bottom Right) */}
            <figcaption className={`${styles.glassCard} ${styles.cardTwo}`}>
              <div className={`${styles.cardIconBox} ${styles.pinkBox}`}>
                <TrendingUp size={24} strokeWidth={2} aria-hidden="true" />
              </div>
              <div className={styles.cardText}>
                <h4>500+ Units</h4>
                <p>Successfully installed globally</p>
              </div>
            </figcaption>

          </figure>

        </div>
      </section>
    </main>
  );
};

export default Home1;