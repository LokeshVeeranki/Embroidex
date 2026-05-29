import React, { useState } from 'react';
import styles from './Contact.module.css';

// Premium Inline SVGs for consistent stroke weight
const Icons = {
  Phone: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
  ),
  Mail: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
  ),
  MapPin: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  ),
  Clock: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
  ),
  Send: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
  ),
  WhatsApp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
};

const Contact = () => {
  const whatsappNumber = "917207528651";
  
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    machineName: '',
    message: ''
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.name,
          last_name: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          machine_name: formData.machineName,
          message: formData.message
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccess(true);
        setFormData({
          name: '',
          lastName: '',
          phone: '',
          email: '',
          machineName: '',
          message: ''
        });
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  };

  const openWhatsApp = () => {
    const message = `Hello Smart Stitch, I'm inquiring about your machinery.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className={styles.contactPage}>
      {/* Precision Dot Grid Background */}
      <div className={styles.dotGrid}></div>

      {/* Success Message */}
      {showSuccess && (
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✓</div>
          <div className={styles.successText}>
            <h4>Inquiry Sent Successfully!</h4>
            <p>Our technical team will reach out to you shortly.</p>
          </div>
          <button onClick={() => setShowSuccess(false)} className={styles.closeBtn}>×</button>
        </div>
      )}

      {/* Error Message */}
      {showError && (
        <div className={styles.errorMessage}>
          <div className={styles.errorIcon}>✕</div>
          <div className={styles.errorText}>
            <h4>Failed to Send Inquiry</h4>
            <p>Please try again later.</p>
          </div>
          <button onClick={() => setShowError(false)} className={styles.closeBtn}>×</button>
        </div>
      )}

      <section className={styles.mainSection}>
        <div className={styles.container}>
          
          <div className={styles.contactLayout}>
            
            {/* LEFT: Technical Info Column */}
            <div className={styles.infoColumn}>
              <div className={styles.headerBlock}>
                <div className={styles.subHeadingWrapper}>
                  <span className={styles.subLine}></span>
                  <span className={styles.subText}>Contact Support</span>
                </div>
                <h1 className={styles.mainHeading}>Let’s discuss your <br/><span className={styles.accentText}>Production.</span></h1>
              </div>

              <div className={styles.dataGrid}>
                {/* Office */}
                <div className={styles.dataCard}>
                  <div className={styles.cardWatermark}>HQ</div>
                  <div className={styles.iconBox}><Icons.MapPin /></div>
                  <div className={styles.cardInfo}>
                    <h4>Registered Office</h4>
                    <p>H No 1-5-213/2, Bhavani Nagar, Old Alwal, Medchal-Malkajgiri, Telangana - 500010</p>
                  </div>
                </div>

                {/* Phone */}
                <div className={styles.dataCard}>
                  <div className={styles.cardWatermark}>TEL</div>
                  <div className={styles.iconBox}><Icons.Phone /></div>
                  <div className={styles.cardInfo}>
                    <h4>Direct Lines</h4>
                    <p>+91 72075 28651</p>
                    <p>+91 81216 35407</p>
                  </div>
                </div>

                {/* Email */}
                <div className={styles.dataCard}>
                  <div className={styles.cardWatermark}>EML</div>
                  <div className={styles.iconBox}><Icons.Mail /></div>
                  <div className={styles.cardInfo}>
                    <h4>Electronic Mail</h4>
                    <p>himaschoice1@gmail.com</p>
                  </div>
                </div>

                {/* Clock */}
                <div className={styles.dataCard}>
                  <div className={styles.cardWatermark}>HRS</div>
                  <div className={styles.iconBox}><Icons.Clock /></div>
                  <div className={styles.cardInfo}>
                    <h4>Service Hours</h4>
                    <p>Mon - Sat: 10:00 - 19:00</p>
                    <p>Sun: By Appointment</p>
                  </div>
                </div>
              </div>

              {/* Glass WhatsApp Card */}
              <div className={styles.whatsappGlass}>
                <div className={styles.glassContent}>
                  <h3>Rapid Response</h3>
                  <p>Get instant machine quotes & Technical PDFs over WhatsApp.</p>
                </div>
                <button onClick={openWhatsApp} className={styles.waPill}>
                  <Icons.WhatsApp />
                  <span>Start Chat</span>
                </button>
              </div>
            </div>

            {/* RIGHT: Inquiry Module */}
            <div className={styles.formColumn}>
              <div className={styles.formModule}>
                <div className={styles.formModuleHeader}>
                  <h3>Technical Inquiry</h3>
                  <p>Provide your details for a customized quotation.</p>
                </div>
                
                <form onSubmit={handleSubmit} className={styles.mainForm}>
                  <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                      <label>First Name <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" name="name" required placeholder="Enter your first name" onChange={handleChange} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Last Name <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" name="lastName" required placeholder="Enter your last name" onChange={handleChange} />
                    </div>
                  </div>

                  <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                      <label>Mobile Number <span style={{ color: 'red' }}>*</span></label>
                      <input type="tel" name="phone" required placeholder="Enter your mobile number" onChange={handleChange} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Email Address <span style={{ color: 'red' }}>*</span></label>
                      <input type="email" name="email" required placeholder="Enter your email address" onChange={handleChange} />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Machine Requirement (Optional)</label>
                    <input type="text" name="machineName" placeholder="e.g. 12 Head Industrial Multi-Head" onChange={handleChange} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Project Details <span style={{ color: 'red' }}>*</span></label>
                    <textarea name="message" rows="4" required placeholder="Briefly describe your production needs..." onChange={handleChange}></textarea>
                  </div>

                  <button type="submit" className={styles.submitPill}>
                    <span>Send Requirement</span>
                    <Icons.Send />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section - Integrated with Frameless Design */}
      <section className={styles.mapFrame}>
        <div className={styles.mapOverlay}></div>
        <iframe 
          title="location-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.1524387870934!2d78.4975543!3d17.500201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb906963d767db%3A0x6b30600109919f1d!2sOld%20Alwal%2C%20Alwal%2C%20Secunderabad%2C%20Telangana%20500010!5e0!3m2!1sen!2sin!4v1700000000000" 
          className={styles.googleMap}
          allowFullScreen="" 
          loading="lazy" 
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;