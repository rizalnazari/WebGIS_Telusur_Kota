// ================= MASTER JAVASCRIPT: TELUSUR KOTA =================
// Versi Integrasi: Slider Beranda + WebGIS Story Maps + Tematrip Pagination
// Tahun: 2026

// ================= TABLE OF CONTENTS (SECTIONS) =================
// 
// PAGE 1: BERANDA (index.html)
//   - Auto-advance slider dengan 5 detik delay
//   - Manual prev/next navigation
//   - Dot navigation dengan active indicator
//   - Global Route Popup (digunakan di semua pages)
//
// PAGE 2: TEMATRIP (tematrip.html) 
//   - Tour data array dengan 11 items (regular/education/special)
//   - Pagination dengan 5 item per halaman
//   - Category filtering (regular/education/special/all)
//   - Numbered page buttons
//
// PAGE 3: STORY MAPS (map.html)
//   - Interactive map dengan Leaflet.js
//   - 3 basemap options (OpenStreetMap, CartoDB, Esri)
//   - Basemap switcher dengan panel
//   - GeoJSON rendering dengan custom heritage icon
//   - Side panel category filter
//   - Zoom to location dengan animation
//
// PAGE 4: TOURISM MAPS (tourismmaps.html) - PANEL LOGIC
//   - Legend panel dengan kategori destinasi
//   - Route panel dengan OSRM routing
//   - Nearby panel dengan Turf.js buffer
//   - Panel management (show/hide/toggle)
//
//   PAGE 4A: ROUTE PANEL (OSRM ROUTING) 
//     - Geolocation checkbox untuk user location
//     - Start/end location dropdowns
//     - OSRM API integration untuk routing
//     - Traffic-aware duration calculation (15% peak, 10% off-peak)
//     - Solid blue polyline display
//     - Start & end markers dengan blue color
//     - Route info panel dengan distance & duration
//
//   PAGE 4B: NEARBY PANEL (TURF.JS BUFFER)
//     - Geolocation checkbox untuk user location
//     - Distance buttons (500m, 1km, 2km, 5km)
//     - Manual location dropdown selection
//     - Turf.js buffer creation & analysis
//     - Point-in-polygon detection untuk nearby locations
//     - Green buffer circle visualization
//     - Hide out-of-buffer locations
//     - Formatted result list dengan distance
//     - Restore functionality ketika panel ditutup
//
// PAGE 5: ABOUT US (PROFILE) (profile.html)
//   - About page content & styling
//   - Static page dengan information
//
// GLOBAL UTILITIES
//   - Shared functions & variables
//   - Event listeners
//   - Helper functions
//
// ================= END TABLE OF CONTENTS =================

// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║ GLOBAL UTILITY FUNCTIONS                                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

/**
 * Navigate to tematrip.html and filter by category
 * Called from beranda feature cards
 * @param {string} category - Category to filter ('regular', 'special', 'private', 'education')
 */
window.navigateToTematrip = function(category) {
    // Store selected category in sessionStorage
    sessionStorage.setItem('selectedTemaCategory', category.toLowerCase());
    
    // Navigate to tematrip page
    window.location.href = 'tematrip.html';
    
    console.log('📍 Navigating to tematrip with category:', category);
};

// ================= END GLOBAL UTILITIES =================

document.addEventListener('DOMContentLoaded', () => {
  // ================= LANGUAGE SWITCHER =================
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
  
  // DRAG TO CLOSE SIDE PANEL (Mobile UX)
  const sidePanel = document.querySelector('.side-panel');
  const sidePanelHeader = document.querySelector('.side-panel-header');
  let startY = null;
  let currentY = null;
  let dragging = false;
  if (sidePanel && sidePanelHeader) {
    sidePanelHeader.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        dragging = true;
        startY = e.touches[0].clientY;
        sidePanel.style.transition = 'none';
      }
    });
    sidePanelHeader.addEventListener('touchmove', function(e) {
      if (!dragging) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      if (deltaY > 0) {
        sidePanel.style.transform = `translateY(${deltaY}px)`;
      }
    });
    sidePanelHeader.addEventListener('touchend', function(e) {
      if (!dragging) return;
      dragging = false;
      const deltaY = currentY - startY;
      sidePanel.style.transition = '';
      if (deltaY > 80) {
        // Close panel if dragged down enough
        sidePanel.classList.add('hidden');
        sidePanel.style.transform = '';
      } else {
        // Snap back
        sidePanel.style.transform = '';
      }
    });
  }

  // ╔═══════════════════════════════════════════════════════════════════════════╗
  // ║ PAGE 1: BERANDA (index.html)                                              ║
  // ║ - Slider dengan auto-advance setiap 5 detik                              ║
  // ║ - Manual navigation (prev/next) dan dot indicators                        ║
  // ║ - Route Popup global (juga digunakan di page lain)                        ║
  // ╚═══════════════════════════════════════════════════════════════════════════╝
  
  // RUTE WISATA POPUP (Global untuk semua halaman)
  const routePopup = document.createElement('div');
  routePopup.id = 'routeTourPopup';
  routePopup.style.display = 'none';
  routePopup.style.position = 'fixed';
  routePopup.style.bottom = '24px';
  routePopup.style.left = '50%';
  routePopup.style.transform = 'translateX(-50%)';
  routePopup.style.zIndex = '9999';
  routePopup.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  routePopup.innerHTML = `
    <div style="background:#fff;border-radius:18px;box-shadow:0 12px 48px rgba(0,0,0,0.25);padding:24px;min-width:320px;max-width:90vw;position:relative;display:flex;flex-direction:column;gap:16px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <button id="closeRouteTourPopup" style="position:absolute;top:12px;right:12px;background:transparent;border:none;font-size:1.5rem;color:#888;cursor:pointer;line-height:1;">&times;</button>
      <div style="font-weight:700;font-size:1.1rem;color:#1f2937;display:flex;align-items:center;gap:8px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <span style="color:#2563eb;font-size:1.3rem;"><i class='bx bx-navigation'></i></span>
        <span>Info Rute</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:16px 0;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;">
        <div style="text-align:center;">
          <div style="font-size:11px;color:#6b7280;margin-bottom:6px;font-weight:700;letter-spacing:0.5px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">JARAK</div>
          <div style="display:flex;align-items:baseline;justify-content:center;gap:6px;">
            <span id="popupRouteDistance" style="font-weight:700;font-size:1.8rem;color:#f59e42;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">0</span>
            <span style="font-size:0.85rem;color:#f59e42;font-weight:700;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">km</span>
          </div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:11px;color:#6b7280;margin-bottom:6px;font-weight:700;letter-spacing:0.5px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">ESTIMASI</div>
          <div style="display:flex;align-items:baseline;justify-content:center;gap:6px;">
            <span id="popupRouteDuration" style="font-weight:700;font-size:1.8rem;color:#2563eb;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">0</span>
            <span style="font-size:0.85rem;color:#2563eb;font-weight:700;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">menit</span>
          </div>
        </div>
      </div>
      <button id="closeRouteTourPopup2" style="width:100%;background:#f43f5e;color:#fff;font-weight:700;padding:12px;border-radius:10px;border:none;font-size:0.95rem;cursor:pointer;transition:background 0.3s;font-weight:700;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">Tutup Rute</button>
    </div>
  `;
  document.body.appendChild(routePopup);

  function showRouteTourPopup(distanceKm, durationMin) {
    document.getElementById('popupRouteDistance').textContent = `${distanceKm.toFixed(2)}`;
    document.getElementById('popupRouteDuration').textContent = `${Math.round(durationMin)}`;
    routePopup.style.display = 'block';
  }

  function hideRouteTourPopup() {
    routePopup.style.display = 'none';
    
    // Remove route line from map
    if (window.routeLine && typeof map !== 'undefined' && map) {
      try { map.removeLayer(window.routeLine); } catch(e){}
      window.routeLine = null;
    }
    
    // Remove route markers from map
    if (window.routeMarkers && typeof map !== 'undefined' && map) {
      window.routeMarkers.forEach(marker => {
        try { map.removeLayer(marker); } catch(e){}
      });
      window.routeMarkers = [];
    }
    
    // Clear route info in panel
    const routeInfo = document.getElementById('routeInfo');
    if (routeInfo) {
      routeInfo.innerHTML = '';
    }
  }

  // Attach close event listeners to route popup buttons
  const setupRoutePopupClosers = () => {
    const closeBtn1 = document.getElementById('closeRouteTourPopup');
    const closeBtn2 = document.getElementById('closeRouteTourPopup2');
    
    if (closeBtn1) {
      closeBtn1.addEventListener('click', (e) => {
        e.stopPropagation();
        hideRouteTourPopup();
      });
    }
    
    if (closeBtn2) {
      closeBtn2.addEventListener('click', (e) => {
        e.stopPropagation();
        hideRouteTourPopup();
      });
    }
  };

  // Call setup when DOM is ready
  setupRoutePopupClosers();

  // PAGE SECTION TITLES (Inject per page)
  (function insertPageSectionTitle(){
    const pageTitleMap = {
      'index.html': 'Beranda',
      '': 'Beranda',
      'tematrip.html': 'Eksplorasi Tematrik',
      'map.html': 'Story Maps',
      'tourismmaps.html': 'Tourism Maps',
      'profile.html': 'Tentang Kami',
      'cek.html': 'Cek'
    };

    const file = window.location.pathname.split('/').pop();
    const pageKey = file === '' ? '' : file;
    const titleText = pageTitleMap[pageKey];
    if (!titleText) return;

    const mainEl = document.querySelector('main');
    if (!mainEl) return;
    if (mainEl.querySelector('.page-section-title') || mainEl.querySelector('.section-badge') || mainEl.querySelector('.main-title')) return;

    const wrap = document.createElement('div');
    wrap.className = 'page-section-title';
    wrap.innerHTML = `<div class="badge">${titleText}</div><h2>${titleText}</h2>`;
    mainEl.prepend(wrap);
  })();

  // Lightweight search + smooth-scroll (BERANDA)
  (function smallHelpers() {
    const searchBtn = document.querySelector('.btn-search');
    const inputFields = Array.from(document.querySelectorAll('.input-group input'));

    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const keyword = (inputFields[0] && inputFields[0].value) ? inputFields[0].value.trim() : '';
        const category = (inputFields[1] && inputFields[1].value) ? inputFields[1].value.trim() : '';

        if (keyword || category) {
          console.log(`Mencari lokasi: ${keyword}, Kategori: ${category}`);
          alert('Menghubungkan ke Peta Interaktif...');
        } else {
          alert('Silakan masukkan lokasi atau kategori terlebih dahulu.');
        }
      });

      inputFields.forEach(input => {
        input.addEventListener('keypress', (ev) => {
          if (ev.key === 'Enter') searchBtn.click();
        });
      });
    }

    const exploreBtn = document.querySelector('.btn-primary');
    const aboutSection = document.querySelector('.about-section');
    if (exploreBtn && aboutSection) {
      exploreBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      });
    }
  })();

  // SLIDER LOGIC (BERANDA)
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (slides.length > 0) {
    let currentIndex = 0;
    let slideInterval;

    function showSlide(index) {
      if (index >= slides.length) {
        currentIndex = 0;
      } else if (index < 0) {
        currentIndex = slides.length - 1;
      } else {
        currentIndex = index;
      }

      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      slides[currentIndex].classList.add('active');
      if (dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
      }
    }

    const nextSlide = () => {
      currentIndex++;
      showSlide(currentIndex);
    };

    const prevSlide = () => {
      currentIndex--;
      showSlide(currentIndex);
    };

    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
      clearInterval(slideInterval);
      startAutoSlide();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        resetInterval();
      });
    });

    startAutoSlide();
  }

  // ╔═══════════════════════════════════════════════════════════════════════════╗
  // ║ PAGE 2: TEMATRIP (tematrip.html)                                          ║
  // ║ - Array dengan 11 tour items (5 regular, 3 education, 3 special)         ║
  // ║ - Pagination: 5 item per halaman dengan numbered buttons                 ║
  // ║ - Category filter: regular / education / special / all                   ║
  // ╚═══════════════════════════════════════════════════════════════════════════╝
  // TEMATRIP: category tab filtering
  (function tematripTabs() {
    const tabBtns = document.querySelectorAll('.trip-filter-btn'); 
    if (!tabBtns || tabBtns.length === 0) return;

    function setActive(btn) {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = (btn.dataset.category || btn.getAttribute('data-category') || '').toLowerCase().trim();
            const key = (cat === 'semua' || cat === 'all' || cat === '') ? 'all' : cat;
            
            setActive(btn);

            if (typeof displayTours === 'function') {
                currentCategory = key;
                currentPage = 1;
                displayTours(1);
            } else {
                const cards = document.querySelectorAll('.tour-card');
                cards.forEach(card => {
                    const cardCat = (card.dataset.category || '').toLowerCase();
                    card.style.display = (key === 'all' || cardCat === key) ? '' : 'none';
                });
            }
        });
    });

    const activeBtn = Array.from(tabBtns).find(b => b.classList.contains('active')) || tabBtns[0];
    if (activeBtn) {
        setActive(activeBtn);
        if (typeof displayTours === 'function') displayTours(1);
    }
  })();

  // TEMATRIP: Tour Data & Pagination
  const allTours = [
    { category: 'regular', title: 'Hotel Mutiara', time: '2 Jam', price: 'Rp 100.000', img: 'https://via.placeholder.com/400x300', desc: 'Bagian penting dari sejarah akomodasi kota yang ikonik.' },
    { category: 'regular', title: 'Asistent Resident', time: '2 Jam', price: 'Rp 100.000', img: 'https://via.placeholder.com/400x300', desc: 'Kini berfungsi sebagai Rumah Dinas Walikota Salatiga.' },
    { category: 'regular', title: 'Rumah Dokter Hasmo', time: '2 Jam', price: 'Rp 100.000', img: 'https://via.placeholder.com/400x300', desc: 'Arsitektur kolonial yang masih terjaga keasliannya.' },
    { category: 'regular', title: 'Garasi ESTO', time: '2 Jam', price: 'Rp 100.000', img: 'https://via.placeholder.com/400x300', desc: 'Bekas garasi bus legendaris yang kini menjadi pusat kuliner.' },
    { category: 'regular', title: '1915 Coffee', time: '2 Jam', price: 'Rp 100.000', img: 'https://via.placeholder.com/400x300', desc: 'Bangunan bersejarah tahun 1915 yang diubah menjadi cafe modern.' },
    { category: 'special', title: 'Denhubrem 073 Hubdam IV/Dip', time: '2 Jam', price: 'Rp 200.000', img: 'https://via.placeholder.com/400x300', desc: 'Lokasi bersejarah dengan nilai khusus bagi sejarah militer.' },
    { category: 'special', title: 'Kodim 0714 / Salatiga', time: '1 Jam', price: 'Rp 200.000', img: 'https://via.placeholder.com/400x300', desc: 'Lokasi bersejarah dengan nilai khusus bagi sejarah militer.' },
    { category: 'special', title: 'Puri Makutarama', time: '2 Jam', price: 'Rp 200.000', img: 'https://via.placeholder.com/400x300', desc: 'Tempat istimewa dengan arsitektur dan nilai sejarah yang unik.' },
    { category: 'special', title: 'Gereja Kristen Jawa (GKJ) Salatiga', time: '2 Jam', price: 'Rp 200.000', img: 'https://via.placeholder.com/400x300', desc: 'Tempat ibadah bersejarah dengan nilai budaya dan keagamaan.' },
    { category: 'special', title: 'Bekas Rumah Keluarga Kartini', time: '1 Jam', price: 'Rp 200.000', img: 'https://via.placeholder.com/400x300', desc: 'Rumah bersejarah yang terkait dengan tokoh nasional.' },
    { category: 'special', title: 'Gereja Katolik Santo Paulus Miki', time: '2 Jam', price: 'Rp 200.000', img: 'https://via.placeholder.com/400x300', desc: 'Tempat ibadah bersejarah dengan nilai budaya dan keagamaan.' },
    { category: 'special', title: 'Bekas Rumah Hartini', time: '2 Jam', price: 'Rp 200.000', img: 'https://via.placeholder.com/400x300', desc: 'Rumah bersejarah dengan nilai penting dalam sejarah lokal.' },
    { category: 'special', title: 'KB-TK-SD Kanisius Cungkup Salatiga', time: '2 Jam', price: 'Rp 200.000', img: 'https://via.placeholder.com/400x300', desc: 'Institusi pendidikan bersejarah dengan nilai budaya.' },
    { category: 'special', title: 'Batalyon Infanteri 411', time: '2 Jam', price: 'Rp 200.000', img: 'https://via.placeholder.com/400x300', desc: 'Lokasi bersejarah dengan nilai khusus bagi sejarah militer.' },
    { category: 'special', title: 'Makam Kyai Abdul Wahid', time: '2 Jam', price: 'Rp 200.000', img: 'https://via.placeholder.com/400x300', desc: 'Makam tokoh agama dengan nilai spiritual dan sejarah.' },
    { category: 'special', title: 'Masjid Al-Fudlola', time: '1 Jam', price: 'Rp 200.000', img: 'https://via.placeholder.com/400x300', desc: 'Masjid bersejarah dengan nilai spiritual dan keagamaan.' }
  ];

  let currentPage = 1;
  let currentCategory = 'all';

  window.displayTours = function(page) {
    const grid = document.getElementById('tour-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const filteredTours = currentCategory === 'all' 
        ? allTours 
        : allTours.filter(t => t.category === currentCategory);

    // Pagination logic:
    // - Kategori 'all': Page 1 = 5 items, Page 2+ = 6 items
    // - Kategori lain: Page 1 = 6 items, Page 2+ = 6 items
    let start, end;
    const isAllCategory = currentCategory === 'all';
    
    if (page === 1) {
      start = 0;
      end = isAllCategory ? 5 : 6;
    } else {
      start = (isAllCategory ? 5 : 6) + (page - 2) * 6;
      end = start + 6;
    }
    const paginatedItems = filteredTours.slice(start, end);

    paginatedItems.forEach(tour => {
      const card = `
        <div class="tour-card" data-category="${tour.category}">
          <div class="card-image">
            <img src="${tour.img}" alt="${tour.title}">
            <div class="badge-time">
              <span class="material-symbols-outlined">schedule</span> ${tour.time}
            </div>
          </div>
          <div class="card-body">
            <div class="card-location">
              <span class="material-symbols-outlined">location_on</span> ${tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
            </div>
            <h3>${tour.title}</h3>
            <p style="text-align: justify;">${tour.desc}</p>
            <div class="card-footer">
              <div class="price-box">
                <span>Mulai Dari</span>
                <div class="price">${tour.price}</div>
              </div>
              <button class="card-btn-arrow">
                <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      `;
      grid.innerHTML += card;
    });

    if (page === 1 && (currentCategory === 'all' || currentCategory === 'custom' || currentCategory === 'education' || currentCategory === 'private')) {
      const customCard = `
        <div class="tour-card custom-card">
          <div class="card-image" style="display:flex;align-items:center;justify-content:center;background:#f0f6fb;">
            <span class="material-symbols-outlined" style="font-size:3rem;color:var(--primary-color);">add_circle</span>
          </div>
          <div class="card-body">
            <div class="card-location">
              <span class="material-symbols-outlined">location_on</span> Custom Tour
            </div>
            <h3 class="text-primary">Request Custom Tour</h3>
            <p style="text-align: justify;">Punya destinasi impian sendiri? Hubungi tim kami untuk membuat itinerary personal yang unik untukmu.</p>
            <div class="card-footer">
              <div class="price-box">
                <span>Konsultasi</span>
                <div class="price">Gratis</div>
              </div>
              <button class="card-btn-arrow">
                <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      `;
      grid.innerHTML += customCard;
    }

    setupPagination(filteredTours.length);
  };

  function setupPagination(totalItems) {
    // Pagination calculation:
    // - Kategori 'all': Page 1 = 5 items, Page 2+ = 6 items
    // - Kategori lain: Semua halaman = 6 items
    const isAllCategory = currentCategory === 'all';
    let pageCount;
    
    if (isAllCategory) {
      if (totalItems <= 5) {
        pageCount = 1;
      } else {
        pageCount = 1 + Math.ceil((totalItems - 5) / 6);
      }
    } else {
      pageCount = Math.ceil(totalItems / 6);
    }
    
    const pageNumbersContainer = document.getElementById('trip-page-numbers');
    const prevBtn = document.querySelector('.trip-prev-btn');
    const nextBtn = document.querySelector('.trip-next-btn');
    const paginationSection = document.getElementById('trip-pagination');

    if (pageCount <= 1) {
      if (paginationSection) paginationSection.style.display = 'none';
      return;
    } else {
      if (paginationSection) paginationSection.style.display = 'flex';
    }

    if (pageNumbersContainer) pageNumbersContainer.innerHTML = '';
    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement('button');
      btn.innerText = i;
      btn.className = (i === currentPage) ? 'trip-page-number active' : 'trip-page-number';
      btn.onclick = () => {
        currentPage = i;
        displayTours(currentPage);
        const section = document.getElementById('tematrip-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      };
      if (pageNumbersContainer) pageNumbersContainer.appendChild(btn);
    }

    if (prevBtn) {
      prevBtn.disabled = (currentPage === 1);
      prevBtn.onclick = () => {
        if (currentPage > 1) {
          currentPage--;
          displayTours(currentPage);
        }
      };
    }

    if (nextBtn) {
      nextBtn.disabled = (currentPage === pageCount);
      nextBtn.onclick = () => {
        if (currentPage < pageCount) {
          currentPage++;
          displayTours(currentPage);
        }
      };
    }
  }

  // Initialize TEMATRIP on page load
  setTimeout(() => {
    if (typeof displayTours === 'function') {
      displayTours(currentPage);
    }
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        currentCategory = this.getAttribute('data-filter');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        currentPage = 1;
        displayTours(currentPage);
      });
    });

    // Setup tour card button handlers for passing data to booking page
    setupTourCardHandlers();
  }, 100);

  // Function to handle tour card button clicks and pass data to booking page
  window.setupTourCardHandlers = function() {
    const tourGrid = document.getElementById('tour-grid');
    if (!tourGrid) return;

    tourGrid.addEventListener('click', function(e) {
      const button = e.target.closest('.card-btn-arrow');
      if (!button) return;

      const card = button.closest('.tour-card');
      if (!card) return;

      // Extract tour data from card
      const title = card.querySelector('h3')?.textContent || 'Custom Tour';
      const price = card.querySelector('.price')?.textContent || 'Hubungi Kami';
      const time = card.querySelector('.badge-time')?.textContent?.trim() || 'Sesuai Kebutuhan';
      const description = card.querySelector('.tour-card p')?.textContent || '';
      const category = card.dataset.category || 'regular';
      const image = card.querySelector('.card-image img')?.src || '';

      // Store tour data in sessionStorage
      const tourData = {
        title,
        price,
        time,
        description,
        category,
        image,
        timestamp: new Date().getTime()
      };

      sessionStorage.setItem('selectedTour', JSON.stringify(tourData));
      
      // Navigate to booking page
      window.location.href = 'tripbooking.html';
    });
  };

  // ╔═══════════════════════════════════════════════════════════════════════════╗
  // ║ PAGE 3: STORY MAPS (map.html)                                             ║
  // ║ - Interactive map dengan Leaflet.js di koordinat [-7.3275, 110.5050]     ║
  // ║ - 3 basemap pilihan: OpenStreetMap, CartoDB Voyager, Esri Imagery        ║
  // ║ - Basemap switcher dengan dynamic selection                               ║
  // ║ - GeoJSON rendering dengan 5 destination points                          ║
  // ║ - Custom heritage icon marker                                             ║
  // ║ - Side panel category filter (regular/education/special)                 ║
  // ║ - Zoom to location dengan flyTo animation (1.5 detik)                   ║
  // ║ - Top-left controls: zoom, locate, basemap                                ║
  // ╚═══════════════════════════════════════════════════════════════════════════╝
  const mapElement = document.getElementById('map');

  if (mapElement && typeof L !== 'undefined') {
    // LAYER DEFINITIONS
    const cartoVoyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19
    });

    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      minZoom: 1
    });

    const esriSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri',
      maxZoom: 18
    });

    // MAP INITIALIZATION WITH IMPROVED ERROR HANDLING
    try {
      window.map = L.map('map', {
        zoomControl: false,
        scrollWheelZoom: true,
        dragging: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        keyboardPanDelta: 80,
        layers: [],
        preferCanvas: true
      }).setView([-7.3275, 110.5050], 16);

      // Add basemap immediately
      osmLayer.addTo(window.map);
      
      // Ensure map size is correct
      setTimeout(() => {
        if (window.map) {
          window.map.invalidateSize(true);
          console.log('✓ Map initialized successfully');
        }
      }, 100);
      
      setTimeout(() => {
        if (window.map && window.map.getZoom) {
          window.map.invalidateSize(true);
        }
      }, 500);
      
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    // BASEMAP SWITCHER
    const baseMaps = {
      "OpenStreetMap": osmLayer,
      "CartoDB Voyager": cartoVoyager,
      "Satelit (Esri)": esriSatellite
    };

    const basemapLayers = [osmLayer, cartoVoyager, esriSatellite];
    let currentBasemapIndex = 0;

    function switchBasemap(index = null) {
      if (!window.map) return;
      
      if (index !== null && !Number.isNaN(index)) {
        currentBasemapIndex = index;
      } else {
        currentBasemapIndex = (currentBasemapIndex + 1) % basemapLayers.length;
      }

      basemapLayers.forEach(layer => {
        if (window.map.hasLayer(layer)) {
          window.map.removeLayer(layer);
        }
      });

      basemapLayers[currentBasemapIndex].addTo(window.map);
      console.log(`✓ Basemap: ${Object.keys(baseMaps)[currentBasemapIndex]}`);
    }

    console.log('✓ Map controls initialized:', {
      dragging: window.map.dragging.enabled(),
      scrollWheelZoom: window.map.scrollWheelZoom.enabled(),
      doubleClickZoom: window.map.doubleClickZoom.enabled(),
      keyboard: window.map.keyboard.enabled()
    });

    // INTEGRATED GEOJSON DATA WITH MARKERS RENDERING
    window.geojsonData = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "Id": 0,
            "Fungsi": "Hotel Mutiara",
            "Toponimi": "Hotel",
            "Kategori": "regular",
            "Img": "img/hotel-mutiara.webp",
            "Desc": "Bagian penting dari sejarah akomodasi kota yang ikonik."
          },
          "geometry": { "type": "Point", "coordinates": [110.5036, -7.3275] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 1,
            "Fungsi": "Asistent Resident",
            "Toponimi": "Rumah Dinas",
            "Kategori": "regular",
            "Img": "img/walikota.webp",
            "Desc": "Kini berfungsi sebagai Rumah Dinas Walikota Salatiga."
          },
          "geometry": { "type": "Point", "coordinates": [110.5055, -7.3270] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 2,
            "Fungsi": "Rumah Dokter Hasmo",
            "Toponimi": "Rumah",
            "Kategori": "regular",
            "Img": "img/rumah-hasmo.webp",
            "Desc": "Arsitektur kolonial yang masih terjaga keasliannya."
          },
          "geometry": { "type": "Point", "coordinates": [110.5037, -7.3265] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 3,
            "Fungsi": "Garasi ESTO",
            "Toponimi": "Food Court",
            "Kategori": "regular",
            "Img": "img/esto.webp",
            "Desc": "Bekas garasi bus legendaris yang kini menjadi pusat kuliner."
          },
          "geometry": { "type": "Point", "coordinates": [110.5039, -7.3276] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 4,
            "Fungsi": "1915 Coffee",
            "Toponimi": "Coffee Shop",
            "Kategori": "regular",
            "Img": "img/1915.webp",
            "Desc": "Bangunan bersejarah tahun 1915 yang diubah menjadi cafe modern."
          },
          "geometry": { "type": "Point", "coordinates": [110.5085, -7.3278] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 5,
            "Fungsi": "Denhubrem 073 Hubdam IV/Dip",
            "Toponimi": "Special",
            "Kategori": "special",
            "Img": "img/denhubrem.webp",
            "Desc": "Lokasi bersejarah dengan nilai khusus bagi sejarah militer."
          },
          "geometry": { "type": "Point", "coordinates": [110.494676100000049, -7.315366199999971] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 6,
            "Fungsi": "Kodim 0714 / Salatiga",
            "Toponimi": "Special",
            "Kategori": "special",
            "Img": "img/kodim.webp",
            "Desc": "Lokasi bersejarah dengan nilai khusus bagi sejarah militer."
          },
          "geometry": { "type": "Point", "coordinates": [110.500573, -7.322423899999933] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 7,
            "Fungsi": "Puri Makutarama",
            "Toponimi": "Special",
            "Kategori": "special",
            "Img": "img/puri-makutarama.webp",
            "Desc": "Tempat istimewa dengan arsitektur dan nilai sejarah yang unik."
          },
          "geometry": { "type": "Point", "coordinates": [110.494211100000086, -7.316085099999952] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 8,
            "Fungsi": "Gereja Kristen Jawa (GKJ) Salatiga",
            "Toponimi": "Special",
            "Kategori": "special",
            "Img": "img/gkj-salatiga.webp",
            "Desc": "Tempat ibadah bersejarah dengan nilai budaya dan keagamaan."
          },
          "geometry": { "type": "Point", "coordinates": [110.49827, -7.32051] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 9,
            "Fungsi": "Bekas Rumah Keluarga Kartini",
            "Toponimi": "Special",
            "Kategori": "special",
            "Img": "img/rumah-kartini.webp",
            "Desc": "Rumah bersejarah yang terkait dengan tokoh nasional."
          },
          "geometry": { "type": "Point", "coordinates": [110.497931794000067, -7.320027718999938] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 10,
            "Fungsi": "Gereja Katolik Santo Paulus Miki",
            "Toponimi": "Special",
            "Kategori": "special",
            "Img": "img/gereja-santo-paulus.webp",
            "Desc": "Tempat ibadah bersejarah dengan nilai budaya dan keagamaan."
          },
          "geometry": { "type": "Point", "coordinates": [110.50148, -7.32229] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 11,
            "Fungsi": "Bekas Rumah Hartini",
            "Toponimi": "Special",
            "Kategori": "special",
            "Img": "img/rumah-hartini.webp",
            "Desc": "Rumah bersejarah dengan nilai penting dalam sejarah lokal."
          },
          "geometry": { "type": "Point", "coordinates": [110.504151169000068, -7.324267906999978] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 12,
            "Fungsi": "KB-TK-SD Kanisius Cungkup Salatiga",
            "Toponimi": "Special",
            "Kategori": "special",
            "Img": "img/kanisius-cungkup.webp",
            "Desc": "Institusi pendidikan bersejarah dengan nilai budaya."
          },
          "geometry": { "type": "Point", "coordinates": [110.50177, -7.32195] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 13,
            "Fungsi": "Batalyon Infanteri 411",
            "Toponimi": "Special",
            "Kategori": "special",
            "Img": "img/batalyon.webp",
            "Desc": "Lokasi bersejarah dengan nilai khusus bagi sejarah militer."
          },
          "geometry": { "type": "Point", "coordinates": [110.503522930000088, -7.33525750299998] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 14,
            "Fungsi": "Makam Kyai Abdul Wahid",
            "Toponimi": "Special",
            "Kategori": "special",
            "Img": "img/makam-kyai.webp",
            "Desc": "Makam tokoh agama dengan nilai spiritual dan sejarah."
          },
          "geometry": { "type": "Point", "coordinates": [110.52369, -7.35711] }
        },
        {
          "type": "Feature",
          "properties": {
            "Id": 15,
            "Fungsi": "Masjid Al-Fudlola",
            "Toponimi": "Special",
            "Kategori": "special",
            "Img": "img/masjid-al-fudlola.webp",
            "Desc": "Tempat ibadah bersejarah dengan nilai budaya dan keagamaan."
          },
          "geometry": { "type": "Point", "coordinates": [110.5261, -7.3566] }
        }
      ]
    };

    const markerLayerGroup = {};

    // CUSTOM MARKER ICON
    const heritageIcon = L.divIcon({
      className: 'custom-div-icon',
      html: "<div class='heritage-icon'><i class='bx bxs-landmark'></i></div>",
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -40]
    });

    // RENDER GEOJSON TO MAP
    let geojsonLayer = null;
    let activeFilters = new Set(['regular', 'special']);

    window.renderGeoJSON = function(filterFn = () => true) {
      if (!window.map) {
        console.warn('⚠️ Map not initialized yet');
        return;
      }
      
      if (geojsonLayer) {
        window.map.removeLayer(geojsonLayer);
      }

      Object.keys(markerLayerGroup).forEach(id => delete markerLayerGroup[id]);

      // Initialize markers tracking map
      if (!window.geojsonMarkers) {
        window.geojsonMarkers = new Map();
      } else {
        window.geojsonMarkers.clear();
      }

      geojsonLayer = L.geoJSON(window.geojsonData, {
        filter: feature => filterFn(feature),
        pointToLayer: (feature, latlng) => {
          const marker = L.marker(latlng, { icon: heritageIcon });
          markerLayerGroup[feature.properties.Id] = marker;
          
          // Track marker by feature ID
          window.geojsonMarkers.set(feature.properties.Id, marker);
          
          return marker;
        },
        onEachFeature: (feature, layer) => {
          const category = feature.properties.Kategori || 'regular';
          const badgeClass = `badge badge-${category.toLowerCase()}`;
          const popupContent = `
            <div class="popup-container" style="min-width: 200px;">
              <div style="padding: 10px;">
                <span class="${badgeClass}" style="display: inline-block; margin-bottom: 8px;">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                <h3 style="margin: 0 0 5px; font-size: 14px;">${feature.properties.Fungsi}</h3>
                <p style="font-size: 11px; color: #666;">${feature.properties.Desc}</p>
              </div>
            </div>`;
          layer.bindPopup(popupContent);
          layer.on('click', function() {
            if (window.map) {
              window.map.flyTo(layer.getLatLng(), 18, { animate: true, duration: 1.5 });
            }
          });
        }
      }).addTo(window.map);
      
      console.log(`✓ GeoJSON rendered with ${Object.keys(markerLayerGroup).length} markers`);
    };

    // Render GeoJSON on initialization
    renderGeoJSON();

    // TOP LEFT CONTROLS
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const locateBtn = document.getElementById('locateBtn');
    const basemapBtn = document.getElementById('basemapBtn');
    const basemapPanel = document.getElementById('basemapPanel');
    const basemapOptions = document.querySelectorAll('.basemap-option');

    if (zoomInBtn) zoomInBtn.addEventListener('click', () => {
      if (window.map) window.map.zoomIn();
    });
    
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => {
      if (window.map) window.map.zoomOut();
    });
    
    if (locateBtn) {
      locateBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
          alert('Geolocation tidak didukung oleh browser ini.');
          return;
        }
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            if (window.map) {
              window.map.flyTo([lat, lng], 16, { animate: true, duration: 1 });
              L.marker([lat, lng], { title: 'Lokasi Saya' })
                .addTo(window.map)
                .bindPopup('📍 Lokasi Saya')
                .openPopup();
            }
          },
          () => {
            alert('Tidak dapat mendapatkan lokasi Anda. Menampilkan peta area default.');
            if (window.map) window.map.flyTo([-7.3275, 110.5050], 15);
          }
        );
      });
    }

    if (basemapBtn) {
      basemapBtn.addEventListener('click', event => {
        event.stopPropagation();
        if (basemapPanel) basemapPanel.classList.toggle('hidden');
      });
    }

    basemapOptions.forEach(option => {
      option.addEventListener('click', () => {
        const index = Number(option.dataset.basemapIndex);
        if (!Number.isNaN(index)) {
          switchBasemap(index);
          if (basemapPanel) basemapPanel.classList.add('hidden');
        }
      });
    });

    document.addEventListener('click', event => {
      if (basemapPanel && !basemapPanel.contains(event.target) && event.target !== basemapBtn) {
        basemapPanel.classList.add('hidden');
      }
    });

    // SIDE PANEL FILTER (Story Maps)
    const sideFilterButtons = document.querySelectorAll('.side-filter-btn');
    const locationCards = document.querySelectorAll('.story-card');

    sideFilterButtons.forEach(button => {
      button.addEventListener('click', () => {
        sideFilterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-filter').toLowerCase().trim();

        locationCards.forEach(card => {
          const cardCategory = card.getAttribute('data-kategori') ? card.getAttribute('data-kategori').toLowerCase() : '';
          if (selectedCategory === 'all' || selectedCategory === 'semua' || cardCategory === selectedCategory) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });

        if (typeof renderGeoJSON === 'function') {
          renderGeoJSON(feature => {
            const featCat = feature.properties.Kategori.toLowerCase();
            return selectedCategory === 'all' || selectedCategory === 'semua' || featCat === selectedCategory;
          });
        }
      });
    });

    // SIDEBAR TOGGLE FUNCTIONALITY (Story Maps)
    const sidePanel = document.getElementById('sidePanel');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const storyWrapper = document.querySelector('.story-wrapper');

    if (sidebarToggleBtn && sidePanel) {
      sidebarToggleBtn.addEventListener('click', () => {
        sidePanel.classList.toggle('hidden');
        sidebarToggleBtn.classList.toggle('sidebar-hidden');
        
        if (storyWrapper) {
          if (sidePanel.classList.contains('hidden')) {
            storyWrapper.classList.add('sidebar-hidden');
            storyWrapper.classList.remove('sidebar-visible');
          } else {
            storyWrapper.classList.remove('sidebar-hidden');
            storyWrapper.classList.add('sidebar-visible');
          }
        }
        
        // Invalidate map size untuk adjust dengan perubahan layout
        setTimeout(() => {
          if (window.map) {
            window.map.invalidateSize(true);
          }
        }, 300);
        
        console.log('✓ Sidebar toggled - Hidden:', sidePanel.classList.contains('hidden'));
      });
    }

    // GLOBAL ZOOM FUNCTION
    window.zoomToLocation = function(id) {
      if (!window.map) {
        console.warn('⚠️ Map not ready');
        return;
      }
      
      const targetId = Number(id);
      const feature = window.geojsonData.features.find(f => f.properties.Id === targetId);
      
      if (feature) {
        const coords = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
        window.map.closePopup();
        window.map.flyTo(coords, 18, { animate: true, duration: 1.5 });
        setTimeout(() => {
          if (markerLayerGroup[targetId]) {
            markerLayerGroup[targetId].openPopup();
          }
        }, 1600);
      } else {
        console.error("⚠️ Lokasi dengan ID " + id + " tidak ditemukan di GeoJSON.");
      }
    };
  }

  // ╔═══════════════════════════════════════════════════════════════════════════╗
  // ║ PAGE 4: TOURISM MAPS (tourismmaps.html) - PANEL LOGIC                    ║
  // ║ - 3 panels: Legend, Route, Nearby                                         ║
  // ║ - Panel management (show/hide/toggle behavior)                            ║
  // ║ - hideAllPanels() untuk cleanup semua map elements                        ║
  // ║ - Feature popup untuk destination information                             ║
  // ╚═══════════════════════════════════════════════════════════════════════════╝
  const tourismFeaturePopup = document.getElementById('featurePopup');
  const panels = {
    legend: document.getElementById('legendPanel'),
    route: document.getElementById('routePanel'),
    nearby: document.getElementById('nearbyPanel')
  };

  const btns = {
    legend: document.getElementById('openLegendBtn'),
    route: document.getElementById('openRouteBtn'),
    nearby: document.getElementById('openNearbyBtn')
  };

  function hideAllPanels() {
    Object.values(panels).forEach(p => { if (p) p.classList.add('hidden'); });
    if (tourismFeaturePopup) tourismFeaturePopup.classList.add('hidden');
    
    // Clean up route elements
    if (window.routeLine && window.map) {
      try { window.map.removeLayer(window.routeLine); } catch(e) {}
      window.routeLine = null;
    }
    if (window.routeMarkers) {
      window.routeMarkers.forEach(marker => {
        if (window.map) try { window.map.removeLayer(marker); } catch(e) {}
      });
      window.routeMarkers = [];
    }
    if (window.myLocationMarkerRoute && window.map) {
      try { window.map.removeLayer(window.myLocationMarkerRoute); } catch(e) {}
      window.myLocationMarkerRoute = null;
    }
    
    // Reset nearby filter when panel is closed
    if (window.nearbyFilterActive && window.geojsonMarkers) {
      window.nearbyFilterActive = false;
      
      // Restore all markers to visible
      window.geojsonMarkers.forEach((marker, featureId) => {
        if (window.map) {
          if (!window.map.hasLayer(marker)) {
            marker.addTo(window.map);
          }
          marker.setOpacity(1);
        }
      });
    }
    
    // Remove buffer circle
    if (window.bufferCircle && window.map) {
      try { window.map.removeLayer(window.bufferCircle); } catch(e) {}
      window.bufferCircle = null;
    }
    
    // Remove nearby markers (origin marker)
    if (window.nearbyMarkers) {
      window.nearbyMarkers.forEach(marker => {
        if (window.map) try { window.map.removeLayer(marker); } catch(e) {}
      });
      window.nearbyMarkers = [];
    }
    if (window.myLocationMarkerNearby && window.map) {
      try { window.map.removeLayer(window.myLocationMarkerNearby); } catch(e) {}
      window.myLocationMarkerNearby = null;
    }
  }

  if (btns.legend) {
    btns.legend.onclick = (e) => { e.stopPropagation(); const h = panels.legend.classList.contains('hidden'); hideAllPanels(); if(h) panels.legend.classList.remove('hidden'); };
  }
  if (btns.route) {
    btns.route.onclick = (e) => { e.stopPropagation(); const h = panels.route.classList.contains('hidden'); hideAllPanels(); if(h) panels.route.classList.remove('hidden'); };
  }
  if (btns.nearby) {
    btns.nearby.onclick = (e) => { e.stopPropagation(); const h = panels.nearby.classList.contains('hidden'); hideAllPanels(); if(h) panels.nearby.classList.remove('hidden'); };
  }

  document.querySelectorAll('.panel-close-btn').forEach(btn => {
    btn.onclick = () => hideAllPanels();
  });

  // ╔═══════════════════════════════════════════════════════════════════════════╗
  // ║ PAGE 4A: ROUTE PANEL (OSRM ROUTING) - tourismmaps.html                   ║
  // ║ - Checkbox "Gunakan lokasi saya" untuk user geolocation                   ║
  // ║ - Start location: dari geolocation atau dropdown selection                ║
  // ║ - End location: dari dropdown selection                                    ║
  // ║ - OSRM API untuk calculate distance & route                               ║
  // ║ - Traffic-aware duration: ×1.15 peak, ×0.9 off-peak, ×1.0 normal       ║
  // ║ - Solid blue polyline (weight: 6, opacity: 1)                            ║
  // ║ - Start marker (blue) & end marker (red)                                   ║
  // ║ - Route info display di panel dengan jarak & estimasi                     ║
  // ║ - Auto-fit map to route bounds                                             ║
  // ╚═══════════════════════════════════════════════════════════════════════════╝
  (function initializeRoutePanel() {
    const useMyLocationRoute = document.getElementById('useMyLocationRoute');
    const resetToMyLocationRoute = document.getElementById('resetToMyLocationRoute');
    const startLocationSelect = document.getElementById('startLocationSelect');
    const endLocationSelect = document.getElementById('endLocationSelect');
    const showRouteBtn = document.getElementById('showRouteBtn');
    const routeInfo = document.getElementById('routeInfo');

    let myLocationRoute = null;

    // Populate dropdowns with destinations
    function populateLocationSelects() {
      if (!window.geojsonData || !window.geojsonData.features) return;

      const options = window.geojsonData.features.map(f => `<option value="${f.properties.Id}|${f.geometry.coordinates[1]}|${f.geometry.coordinates[0]}">${f.properties.Fungsi}</option>`).join('');
      
      if (startLocationSelect) startLocationSelect.innerHTML = '<option value="">Pilih Destinasi Awal</option>' + options;
      if (endLocationSelect) endLocationSelect.innerHTML = '<option value="">Pilih Destinasi Tujuan</option>' + options;
    }

    // Only populate if elements exist
    if (startLocationSelect || endLocationSelect) {
      populateLocationSelects();
    }

    // Handle checkbox for using my location
    if (useMyLocationRoute && startLocationSelect) {
      const wrapper = document.getElementById('startLocationSelectWrapper');
      
      useMyLocationRoute.addEventListener('change', () => {
        if (useMyLocationRoute.checked) {
          // Hide start location dropdown
          if (wrapper) wrapper.style.display = 'none';
          
          if (!navigator.geolocation) {
            alert('Geolocation tidak didukung');
            useMyLocationRoute.checked = false;
            if (wrapper) wrapper.style.display = 'block';
            return;
          }
          
          useMyLocationRoute.disabled = true;
          navigator.geolocation.getCurrentPosition(
            position => {
              myLocationRoute = [position.coords.latitude, position.coords.longitude];
              useMyLocationRoute.disabled = false;
              console.log('✅ Lokasi user untuk route:', myLocationRoute);
              
              // Add blue marker to map immediately when location is obtained
              if (map && typeof L !== 'undefined') {
                // Remove previous my location marker
                if (window.myLocationMarkerRoute) {
                  try { map.removeLayer(window.myLocationMarkerRoute); } catch(e) {}
                }
                
                // Add blue marker for user location
                window.myLocationMarkerRoute = L.marker(myLocationRoute, {
                  title: 'Lokasi Anda',
                  icon: L.icon({
                    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34]
                  })
                })
                  .bindPopup('<strong>Lokasi Anda</strong><br/>Lokasi awal untuk rute')
                  .addTo(map)
                  .openPopup();
                
                // Zoom to location
                map.flyTo(myLocationRoute, 15, { animate: true, duration: 1.5 });
              }
            },
            () => {
              useMyLocationRoute.disabled = false;
              useMyLocationRoute.checked = false;
              if (wrapper) wrapper.style.display = 'block';
              alert('❌ Tidak dapat mengakses lokasi Anda. Silakan pilih destinasi awal dari dropdown.');
            }
          );
        } else {
          // Show start location dropdown
          if (wrapper) wrapper.style.display = 'block';
          myLocationRoute = null;
          
          // Remove marker when unchecked
          if (window.myLocationMarkerRoute && map) {
            try { map.removeLayer(window.myLocationMarkerRoute); } catch(e) {}
            window.myLocationMarkerRoute = null;
          }
        }
      });
    }

    // Reset button
    if (resetToMyLocationRoute) {
      resetToMyLocationRoute.addEventListener('click', () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              myLocationRoute = [position.coords.latitude, position.coords.longitude];
              if (map) map.flyTo(myLocationRoute, 15);
            },
            () => alert('Tidak dapat mendapatkan lokasi')
          );
        }
      });
    }

    // Show route handler
    if (showRouteBtn) {
      showRouteBtn.addEventListener('click', () => {
        let startCoords, endCoords;
        let startLabel = '';
        let endLabel = '';

        if (useMyLocationRoute && useMyLocationRoute.checked && myLocationRoute) {
          startCoords = myLocationRoute;
          startLabel = '📍 Lokasi Anda';
        } else if (startLocationSelect && startLocationSelect.value) {
          const parts = startLocationSelect.value.split('|');
          startCoords = [parseFloat(parts[1]), parseFloat(parts[2])];
          const selectedOption = startLocationSelect.options[startLocationSelect.selectedIndex];
          startLabel = selectedOption ? selectedOption.text : 'Destinasi Awal';
        } else {
          alert('⚠️ Pilih destinasi awal atau centang "Gunakan lokasi saya"');
          return;
        }

        if (endLocationSelect && endLocationSelect.value) {
          const parts = endLocationSelect.value.split('|');
          endCoords = [parseFloat(parts[1]), parseFloat(parts[2])];
          const selectedOption = endLocationSelect.options[endLocationSelect.selectedIndex];
          endLabel = selectedOption ? selectedOption.text : 'Destinasi Tujuan';
        } else {
          alert('⚠️ Pilih destinasi tujuan');
          return;
        }

        // Call OSRM API
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?overview=full&geometries=geojson`;

        fetch(osrmUrl)
          .then(response => response.json())
          .then(data => {
            if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
              const route = data.routes[0];
              const distanceKm = (route.distance / 1000).toFixed(2);
              
              // Calculate traffic-aware duration (like Google Maps)
              const durationSeconds = route.duration;
              const baseSpeedKmh = (route.distance / 1000) / (durationSeconds / 3600); // km/h
              
              // Apply traffic factor based on time of day and road conditions
              let trafficFactor = 1.0;
              const currentHour = new Date().getHours();
              
              // Peak hours: 07:00-09:00, 17:00-19:00 (multiply by 1.15 = 15% slower)
              if ((currentHour >= 7 && currentHour <= 9) || (currentHour >= 17 && currentHour <= 19)) {
                trafficFactor = 1.15; // 15% slower in peak hours
              } 
              // Off-peak: 22:00-06:00 (multiply by 0.9 = 10% faster)
              else if (currentHour >= 22 || currentHour <= 6) {
                trafficFactor = 0.9; // 10% faster in off-peak
              }
              
              const adjustedDurationSeconds = durationSeconds * trafficFactor;
              const durationMin = Math.round(adjustedDurationSeconds / 60);

              // Draw route with solid line (not dashed)
              if (window.routeLine && map) {
                try { map.removeLayer(window.routeLine); } catch(e) {}
              }

              // Remove previous route markers
              if (window.routeMarkers) {
                window.routeMarkers.forEach(marker => {
                  if (map) try { map.removeLayer(marker); } catch(e) {}
                });
              }
              window.routeMarkers = [];

              window.routeLine = L.polyline(
                route.geometry.coordinates.map(c => [c[1], c[0]]),
                { color: '#2563eb', weight: 6, opacity: 1, lineCap: 'round', lineJoin: 'round' }
              ).addTo(map);

              // Add start location marker (blue)
              const startMarker = L.marker(startCoords, {
                title: startLabel,
                icon: L.icon({
                  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34]
                })
              })
                .bindPopup(`<strong>${startLabel}</strong><br/>Lokasi Awal`)
                .addTo(map);
              window.routeMarkers.push(startMarker);

              // Add end location marker
              const endMarker = L.marker(endCoords, {
                title: endLabel,
                icon: L.icon({
                  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34]
                })
              })
                .bindPopup(`<strong>${endLabel}</strong><br/>Destinasi`)
                .addTo(map);
              window.routeMarkers.push(endMarker);

              // Update route info in panel
              if (routeInfo) {
                routeInfo.innerHTML = `
                  <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #ddd;">
                    <strong style="color: #666;">Dari:</strong> ${startLabel}
                  </div>
                  <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #ddd;">
                    <strong style="color: #666;">Tujuan:</strong> ${endLabel}
                  </div>
                  <div style="display: flex; gap: 16px; margin-bottom: 8px;">
                    <div style="flex: 1;">
                      <div style="font-size: 12px; color: #999;">Jarak</div>
                      <div style="font-size: 18px; font-weight: bold; color: #f59e42;">${distanceKm} km</div>
                    </div>
                    <div style="flex: 1;">
                      <div style="font-size: 12px; color: #999;">Estimasi ${trafficFactor > 1 ? '(Lalu Lintas Padat)' : trafficFactor < 1 ? '(Lancar)' : ''}</div>
                      <div style="font-size: 18px; font-weight: bold; color: #2563eb;">${durationMin} menit</div>
                    </div>
                  </div>
                `;
              }

              // Show route popup
              showRouteTourPopup(parseFloat(distanceKm), durationMin);

              // Fit map to route bounds
              if (map) {
                const bounds = L.latLngBounds(
                  [startCoords[0], startCoords[1]],
                  [endCoords[0], endCoords[1]]
                );
                map.fitBounds(bounds, { padding: [50, 50] });
              }
            } else {
              alert('❌ Rute tidak ditemukan');
            }
          })
          .catch(err => {
            console.error('OSRM Error:', err);
            alert('❌ Gagal mendapatkan rute dari server');
          });
      });
    }
  })();

  // ╔═══════════════════════════════════════════════════════════════════════════╗
  // ║ PAGE 4B: NEARBY PANEL (TURF.JS BUFFER) - tourismmaps.html                ║
  // ║ - Checkbox "Gunakan lokasi saya" untuk user geolocation                   ║
  // ║ - Origin: dari geolocation atau manual dropdown selection                 ║
  // ║ - Distance buttons: 500m (default), 1km, 2km, 5km                       ║
  // ║ - Turf.js buffer creation dengan units kilometer                          ║
  // ║ - Point-in-polygon detection untuk find nearby destinations               ║
  // ║ - Hide GeoJSON markers yang di luar buffer                                 ║
  // ║ - Green buffer circle di map (radius = selectedDistance)                  ║
  // ║ - Origin marker dengan blue color & popup                                  ║
  // ║ - Result list dengan name, description, distance (sorted ascending)      ║
  // ║ - Map auto-fit ke buffer bounds                                            ║
  // ║ - Restore markers ketika panel ditutup                                     ║
  // ╚═══════════════════════════════════════════════════════════════════════════╝
  (function initializeNearbyPanel() {
    const useMyLocation = document.getElementById('useMyLocation');
    const resetToMyLocation = document.getElementById('resetToMyLocation');
    const manualLocationSelect = document.getElementById('manualLocationSelect');
    const nearbyDistanceBtns = document.querySelectorAll('.nearby-distance-btn');
    const btnCariTerdekat = document.getElementById('btnCariTerdekat');
    const nearbyResultList = document.getElementById('nearbyResultList');
    const currentOriginLabel = document.getElementById('currentOriginLabel');

    let selectedDistance = 500; // Default 500m (match dengan active button di HTML)
    let selectedOrigin = null;
    let myLocationNearby = null;

    // Populate manual location select
    function populateManualLocationSelect() {
      if (!window.geojsonData || !window.geojsonData.features) return;

      const options = window.geojsonData.features
        .map(f => `<option value="${f.properties.Id}|${f.geometry.coordinates[1]}|${f.geometry.coordinates[0]}">${f.properties.Fungsi}</option>`)
        .join('');
      
      if (manualLocationSelect) {
        manualLocationSelect.innerHTML = '<option value="">-- Pilih Lokasi Awal --</option>' + options;
      }
    }

    populateManualLocationSelect();

    // Distance button handlers - dengan styling yang baik
    if (nearbyDistanceBtns && nearbyDistanceBtns.length > 0) {
      // Set initial active state dan styling
      const activeBtn = document.querySelector('.nearby-distance-btn.active');
      if (activeBtn) {
        activeBtn.style.background = '#10b981';
        activeBtn.style.color = '#fff';
        activeBtn.style.borderColor = '#059669';
      }

      nearbyDistanceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove active state dari semua button
          nearbyDistanceBtns.forEach(b => {
            b.classList.remove('active');
            b.style.background = 'transparent';
            b.style.color = '#666';
            b.style.borderColor = '#d1d5db';
          });
          
          // Add active state ke button yang diklik
          btn.classList.add('active');
          btn.style.background = '#10b981';
          btn.style.color = '#fff';
          btn.style.borderColor = '#059669';
          
          // Update selectedDistance
          selectedDistance = parseInt(btn.dataset.distance);
          console.log('✅ Buffer distance dipilih:', selectedDistance, 'meter');
        });
      });
    }

    // Get user location
    if (useMyLocation) {
      useMyLocation.addEventListener('change', () => {
        if (useMyLocation.checked) {
          if (!navigator.geolocation) {
            alert('Geolocation tidak didukung');
            useMyLocation.checked = false;
            return;
          }
          useMyLocation.disabled = true;
          navigator.geolocation.getCurrentPosition(
            position => {
              myLocationNearby = [position.coords.latitude, position.coords.longitude];
              useMyLocation.disabled = false;
              console.log('Lokasi user untuk nearby:', myLocationNearby);
              
              // Add blue marker to map immediately when location is obtained
              if (map && typeof L !== 'undefined') {
                // Remove previous my location marker
                if (window.myLocationMarkerNearby) {
                  try { map.removeLayer(window.myLocationMarkerNearby); } catch(e) {}
                }
                
                // Add blue marker for user location
                window.myLocationMarkerNearby = L.marker(myLocationNearby, {
                  title: 'Lokasi Anda',
                  icon: L.icon({
                    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34]
                  })
                })
                  .bindPopup('<strong>Lokasi Anda</strong><br/>Lokasi untuk pencarian terdekat')
                  .addTo(map)
                  .openPopup();
                
                // Zoom to location
                map.flyTo(myLocationNearby, 15, { animate: true, duration: 1.5 });
              }
              
              alert('✅ Lokasi Anda berhasil diambil!');
            },
            () => {
              useMyLocation.disabled = false;
              useMyLocation.checked = false;
              alert('❌ Tidak dapat mengakses lokasi Anda. Silakan pilih lokasi manual.');
            }
          );
        }
      });
    }

    if (resetToMyLocation) {
      resetToMyLocation.addEventListener('click', () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              myLocationNearby = [position.coords.latitude, position.coords.longitude];
              useMyLocation.checked = true;
              if (map) map.flyTo(myLocationNearby, 15);
            },
            () => alert('Tidak dapat mendapatkan lokasi')
          );
        }
      });
    }

    // Search nearby handler
    if (btnCariTerdekat) {
      btnCariTerdekat.addEventListener('click', () => {
        let selectedLocationName = 'Lokasi Manual';
        
        if (useMyLocation && useMyLocation.checked && myLocationNearby) {
          selectedOrigin = myLocationNearby;
          selectedLocationName = '📍 Lokasi Anda';
        } else if (manualLocationSelect && manualLocationSelect.value) {
          const parts = manualLocationSelect.value.split('|');
          selectedOrigin = [parseFloat(parts[1]), parseFloat(parts[2])];
          
          // Get location name from GeoJSON
          if (window.geojsonData && window.geojsonData.features) {
            const selectedId = parseInt(parts[0]);
            const feature = window.geojsonData.features.find(f => f.properties.Id === selectedId);
            if (feature) {
              selectedLocationName = feature.properties.Fungsi;
            }
          }
        } else {
          alert('Pilih lokasi awal atau gunakan lokasi Anda');
          return;
        }

        // Update label with location name
        if (currentOriginLabel) {
          currentOriginLabel.textContent = `Lokasi Awal: ${selectedLocationName}`;
        }

        // Create Turf buffer
        const originPoint = turf.point([selectedOrigin[1], selectedOrigin[0]]);
        const bufferDistance = selectedDistance / 1000; // Convert to km for Turf
        const buffered = turf.buffer(originPoint, bufferDistance, { units: 'kilometers' });

        // Find destinations within buffer
        const nearby = [];
        if (window.geojsonData && window.geojsonData.features) {
          window.geojsonData.features.forEach(feature => {
            const point = turf.point(feature.geometry.coordinates);
            if (turf.booleanPointInPolygon(point, buffered)) {
              const distance = turf.distance(originPoint, point, { units: 'kilometers' });
              nearby.push({
                id: feature.properties.Id,
                name: feature.properties.Fungsi,
                category: feature.properties.Kategori,
                description: feature.properties.Desc || 'Destinasi wisata menarik',
                distance: distance.toFixed(2),
                coords: [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
              });
            }
          });
        }

        // Sort by distance
        nearby.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

        // Display results with better formatting
        if (nearbyResultList) {
          if (nearby.length === 0) {
            nearbyResultList.innerHTML = '<div style="text-align: center; padding: 16px; color: #999; font-size: 12px; font-style: italic;">Tidak ada destinasi dalam radius ini.</div>';
          } else {
            nearbyResultList.innerHTML = nearby.map((place, index) => `
              <div style="padding: 12px; border: 1px solid #e0e7ff; border-radius: 8px; background: #f8fafc; cursor: pointer; transition: all 0.2s; margin-bottom: 8px;" 
                   onclick="window.zoomToLocation(${place.id})" 
                   onmouseover="this.style.background='#eef2ff'; this.style.borderColor='#c7d2fe';" 
                   onmouseout="this.style.background='#f8fafc'; this.style.borderColor='#e0e7ff';">
                <div style="display: flex; gap: 8px; align-items: flex-start;">
                  <div style="flex-shrink: 0; width: 24px; height: 24px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">
                    📍
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <div style="font-weight: 600; color: #1f2937; font-size: 13px; margin-bottom: 2px;">${place.name}</div>
                    <div style="font-size: 11px; color: #6b7280; margin-bottom: 4px; line-height: 1.3;">${place.description}</div>
                    <div style="font-weight: 700; color: #10b981; font-size: 13px;">${place.distance} km</div>
                  </div>
                </div>
              </div>
            `).join('');
          }
        }

        // Clear previous markers and buffer
        if (window.nearbyMarkers) {
          window.nearbyMarkers.forEach(marker => {
            if (map) try { map.removeLayer(marker); } catch(e) {}
          });
        }
        window.nearbyMarkers = [];

        // Store IDs of nearby locations to show/hide
        const nearbyIds = nearby.map(place => place.id);

        // Draw buffer on map if Leaflet available
        if (map && typeof L !== 'undefined') {
          // Remove previous buffer
          if (window.bufferCircle) {
            try { map.removeLayer(window.bufferCircle); } catch(e) {}
          }
          
          // Draw new buffer circle
          window.bufferCircle = L.circle(selectedOrigin, {
            radius: selectedDistance,
            color: '#10b981',
            weight: 2,
            opacity: 0.5,
            fill: true,
            fillColor: '#10b981',
            fillOpacity: 0.15
          }).addTo(map);

          // Add origin marker only
          const originMarker = L.marker(selectedOrigin, { 
            title: 'Lokasi Awal',
            icon: L.icon({
              iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
            })
          })
            .bindPopup(`<strong>${selectedLocationName}</strong><br/>Lokasi Pencarian`)
            .addTo(map);
          window.nearbyMarkers.push(originMarker);

          // Hide markers from geojsonLayer that are NOT in nearby list
          if (window.geojsonMarkers) {
            window.geojsonMarkers.forEach((marker, featureId) => {
              if (nearbyIds.includes(featureId)) {
                // Show marker if in nearby
                if (map.hasLayer(marker)) {
                  marker.setOpacity(1);
                } else {
                  marker.addTo(map);
                }
              } else {
                // Hide marker if NOT in nearby
                if (map.hasLayer(marker)) {
                  map.removeLayer(marker);
                }
              }
            });
          }

          // Fit map to buffer bounds
          if (map && nearby.length > 0) {
            map.fitBounds(window.bufferCircle.getBounds(), { padding: [50, 50] });
          }
        }

        // Store active filter state
        window.nearbyFilterActive = true;
        window.nearbyFilterIds = nearbyIds;
      });
    }
  })();

  // ╔═══════════════════════════════════════════════════════════════════════════╗
  // ║ PAGE 5: ABOUT US (profile.html)                                           ║
  // ║ - Static about page content                                                ║
  // ║ - Company information & contact details                                     ║
  // ║ - No interactive map elements                                              ║
  // ╚═══════════════════════════════════════════════════════════════════════════╝
  const exploreBtn2 = document.querySelector('.btn-primary');
  if (exploreBtn2) {
    exploreBtn2.addEventListener('click', (e) => {
      const about = document.querySelector('.about-section');
      if (about) about.scrollIntoView({ behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', function() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;
    
    const title = aboutSection.querySelector('.title');
    if (!title) return;
    
    let scrollValue = window.scrollY;
    if (scrollValue > 100) {
      let scaleAmount = 1 + (scrollValue / 5000);
      title.style.transform = `scale(${scaleAmount})`;
    } else {
      title.style.transform = `scale(1)`;
    }
  });

  // ========= GLOBAL UTILITIES & FINAL INITIALIZATION ==========
  
  /* ─────────────────────────────────────────────────────────────
     HAMBURGER MENU FUNCTIONALITY (MOBILE)
  ───────────────────────────────────────────────────────────────── */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navbar = document.getElementById('navbar');

  if (hamburgerBtn && navbar) {
    hamburgerBtn.addEventListener('click', function() {
      hamburgerBtn.classList.toggle('active');
      navbar.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navbarLinks = navbar.querySelectorAll('a');
    navbarLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerBtn.classList.remove('active');
        navbar.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.header-container')) {
        hamburgerBtn.classList.remove('active');
        navbar.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      if (nav) nav.classList.add('scrolled');
    } else {
      if (nav) nav.classList.remove('scrolled');
    }
  });

}); // ====== END DOMContentLoaded ======
