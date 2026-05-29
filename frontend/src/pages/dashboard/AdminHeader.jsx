import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminHeader.module.css';
import { useAuth } from '../../context/AuthContext';

const Icons = {
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  ),
  Mail: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  LogOut: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  )
};

const AdminHeader = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.adminHeader}>
      <div className={styles.headerContainer}>

        {/* LEFT: Mobile Menu Toggle */}
        <button className={styles.mobileMenuToggle} onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
        </button>

        {/* CENTER: Global Search */}
        <div className={styles.headerCenter}>
          <div className={styles.commandSearch}>
            <Icons.Search />
            <input type="text" placeholder="Search system registry..." className={styles.searchInput} />
          </div>
        </div>
        
        {/* RIGHT: User Profile Dropdown */}
        <div className={styles.headerRight}>
          <div className={styles.profileWrapper} ref={dropdownRef}>
            
            <button 
              className={styles.profileTrigger} 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
            >
              <div className={styles.avatarWrapper}>
                <Icons.User />
              </div>
              <span className={styles.userName}>{user ? `${user.first_name} ${user.last_name}` : 'Loading...'}</span>
              <div className={`${styles.chevron} ${isDropdownOpen ? styles.chevronRotate : ''}`}>
                <Icons.ChevronDown />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>
                  <span className={styles.roleTag}>{user ? user.role.toUpperCase() : 'USER'}</span>
                  <div className={styles.userEmail}>
                    <Icons.Mail />
                    <span>{user ? user.email : 'Loading...'}</span>
                  </div>
                </div>
                
                <div className={styles.divider}></div>

                <button className={styles.logoutItem} onClick={handleLogout}>
                  <Icons.LogOut />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;