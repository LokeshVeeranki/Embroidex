import React from 'react';
import styles from './AdminFooter.module.css';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.adminFooter}>
      <div className={styles.footerContainer}>
        {/* Left: Standard Copyright */}
        <div className={styles.leftSide}>
          <p>
            &copy; {currentYear} <strong>Smart Stitch Enterprises</strong>. 
            <span className={styles.hideMobile}> All rights reserved.</span>
          </p>
        </div>
        
        {/* Right: Technical Credit */}
        <div className={styles.rightSide}>
          <div className={styles.devBox}>
            <span className={styles.techLabel}>Designed and Developed by</span>
            <span className={styles.versionTag}>Dunga Technologies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;