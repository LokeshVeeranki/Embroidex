import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Settings2, X, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import styles from './Home.module.css';

// --- CONFIG & CONSTANTS ---
const API_BASE_URL = 'http://localhost:8000/api'; // Swap to process.env or import.meta.env in production
const WHATSAPP_NUMBER = "917207528651";

// Custom WhatsApp Icon (as Lucide doesn't have brand icons)
const WhatsAppBrandIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Home3 = () => {
  const { user } = useAuth();
  
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- DATA FETCHING ---
  const fetchMachines = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/machines/`);
      
      if (!response.ok) throw new Error('Failed to fetch machines');
      
      const data = await response.json();
      if (data.success) {
        const formattedMachines = data.machines.slice(0, 3).map(machine => ({
          id: machine.machine_id,
          name: machine.name,
          brand: machine.brand,
          specs: {
            heads: machine.head_type,
            needles: `${machine.needle_count || 0} Needles`,
          },
          price: `₹${Number(machine.price).toLocaleString('en-IN')}`,
          img: machine.image || "https://via.placeholder.com/400x300"
        }));
        setMachines(formattedMachines);
      }
    } catch (err) {
      console.error('Error fetching machines:', err);
      setError('Unable to load inventory. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMachines();
  }, [fetchMachines]);

  // --- RENDER HELPERS ---
  const renderContent = () => {
    if (loading) {
      return (
        <div className={styles.systemStateContainer} aria-live="polite">
          <Loader2 className={styles.spinningIcon} size={32} />
          <p>Loading premium inventory...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.systemStateContainer} role="alert">
          <p className={styles.errorText}>{error}</p>
          <button onClick={fetchMachines} className={styles.retryBtn}>Retry</button>
        </div>
      );
    }

    if (machines.length === 0) {
      return (
        <div className={styles.systemStateContainer}>
          <p>Inventory is currently being updated. Check back soon.</p>
        </div>
      );
    }

    return machines.map((machine) => {
      const waMsg = encodeURIComponent(`Hello Smart Stitch, I am interested in the ${machine.name}. Please share more details.`);

      return (
        <article key={machine.id} className={styles.premiumCard}>
          {/* Visual Stage Area */}
          <figure className={styles.cardVisualStage}>
            <div className={styles.brandBadge}>{machine.brand}</div>
            <img 
              src={machine.img} 
              alt={machine.name} 
              className={styles.machineImage} 
              loading="lazy"
              decoding="async"
            />
            
            {/* Floating Glass Spec Bar */}
            <figcaption className={styles.glassSpecsBar}>
              <div className={styles.specPill} title="Head Type">
                <Layers size={16} aria-hidden="true" /> 
                <span>{machine.specs.heads}</span>
              </div>
              <div className={styles.specDivider} aria-hidden="true" />
              <div className={styles.specPill} title="Needles">
                <Settings2 size={16} aria-hidden="true" /> 
                <span>{machine.specs.needles}</span>
              </div>
            </figcaption>
          </figure>

          {/* Content & Actions */}
          <div className={styles.cardBody}>
            <h3 className={styles.machineName}>{machine.name}</h3>
            
            <div className={styles.priceActionRow}>
              <div className={styles.priceBlock}>
                <span className={styles.priceLabel}>Estimated Price</span>
                <span className={styles.priceValue}>{machine.price}</span>
              </div>
              
              <div className={styles.actionButtonGroup} role="group" aria-label="Machine actions">
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`} 
                  className={styles.iconBtnWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Inquire via WhatsApp"
                >
                  <WhatsAppBrandIcon size={20} />
                </a>
                <Link to={`/machines/${machine.id}`} className={styles.detailsBtn}>
                  Details
                </Link>
              </div>
            </div>
          </div>
          
          <div className={styles.accentHoverLine} aria-hidden="true" />
        </article>
      );
    });
  };

  return (
    <section className={styles.machinesSection} aria-labelledby="inventory-heading">
      <div className={styles.machinesContainer}>
        
        {/* Architectural Section Header */}
        <header className={styles.sectionHeader}>
          <div className={styles.headerWatermark} aria-hidden="true">01</div>
          <div className={styles.headerContent}>
            <h2 id="inventory-heading" className={styles.sectionTitle}>
              Featured <br />
              <span className={styles.accentText}>Inventory</span>
            </h2>
            <p className={styles.sectionDesc}>
              Discover our lineup of precision-engineered machinery. Designed for uncompromising quality and 24/7 industrial performance.
            </p>
          </div>
        </header>

        {/* Premium Machine Grid */}
        <div className={styles.machineGrid}>
          {renderContent()}
        </div>

        {/* Bottom Call to Action */}
        {!loading && !error && machines.length > 0 && (
          <div className={styles.bottomCtaWrapper}>
            <Link to="/machines" className={styles.viewCatalogBtn}>
              <span>Explore Full Catalog</span>
              <div className={styles.btnArrowCircle}>
                <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home3;