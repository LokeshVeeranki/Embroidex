import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import styles from './AddMachine.module.css';

// Premium Industrial Icons
const Icons = {
  Save: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
  ),
  Upload: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
  ),
  Info: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  ),
  Specs: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="12"/></svg>
  ),
  CheckCircle: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  )
};

const AddMachine = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const [isEditMode, setIsEditMode] = useState(!!editId);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    features: '',
    price: '',
    price_type: 'Fixed',
    condition: 'New',
    needle_count: '',
    head_type: 'Single Head',
    video_link: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (editId) {
      fetchMachineDetails();
    }
  }, [editId]);

  const fetchMachineDetails = async () => {
    try {
      console.log('Fetching machine details for editId:', editId);
      const response = await fetch(`http://localhost:8000/api/machines/${editId}/`);
      const data = await response.json();
      
      console.log('Machine details response:', data);
      
      if (data.success) {
        const newFormData = {
          name: data.machine.name,
          brand: data.machine.brand,
          description: data.machine.description || '',
          features: data.machine.features || '',
          price: data.machine.price,
          price_type: data.machine.price_type,
          condition: data.machine.condition,
          needle_count: data.machine.needle_count || '',
          head_type: data.machine.head_type,
          video_link: data.machine.video_link || ''
        };
        console.log('Setting form data:', newFormData);
        setFormData(newFormData);
        if (data.machine.image) {
          setImagePreview(data.machine.image);
        }
      } else {
        console.error('API returned success=false:', data);
      }
    } catch (error) {
      console.error('Error fetching machine details:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('features', formData.features);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('price_type', formData.price_type);
      formDataToSend.append('condition', formData.condition);
      if (formData.needle_count) {
        formDataToSend.append('needle_count', formData.needle_count);
      }
      formDataToSend.append('head_type', formData.head_type);
      if (formData.video_link) {
        formDataToSend.append('video_link', formData.video_link);
      }
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const url = isEditMode ? `http://localhost:8000/api/machines/${editId}/` : 'http://localhost:8000/api/machines/';
      const method = isEditMode ? 'PUT' : 'POST';

      console.log('Submitting:', { url, method, isEditMode, editId });

      const response = await fetch(url, {
        method: method,
        body: formDataToSend,
      });

      const data = await response.json();

      console.log('API Response:', data);

      if (data.success) {
        setModalMessage(isEditMode ? 'Machine updated successfully!' : 'Machine submitted for approval. It will be visible once approved by admin.');
        setShowSuccessModal(true);
        // Reset form after successful submission
        if (!isEditMode) {
          setFormData({
            name: '',
            brand: '',
            description: '',
            features: '',
            price: '',
            price_type: 'Fixed',
            condition: 'New',
            needle_count: '',
            head_type: 'Single Head',
            video_link: ''
          });
          setImagePreview(null);
        }
      } else {
        console.error('Validation errors:', data.errors);
        alert(isEditMode ? 'Error updating machine: ' : 'Error adding machine: ' + JSON.stringify(data.errors));
      }
    } catch (error) {
      console.error('Error:', error);
      alert(isEditMode ? 'Error updating machine. Please try again.' : 'Error adding machine. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.adminWrapper}>
      <AdminSidebar isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      
      <div className={styles.mainContent}>
        <AdminHeader isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <div className={styles.pageInner}>
          <div className={styles.dotGrid}></div>

          <header className={styles.pageHeader}>
            <div className={styles.headerTitleBox}>
              <div className={styles.subHeadingWrapper}>
                <span className={styles.subLine}></span>
                <span className={styles.subText}>Asset Registry</span>
              </div>
              <h1>{isEditMode ? 'Edit' : 'Add New'} <span className={styles.accentText}>Machine.</span></h1>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.discardBtn}>Discard</button>
              <button onClick={handleSubmit} className={styles.publishBtn}>
                <span>Save Asset</span>
                <div className={styles.btnIconBox}><Icons.Save /></div>
              </button>
            </div>
          </header>

          <form className={styles.formGrid} onSubmit={handleSubmit}>
            <div className={styles.formColumn}>
              {/* Section 1: Basic Info */}
              <div className={styles.formModule}>
                <div className={styles.moduleWatermark}>DATA</div>
                <h3 className={styles.moduleTitle}><Icons.Info /> General Specifications</h3>
                
                <div className={styles.inputStack}>
                  <div className={styles.inputGroup}>
                    <label>Machine Model Name</label>
                    <input type="text" name="name" value={formData.name} placeholder="e.g. RICOMA MT-1501" required onChange={handleChange} />
                  </div>

                  <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                      <label>Manufacturer</label>
                      <select name="brand" value={formData.brand} required onChange={handleChange}>
                        <option value="">Select Brand</option>
                        <option value="Ricoma">Ricoma</option>
                        <option value="Tajima">Tajima</option>
                        <option value="Brother">Brother</option>
                        <option value="Jack">Jack</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Inventory Condition</label>
                      <select name="condition" value={formData.condition} onChange={handleChange}>
                        <option value="New">New / Factory Sealed</option>
                        <option value="Used">Used / Certified Pre-owned</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Detailed Technical Overview</label>
                    <textarea name="description" value={formData.description} rows="5" placeholder="Document the machine's mechanical history..." onChange={handleChange}></textarea>
                  </div>
                </div>
              </div>

              {/* Section 2: Technical Parameters */}
              <div className={styles.formModule}>
                <div className={styles.moduleWatermark}>SPECS</div>
                <h3 className={styles.moduleTitle}><Icons.Specs /> Mechanical Parameters</h3>
                <div className={styles.inputGrid}>
                  <div className={styles.inputGroup}>
                    <label>Unit Price (₹)</label>
                    <input type="number" name="price" value={formData.price} placeholder="0.00" required onChange={handleChange} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Pricing Model</label>
                    <select name="price_type" value={formData.price_type} onChange={handleChange}>
                      <option value="Fixed">Fixed Rate</option>
                      <option value="Negotiable">Negotiable</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Needle Array</label>
                    <input type="number" name="needle_count" value={formData.needle_count} placeholder="e.g. 15" onChange={handleChange} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Head Config</label>
                    <select name="head_type" value={formData.head_type} onChange={handleChange}>
                      <option value="Single Head">Single Head</option>
                      <option value="Multi Head">Multi Head</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Media */}
            <div className={styles.mediaColumn}>
              <div className={styles.formModule}>
                <div className={styles.moduleWatermark}>MEDIA</div>
                <h3 className={styles.moduleTitle}>Visual Assets</h3>
                <div className={styles.mediaIntake}>
                  <label>Primary Reference Image</label>
                  <div className={styles.uploadStage}>
                    {imagePreview ? (
                      <div className={styles.previewFrame}>
                        <img src={imagePreview} alt="Machine Preview" />
                        <button type="button" onClick={() => setImagePreview(null)} className={styles.removeImg}><Icons.X /></button>
                      </div>
                    ) : (
                      <label className={styles.dropZone}>
                        <Icons.Upload />
                        <p>Upload High-Res JPG/PNG</p>
                        <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                      </label>
                    )}
                  </div>
                </div>

                <div className={styles.inputGroup} style={{ marginTop: '30px' }}>
                  <label>Key Features (Monospace Log)</label>
                  <textarea 
                    name="features" 
                    value={formData.features}
                    rows="6" 
                    className={styles.featureBox}
                    placeholder="e.g. 1200 SPM, Auto-Trim, Wi-Fi Logic..." 
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className={styles.inputGroup} style={{ marginTop: '20px' }}>
                  <label>Video Link (Optional)</label>
                  <input 
                    type="url"
                    name="video_link"
                    value={formData.video_link}
                    placeholder="https://youtube.com/..." 
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <AdminFooter />
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalIcon}>
              <Icons.CheckCircle />
            </div>
            <h2 className={styles.modalTitle}>Success!</h2>
            <p className={styles.modalMessage}>{modalMessage}</p>
            <button 
              className={styles.modalButton}
              onClick={() => setShowSuccessModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMachine;