import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import styles from './ContactManagement.module.css';

// Premium Custom Engineering Icons
const Icons = {
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  Phone: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  Calendar: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  ),
  Trash: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
  ),
  Message: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  )
};

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/contact/');
      const data = await response.json();
      
      if (data.success) {
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (contactId) => {
    if (window.confirm("Delete this inquiry?")) {
      try {
        const response = await fetch(`http://localhost:8000/api/contact/${contactId}/`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          fetchContacts();
        } else {
          alert('Failed to delete inquiry');
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('An error occurred while deleting');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className={styles.adminWrapper}>
      <AdminHeader isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className={styles.adminLayout}>
        <AdminSidebar isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        
        <main className={styles.mainContent}>
          <div className={styles.dotGrid}></div>

          <header className={styles.pageHeader}>
            <div className={styles.headerTitle}>
              <div className={styles.subHeadingWrapper}>
                <span className={styles.subLine}></span>
                <span className={styles.subText}>INQUIRY REGISTRY</span>
              </div>
              <h1>Contact <span className={styles.accentText}>Management.</span></h1>
            </div>
            
            <div className={styles.statsRow}>
              <div className={styles.miniPlaque}>
                <small>TOTAL INQUIRIES</small>
                <strong>{contacts.length}</strong>
              </div>
            </div>
          </header>

          <div className={styles.tableModule}>
            <div className={styles.tableWrapper}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>Loading inquiries...</div>
              ) : contacts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>No inquiries found</div>
              ) : (
                <table className={styles.contactsTable}>
                  <thead>
                    <tr>
                      <th>Contact Details</th>
                      <th>Communication</th>
                      <th>Machine Interest</th>
                      <th>Received Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.contact_id}>
                        <td className={styles.userCol}>
                          <div className={styles.userInfo}>
                            <div className={styles.userAvatar}><Icons.User /></div>
                            <div className={styles.userMeta}>
                              <strong>{contact.first_name} {contact.last_name}</strong>
                              <span className={styles.userEmail}>{contact.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className={styles.contactCol}>
                          <div className={styles.contactItem}>
                            <Icons.Phone /> {contact.phone}
                          </div>
                          <div className={styles.contactItem}>
                            <Icons.Mail /> {contact.email}
                          </div>
                        </td>
                        <td>
                          <div className={styles.machineCell}>
                            {contact.machine_name ? (
                              <span className={styles.machineTag}>{contact.machine_name}</span>
                            ) : (
                              <span className={styles.noMachine}>Not specified</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className={styles.dateCell}>
                            <Icons.Calendar /> {formatDate(contact.created_at)}
                          </div>
                        </td>
                        <td>
                          <div className={styles.actionGroup}>
                            <button className={styles.actionIcon} title="Delete" onClick={() => handleDelete(contact.contact_id)}>
                              <Icons.Trash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
      
      <AdminFooter />
    </div>
  );
};

export default ContactManagement;