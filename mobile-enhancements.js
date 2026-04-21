/* ═══════════════════════════════════════════════════════════════════════════════
   MOBILE OPTIMIZATION - JAVASCRIPT ENHANCEMENTS
   Swipe Gesture Handling, FAB, dan UX Improvements
═══════════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. FLOATING ACTION BUTTON (FAB) - HELP BUTTON
  // ═══════════════════════════════════════════════════════════════════════════

  function initializeFAB() {
    // Cek apakah FAB sudah ada, jika tidak buat
    let fab = document.querySelector('.fab-button');
    if (!fab) {
      fab = document.createElement('button');
      fab.className = 'fab-button';
      fab.setAttribute('aria-label', 'Bantuan dan Navigasi');
      fab.setAttribute('title', 'Klik untuk bantuan');
      fab.innerHTML = '<i class="bx bx-help-circle"></i>';
      document.body.appendChild(fab);

      fab.addEventListener('click', function() {
        showHelpModal();
      });
    }

    // Sembunyikan FAB di layar desktop
    if (window.innerWidth > 768) {
      fab.style.display = 'none';
    }
  }

  function showHelpModal() {
    alert('📍 Telusur Kota - Panduan Penggunaan:\n\n' +
          '• Geser bawah untuk membuka menu navigasi\n' +
          '• Sentuh ikon untuk melihat detail\n' +
          '• Gunakan fitur zoom untuk memperbesar peta\n\n' +
          'Butuh bantuan lebih lanjut? Hubungi kami!');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. SIDEBAR SWIPE GESTURE HANDLER
  // ═══════════════════════════════════════════════════════════════════════════

  function initializeSidebarSwipe() {
    const sidePanel = document.querySelector('.side-panel');
    if (!sidePanel) return;

    let touchStartY = 0;
    let touchEndY = 0;
    let isDragging = false;
    let initialHeight = null;

    const panelHeader = sidePanel.querySelector('.side-panel-header');

    if (panelHeader) {
      panelHeader.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].clientY;
        isDragging = true;
        initialHeight = sidePanel.offsetHeight;
        sidePanel.style.cursor = 'grabbing';
      }, false);

      panelHeader.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        touchEndY = e.changedTouches[0].clientY;

        // Calculate delta
        const delta = touchEndY - touchStartY;

        // Allow dragging down to minimize, up to maximize
        if (delta > 0) {
          // Dragging down - minimize
          const newHeight = initialHeight - delta;
          const minHeight = window.innerHeight * 0.15; // Min 15% height

          if (newHeight >= minHeight) {
            sidePanel.style.maxHeight = newHeight + 'px';
          }
        }
      }, false);

      panelHeader.addEventListener('touchend', function(e) {
        isDragging = false;
        sidePanel.style.cursor = 'grab';

        if (touchEndY === 0) return; // No movement

        const delta = touchEndY - touchStartY;
        const threshold = 50; // pixels

        if (delta > threshold) {
          // Swipe down - collapse/minimize
          animateSidePanelClose();
        } else if (delta < -threshold) {
          // Swipe up - expand/maximize
          animateSidePanelOpen();
        } else {
          // Reset to previous state
          sidePanel.style.maxHeight = initialHeight + 'px';
        }

        touchStartY = 0;
        touchEndY = 0;
      }, false);
    }
  }

  function animateSidePanelClose() {
    const sidePanel = document.querySelector('.side-panel');
    if (!sidePanel) return;

    sidePanel.style.transition = 'max-height 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    sidePanel.style.maxHeight = (window.innerHeight * 0.2) + 'px'; // 20% height
  }

  function animateSidePanelOpen() {
    const sidePanel = document.querySelector('.side-panel');
    if (!sidePanel) return;

    sidePanel.style.transition = 'max-height 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    sidePanel.style.maxHeight = (window.innerHeight * 0.7) + 'px'; // 70% height
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 2B. SIDEBAR TOGGLE BUTTON HANDLER (MOBILE)
  // ═══════════════════════════════════════════════════════════════════════════

  function initializeSidebarToggle() {
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const sidePanel = document.querySelector('.side-panel');

    if (!sidebarToggleBtn || !sidePanel) return;

    sidebarToggleBtn.addEventListener('click', () => {
      sidePanel.classList.toggle('hidden');
      sidebarToggleBtn.classList.toggle('sidebar-hidden');

      // Toggle visibility on mobile (bottom sheet behavior)
      if (sidePanel.classList.contains('hidden')) {
        sidePanel.style.maxHeight = '0';
        sidePanel.style.overflow = 'hidden';
      } else {
        sidePanel.style.maxHeight = (window.innerHeight * 0.7) + 'px';
        sidePanel.style.overflow = 'auto';
      }

      console.log('✓ Sidebar toggled - Hidden:', sidePanel.classList.contains('hidden'));
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. IMPROVED HAMBURGER MENU - BETTER ANIMATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  function enhanceHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navbar = document.getElementById('navbar');

    if (!hamburgerBtn || !navbar) return;

    hamburgerBtn.addEventListener('click', function() {
      hamburgerBtn.classList.toggle('active');
      navbar.classList.toggle('active');

      // Prevent body scroll when menu is open
      if (navbar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });

    // Close menu when link is clicked
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerBtn.classList.remove('active');
        navbar.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideHeader = event.target.closest('.header-container');
      if (!isClickInsideHeader && navbar.classList.contains('active')) {
        hamburgerBtn.classList.remove('active');
        navbar.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navbar.classList.contains('active')) {
        hamburgerBtn.classList.remove('active');
        navbar.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. MAP CONTROLS - PREVENT AUTO-ACTIVATION ON SCROLL
  // ═══════════════════════════════════════════════════════════════════════════

  function improveMapScroll() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Disable map interactions during scroll
    let scrollTimeout;
    document.addEventListener('wheel', function(e) {
      if (mapContainer.contains(e.target)) {
        e.preventDefault();
      }
    }, { passive: false });

    // Better touch handling for maps
    if ('ontouchstart' in window) {
      document.addEventListener('touchmove', function(e) {
        // Allow vertical scroll on non-map areas
        if (e.target.closest('.side-panel') ||
            e.target.closest('.glass-panel') ||
            e.target.closest('.feature-popup')) {
          return;
        }
      }, { passive: true });
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. RESPONSIVE IMAGE LOADING (LAZY LOADING)
  // ═══════════════════════════════════════════════════════════════════════════

  function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. TOUCH-FRIENDLY BUTTONS - INCREASE TAP AREA
  // ═══════════════════════════════════════════════════════════════════════════

  function improveTouchTargets() {
    if (window.innerWidth <= 767) {
      // Add touch feedback
      const buttons = document.querySelectorAll('button, a[role="button"], input[type="button"]');
      buttons.forEach(btn => {
        btn.addEventListener('touchstart', function() {
          this.style.opacity = '0.8';
        });

        btn.addEventListener('touchend', function() {
          this.style.opacity = '1';
        });
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. VIEWPORT HEIGHT FIX FOR MOBILE (Address bar height)
  // ═══════════════════════════════════════════════════════════════════════════

  function fixViewportHeight() {
    const updateHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 8. SMOOTH SCROLL BEHAVIOR
  // ═══════════════════════════════════════════════════════════════════════════

  function enableSmoothScroll() {
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 9. DETECT DEVICE ORIENTATION CHANGES
  // ═══════════════════════════════════════════════════════════════════════════

  function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
      setTimeout(() => {
        // Adjust UI after orientation change
        const sidePanel = document.querySelector('.side-panel');
        if (sidePanel) {
          sidePanel.style.maxHeight = (window.innerHeight * 0.6) + 'px';
        }
      }, 200);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 10. INITIALIZE ALL ENHANCEMENTS
  // ═══════════════════════════════════════════════════════════════════════════

  function initializeAllEnhancements() {
    // Only on mobile devices
    if (window.innerWidth <= 768) {
      initializeFAB();
      initializeSidebarSwipe();
      initializeSidebarToggle();
      improveTouchTargets();
      improveMapScroll();
      fixViewportHeight();
      enableSmoothScroll();
      handleOrientationChange();
    }

    enhanceHamburgerMenu(); // Works on all devices
    initializeLazyLoading(); // Works on all devices
  }

  // Start initialization
  initializeAllEnhancements();

  // Reinitialize on window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth <= 768) {
        initializeFAB();
      } else {
        const fab = document.querySelector('.fab-button');
        if (fab) fab.style.display = 'none';
      }
    }, 250);
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // CONSOLE LOG FOR DEBUGGING
  // ═══════════════════════════════════════════════════════════════════════════

  console.log('✅ Mobile Optimization Enhancements Loaded');
  console.log('📱 Device Width:', window.innerWidth);
  console.log('📊 Device Height:', window.innerHeight);
  console.log('🌐 User Agent:', navigator.userAgent);

});

// Export functions for external use
window.mobileFunctions = {
  expandSidebar: () => {
    const sidePanel = document.querySelector('.side-panel');
    if (sidePanel) {
      sidePanel.style.transition = 'max-height 0.3s ease';
      sidePanel.style.maxHeight = (window.innerHeight * 0.8) + 'px';
    }
  },
  collapseSidebar: () => {
    const sidePanel = document.querySelector('.side-panel');
    if (sidePanel) {
      sidePanel.style.transition = 'max-height 0.3s ease';
      sidePanel.style.maxHeight = (window.innerHeight * 0.2) + 'px';
    }
  },
  toggleMenu: () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    if (hamburgerBtn) hamburgerBtn.click();
  }
};
