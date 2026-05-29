import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import styles from './MachineManagement.module.css';

const Icons = {
  Plus: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  ),
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  Filter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
  ),
  Edit: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
  ),
  Trash: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
  )
};

const MachineManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/machines/');
      const data = await response.json();
      
      if (data.success) {
        const formattedMachines = data.machines.map(machine => ({
          id: machine.machine_id,
          name: machine.name,
          brand: machine.brand,
          price: Number(machine.price).toLocaleString('en-IN'),
          condition: machine.condition,
          type: machine.head_type,
          image: machine.image || "https://via.placeholder.com/100x100",
          isActive: machine.is_active,
          approvalStatus: machine.approval_status || 'pending'
        }));
        setMachines(formattedMachines);
      }
    } catch (error) {
      console.error('Error fetching machines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Archive this machine record from the registry?")) {
      try {
        const response = await fetch(`http://localhost:8000/api/machines/${id}/`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setMachines(machines.filter(m => m.id !== id));
        }
      } catch (error) {
        console.error('Error deleting machine:', error);
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/api/machines/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentStatus }),
      });
      
      if (response.ok) {
        setMachines(machines.map(m => 
          m.id === id ? { ...m, isActive: !currentStatus } : m
        ));
      }
    } catch (error) {
      console.error('Error toggling machine status:', error);
    }
  };

  const handleApproval = async (id, approvalStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/machines/${id}/approve/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approval_status: approvalStatus }),
      });
      
      if (response.ok) {
        setMachines(machines.map(m => 
          m.id === id ? { ...m, approvalStatus: approvalStatus, isActive: approvalStatus === 'approved' } : m
        ));
      }
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };

  // Filter logic
  const filteredMachines = machines.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <span className={styles.subText}>ASSET MANAGEMENT</span>
              </div>
              <h1>Live <span className={styles.accentText}>Inventory.</span></h1>
            </div>
            <button onClick={() => navigate("/add-machine")} className={styles.addMachineBtn}>
              <Icons.Plus /> <span>New Asset Entry</span>
            </button>
          </header>

          <div className={styles.controlsRow}>
            <div className={styles.searchModule}>
              <Icons.Search />
              <input 
                type="text" 
                placeholder="Search by model or brand..." 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className={styles.filterToggle}>
              <Icons.Filter /> <span>Refine</span>
            </button>
          </div>

          <div className={styles.tableModule}>
            <div className={styles.tableWrapper}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>Loading assets...</div>
              ) : (
                <table className={styles.manifestTable}>
                  <thead>
                    <tr>
                      <th>Visual</th>
                      <th>Machine Details</th>
                      <th>Config</th>
                      <th>Price</th>
                      <th>Condition</th>
                      <th>Approval</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMachines.map((machine) => (
                      <tr key={machine.id}>
                        <td className={styles.visualCol}>
                          <div className={styles.imgFrame}>
                            <img src={machine.image} alt={machine.name} />
                          </div>
                        </td>
                        <td className={styles.mainInfoCol}>
                          <div className={styles.machineIdentity}>
                            <strong>{machine.name}</strong>
                            <span className={styles.brandBadge}>{machine.brand}</span>
                          </div>
                        </td>
                        <td><div className={styles.configTag}>{machine.type}</div></td>
                        <td><div className={styles.pricePill}>₹{machine.price}</div></td>
                        <td>
                          <span className={machine.condition === 'New' ? styles.statusNew : styles.statusUsed}>
                            {machine.condition}
                          </span>
                        </td>
                        <td>
                          {machine.approvalStatus === 'pending' ? (
                            <div className={styles.approvalActions}>
                              <button 
                                className={styles.approveBtn}
                                onClick={() => handleApproval(machine.id, 'approved')}
                              >
                                ✓ Approve
                              </button>
                              <button 
                                className={styles.rejectBtn}
                                onClick={() => handleApproval(machine.id, 'rejected')}
                              >
                                ✕ Reject
                              </button>
                            </div>
                          ) : (
                            <span className={
                              machine.approvalStatus === 'approved' ? styles.approvedBadge : styles.rejectedBadge
                            }>
                              {machine.approvalStatus}
                            </span>
                          )}
                        </td>
                        <td>
                          <label className={styles.switch}>
                            <input 
                              type="checkbox" 
                              checked={machine.isActive} 
                              onChange={() => handleToggleStatus(machine.id, machine.isActive)}
                            />
                            <span className={styles.slider}></span>
                          </label>
                        </td>
                        <td>
                          <div className={styles.actionGroup}>
                            <button className={styles.actionIcon} title="Edit" onClick={() => navigate(`/add-machine?edit=${machine.id}`)}><Icons.Edit /></button>
                            <button className={`${styles.actionIcon} ${styles.deleteIcon}`} onClick={() => handleDelete(machine.id)}><Icons.Trash /></button>
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

export default MachineManagement;