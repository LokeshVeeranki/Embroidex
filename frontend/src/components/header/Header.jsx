import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, ArrowRight, LogOut, ChevronDown } from 'lucide-react';
import styles from './Header.module.css';
import logoImg from '../../assets/images/erasebg-transformed.png';
import { useAuth } from '../../context/AuthContext';

const WhatsAppBrandIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const NAV_LINKS_PUBLIC = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Machines', path: '/machines' },
  { name: 'Contact', path: '/contact' },
];

const NAV_LINKS_USER = [
  ...NAV_LINKS_PUBLIC,
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  
  const phoneNumber = "917207528651";
  const NAV_LINKS = user ? NAV_LINKS_USER : NAV_LINKS_PUBLIC;

  // Handle click outside to close dropdown natively and securely
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  
  const handleLogout = () => {
    logout();
    setIsOpen(false);
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navContainer} aria-label="Main Navigation">
          <Link to="/" className={styles.logoWrapper} onClick={closeMenu}>
            <img src={logoImg} alt="Smart Stitch Logo" className={styles.logoImage} />
          </Link>

          {/* Desktop Navigation */}
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Action Area */}
          <div className={styles.actionArea}>
            {user ? (
              <div className={styles.userDropdownWrapper} ref={dropdownRef}>
                <button
                  className={styles.dropdownToggle}
                  onClick={() => setIsDropdownOpen(prev => !prev)}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="menu"
                >
                  <div className={styles.userAvatar}>
                    <User size={16} strokeWidth={2.5} />
                  </div>
                  <span className={styles.userName}>{user.first_name} {user.last_name}</span>
                  <ChevronDown 
                    size={16} 
                    strokeWidth={2.5} 
                    className={`${styles.chevron} ${isDropdownOpen ? styles.chevronOpen : ''}`} 
                  />
                </button>
                
                {/* Desktop Dropdown Menu */}
                <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.dropdownMenuOpen : ''}`} role="menu">
                  <button onClick={handleLogout} className={styles.dropdownItemDanger} role="menuitem">
                    <LogOut size={16} strokeWidth={2.5} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className={styles.loginBtn}>
                <User size={18} strokeWidth={2.5} />
                <span>Login</span>
              </Link>
            )}

            <a
              href={`https://wa.me/${phoneNumber}`}
              className={styles.ctaBtn}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppBrandIcon size={18} />
              <span>Inquiry</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <aside 
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.drawerHeader}>
          <img src={logoImg} alt="Smart Stitch Logo" className={styles.drawerLogo} />
          <button className={styles.closeDrawerBtn} onClick={closeMenu} aria-label="Close Menu">
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

        <div className={styles.drawerContent}>
          <div className={styles.drawerLinks}>
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) => isActive ? `${styles.drawerLink} ${styles.drawerActive}` : styles.drawerLink}
                style={{ '--stagger-delay': `${(i + 1) * 80}ms` }}
              >
                <div className={styles.drawerLinkContent}>
                  <span>{link.name}</span>
                </div>
                <ArrowRight size={18} className={styles.drawerArrow} />
              </NavLink>
            ))}
          </div>

          <div className={styles.drawerFooter}>
            {user ? (
              <div className={styles.mobileUserArea}>
                <button
                  className={styles.mobileUserToggle}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                >
                  <div className={styles.userAvatar}>
                    <User size={18} strokeWidth={2.5} />
                  </div>
                  <span>{user.first_name} {user.last_name}</span>
                  <ChevronDown 
                    size={18} 
                    className={`${styles.chevron} ${isDropdownOpen ? styles.chevronOpen : ''}`} 
                  />
                </button>
                
                <div className={`${styles.mobileDropdown} ${isDropdownOpen ? styles.mobileDropdownOpen : ''}`}>
                  <button onClick={handleLogout} className={styles.mobileLogoutBtn}>
                    <LogOut size={18} strokeWidth={2.5} />
                    <span>Secure Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className={styles.drawerLogin} onClick={closeMenu}>
                <User size={20} strokeWidth={2.5} /> 
                <span>Login to Account</span>
              </Link>
            )}

            <a href={`https://wa.me/${phoneNumber}`} className={styles.drawerWa}>
              <WhatsAppBrandIcon size={20} /> 
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;