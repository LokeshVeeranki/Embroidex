import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail 
} from 'lucide-react';
import styles from './Footer.module.css';

// --- CUSTOM BRAND ICONS ---
// (Ensures stability regardless of lucide-react version)

const FacebookIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const WhatsAppBrandIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// --- CONFIGURATION DATA ---
const QUICK_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'All Machines', path: '/machines' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Contact Us', path: '/contact' },
];

const MACHINE_TYPES = [
  { name: 'Single Head', path: '/machines?cat=single' },
  { name: 'Multi Head', path: '/machines?cat=multi' },
  { name: 'Used Machines', path: '/machines?cat=used' },
  { name: 'Industrial', path: '/machines?cat=industrial' },
];

const SOCIAL_LINKS = [
  { name: 'Facebook', url: '#', Icon: FacebookIcon },
  { name: 'Instagram', url: '#', Icon: InstagramIcon },
  { name: 'Twitter', url: '#', Icon: TwitterIcon },
];

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const phoneNumber = "917207528651";

  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only" style={{ display: 'none' }}>Footer</h2>
      
      <div className={styles.footerContainer}>
        
        {/* Column 1: Brand & Socials */}
        <div className={styles.column}>
          <Link to="/" className={styles.logo} aria-label="Smart Stitch Enterprises Home">
            <span className={styles.logoText}>
              SMART STITCH <span className={styles.logoAccent}>ENTERPRISES</span>
            </span>
          </Link>
          <p className={styles.description}>
            India's leading marketplace for commercial and industrial embroidery machines. 
            Providing high-quality computerized solutions for your textile business.
          </p>
          <div className={styles.socialLinks} aria-label="Social media profiles">
            {SOCIAL_LINKS.map(({ name, url, Icon }) => (
              <a 
                key={name} 
                href={url} 
                aria-label={name} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Quick Links</h3>
          <nav aria-label="Footer Quick Links">
            <ul className={styles.linksList}>
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={styles.linkItem}>
                    <ChevronRight size={14} strokeWidth={3} className={styles.linkIcon} /> 
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Column 3: Machine Types */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Machine Types</h3>
          <nav aria-label="Footer Machine Types">
            <ul className={styles.linksList}>
              {MACHINE_TYPES.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={styles.linkItem}>
                    <ChevronRight size={14} strokeWidth={3} className={styles.linkIcon} /> 
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Column 4: Contact Info */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Get In Touch</h3>
          <address className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}><MapPin size={18} /></div>
              <div className={styles.contactText}>
                Dondapati Hima Prasanna,<br />
                H No 1-5-213/2, Bhavani Nagar,<br />
                Old Alwal, Medchal-Malkajgiri,<br />
                Telangana - 500010
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}><Phone size={16} /></div>
              <div className={styles.contactText}>
                <a href="tel:+917207528651" className={styles.contactLink}>+91 72075 28651</a>
                <a href="tel:+918121635407" className={styles.contactLink}>+91 81216 35407</a>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <div className={styles.iconWrapper}><Mail size={16} /></div>
              <div className={styles.contactText}>
                <a href="mailto:himaschoice1@gmail.com" className={styles.contactLink}>himaschoice1@gmail.com</a>
              </div>
            </div>
          </address>
          
          <a 
            href={`https://wa.me/${phoneNumber}`} 
            className={styles.waFooterBtn} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <WhatsAppBrandIcon size={20} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>&copy; {currentYear} Smart Stitch Enterprises. All rights reserved.</p>
          <p>
            Designed and Developed by <span className={styles.credit}>Dunga Technologies</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;