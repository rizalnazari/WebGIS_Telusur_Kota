/* ═══════════════════════════════════════════════════════════════════════════════
   TELUSUR KOTA - MAIN STYLESHEET
   
   TABLE OF CONTENTS:
   
   1. ROOT VARIABLES & RESET
      - CSS custom properties untuk consistency
      - Global box-sizing & reset
      
   2. GLOBAL STYLING
      - Body, main, base elements
      
   3. PAGE 1: BERANDA (index.html)
      - Slider/Hero styling
      - Auto-advance animation
      - Navigation controls
      
   4. PAGE 2: TEMATRIP (tematrip.html)
      - Tour cards layout
      - Pagination buttons
      - Category tabs
      - Filter buttons
      
   5. PAGE 3: STORY MAPS (map.html)
      - Map container & controls
      - Basemap switcher
      - Legend & info panels
      - Side filter panel
      
   6. PAGE 4: TOURISM MAPS (tourismmaps.html)
      - Main map container
      - Panel styling (Legend, Route, Nearby)
      - Distance buttons
      - Result list formatting
      
   7. PAGE 5: ABOUT US (profile.html)
      - About page content styling
      
   8. HEADER & NAVIGATION
      - Fixed header styling
      - Navigation links
      
   9. FOOTER
      - Footer styling
      
   10. RESPONSIVE OVERRIDES
       - Mobile, tablet, desktop breakpoints
       
   11. UTILITIES & ANIMATIONS
       - Helper classes
       - Transitions & animations
       
═══════════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════════
   1. ROOT VARIABLES & RESET
═══════════════════════════════════════════════════════════════════════════════ */
:root {
  --primary-color: #007bff;
  --accent-cyan: #00acee;
  --bg-white: #ffffff;
  --bg-light: #f8f9fa;
  --header-bg: rgba(255, 255, 255, 0.95);
  --text-dark: #212529;
  --text-gray: #6c757d;
  --border-color: #e9ecef;
  --transition: all 0.3s ease;
  --header-height: 72px;
  --footer-height: 28px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--bg-light);
  color: var(--text-dark);
  font-family: 'Segoe UI', Roboto, Arial, sans-serif;
  overflow-x: hidden;
  padding-top: var(--header-height);
  padding-bottom: var(--footer-height);
}

/* ═══════════════════════════════════════════════════════════════════════════════
   8. HEADER & NAVIGATION
═══════════════════════════════════════════════════════════════════════════════ */

.main-header {
  position: fixed;
  top: 0; width: 100%;
  background: var(--header-bg);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.header-container {
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  padding: 15px 5%; 
  max-width: 1280px; 
  margin: 0 auto;
  transition: transform 0.3s ease;
}

.logo img { 
  height: 40px; 
}

.navbar { 
  display: flex; 
  gap: 25px; 
  align-items: center; 
  z-index: 1001;
}

.navbar a {
  text-decoration: none; 
  color: var(--text-dark);
  font-size: 14px; 
  font-weight: 600; 
  transition: var(--transition);
}

.navbar a:hover, .navbar a.active { color: var(--primary-color); }

/* ═══════════════════════════════════════════════════════════════════════════════
   HAMBURGER MENU (MOBILE ONLY)
═══════════════════════════════════════════════════════════════════════════════ */
.hamburger-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  gap: 5px;
}

.hamburger-btn span {
  width: 25px;
  height: 2.5px;
  background: var(--text-dark);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(10px, 10px);
}

.hamburger-btn.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* ═══════════════════════════════════════════════════════════════════════════════
   DROPDOWN STYLING
═══════════════════════════════════════════════════════════════════════════════ */
.dropdown { position: relative; }

.dropdown-content {
  position: absolute; 
  top: 100%; left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: var(--bg-white); 
  min-width: 160px;
  border-radius: 8px; 
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  display: flex; flex-direction: column; padding: 10px 0;
  opacity: 0; visibility: hidden; transition: var(--transition);
  border: 1px solid var(--border-color);
}

.dropdown:hover .dropdown-content {
  opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0);
}

.dropdown-content a { padding: 10px 20px; font-weight: 500; }
.dropdown-content a:hover { background: var(--bg-light); }

/* ═══════════════════════════════════════════════════════════════════════════════
   CONTENT STYLING
═══════════════════════════════════════════════════════════════════════════════ */
.section-badge {
  color: var(--primary-color); 
  font-weight: 700;
  text-transform: uppercase; 
  font-size: 12px; 
  letter-spacing: 2px;
}

.main-title { 
  font-size: clamp(1.6rem, 3.5vw, 2.8rem); 
  font-weight: 800; 
  color: var(--text-dark); 
  text-align: center; 
  margin: 0.4rem 0; 
}

.italic-accent { 
  color: var(--accent-cyan); 
  font-style: italic; 
}

.section-subtitle { 
  color: var(--text-gray); 
  margin-top: 15px; 
}

/*================== TEMA TRIP PAGE SECTIONS ================= */

/* ═══════════════════════════════════════════════════════════════════════════════
   TITLE & BADGE
═══════════════════════════════════════════════════════════════════════════════ */

.page-section-title {
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 10%;
}

.section-badge, .page-section-title .badge {
  display: inline-block;
  color: var(--primary-color); 
  font-weight: 700;
  text-transform: uppercase; 
  font-size: 12px; 
  letter-spacing: 2px;
  padding: 6px 14px;
  background: rgba(0,123,255,0.08);
  border-radius: 999px;
  margin-bottom: 10px;
}

.main-title, .page-section-title h2 { 
  font-size: clamp(1.8rem, 4vw, 2.8rem); 
  font-weight: 800; 
  color: var(--text-dark); 
  margin: 0.5rem 0; 
}

.italic-accent { color: var(--accent-cyan); font-style: italic; }

.section-subtitle { 
  color: var(--text-gray); 
  max-width: 700px;
  margin: 15px auto 0;
  line-height: 1.6;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. PAGE 2 - TEMATRIP: TAB FILTER BUTTONS
═══════════════════════════════════════════════════════════════════════════════ */

#tematrip-section {
    padding-top: 40px;
    padding-bottom: 20px;
}

.tabs-filter-row, .tabs-row {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 12px 30px; 
  border-radius: 50px; 
  border: 1px solid var(--border-color);
  background: var(--bg-white); 
  color: var(--text-gray);
  font-weight: 600; 
  cursor: pointer; 
  transition: var(--transition);
}

.tab-btn.active {
  background: var(--primary-color); 
  color: white;
  border-color: var(--primary-color); 
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.tab-btn:hover:not(.active) { 
  border-color: var(--primary-color); 
  color: var(--primary-color); 
}

.filter-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 40px;
    padding: 10px;
}

.filter-btn {
    padding: 12px 30px;
    border-radius: 50px;
    border: 1px solid #e0e0e0; /* Border abu-abu halus */
    background-color: #ffffff; /* Putih */
    color: #5f6368; /* Teks abu-abu */
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.filter-btn.active {
    background-color: #007bff; /* Biru sesuai mockup */
    color: #ffffff; /* Teks putih */
    border-color: #007bff;
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4); /* Shadow biru imersif */
}

.filter-btn:hover:not(.active) {
    background-color: #f8f9fa;
    border-color: #007bff;
    color: #007bff;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. PAGE 2 - TEMATRIP: TOUR GRID & CARDS
═══════════════════════════════════════════════════════════════════════════════ */
#tour-grid, #tour-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto 50px;
  padding: 0 20px;
}

/* Card Container */
.tour-card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #eee;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}

.tour-card:hover { 
  transform: translateY(-8px); 
  box-shadow: 0 15px 35px rgba(0,0,0,0.1); 
}

/* Image Section */
.card-image { 
  position: relative; 
  height: 200px; 
  overflow: hidden; 
}

.card-image img { 
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
}

.badge-time {
  position: absolute; 
  top: 15px; 
  left: 15px;
  background: rgba(255,255,255,0.9); 
  padding: 6px 12px;
  border-radius: 50px; 
  font-size: 13px; 
  font-weight: 700;
  color: #007bff; /* Biru Primer */
  display: flex; 
  align-items: center; 
  gap: 5px;
}

/* Body Section */
.card-body {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end; 
    margin-top: auto; 
    width: 100%;
    padding-top: 15px;
}

.card-body h3 { 
  font-size: 1.3rem; 
  font-weight: 700; 
  margin-bottom: 12px; 
  color: #1a1a1a;
}

/* Ensure tour-card h3 is left-aligned */
.tour-card .card-body h3 {
  text-align: left;
}

.card-body p {
  font-size: 14px; 
  color: #666; 
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden; 
  text-align: justify;
  margin-bottom: 20px;
}

/* Footer Section - Penempatan Harga & Tombol */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end; 
  margin-top: auto;
  padding-top: 15px;
}

/* Price Label & Value */
.price-box {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.price-box span {
  font-size: 11px;
  text-transform: uppercase;
  color: #888;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.price-box .price {
  font-size: 24px;
  font-weight: 800; 
  color: #007bff; 
  line-height: 1;
}

.card-btn-arrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: #e8f0f9;
  color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.card-btn-arrow:hover {
  background: #007bff;
  color: white;
  transform: scale(1.08);
}

/* ═══════════════════════════════════════════════════════════════════════════════
   UTILITY CLASSES FOR ACCESSIBILITY & CODE QUALITY
═══════════════════════════════════════════════════════════════════════════════ */

/* Justified text utility class */
.text-justify {
  text-align: justify;
}

/* Custom card image styling (replaces inline styles) */
.custom-card-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f6fb;
}

/* Custom icon add styling (replaces inline styles) */
.custom-icon-add {
  font-size: 3rem;
  color: var(--primary-color);
}

/* Hidden page styling (replaces display: none inline style) */
.hidden-page {
  display: none;
}

/* Panel title styling (replaces inline font-family styles) */
.panel-title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. PAGE 2 - TEMATRIP: PAGINATION
═══════════════════════════════════════════════════════════════════════════════ */

.trip-pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
    padding-bottom: 40px; /* Tambahan agar tidak terlalu mepet bawah */
}

.trip-page-numbers-wrapper {
    display: flex;
    gap: 10px;
}

.trip-page-number, .trip-pagination-arrow {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    font-weight: 600;
}

/* Warna Biru Aktif sesuai mockup */
.trip-page-number.active {
    background-color: #007bff; /* */
    color: white;
    border-color: #007bff;
    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
}

/* Hover effect agar interaktif */
.trip-page-number:hover:not(.active),
.trip-pagination-arrow:hover:not(:disabled) {
    border-color: #007bff;
    color: #007bff;
}

.trip-pagination-arrow:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   9. FOOTER
═══════════════════════════════════════════════════════════════════════════════ */
.footer { 
  background: var(--bg-white); 
  border-top: none; 
  padding: 28px 0 8px; 
}

.footer-inner-container { 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 0 5%; 
}

.footer-content { 
  display: flex; 
  justify-content: space-between; 
  flex-wrap: wrap; 
  gap: 30px; 
}

.footer-logo-img { 
  height: 40px; 
  margin-bottom: 20px; 
}

.social-icons { 
  display: flex; 
  gap: 15px; 
}

.social-icons a { 
  font-size: 22px; 
  color: var(--text-gray); 
  transition: var(--transition); 
}

.social-icons a:hover { 
  color: var(--primary-color); 
}

.footer-section h3 { 
  margin-bottom: 15px; 
  font-size: 16px; 
}
.footer-section ul { list-style: none; }
.footer-section li { 
  color: var(--text-gray); 
  font-size: 14px; 
  margin-bottom: 8px; 
}
.copyright-bottom { 
  text-align: center; 
  margin-top: 18px; 
  padding-top: 8px; 
  color: var(--text-gray); 
  font-size: 12px; }


.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 8px;
}

.logo img {
  height: 50px;
  width: auto;
}

.navbar {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.navbar a {
  position: relative;
  text-decoration: none;
  color: var(--text-dark);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: var(--transition);
  z-index: 10000;
  pointer-events: auto !important;
  cursor: pointer;
}

.navbar a:hover,
.navbar a.active {
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 4px;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   10. RESPONSIVE OVERRIDES - MOBILE, TABLET, DESKTOP
═══════════════════════════════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────────────────────────────
   MOBILE DEVICES (< 480px)
──────────────────────────────────────────────────────────────────────────────── */
@media (max-width: 479px) {
  /* Header & Navigation */
  .header-container {
    padding: 10px 3%;
  }

  .logo img {
    height: 35px;
  }

  .hamburger-btn {
    display: flex;
  }

  .navbar {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--bg-white);
    border-bottom: 1px solid var(--border-color);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    z-index: 1001;
  }

  .navbar.active {
    max-height: 100vh;
    z-index: 1001;
    overflow-y: auto;
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    width: 100vw;
    background: var(--bg-white);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  .navbar a {
    padding: 15px 20px;
    border-bottom: 1px solid var(--border-color);
    font-size: 13px;
    white-space: nowrap;
    display: block;
  }

  /* Hero Section - OPTIMIZED FOR MOBILE */
  .hero {
    width: 100%;
    height: 35vh;
    min-height: 240px;
    margin: 10px auto;
    border-radius: clamp(8px, 3vw, 12px);
    padding: 0 2%;
  }

  .hero-content {
    padding: 10px;
    max-width: 100%;
  }

  .hero-content h1 {
    font-size: 1.2rem;
    line-height: 1.2;
    margin-bottom: 8px;
    font-weight: 700;
  }

  .hero-content p {
    font-size: 0.75rem;
    margin-bottom: 10px;
  }

  .prev-btn,
  .next-btn {
    width: 32px;
    height: 32px;
    font-size: 1.1rem;
  }

  .prev-btn { left: 8px; }
  .next-btn { right: 8px; }

  .dots-container {
    bottom: 12px;
    gap: 5px;
  }

  .dot {
    width: 7px;
    height: 7px;
  }

  /* About Section */
  .about-section {
    flex-direction: column;
    padding: 20px 5%;
  }

  .about-image-wrapper {
    width: 100%;
    margin-bottom: 20px;
  }

  .about-image-wrapper img {
    max-height: 250px;
  }

  .about-content h2 {
    font-size: 1.5rem;
  }

  .about-content p {
    font-size: 0.9rem;
  }

  .btn-map, .btn-tourism {
    width: 100%;
    padding: 12px 15px;
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  /* Card Grid */
  #tour-grid,
  .card-grid {
    grid-template-columns: 1fr !important;
    gap: 15px;
    padding: 0 3%;
  }

  .card {
    border-radius: 12px;
  }

  .card-body h3 {
    font-size: 1rem;
  }

  .card-body p {
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .tour-card .card-image {
    height: 180px;
  }

  .tour-card .badge-time {
    padding: 6px 10px;
    font-size: 12px;
  }

  .price-box .price {
    font-size: 1.1rem;
  }

  /* Buttons */
  .tab-btn,
  .filter-btn {\n    padding: 8px 12px;\n    font-size: 11px;\n    flex: 0 1 auto;\n    min-width: 80px;\n  }

  .filter-container {
    gap: 8px;
    padding: 8px;
  }

  .tabs-filter-row,
  .tabs-row {
    gap: 8px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }

  /* Section Titles */
  .section-title,
  .page-section-title h2 {
    font-size: clamp(1.3rem, 5vw, 2rem);
    padding: 0 3%;
  }

  .page-section-title {
    padding: 0 3%;
  }

  /* Footer */
  .footer-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .footer-logo .logo img {
    width: 150px;
  }

  .social-icons {
    justify-content: center;
  }

  .footer-section {
    text-align: center;
  }

  .footer-section h3 {
    display: block;
    margin: 0 auto 1rem;
  }
}

/* ────────────────────────────────────────────────────────────────────────────
   SMALL DEVICES (480px - 767px)
──────────────────────────────────────────────────────────────────────────────── */
@media (min-width: 480px) and (max-width: 767px) {
  /* Header */
  .header-container {
    padding: 12px 4%;
  }

  .logo img {
    height: 38px;
  }

  .hamburger-btn {
    display: flex;
  }

  .navbar {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--bg-white);
    border-bottom: 1px solid var(--border-color);
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    z-index: 1001;
  }

  .navbar.active {
    max-height: 350px;
    z-index: 1001;
    overflow-y: auto;
  }

  .navbar a {
    padding: 14px 20px;
    border-bottom: 1px solid var(--border-color);
    font-size: 14px;
  }

  /* Hero Section - OPTIMIZED FOR TABLETS */
  .hero {
    height: 45vh;
    min-height: 300px;
    margin: 15px auto;
    border-radius: 18px;
  }

  .hero-content {
    max-width: 95%;
  }

  .hero-content h1 {
    font-size: 1.4rem;
    line-height: 1.25;
    margin-bottom: 10px;
  }

  .hero-content p {
    font-size: 0.85rem;
    margin-bottom: 15px;
  }

  .prev-btn,
  .next-btn {
    width: 38px;
    height: 38px;
    font-size: 1.3rem;
  }

  .prev-btn { left: 12px; }
  .next-btn { right: 12px; }

  .dots-container {
    bottom: 18px;
    gap: 6px;
  }

  .dot {
    width: 8px;
    height: 8px;
  }

  /* About Section */
  .about-section {
    flex-direction: column;
    padding: 25px 5%;
  }

  .about-image-wrapper {
    margin-bottom: 20px;
  }

  .about-image-wrapper img {
    max-height: 300px;
  }

  /* Grid */
  #tour-grid,
  .card-grid {
    grid-template-columns: 1fr !important;
    gap: 20px;
    padding: 0 5%;
  }

  .filter-container {
    gap: 8px;
    padding: 8px 3%;
  }

  .filter-btn {
    padding: 10px 20px;
    font-size: 13px;
  }

  /* Grid */
  #tour-grid,
  .card-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 20px;
    padding: 0 5%;
  }

  /* Side Panel */
  .side-panel {
    max-height: 50vh;
    z-index: 50;
  }

  /* Section Title */
  .section-title,
  .page-section-title h2 {
    font-size: clamp(1.5rem, 5vw, 2.2rem);
  }
}

/* ────────────────────────────────────────────────────────────────────────────
   TABLETS (768px - 991px)
──────────────────────────────────────────────────────────────────────────────── */
@media (min-width: 768px) and (max-width: 991px) {
  .hamburger-btn {
    display: none;
  }

  .navbar {
    flex-direction: row !important;
    gap: 15px !important;
    max-height: none !important;
  }

  .navbar a {
    padding: 0 !important;
    border-bottom: none !important;
    font-size: 13px;
  }

  /* Grid */
  #tour-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 5%;
  }

  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 0 5%;
  }

  /* Hero */
  .hero {
    height: 65vh;
    min-height: 450px;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .section-title,
  .page-section-title h2 {
    font-size: clamp(1.6rem, 4vw, 2.4rem);
  }

  .page-section-title {
    padding: 0 5%;
  }

  .tabs-filter-row {
    gap: 12px;
  }

  .tab-btn {
    padding: 10px 25px;
  }
}

/* ────────────────────────────────────────────────────────────────────────────
   MEDIUM DEVICES (992px - 1199px)
──────────────────────────────────────────────────────────────────────────────── */
@media (min-width: 992px) {
  .hamburger-btn {
    display: none;
  }

  #tour-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ────────────────────────────────────────────────────────────────────────────
   LARGE DEVICES (1200px+)
──────────────────────────────────────────────────────────────────────────────── */
@media (min-width: 1200px) {
  .header-container {
    max-width: 1400px;
  }

  #tour-grid,
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .hero {
    max-width: 1400px;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════════
   3. PAGE 1 - BERANDA: HERO SECTION & SLIDER
═══════════════════════════════════════════════════════════════════════════════ */
.hero {
  position: relative;
  width: 95%;
  max-width: 1400px;
  height: 75vh;
  min-height: 550px;
  margin: 20px auto;
  border-radius: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 5%;
}

.slider-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.slide {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.slide.active {
  opacity: 1;
}

/* Overlay Gradien Meniru Referensi Gambar image_7022d1.png */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(29, 29, 31, 0.85) 0%, rgba(162, 162, 166, 0.2) 100%);
  z-index: 2;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 10;
  color: var(--bg-white);
  max-width: 600px;
}

.hero-badge {
  background-color: rgba(0, 123, 255, 0.8);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-weight: 600;
}

.hero h1 {
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 15px;
  font-weight: 800;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}


/* ───────────────────────────────────────────────────────────────────────────────
   3. PAGE 1 - BERANDA: SLIDER CONTROLS (PREV/NEXT/DOTS)
───────────────────────────────────────────────────────────────────────────────── */
.prev-btn,
.next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  color: var(--text-dark);
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: var(--transition);
}

.prev-btn:hover,
.next-btn:hover {
  background: var(--primary-color);
  color: white;
}

.prev-btn { left: 20px; }
.next-btn { right: 20px; }

.dots-container {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 15;
}

.dot {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition);
}

.dot.active {
  background: var(--primary-color);
  width: 25px;
  border-radius: 10px;
}


/* ═══════════════════════════════════════════════════════════════════════════════
   5. PAGE 3 - STORY MAPS: ABOUT/INFO SECTION
═══════════════════════════════════════════════════════════════════════════════ */
.about-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 100px 5%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 50px;
}

.about-image-wrapper {
  flex: 1;
  position: relative;
}

.about-image-wrapper img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover; 
  object-position: center;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  filter: sepia(10%) contrast(105%) brightness(95%);
  display: block;
}

.floating-badge {
  position: absolute;
  bottom: -20px; 
  right: -20px;
  background-color: var(--bg-white);
  padding: 15px 20px; 
  border-radius: 50px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  display: flex; 
  align-items: center; 
  gap: 10px;
  font-weight: bold; 
  color: var(--primary-color);
  border: 4px solid var(--accent-cyan);
}

.about-content { 
  flex: 1; 
}

.about-content h2 { 
  font-size: 2.5rem; 
  margin-bottom: 20px; 
  color: var(--text-dark); 
  font-weight: 800; 
}

.about-content p { 
  color: var(--text-gray); 
  font-size: 1.1rem; 
  margin-bottom: 30px;
  text-align: justify;
  line-height: 1.6; 
}


/* ═══════════════════════════════════════════════════════════════════════════════
   BUTTON STYLES - GLOBAL
═══════════════════════════════════════════════════════════════════════════════ */
.btn-primary, .btn-map, .btn-tourism, .btn-outline {
  padding: 12px 28px; 
  border-radius: 30px; 
  border: none;
  cursor: pointer; 
  font-weight: bold; 
  font-size: 16px;
  transition: var(--transition); 
  display: inline-flex;
  align-items: center; 
  gap: 8px;
  margin: 15px;
}

.btn-map, .btn-tourism { 
  background-color: var(--primary-color); 
  color: var(--bg-white); 
}

.btn-map:hover, .btn-tourism:hover { 
  background-color: var(--accent-cyan);
  transform: translateY(-2px);
}

.btn-outline {
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  padding: 10px 24px;
}

.btn-outline:hover { 
  background-color: var(--primary-color); 
  color: white; 
}

/* ═══════════════════════════════════════════════════════════════════════════════
   FEATURES SECTION - GLOBAL
═══════════════════════════════════════════════════════════════════════════════ */
.features-section {
  padding: 50px 5% 100px;
  max-width: 1300px;
  margin: 0 auto;
  text-align: center;
}

.section-title {
  font-size: 2.2rem;
  margin-bottom: 50px;
  color: var(--primary-color);
  font-weight: 800;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  flex: 1;
  min-width: 250px;
  max-width: 300px;
  background-color: var(--bg-white);
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.card img {
  width: 100%;
  height: 240px;
  min-height: 240px;
  max-height: 240px;
  object-fit: cover;
  object-position: center;
  filter: sepia(20%) saturate(120%) brightness(95%);
  display: block;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 123, 255, 0.1);
}

.card-body {
  padding: 30px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: center;
}

.card-body h3 { 
  margin-bottom: 10px; 
  font-size: 1.4rem; 
  color: var(--text-dark); 
  font-weight: 700; 
}

.card-body p { 
  flex-grow: 1; 
  margin-bottom: 25px; 
  font-size: 0.95rem; 
}

.btn-outline {
    align-self: center;
    margin-top: auto;
    padding: 10px 25px;
    border: 2px solid #007bff;
    background: transparent;
    color: #007bff;
    border-radius: 25px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    width: fit-content;
}

.btn-outline:hover {
    background: #007bff;
    color: #fff;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   RESPONSIVE MEDIA QUERIES
═══════════════════════════════════════════════════════════════════════════════ */
@media (max-width: 900px) {
  .hero { height: auto; padding: 100px 5%; }
  .hero h1 { font-size: 2.5rem; }
  .about-section { flex-direction: column; text-align: center; }
  .search-bar { flex-direction: column; border-radius: 20px; padding: 20px; }
  .divider { display: none; }
  .btn-search { width: 100%; justify-content: center; margin-top: 15px; }
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CONTENT SECTIONS - GLOBAL
═══════════════════════════════════════════════════════════════════════════════ */
.main-content {
  padding: 80px 20px;
  text-align: center;
}

.section-walking {
  background: var(--bg-white);
}

.section-city {
  background: var(--bg-light);
}

.title-main {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  font-weight: 800;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.title-main i {
  font-size: 2.5rem;
  color: var(--primary-color);
}

.desc-main {
  font-size: 1.1rem;
  color: var(--text-gray);
  max-width: 700px;
  margin: 0 auto;
}


/* ═══════════════════════════════════════════════════════════════════════════════
   4. PAGE 2 - TEMATRIP: CUSTOM STYLES
═══════════════════════════════════════════════════════════════════════════════ */
.tematrip-section {
  padding-top: 110px;
  min-height: 100vh;
  background: var(--bg-light);
  text-align: center;
}

.tematrip-title {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 10px;
  color: var(--text-dark);
}

.tematrip-title { text-align: center; }

.tematrip-title .accent {
  color: var(--accent-cyan);
  font-style: italic;
}

.tematrip-subtitle {
  color: var(--text-gray);
  font-size: 1.1rem;
  margin-bottom: 40px;
}

.tematrip-tab-group {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-bottom: 40px;
}

/* Center tabs-row inside tematrip header */
#tematrip-page .tabs-row {
  display: flex;
  justify-content: center;
  gap: 18px;
  max-width: 940px;
  margin: 28px auto 40px;
  padding: 0 20px;
}

.tematrip-card-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 36px;
  margin: 0 auto;
  max-width: 1200px;
  align-items: flex-start;
}

.tour-card {
  width: 340px;
  min-height: 420px;
  margin-bottom: 20px;
  background: var(--bg-white);
  border-radius: 18px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 18px rgba(0,0,0,0.04);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tour-card .card-image {
  height: 180px;
  border-radius: 18px 18px 0 0;
  overflow: hidden;
}

.tour-card .card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.tour-card .badge-time {
  top: 12px;
  left: 12px;
  font-size: 13px;
  padding: 4px 14px;
}

.tour-card .card-body {
  padding: 22px 22px 0 22px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.tour-card .card-location {
  margin-bottom: 8px;
}

.tour-card .card-footer {
  padding: 0 22px 22px 22px;
}

/* Styling untuk card-btn-arrow sudah didefinisikan di atas */

#tematrip-page .price { 
  font-size: 22px; 
  font-weight: 900; 
  color: var(--primary-color); 
}

/* Material Symbols fallback styling (icons) */
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 20px;
  line-height: 1;
  display: inline-block;
  vertical-align: middle;
}

@media (max-width: 900px) {
  .tematrip-card-grid {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
  .tour-card {
    width: 95vw;
    min-width: 0;
    max-width: 400px;
  }
}
/* ═══════════════════════════════════════════════════════════════════════════════
   9. FOOTER: MAIN STYLING
═══════════════════════════════════════════════════════════════════════════════ */
.footer {
  background: #f8f9fa;
  padding: 12px 0 8px;
  color: var(--text-dark);
  border-top: none;
}

.footer-inner-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: flex; 
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 16px;
  border-bottom: none;
}

/* ───────────────────────────────────────────────────────────────────────────────
   9. FOOTER: LOGO & SOCIAL MEDIA (LEFT)
───────────────────────────────────────────────────────────────────────────────── */
.footer-logo {
  margin-bottom: 15px;
}

.footer-logo .logo img {
  width: 240px; 
  height: auto; 
  display: block;
  transition: transform 0.3s ease;
}

.footer-logo .logo img:hover {
  transform: scale(1.05);
}

.social-icons {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  margin-top: 20px;
  position: relative;
  z-index: 999;
  pointer-events: auto !important;
}

.social-icons a {
  width: 35px;
  height: 35px;
  background: white;
  color: #007bff;            
  border-radius: 50%;        
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1.2rem;          
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.social-icons a:hover {
  background: var(--primary-color);
  color: white;
  transform: scale(1.1);
}

/* ───────────────────────────────────────────────────────────────────────────────
   9. FOOTER: CONTACT (RIGHT)
───────────────────────────────────────────────────────────────────────────────── */
.footer-section.contact {
  min-width: 250px;
}

.footer-section h3 {
  margin-bottom: 1.2rem;
  font-size: 1.1rem;
  border-bottom: 2px solid var(--primary-color);
  display: inline-block;
  padding-bottom: 5px;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 12px;
  color: var(--text-gray);
  display: flex;
  gap: 12px;
  font-size: 0.9rem;
}

/* ───────────────────────────────────────────────────────────────────────────────
   9. FOOTER: COPYRIGHT (BOTTOM)
───────────────────────────────────────────────────────────────────────────────── */
.copyright-bottom {
  padding-top: 10px;
  text-align: left;
  font-size: 0.85rem;
  color: var(--text-gray);
  opacity: 0.8;
}

/* ================= RESPONSIVE MOBILE ================= */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 40px;
    text-align: center;
  }
  
  .social-icons {
    justify-content: center;
  }
  
  .footer-logo .logo img {
    margin: 0 auto 15px;
  }

  .copyright-bottom {
    text-align: center;
  }
}


/* ================= FULL MAP PAGE CONTAINER ================= */
/* ================= MAP & STORY MAP STYLES ================= */
#full-map-story-page {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

/* ================= MAP CONTAINER ================= */
#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  z-index: 1;
  background: #f8fafc;
  cursor: grab;
}

#map:active {
  cursor: grabbing;
}

/* ================= LEAFLET CONTROLS ================= */

.leaflet-control-zoom {
  background: rgba(255, 255, 255, 0.95) !important;
  border: 2px solid #ccc !important;
  border-radius: 5px !important;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
}

.leaflet-control-zoom a {
  width: 36px !important;
  height: 36px !important;
  font-size: 16px !important;
  line-height: 36px !important;
  background: white !important;
}

.leaflet-control-zoom a:hover {
  background: #f4f4f4 !important;
}

.leaflet-control-layers {
  background: rgba(255, 255, 255, 0.95) !important;
  border: 2px solid #ccc !important;
  border-radius: 5px !important;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
}

.leaflet-control-container {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* ================= STORY MAPS, TOURISM MAPS PAGE ================= */

/* ================= MAIN LAYOUT (scoped to full-map page only) ================= */
#full-map-story-page main {
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
  height: calc(100% - 64px);
  z-index: 1;
}

#full-map-story-page main #map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}

#full-map-story-page main .fixed {
  position: fixed;
  z-index: 30;
}

#full-map-story-page main .absolute {
  z-index: 35;
}

.map-container {
  height: calc(100vh - 70px);
  width: 100%;
  margin-top: 64px;
  position: relative;
}

/* Override for tourismmaps.html */
main .map-container {
  height: 100%;
  margin-top: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}

.glass-panel {
  position: absolute;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(226, 232, 240, 0.95);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
  border-radius: 22px;
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  z-index: 1002;
  overflow: hidden;
}

.panel-left {
  top: calc(64px + 20px);
  left: 20px;
  width: 300px;
  max-width: calc(100vw - 40px);
}

.panel-right {
  top: calc(64px + 20px);
  right: 20px;
  width: 280px;
  max-width: calc(100vw - 40px);
}

.panel-header {
  padding: 18px 20px;
  border-bottom: 1px solid #e2e8f0;
}

.panel-header h3 {
  margin: 0;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
  font-weight: 800;
}

.panel-body {
  padding: 20px;
}

.feature-buttons {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.feature-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 12px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  min-height: 108px;
}

.feature-button:hover {
  transform: translateY(-2px);
  background: #eff6ff;
  border-color: #2563eb;
}

.feature-button i {
  font-size: 1.5rem;
  color: #2563eb;
}

.feature-button span {
  font-size: 0.78rem;
  font-weight: 700;
  color: #334155;
  text-align: center;
  line-height: 1.2;
}

.control-group {
  margin-top: 24px;
  display: grid;
  gap: 12px;
}

.control-group h4 {
  margin: 0 0 8px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #334155;
  letter-spacing: 0.05em;
}

.control-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: #475569;
  cursor: pointer;
}

.control-group input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #2563eb;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 0.85rem;
  color: #475569;
}

.legend-item:last-child {
  margin-bottom: 0;
}

.feature-popup {
  position: fixed;
  top: 90px;
  left: 90px;
  z-index: 9999;
  width: 320px;
  max-width: calc(100vw - 40px);
  background: rgba(255,255,255,0.98);
  border: 1px solid rgba(148,163,184,0.3);
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(15,23,42,0.18);
  overflow: hidden;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
}

.feature-popup.hidden {
  display: none;
}

.feature-popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 20px 12px;
  background: #ffffff;
  border-bottom: 1px solid rgba(226,232,240,0.8);
}

.feature-popup-header span {
  font-weight: 700;
  font-size: 0.95rem;
  color: #0f172a;
}

.feature-popup-close {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  transition: background 0.2s ease;
}

.feature-popup-close:hover {
  background: rgba(37,99,235,0.08);
}

.feature-popup-body {
  padding: 16px 20px 20px;
  color: #475569;
  font-size: 0.94rem;
  line-height: 1.6;
}

.feature-popup-body p {
  margin: 0 0 10px;
}

.feature-popup-list {
  display: grid;
  gap: 12px;
  margin-top: 10px;
}

.feature-popup-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid rgba(226,232,240,0.9);
}

.feature-popup-item i {
  font-size: 1.2rem;
  color: #2563eb;
  min-width: 34px;
  min-height: 34px;
  display: grid;
  place-items: center;
  background: #e0f2fe;
  border-radius: 12px;
}

.feature-popup-item span {
  color: #0f172a;
  font-weight: 600;
}

@media (max-width: 950px) {
  .panel-left,
  .panel-right,
  .feature-popup {
    position: static;
    transform: none;
    width: auto;
    max-width: none;
    margin: 0 16px 16px;
  }

  .panel-left {
    top: auto;
    left: auto;
  }

  .panel-right {
    top: auto;
    right: auto;
  }

  .feature-popup {
    right: auto;
    left: 16px;
    top: auto;
    bottom: 16px;
  }
}

.leaflet-container {
  cursor: inherit !important;
}

/* Story Wrapper */
.story-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
}

#full-map-story-page .story-wrapper {
  pointer-events: auto;
}

/* Side Panel */
.side-panel {
  position: absolute;
  left: 0;
  top: 0;
  width: 380px;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);

  /* Bayangan dipindah ke sisi kanan panel */
  box-shadow: 5px 0 25px rgba(0,0,0,0.15); 
  z-index: 10;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
}

/* Side Panel Header */
.side-panel-header {
    padding: 30px 20px 30px 20px;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #eee;
}

.side-panel-header h2 {
  font-size: 1.5rem;
  color: var(--text-dark);
  font-weight: 800;
}

/* Filter Container */
.side-filter-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;
}

.side-filter-container::-webkit-scrollbar {
  display: none;
}

.side-filter-btn {
    flex: 1 1 calc(50% - 5px);
    padding: 12px 15px;
    border-radius: 30px;
    border: 1px solid transparent;
    color: #495057;
    background: #f1f3f5;
    cursor: pointer;
    white-space: nowrap;
    font-weight: 600;
    font-size: 0.85rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.side-filter-btn[data-filter="all"] {
    flex: 1 1 100%; 
}

.side-filter-btn i {
    font-size: 1.1rem;
}

.side-filter-btn.active {
    background: #007bff;
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.35);
    border-color: #007bff;
}

.side-filter-btn:hover:not(.active) {
    background: #e9ecef;
    color: #007bff;
    border-color: #007bff;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SIDEBAR TOGGLE BUTTON & HIDDEN STATE
═══════════════════════════════════════════════════════════════════════════════ */

.sidebar-toggle-btn {
    position: absolute;
    left: 380px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 11;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid #e9ecef;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #333;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.sidebar-toggle-btn:hover {
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    color: #007bff;
}

.sidebar-toggle-btn i {
    transition: transform 0.3s ease;
}

/* When sidebar is hidden, rotate the icon and move button */
.side-panel.hidden ~ .sidebar-toggle-btn,
.sidebar-toggle-btn.sidebar-hidden {
    left: 20px;
}

.side-panel.hidden ~ .sidebar-toggle-btn i,
.sidebar-toggle-btn.sidebar-hidden i {
    transform: rotate(180deg);
}

/* Sidebar Hidden State */
.side-panel.hidden {
    transform: translateX(-100%);
    opacity: 0;
    pointer-events: none;
}

.side-panel {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Adjust map controls when sidebar is visible */
#map {
    transition: all 0.3s ease;
}

.story-wrapper.sidebar-hidden #map {
    margin-left: 0;
}

.story-wrapper.sidebar-visible #map {
    margin-left: 0;
}

/* Zoom Controls - Responsive positioning based on sidebar state */
#zoomControlsContainer {
    position: absolute;
    left: 390px;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.story-wrapper.sidebar-hidden #zoomControlsContainer {
    left: 16px;
}

@media (min-width: 640px) {
    .story-wrapper.sidebar-hidden #zoomControlsContainer {
        left: 32px;
    }
}

@media (max-width: 480px) {
    .side-filter-btn {
        flex: 1 1 100%;
    }
}

/* Content List */
.content-list {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  height: 100%;
}

.content-list::-webkit-scrollbar {
  width: 5px;
}

.content-list::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

/* Story Cards */
.story-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid #eee;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.story-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
}

.story-card img {
  display: none;
}

.card-info {
  padding: 1.2rem;
}

.card-info h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.badge {
  padding: 4px 10px;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: 700;
  background: var(--accent-color);
  color: #000;
}

/* Badge Category Colors */
.badge-regular {
  background: #FFE4B5;
  color: #8B6914;
}

.badge-special {
  background: #E6D5FF;
  color: #6B46C1;
}

.badge-private {
  background: #D4FFE6;
  color: #065F46;
}

.badge-education {
  background: #D4E8FF;
  color: #1E40AF;
}

/* Heritage Icon */
.heritage-icon {
  background: var(--primary-color);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
}

.heritage-icon i {
  transform: rotate(45deg);
  font-size: 16px;
}

/* Popup Styles */
.popup-img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 8px;
}

.popup-text h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--primary-color);
}

/* --- RESPONSIVE DESIGN --- */
@media (max-width: 768px) {
.header-container {
    padding: 0.5rem 1rem;
}

.navbar {
  display: none;
}

.slider-container {
    height: 45vh;
    margin-top: 65px;
}

.bottom-flex {
    flex-direction: column;
    gap: 10px;
    text-align: center;
}

.side-panel {
  width: 100%;
  height: 50%;
  top: auto;
  bottom: 0;
  border-radius: 25px 25px 0 0;
  padding-top: 10px; 
  padding: 0 20px;
  z-index: 1000;
}

.panel-header {
  padding-top: 0;
  margin-top: 0;
}

.panel-header h2 {
  margin-top: 0;  
  margin-bottom: 15px;
  line-height: 1.2;
  font-size: 1.3rem;
}

.filter-container {
    margin-top: 0;      
    padding-bottom: 1rem; 
    gap: 8px;
}
}


/* ABOUT US PAGE */
#full-map-story-page {
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
}

#about-section {
  padding-top: 0;
  background-color: #fff;
}

.about-container {
    position: relative;
    width: 100%;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    margin-top: 70px;

    background-image: url('DOKUMENTASI/ABOUT%20US/IMG_3628.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.content-wrapper {
    position: relative;
    z-index: 2;
    text-align: center;
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
}

.title {
    font-size: 3rem;
    font-weight: 800;
    color: var(--primary-color);
    text-align: center;
    transition: transform 0.3s ease;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.about-container:hover .title {
    transform: scale(1.05);
}

@media (max-width: 768px) {
    .title {
        font-size: 2rem;
    }
    .about-container {
        min-height: 400px;
    }
}

/* General Setup */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    color: #444;
}

.about-header {
    text-align: center;
    padding: 80px 20px;
    background-color: #fff;
}

.about-header h1 {
    font-size: 3rem;
    color: #333;
    font-weight: 300;
}

/* Layout Container */
.container-split {
    display: flex;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
    padding: 80px 20px;
}

.left-col {
    flex: 1;
}

.right-col {
    flex: 2;
    line-height: 1.8;
}

.left-col h2 {
    font-size: 1.2rem;
    letter-spacing: 2px;
    margin-top: 0;
}

/* Vision Section (Blue) */
.vision-section {
    background-color: #2980b9;
    color: white;
    padding: 60px 0;
}

.vision-section p {
    text-align: justify;
    line-height: 1.6;
    margin: 0;
}

.vision-section h2 {
    color: white;
    margin: 0;
}

/* Mission Section (Image Background) */
.mission-section {
    position: relative;
    background-image: url('DOKUMENTASI/ABOUT%20US/IMG_8617.webp');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

.background-overlay-dark {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.6);
}

.relative-content {
    position: relative;
    z-index: 2;
    color: #ffffff;
}

.mission-list {
    list-style: none;
    padding: 0;
    counter-reset: mission-counter;
}

.mission-list li {
    margin-bottom: 20px;
    position: relative;
    padding-left: 30px;
    color: #ffffff;
    text-align: justify;
}

.mission-list li::before {
    counter-increment: mission-counter;
    content: counter(mission-counter) ".";
    position: absolute;
    left: 0;
    top: 0;
    font-weight: bold;
    color: #ffffff;
}

/* Positioning Section */
.positioning-section {
    background-color: #fff;
}

.text-blue { color: #2980b9; }
.text-white { color: #fff; }

/* Review Section */
.review-section {
    position: relative;
    background-image:  url('DOKUMENTASI/ABOUT%20US/IMG_0246.webp');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: white;
    overflow: hidden;
}

.review-section::before {
    content: "";
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(112, 186, 236, 0.7);
    z-index: 1;
}

.review-section .container-split {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;       
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 20px;
    gap: 100px; 
}

.review-section h3 {
    font-size: 1.5rem;
    margin-bottom: 30px;
    font-weight: bold;
    color: #ffffff;
}

/* Flexbox Layout */
.feedback-col { 
    flex: 1.5; 
    padding-right: 40px; 
}

.form-col { 
    flex: 1; 
}

/* Feedback Card Style */
.feedback-card {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.1); 
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: 20px;
    -webkit-backdrop-filter: blur(8px);
    margin-bottom: 20px;
    backdrop-filter: blur(8px);
}

.feedback-content p {
    text-align: justify;
    color: #e0e0e0;
}

.feedback-card img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 20px;
    object-fit: cover;
}

.header-card {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}

.stars {
    color: #f1c40f; 
}

.feedback-content p {
    font-size: 0.9rem;
    color: #ffffff;
    margin: 0;
    text-align: justify;
}

/* --- Form Review & Interactive Stars --- */
.review-form label {
    display: block;
    font-size: 0.85rem;
    margin-bottom: 5px;
    color: #333;
}

/* CSS Bintang Interaktif agar bisa diklik */
.star-rating {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    margin-bottom: 15px;
}

.star-rating input { display: none; }

.star-rating label {
    font-size: 30px;
    color: #ddd;
    cursor: pointer;
    transition: 0.2s;
    margin-right: 5px;
}

.star-rating input:checked ~ label,
.star-rating label:hover,
.star-rating label:hover ~ label {
    color: #f1c40f;
}

.review-form input, 
.review-form textarea {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fafafa;
}

.btn-submit {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    background-color:  #f1c40f;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}

.btn-submit:hover {
    background-color:  #f1c40f;
}

/* Team Grid Section */
.team-section {
    background-color: #000;
}

.team-grid {
    display: flex;
    flex-wrap: wrap;
}

.documentation {
    flex: 1;
    min-width: 250px;
    position: relative;
    overflow: hidden;
    filter: grayscale(100%);
    transition: 0.3s;
}

.documentation:hover {
    filter: grayscale(0%);
}

.documentation img {
    width: 100%;
    display: block;
    height: 400px;
    object-fit: cover;
}

.documentation-info {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: #ffffff
}

.documentation-info h3 {
    margin: 0;
    font-size: 1.1rem;
}

.documentation-info p {
    margin: 5px 0 0;
    font-size: 0.8rem;
    opacity: 0.8;
}

/* Responsive Mobile */
@media (max-width: 768px) {
    .container-split {
        flex-direction: column;
        padding: 40px 20px;
    }
    
    .left-col {
        margin-bottom: 20px;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ADDITIONAL RESPONSIVE ADJUSTMENTS FOR MAP & PANEL ELEMENTS
═══════════════════════════════════════════════════════════════════════════════ */

/* Mobile: Smaller Map Panels */
@media (max-width: 767px) {
  .panel-left,
  .panel-right {
    width: 100%;
    max-width: calc(100vw - 16px);
    position: relative;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    margin: 10px auto;
  }

  .feature-popup {
    width: 100%;
    max-width: calc(100vw - 16px);
    top: auto !important;
    bottom: 10px !important;
    left: 8px !important;
    right: auto !important;
    font-size: 0.9rem;
  }

  /* Sidebar Toggle Button - Mobile */
  .sidebar-toggle-btn {
    display: none;
  }

  /* Side Panel on Mobile */
  .side-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    top: auto;
    width: 100%;
    height: auto;
    max-height: 60vh;
    border-radius: 25px 25px 0 0;
    z-index: 1000;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    transform: translateY(0);
    opacity: 1;
  }

  .side-panel.hidden {
    transform: translateY(100%);
    opacity: 0;
    pointer-events: none;
  }

  .panel-body {
    max-height: 250px;
    overflow-y: auto;
  }

  .side-panel {
    width: 100%;
    height: auto;
    max-height: 50vh;
    border-radius: 25px 25px 0 0;
    position: fixed;
    bottom: 0;
    left: 0;
    top: auto;
    z-index: 50;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .side-panel-header {
    padding: 20px;
    position: relative;
  }

  .side-panel-header::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background: #d0d0d0;
    border-radius: 2px;
    cursor: grab;
  }

  .side-panel-header::before:active {
    cursor: grabbing;
  }

  .content-list {
    max-height: 40vh;
  }

  .leaflet-control-zoom {
    margin: 10px !important;
  }

  .leaflet-control-zoom a {
    width: 32px !important;
    height: 32px !important;
    font-size: 14px !important;
    line-height: 32px !important;
  }

  /* SLIDER CONTROLS - MOBILE OPTIMIZATION */
  .prev-btn,
  .next-btn {
    width: 32px;
    height: 32px;
    font-size: 1.1rem;
    background: rgba(255, 255, 255, 0.85);
  }

  .dots-container {
    bottom: 12px;
    gap: 5px;
  }

  .dot {
    width: 7px;
    height: 7px;
  }

  .dot.active {
    width: 20px;
  }
}

/* Tablet: Adjust Panel Sizing */
@media (min-width: 768px) and (max-width: 991px) {
  .panel-left {
    width: 280px;
  }

  .panel-right {
    width: 260px;
  }

  .feature-popup {
    width: 300px;
  }

  .sidebar-toggle-btn {
    left: 280px;
  }

  .side-panel {
    width: 280px;
    height: 45%;
    bottom: 0;
    border-radius: 20px 20px 0 0;
  }

  .side-panel.hidden {
    transform: translateX(-100%);
    opacity: 0;
    pointer-events: none;
  }

  .side-panel.hidden ~ .sidebar-toggle-btn {
    left: 20px;
  }
}

/* Improve About Section for Mobile */
@media (max-width: 767px) {
  .about-container {
    min-height: 300px;
  }

  .title {
    font-size: 1.5rem;
  }

  .container-split {
    flex-direction: column;
    padding: 30px 15px;
  }

  .left-col {
    margin-bottom: 15px;
  }

  .review-section .container-split {
    flex-direction: column;
    gap: 30px;
  }

  .feedback-col {
    padding-right: 0;
  }

  .team-grid {
    flex-direction: column;
  }

  .documentation {
    min-width: 100%;
  }
}

/* Improve Card Details for Mobile */
@media (max-width: 479px) {
  .card-btn-arrow {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }

  .price-box .price {
    font-size: 20px;
  }

  .card-body {
    padding: 15px;
  }

  .card-body h3 {
    font-size: 1rem;
  }
}

/* Optimize Footer for Mobile */
@media (max-width: 767px) {
  .footer-logo .logo img {
    width: 120px;
  }

  .social-icons {
    gap: 10px;
  }

  .social-icons a {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }

  .footer-section ul li {
    font-size: 0.85rem;
    margin-bottom: 10px;
  }

  .copyright-bottom {
    font-size: 0.75rem;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════════
   UTILITY CLASSES FOR INLINE STYLES MOVED TO CSS
═══════════════════════════════════════════════════════════════════════════════ */

.tour-contact-description {
  font-size: 0.8rem;
  margin-top: 15px;
  color: #999;
}

.positioning-text {
  text-align: justify;
  line-height: 1.6;
}
