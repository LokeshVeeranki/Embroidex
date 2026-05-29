import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './AdminSidebar.module.css';
import { useAuth } from '../../context/AuthContext';

// Premium Technical Icons
const Icons = {
  Dashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
  ),
  Inventory: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
  Leads: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  LogOut: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
  )
};

const AdminSidebar = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const isAdmin = user?.role === 'admin';

  return (
    <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarOpen : ''}`}>
      {/* Branding Section - Aligned with Header */}
      <div className={styles.logoSection}>
        <span className={styles.logoText}>SMART STITCH</span>
        <span className={styles.adminTag}>ENTERPRISES</span>
      </div>

      {/* Navigation Group */}
      <nav className={styles.navigation}>
        <div className={styles.navGroup}>
          <span className={styles.groupLabel}>Main Operations</span>
          
          {isAdmin && (
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : styles.link}>
              <div className={styles.iconBox}><Icons.Dashboard /></div>
              <span>Dashboard</span>
              {/* The Active Glow is handled in CSS via ::before */}
            </NavLink>
          )}

          {isAdmin && (
            <NavLink to="/machines-list" className={({ isActive }) => isActive ? styles.active : styles.link}>
              <div className={styles.iconBox}><Icons.Inventory /></div>
              <span>Inventory</span>
            </NavLink>
          )}

          <NavLink to="/add-machine" className={({ isActive }) => isActive ? styles.active : styles.link}>
            <div className={styles.iconBox}><Icons.Plus /></div>
            <span>New Intake</span>
          </NavLink>

          {isAdmin && (
            <NavLink to="/user-management" className={({ isActive }) => isActive ? styles.active : styles.link}>
              <div className={styles.iconBox}><Icons.Users /></div>
              <span>User Management</span>
            </NavLink>
          )}

          {isAdmin && (
            <NavLink to="/contact-management" className={({ isActive }) => isActive ? styles.active : styles.link}>
              <div className={styles.iconBox}><Icons.Leads /></div>
              <span>Contact Inquiries</span>
            </NavLink>
          )}
        </div>
      </nav>

      {/* Footer Area */}
      <div className={styles.sidebarFooter}>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <Icons.LogOut /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;