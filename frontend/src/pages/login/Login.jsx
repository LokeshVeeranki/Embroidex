import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';
import { loginAPI } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

// Premium Custom SVGs
const Icons = {
  Lock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginAPI({ email, password });
      if (res.success) {
        // Save to context + localStorage
        login(res.user, res.token);

        // Redirect based on role from backend
        if (res.redirect === 'dashboard') {
          navigate('/dashboard');
        } else if (res.redirect === 'add-machine') {
          navigate('/add-machine');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      const data = err.response?.data;
      if (data?.message) {
        setError(data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("A password reset link has been sent to your registered email address.");
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.dotGrid}></div>

      <div className={styles.loginContainer}>
        <div className={styles.brandSection}>
          <div className={styles.logo}>
            <span className={styles.logoText}>SMART STITCH <span className={styles.logoAccent}>ENTERPRISES</span></span>
          </div>
          <p className={styles.tagline}>Infrastructure Management Portal</p>
        </div>

        <div className={styles.loginCard}>
          <div className={styles.cardHeader}>
            <h2>Welcome Back</h2>
            <p>Sign in to access the inventory management portal.</p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', marginBottom: '1rem', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className={styles.form}>
            {/* Email */}
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><Icons.Mail /></span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label>Password</label>
                <button
                  type="button"
                  className={styles.forgotPasswordBtn}
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><Icons.Lock /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

            <button type="submit" className={styles.loginBtn} disabled={loading}>
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              {!loading && (
                <div className={styles.btnIconCircle}>
                  <Icons.ArrowRight />
                </div>
              )}
            </button>
          </form>

          <div className={styles.cardFooter}>
            <span className={styles.footerLine}></span>
            <p>Don't have an account? <Link to="/signup">Create Account</Link></p>
          </div>
        </div>

        <button onClick={() => navigate("/")} className={styles.backToSite}>
          ← Return to Home
        </button>
      </div>
    </div>
  );
};

export default Login;