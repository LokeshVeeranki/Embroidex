import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import styles from './Dashboard.module.css';

// Centralized Premium SVGs (Removed unused Plus, Check, and Activity icons)
const Icons = {
  Package: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Message: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  Trend: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
  )
};

const Dashboard = () => {
  const [stats, setStats] = useState({ machines: 0, users: 0, contacts: 0 });
  const [recentMachines, setRecentMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch machines
      const machinesResponse = await fetch('http://localhost:8000/api/machines/');
      const machinesData = await machinesResponse.json();
      
      // Fetch users
      const usersResponse = await fetch('http://localhost:8000/api/users/');
      const usersData = await usersResponse.json();

      // Fetch contacts
      const contactsResponse = await fetch('http://localhost:8000/api/contact/');
      const contactsData = await contactsResponse.json();

      setStats({
        machines: machinesData.success ? machinesData.machines.length : 0,
        users: usersData.success ? usersData.users.length : 0,
        contacts: contactsData.success ? contactsData.contacts.length : 0
      });

      // Get recent machines (last 5)
      if (machinesData.success && machinesData.machines.length > 0) {
        const recent = machinesData.machines.slice(-5).reverse().map(machine => ({
          id: machine.machine_id,
          name: machine.name,
          brand: machine.brand,
          date: new Date(machine.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          condition: machine.condition,
          price: `₹${Number(machine.price).toLocaleString('en-IN')}`
        }));
        setRecentMachines(recent);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    { id: 1, label: "LIVE ASSETS", value: stats.machines, icon: <Icons.Package />, color: "var(--primary-blue)", progress: Math.min((stats.machines / 50) * 100, 100) },
    { id: 2, label: "TOTAL USERS", value: stats.users, icon: <Icons.Users />, color: "var(--accent-pink)", progress: Math.min((stats.users / 20) * 100, 100) },
    { id: 3, label: "CONTACT MSGS", value: stats.contacts, icon: <Icons.Message />, color: "#10b981", progress: Math.min((stats.contacts / 50) * 100, 100) },
    { id: 4, label: "SYSTEM STATUS", value: "Active", icon: <Icons.Trend />, color: "var(--primary-blue)", progress: 100 },
  ];

  return (
    <div className={styles.adminWrapper}>
      <AdminHeader isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className={styles.adminLayout}>
        <AdminSidebar isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        
        <main className={styles.mainContent}>
          <div className={styles.dotGrid}></div>

          <header className={styles.dashboardHeader}>
            <div className={styles.headerTitle}>
              <div className={styles.subHeadingWrapper}>
                <span className={styles.subLine}></span>
                <span className={styles.subText}>OPERATIONS CONSOLE</span>
              </div>
              <h1>System <span className={styles.accentText}>Overview.</span></h1>
            </div>
          </header>

          {/* Data Modules (Stats) */}
          <div className={styles.statsGrid}>
            {statsData.map(stat => (
              <div key={stat.id} className={styles.statCard}>
                <div className={styles.cardWatermark}>{stat.label.split(' ')[0]}</div>
                <div className={styles.statTop}>
                  <div className={styles.statIconBox} style={{ color: stat.color, background: `${stat.color}10` }}>
                    {stat.icon}
                  </div>
                  <div className={styles.statTrend} style={{ color: stat.color }}>
                    <Icons.Trend />
                  </div>
                </div>
                <div className={styles.statData}>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <h3 className={styles.statValue}>{stat.value}</h3>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: `${stat.progress}%`, background: stat.color }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.dataGrid}>
            {/* Main Log Table */}
            <div className={styles.tableModule}>
              <div className={styles.moduleHeader}>
                <h3>Recent Machines Added</h3>
                <button className={styles.moduleLink} onClick={() => window.location.href = '/machines-list'}>View All</button>
              </div>
              <div className={styles.tableWrapper}>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
                ) : recentMachines.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px' }}>No machines found</div>
                ) : (
                  <table className={styles.technicalTable}>
                    <thead>
                      <tr>
                        <th>Machine Name</th>
                        <th>Brand</th>
                        <th>Condition</th>
                        <th>Price</th>
                        <th>Added Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentMachines.map(item => (
                        <tr key={item.id}>
                          <td><span className={styles.clientName}>{item.name}</span></td>
                          <td className={styles.machineSpec}>{item.brand}</td>
                          <td>
                            <span className={`${styles.priorityTag} ${item.condition === 'New' ? styles.priorityHigh : styles.priorityMedium}`}>
                              {item.condition}
                            </span>
                          </td>
                          <td className={styles.timeData}>{item.price}</td>
                          <td>
                            <span className={styles.statusBadge}>{item.date}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Sidebar Column */}
            <div className={styles.utilityColumn}>
              <div className={styles.activityFeed}>
                <h3>Recent Activity</h3>
                <div className={styles.feedList}>
                  {recentMachines.slice(0, 3).map((machine, index) => (
                    <div key={machine.id} className={styles.feedItem}>
                      <div className={styles.feedNode}></div>
                      <div className={styles.feedContent}>
                        <p>New Machine Added: <strong>{machine.name}</strong></p>
                        <span>{machine.date} - {machine.brand}</span>
                      </div>
                    </div>
                  ))}
                  {recentMachines.length === 0 && !loading && (
                    <div className={styles.feedItem}>
                      <div className={styles.feedNode}></div>
                      <div className={styles.feedContent}>
                        <p>No recent activity</p>
                        <span>System Ready</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <AdminFooter />
    </div>
  );
};

export default Dashboard;