import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Signup.module.css';
import { signupAPI } from '../../services/authService';

// Premium Custom Engineering Icons
const Icons = {
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Lock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  Phone: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  Eye: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  EyeOff: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.45 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
  )
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await signupAPI(formData);
      if (res.success) {
        setSuccess('Account created successfully! Redirecting to sign in...');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      const data = err.response?.data;
      if (data?.message) {
        setError(data.message);
      } else if (data?.errors) {
        const firstError = Object.values(data.errors)[0][0];
        setError(firstError);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.dotGrid}></div>
      
      <div className={styles.signupContainer}>
        {/* Branding Identity */}
        <div className={styles.brandSection}>
          <div className={styles.logo}>
            <span className={styles.logoText}>SMART STITCH <span className={styles.logoAccent}>ENTERPRISES</span></span>
          </div>
          <p className={styles.tagline}>Infrastructure Access Management</p>
        </div>

        {/* Secure Registry Module */}
        <div className={styles.signupCard}>
          
          <div className={styles.cardHeader}>
            <h2>Create Your Account</h2>
            <p>Fill in your details below to register and get started.</p>
          </div>

          {/* Error / Success Messages */}
          {error && (
            <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', marginBottom: '1rem', fontSize: '14px' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px 14px', borderRadius: '8px', marginBottom: '1rem', fontSize: '14px' }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSignup} className={styles.form}>
            {/* Name Row */}
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>First Name <span style={{ color: 'red' }}>*</span></label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}><Icons.User /></span>
                  <input 
                    type="text" 
                    name="first_name"
                    placeholder="Enter your first name" 
                    required 
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Last Name <span style={{ color: 'red' }}>*</span></label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}><Icons.User /></span>
                  <input 
                    type="text" 
                    name="last_name"
                    placeholder="Enter your last name" 
                    required 
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Contact Row */}
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Mobile Number <span style={{ color: 'red' }}>*</span></label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}><Icons.Phone /></span>
                  <input 
                    type="tel" 
                    name="mobile_number"
                    placeholder="Enter your mobile number" 
                    required 
                    value={formData.mobile_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address <span style={{ color: 'red' }}>*</span></label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}><Icons.Mail /></span>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Enter your email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className={styles.inputGroup}>
              <label>Password <span style={{ color: 'red' }}>*</span></label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><Icons.Lock /></span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  placeholder="Enter your password" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.passwordInput}
                />
                <button 
                  type="button" 
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.signupBtn} disabled={loading}>
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              {!loading && (
                <div className={styles.btnIconCircle}>
                  <Icons.ArrowRight />
                </div>
              )}
            </button>
          </form>

          <div className={styles.cardFooter}>
            <span className={styles.footerLine}></span>
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </div>

        <button onClick={() => navigate("/")} className={styles.backHomeBtn}>
          ← Return to Home
        </button>
      </div>
    </div>
  );
};

export default Signup;