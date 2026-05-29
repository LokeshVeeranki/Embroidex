import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './MachineDetails.module.css';

// Premium Custom SVGs
const Icons = {
  WhatsApp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
  ),
  Layers: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
  ),
  Needle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m14.5 12.5-8 8a2.11 2.11 0 1 1-3-3l8-8"/><path d="m16 10 3.35-3.35a2.12 2.12 0 0 0 0-3h0a2.12 2.12 0 0 0-3 0L13 7"/><path d="m16.1 7.1 2.8 2.8"/></svg>
  ),
  Speed: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  ),
  Area: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V3"/></svg>
  )
};

const MachineDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const whatsappNumber = "917207528651";
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMachineDetails();
  }, [id]);

  const fetchMachineDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/machines/${id}/`);
      const data = await response.json();
      
      console.log('Machine details API response:', data);
      
      if (data.success) {
        const formattedMachine = {
          id: data.machine.machine_id,
          name: data.machine.name,
          brand: data.machine.brand,
          type: data.machine.head_type,
          condition: data.machine.condition,
          price: `₹${Number(data.machine.price).toLocaleString('en-IN')}`,
          needles: data.machine.needle_count || 0,
          speed: "1200 SPM",
          area: "350 x 500 mm",
          description: data.machine.description || "",
          image: data.machine.image || "https://via.placeholder.com/400x300"
        };
        console.log('Formatted machine:', formattedMachine);
        setMachine(formattedMachine);
      }
    } catch (error) {
      console.error('Error fetching machine details:', error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading machine details...</div>
      </div>
    );
  }

  if (!machine) {
    return (
      <div className={styles.notFoundPage}>
        <h2>Specification Not Found</h2>
        <Link to="/machines" className={styles.backBtnPill}>Return to Inventory</Link>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.dotGrid}></div>

      <div className={styles.container}>
        {/* Architectural Header */}
        <div className={styles.detailsHeader}>
          <div className={styles.headerWatermark}>SPECS</div>
        </div>

        <div className={styles.mainLayout}>
          
          {/* Left: Product Stage */}
          <div className={styles.visualSide}>
            <div className={styles.imageStage}>
              <div className={styles.stageBackdrop}></div>
              <span className={machine.condition === 'New' ? styles.tagNew : styles.tagUsed}>
                {machine.condition}
              </span>
              <img src={machine.image} alt={machine.name} className={styles.mainImage} />
            </div>
          </div>

          {/* Right: Technical Information */}
          <div className={styles.infoSide}>
            <div style={{ marginBottom: '20px' }}>
              <div className={styles.brandBadge}>{machine.brand} INDUSTRIAL</div>
            </div>
            <h1 className={styles.productTitle}>{machine.name}</h1>
            <p className={styles.mainDescription}>{machine.description}</p>

            <div className={styles.technicalSpecsGrid}>
              <div className={styles.specModule}>
                <div className={styles.specIcon}><Icons.Layers /></div>
                <div className={styles.specMeta}>
                  <small>Configuration</small>
                  <h4>{machine.type}</h4>
                </div>
              </div>
              <div className={styles.specModule}>
                <div className={styles.specIcon}><Icons.Needle /></div>
                <div className={styles.specMeta}>
                  <small>Needle Array</small>
                  <h4>{machine.needles} Needles</h4>
                </div>
              </div>
              <div className={styles.specModule}>
                <div className={styles.specIcon}><Icons.Speed /></div>
                <div className={styles.specMeta}>
                  <small>Max Speed</small>
                  <h4>{machine.speed}</h4>
                </div>
              </div>
              <div className={styles.specModule}>
                <div className={styles.specIcon}><Icons.Area /></div>
                <div className={styles.specMeta}>
                  <small>Working Area</small>
                  <h4>{machine.area}</h4>
                </div>
              </div>
            </div>

            <div className={styles.actionPlaque}>
              <div className={styles.valuationBox}>
                <small>ESTIMATED INVESTMENT</small>
                <span className={styles.priceValue}>{machine.price}</span>
              </div>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`I'm interested in the ${machine.name}. Please provide a quote.`)}`} 
                className={styles.waPillBtn}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.WhatsApp />
                <span>Inquiry on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MachineDetails;