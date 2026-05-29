import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, Layers, Settings2, X, Loader2, RefreshCcw 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './MachinesListing.module.css';

// --- CONFIG & CONSTANTS ---
const API_BASE_URL = 'http://localhost:8000/api';
const WHATSAPP_NUMBER = "917207528651";

// Custom WhatsApp Icon
const WhatsAppBrandIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FILTER_CONFIG = {
  conditions: ["New", "Second hand"],
  types: ["Single Head", "Double Head", "Multi Head"],
  brands: ["Tajima", "Ricoma", "Brother", "Jack"]
};

const MachinesListing = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  
  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  
  const [allMachines, setAllMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync Initial Params from URL
  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat === 'single') setSelectedTypes(['Single Head']);
    else if (cat === 'multi') setSelectedTypes(['Multi Head']);
    else if (cat === 'used') setSelectedConditions(['Second hand']);
    else if (cat === 'industrial') setSelectedTypes(['Multi Head']);
  }, [searchParams]);

  // Data Fetching
  const fetchMachines = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/machines/`);
      if (!response.ok) throw new Error('Failed to fetch machines');
      
      const data = await response.json();
      if (data.success) {
        const formattedMachines = data.machines.map(machine => ({
          id: machine.machine_id,
          name: machine.name,
          brand: machine.brand,
          type: machine.head_type,
          condition: machine.condition,
          price: `₹${Number(machine.price).toLocaleString('en-IN')}`,
          rawPrice: Number(machine.price),
          needles: machine.needle_count || 0,
          image: machine.image || "https://via.placeholder.com/400x300"
        }));
        setAllMachines(formattedMachines);
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

  // Filter Logic
  const filteredMachines = useMemo(() => {
    return allMachines.filter(machine => {
      const matchesSearch = machine.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            machine.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(machine.condition);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(machine.type);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(machine.brand);
      
      const matchesPrice = (!priceRange.min || machine.rawPrice >= Number(priceRange.min)) &&
                           (!priceRange.max || machine.rawPrice <= Number(priceRange.max));
      
      return matchesSearch && matchesCondition && matchesType && matchesBrand && matchesPrice;
    });
  }, [searchQuery, selectedConditions, selectedTypes, selectedBrands, priceRange, allMachines]);

  // Handlers
  const toggleArrayFilter = (setter, value) => {
    setter(prev => prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]);
  };

  const resetFilters = () => {
    setSelectedConditions([]);
    setSelectedTypes([]);
    setSelectedBrands([]);
    setSearchQuery("");
    setPriceRange({ min: '', max: '' });
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.dotGrid} aria-hidden="true" />

      {/* Premium Header */}
      <header className={styles.listingHeader}>
        <div className={styles.container}>
          <div className={styles.headerWatermark} aria-hidden="true">INVENTORY</div>
          <div className={styles.headerTitleBox}>
            <div className={styles.subHeadingWrapper}>
              <span className={styles.subLine} aria-hidden="true" />
              <span className={styles.subText}>2024 Technical Catalog</span>
            </div>
            <h1>Inventory <span className={styles.accentText}>Specification.</span></h1>
          </div>
        </div>
      </header>

      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.layout}>
            
            {/* Architectural Filter Sidebar */}
            <aside className={`${styles.sidebar} ${isFilterOpen ? styles.sidebarActive : ''}`}>
              <div className={styles.sidebarSticky}>
                <div className={styles.sidebarHeader}>
                  <h3><Filter size={18} strokeWidth={2.5} /> Filters</h3>
                  <div className={styles.sidebarHeaderActions}>
                    <button onClick={resetFilters} className={styles.resetBtn}>Reset</button>
                    <button onClick={() => setIsFilterOpen(false)} className={styles.closeSidebarBtn} aria-label="Close filters">
                      <X size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
                
                <div className={styles.filterSection}>
                  <label className={styles.filterLabel}>Condition</label>
                  <div className={styles.filterOptions}>
                    {FILTER_CONFIG.conditions.map(c => (
                      <button 
                        key={c}
                        className={selectedConditions.includes(c) ? styles.optionActive : styles.optionBtn}
                        onClick={() => toggleArrayFilter(setSelectedConditions, c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.filterSection}>
                  <label className={styles.filterLabel}>Head Configuration</label>
                  <div className={styles.filterOptions}>
                    {FILTER_CONFIG.types.map(t => (
                      <button 
                        key={t}
                        className={selectedTypes.includes(t) ? styles.optionActive : styles.optionBtn}
                        onClick={() => toggleArrayFilter(setSelectedTypes, t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.filterSection}>
                  <label className={styles.filterLabel}>Price Range (₹)</label>
                  <div className={styles.priceRangeInputs}>
                    <input 
                      type="number" 
                      placeholder="Min" 
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      className={styles.priceInput}
                    />
                    <span className={styles.priceSeparator}>-</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      className={styles.priceInput}
                    />
                  </div>
                </div>

                <div className={styles.filterSection}>
                  <label className={styles.filterLabel}>Manufacturers</label>
                  <div className={styles.brandList}>
                    {FILTER_CONFIG.brands.map(brand => (
                      <label key={brand} className={styles.brandCheckbox}>
                        <input 
                          type="checkbox" 
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleArrayFilter(setSelectedBrands, brand)}
                        />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className={styles.content}>
              
              <div className={styles.mobileFilterToggle}>
                <button onClick={() => setIsFilterOpen(true)} className={styles.filterToggleBtn}>
                  <Filter size={18} strokeWidth={2.5} /> <span>Open Filters</span>
                </button>
              </div>
              
              <div className={styles.searchContainer}>
                <Search size={20} strokeWidth={2.5} color="#94a3b8" />
                <input 
                  type="text" 
                  value={searchQuery}
                  placeholder="Query model specification or manufacturer..." 
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className={styles.clearSearch} aria-label="Clear search">
                    <X size={18} strokeWidth={2.5} />
                  </button>
                )}
              </div>

              <div className={styles.resultsBar}>
                <p>Showing <span>{filteredMachines.length}</span> Units found in database</p>
              </div>

              {/* Rendering States */}
              {loading ? (
                <div className={styles.systemStateContainer}>
                  <Loader2 className={styles.spinningIcon} size={32} />
                  <p>Loading inventory specifications...</p>
                </div>
              ) : error ? (
                <div className={styles.systemStateContainer}>
                  <p className={styles.errorText}>{error}</p>
                  <button onClick={fetchMachines} className={styles.resetMainBtn}>
                    <RefreshCcw size={16} /> Retry
                  </button>
                </div>
              ) : filteredMachines.length === 0 ? (
                <div className={styles.emptyState}>
                  <Search size={48} strokeWidth={1} color="#cbd5e1" className={styles.emptyIcon} />
                  <h3>No Matching Specifications Found</h3>
                  <p>Try adjusting your filters or search query to find what you're looking for.</p>
                  <button onClick={resetFilters} className={styles.resetMainBtn}>Clear All Filters</button>
                </div>
              ) : (
                <div className={styles.grid}>
                  {filteredMachines.map(machine => {
                    const waMsg = encodeURIComponent(`Hello Smart Stitch, I am interested in the ${machine.name}. Please share more details.`);

                    return (
                      <article key={machine.id} className={styles.premiumCard}>
                        <figure className={styles.cardVisualStage}>
                          <span className={machine.condition === 'New' ? styles.tagNew : styles.tagUsed}>
                            {machine.condition}
                          </span>
                          <img 
                            src={machine.image} 
                            alt={machine.name} 
                            loading="lazy" 
                            decoding="async" 
                          />
                          <figcaption className={styles.glassSpecs}>
                            <div className={styles.glassItem}>
                              <Layers size={16} strokeWidth={2.5} /> {machine.type}
                            </div>
                            <div className={styles.glassDivider} />
                            <div className={styles.glassItem}>
                              <Settings2 size={16} strokeWidth={2.5} /> {machine.needles} Needles
                            </div>
                          </figcaption>
                        </figure>
                        
                        <div className={styles.cardBody}>
                          <span className={styles.brandTag}>{machine.brand}</span>
                          <h3 className={styles.machineTitle}>{machine.name}</h3>
                          
                          <div className={styles.cardFooter}>
                            <div className={styles.priceInfo}>
                              <small>INVESTMENT</small>
                              <span>{machine.price}</span>
                            </div>
                            <div className={styles.actionGroup}>
                              <a 
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`} 
                                target="_blank" 
                                rel="noreferrer" 
                                className={styles.waIconBtn}
                                aria-label="Inquire on WhatsApp"
                              >
                                <WhatsAppBrandIcon size={18} />
                              </a>
                              <Link to={`/machines/${machine.id}`} className={styles.detailsBtn}>
                                Details
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className={styles.accentLine} aria-hidden="true" />
                      </article>
                    );
                  })}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MachinesListing;