/* ============================================
   TELUSUR KOTA - TOUR BOOKING SYSTEM
   MAIN JAVASCRIPT FILE
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Load selected tour data from sessionStorage
    loadSelectedTour();
    
    initializePhoneInput();
    setupFormHandlers();
    setupCategoryCards();
    setupLocationCards();
    setupPaymentCards();
    setupStepperButtons();
});

/* ============================================
   GLOBAL STATE
   ============================================ */

let currentStep = 1;
const totalSteps = 3;
let selectedCategory = null;
let selectedLocation = null;
let selectedPayment = null;
let selectedTour = null;
let isSubmitting = false;

/* ============================================
   PHONE INPUT INITIALIZATION
   ============================================ */

function initializePhoneInput() {
    const phoneInput = document.querySelector("#tour-whatsapp");
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: "id",
        preferredCountries: ["id", "us", "gb"],
        separateDialCode: false,
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18/build/js/utils.js",
    });

    phoneInput.addEventListener('change', function() {
        const isValid = iti.isValidNumber();
        const fullNumber = iti.getNumber();
        console.log('Phone valid:', isValid, 'Number:', fullNumber);
    });
}

/* ============================================
   LOAD SELECTED TOUR
   ============================================ */

function loadSelectedTour() {
    try {
        const tourDataStr = sessionStorage.getItem('selectedTour');
        if (tourDataStr) {
            selectedTour = JSON.parse(tourDataStr);
            
            // Display tour summary at top of page
            displayTourSummary();
            
            // Pre-select category if available
            if (selectedTour.category) {
                preSelectCategory();
            }
            
            console.log('✓ Tour loaded from session:', selectedTour);
        }
    } catch (error) {
        console.error('Error loading tour data:', error);
    }
}

function displayTourSummary() {
    if (!selectedTour) return;
    
    // Find or create tour summary container
    let tourSummaryContainer = document.getElementById('tour-summary-display');
    
    if (!tourSummaryContainer) {
        // Create tour summary container if it doesn't exist
        const headerSubtitle = document.getElementById('tour-headerSubtitle');
        if (headerSubtitle) {
            tourSummaryContainer = document.createElement('div');
            tourSummaryContainer.id = 'tour-summary-display';
            tourSummaryContainer.style.cssText = `
                margin-top: 16px;
                padding: 16px;
                background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%);
                border-left: 4px solid #0ea5e9;
                border-radius: 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 16px;
            `;
            headerSubtitle.parentElement.insertBefore(tourSummaryContainer, headerSubtitle.nextSibling);
        }
    }
    
    if (tourSummaryContainer) {
        tourSummaryContainer.innerHTML = `
            <div style="flex: 1;">
                <p style="margin: 0; font-size: 14px; color: #0284c7; font-weight: 600;">TOUR TERPILIH</p>
                <h3 style="margin: 4px 0 0 0; color: #0c4a6e; font-size: 18px; font-weight: 700;">${selectedTour.title}</h3>
                <p style="margin: 8px 0 0 0; color: #0c4a6e; font-size: 13px;">
                    <span style="margin-right: 16px;">⏱️ ${selectedTour.time}</span>
                    <span>💰 ${selectedTour.price}</span>
                </p>
            </div>
            <button type="button" onclick="clearSelectedTour()" style="
                padding: 8px 12px;
                background: #e0f2fe;
                border: 1px solid #0ea5e9;
                color: #0284c7;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                font-size: 13px;
                transition: all 0.2s;
            " onmouseover="this.style.background='#cce9f9'" onmouseout="this.style.background='#e0f2fe'">
                Ubah Tour
            </button>
        `;
    }
}

function clearSelectedTour() {
    sessionStorage.removeItem('selectedTour');
    selectedTour = null;
    const tourSummaryContainer = document.getElementById('tour-summary-display');
    if (tourSummaryContainer) {
        tourSummaryContainer.remove();
    }
}

function preSelectCategory() {
    if (!selectedTour || !selectedTour.category) return;
    
    // Map category from tour data to form category names
    const categoryMap = {
        'regular': 'regular tour',
        'special': 'special tour',
        'education': 'education tour',
        'private': 'private tour'
    };
    
    const formCategory = categoryMap[selectedTour.category] || selectedTour.category;
    
    // Find and click the matching category card
    const cards = document.querySelectorAll('.tour-category-card');
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category')?.toLowerCase() || '';
        if (cardCategory === formCategory || cardCategory === selectedTour.category) {
            // Simulate click to select this category
            card.click();
        }
    });
}

/* ============================================
   FORM HANDLERS
   ============================================ */

function setupFormHandlers() {
    const form = document.getElementById('tour-bookingForm');
    const submitBtn = document.getElementById('tour-btnSubmit');

    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleFormSubmit();
        });
    }

    // Enter key untuk next button pada input (kecuali textarea)
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const nextBtn = document.getElementById('tour-btnNext');
                if (nextBtn && currentStep < totalSteps) {
                    e.preventDefault();
                    handleNextStep();
                }
            }
        });

        // Add visual feedback on input
        input.addEventListener('focus', function() {
            this.parentElement.style.borderColor = '#0ea5e9';
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.borderColor = '';
            this.parentElement.style.boxShadow = '';
        });
    });

    // Add textarea for custom route
    const textarea = form.querySelector('textarea');
    if (textarea) {
        textarea.addEventListener('focus', function() {
            this.parentElement.style.borderColor = '#0ea5e9';
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
        });

        textarea.addEventListener('blur', function() {
            this.parentElement.style.borderColor = '';
            this.parentElement.style.boxShadow = '';
        });
    }
}

/* ============================================
   CATEGORY CARDS
   ============================================ */

function setupCategoryCards() {
    const cards = document.querySelectorAll('.tour-category-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active from all
            cards.forEach(c => {
                c.classList.remove('active');
                c.style.transform = '';
            });
            
            // Add active to clicked with smooth animation
            this.classList.add('active');
            this.style.transform = 'scale(1.02)';
            
            // Store selected category
            const categoryText = this.querySelector('span').textContent.toLowerCase();
            selectedCategory = categoryText;
            
            console.log('✓ Kategori dipilih:', selectedCategory);
            
            // Show/hide location panel based on category
            updateLocationPanel();

            // Add success feedback
            showFeedback(this, 'Kategori dipilih');
        });

        // Add hover effect
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
}

function showFeedback(element, message) {
    // Create feedback tooltip
    const feedback = document.createElement('div');
    feedback.textContent = '✓ ' + message;
    feedback.style.cssText = `
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translateX(-50%);
        background: #10b981;
        color: white;
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.appendChild(feedback);
    
    setTimeout(() => feedback.style.opacity = '1', 0);
    setTimeout(() => feedback.style.opacity = '0', 2000);
    setTimeout(() => feedback.remove(), 2300);
}

function updateLocationPanel() {
    const locationPanel = document.getElementById('tour-locationPanel');
    const customRoutePanel = document.getElementById('tour-customRoutePanel');
    const selectedLocationInput = document.getElementById('tour-selectedLocation');
    const customRouteInput = document.getElementById('tour-customRoute');

    // Determine if category needs location selection or custom input
    if (selectedCategory === 'regular tour' || selectedCategory === 'special tour') {
        // Show location cards, hide custom route
        if (locationPanel) locationPanel.classList.remove('tour-hidden');
        if (customRoutePanel) customRoutePanel.classList.add('tour-hidden');
        if (customRouteInput) customRouteInput.value = '';
    } else if (selectedCategory === 'private tour' || selectedCategory === 'education tour') {
        // Hide location cards, show custom route
        if (locationPanel) locationPanel.classList.add('tour-hidden');
        if (customRoutePanel) customRoutePanel.classList.remove('tour-hidden');
        
        // Reset location selection
        document.querySelectorAll('.tour-location-card').forEach(card => {
            card.classList.remove('active');
        });
        if (selectedLocationInput) selectedLocationInput.value = '';
        selectedLocation = null;
    }
}

/* ============================================
   LOCATION CARDS
   ============================================ */

function setupLocationCards() {
    const cards = document.querySelectorAll('.tour-location-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Only allow selection if showing location panel
            if (selectedCategory === 'regular tour' || selectedCategory === 'special tour') {
                // Remove active from all
                cards.forEach(c => {
                    c.classList.remove('active');
                    c.style.transform = '';
                });
                
                // Add active to clicked
                this.classList.add('active');
                this.style.transform = 'scale(1.02)';
                
                // Store selected location
                const locationName = this.querySelector('h3').textContent;
                selectedLocation = locationName;
                
                // Update hidden input
                const selectedLocationInput = document.getElementById('tour-selectedLocation');
                if (selectedLocationInput) {
                    selectedLocationInput.value = locationName;
                }
                
                console.log('✓ Lokasi dipilih:', selectedLocation);

                // Add success feedback
                showFeedback(this, 'Lokasi dipilih');
            }
        });

        // Add hover effect
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
}

/* ============================================
   PAYMENT METHOD CARDS
   ============================================ */

function setupPaymentCards() {
    const cards = document.querySelectorAll('.tour-payment-method-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active from all
            cards.forEach(c => {
                c.classList.remove('active');
                c.style.transform = '';
            });
            
            // Add active to clicked with animation
            this.classList.add('active');
            this.style.transform = 'scale(1.02)';
            
            // Store selected payment
            const methodHeader = this.querySelector('.tour-method-header span');
            selectedPayment = methodHeader ? methodHeader.textContent : 'Unknown';
            
            // Update hidden input
            const selectedPaymentInput = document.getElementById('tour-selectedPayment');
            if (selectedPaymentInput) {
                selectedPaymentInput.value = selectedPayment;
            }
            
            console.log('✓ Metode pembayaran dipilih:', selectedPayment);

            // Add success feedback
            showFeedback(this, 'Metode pembayaran dipilih');
        });

        // Add hover effect
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
}

/* ============================================
   STEPPER BUTTONS
   ============================================ */

function setupStepperButtons() {
    const nextBtn = document.getElementById('tour-btnNext');
    const backBtn = document.getElementById('tour-btnBack');
    const submitBtn = document.getElementById('tour-btnSubmit');

    if (nextBtn) {
        nextBtn.addEventListener('click', handleNextStep);
    }

    if (backBtn) {
        backBtn.addEventListener('click', handlePrevStep);
    }
}

function handleNextStep() {
    if (validateStep(currentStep)) {
        goToStep(currentStep + 1);
    } else {
        showValidationError();
    }
}

function handlePrevStep() {
    goToStep(currentStep - 1);
}

function goToStep(stepNumber) {
    // Boundary check
    if (stepNumber < 1 || stepNumber > totalSteps) return;

    // Hide all steps
    document.querySelectorAll('.tour-form-step').forEach(step => {
        step.classList.add('tour-hidden');
    });

    // Show current step
    const currentStepElement = document.querySelector(`.tour-form-step[data-step="${stepNumber}"]`);
    if (currentStepElement) {
        currentStepElement.classList.remove('tour-hidden');
    }

    // Update stepper indicators
    updateStepperUI(stepNumber);

    // Update buttons
    updateButtonsVisibility(stepNumber);

    // Populate summary if on step 3
    if (stepNumber === 3) {
        populateSummary();
    }

    currentStep = stepNumber;
    console.log('Current step:', currentStep);
}

function updateStepperUI(stepNumber) {
    const stepperItems = document.querySelectorAll('.tour-stepper-item');

    stepperItems.forEach((item, index) => {
        const step = index + 1;
        item.classList.remove('tour-active', 'tour-completed');

        if (step < stepNumber) {
            item.classList.add('tour-completed');
        } else if (step === stepNumber) {
            item.classList.add('tour-active');
        }
    });
}

function updateButtonsVisibility(stepNumber) {
    const backBtn = document.getElementById('tour-btnBack');
    const nextBtn = document.getElementById('tour-btnNext');
    const submitBtn = document.getElementById('tour-btnSubmit');
    const buttonContainer = document.querySelector('.tour-form-actions');

    if (backBtn) {
        backBtn.style.display = stepNumber > 1 ? 'inline-flex' : 'none';
    }

    if (stepNumber < totalSteps) {
        if (nextBtn) nextBtn.style.display = 'inline-flex';
        if (submitBtn) submitBtn.style.display = 'none';
    } else {
        if (nextBtn) nextBtn.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'inline-flex';
    }
}

/* ============================================
   VALIDATION
   ============================================ */

function validateStep(stepNumber) {
    switch(stepNumber) {
        case 1:
            return validateStep1();
        case 2:
            return validateStep2();
        case 3:
            return validateStep3();
        default:
            return false;
    }
}

function validateStep1() {
    const fullName = document.getElementById('tour-fullName').value.trim();
    const whatsapp = document.getElementById('tour-whatsapp').value.trim();
    const email = document.getElementById('tour-email').value.trim();
    const cityOrigin = document.getElementById('tour-cityOrigin').value.trim();
    const instagram = document.getElementById('tour-instagram').value.trim();

    if (!fullName) {
        alert('Mohon isi Nama Lengkap');
        return false;
    }

    if (!whatsapp) {
        alert('Mohon isi Nomor WhatsApp');
        return false;
    }

    if (!email || !isValidEmail(email)) {
        alert('Mohon isi Email dengan format yang benar (example@gmail.com)');
        return false;
    }

    if (!cityOrigin) {
        alert('Mohon isi Kota Asal');
        return false;
    }

    if (!instagram) {
        alert('Mohon isi Username Instagram');
        return false;
    }

    // Check if category selected
    if (!selectedCategory) {
        alert('Mohon pilih Kategori Tur');
        return false;
    }

    // Check location or custom route based on category
    if (selectedCategory === 'regular tour' || selectedCategory === 'special tour') {
        if (!selectedLocation) {
            alert('Mohon pilih Lokasi Tur');
            return false;
        }
    } else if (selectedCategory === 'private tour' || selectedCategory === 'education tour') {
        const customRoute = document.getElementById('tour-customRoute').value.trim();
        if (!customRoute) {
            alert('Mohon isi Rute Perjalanan Kustom');
            return false;
        }
    }

    return true;
}

function validateStep2() {
    if (!selectedPayment) {
        alert('Mohon pilih Metode Pembayaran');
        return false;
    }
    return true;
}

function validateStep3() {
    // Step 3 is just summary, validation already done in previous steps
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showValidationError() {
    // Validation errors are shown via alert in validation functions
    // This function can be enhanced for better UX
}

/* ============================================
   SUMMARY POPULATION
   ============================================ */

function populateSummary() {
    const fullName = document.getElementById('tour-fullName').value;
    const whatsapp = document.getElementById('tour-whatsapp').value;
    const email = document.getElementById('tour-email').value;
    const cityOrigin = document.getElementById('tour-cityOrigin').value;
    const instagram = document.getElementById('tour-instagram').value;
    const customRoute = document.getElementById('tour-customRoute').value;

    // Update summary items
    updateSummaryItem('fullNameSummary', fullName);
    updateSummaryItem('whatsappSummary', whatsapp);
    updateSummaryItem('emailSummary', email);
    updateSummaryItem('cityOriginSummary', cityOrigin);
    updateSummaryItem('instagramSummary', instagram);
    updateSummaryItem('categorySummary', selectedCategory || '-');
    updateSummaryItem('locationSummary', selectedLocation || customRoute || '-');
    updateSummaryItem('paymentSummary', selectedPayment || '-');
}

function updateSummaryItem(elementId, value) {
    const element = document.querySelector(`[data-summary="${elementId}"]`);
    if (element) {
        element.textContent = value;
    }
}

/* ============================================
   FORM SUBMISSION
   ============================================ */

async function handleFormSubmit() {
    // Final validation before submission
    if (!validateStep3()) {
        alert('Mohon periksa kembali data Anda');
        return;
    }

    if (isSubmitting) return; // Prevent double submission
    isSubmitting = true;

    // Disable submit button and show loading state
    const submitBtn = document.getElementById('tour-btnSubmit');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Memproses Pemesanan...';
    submitBtn.style.opacity = '0.6';

    try {
        // Prepare form data
        const formData = {
            fullName: document.getElementById('tour-fullName').value.trim(),
            whatsapp: document.getElementById('tour-whatsapp').value.trim(),
            email: document.getElementById('tour-email').value.trim(),
            cityOrigin: document.getElementById('tour-cityOrigin').value.trim(),
            instagram: document.getElementById('tour-instagram').value.trim(),
            category: selectedCategory || 'Tidak Dipilih',
            location: selectedLocation || document.getElementById('tour-customRoute').value.trim() || 'Custom',
            paymentMethod: selectedPayment || 'Tidak Dipilih',
            submittedAt: new Date().toISOString(),
            // Include selected tour information if available
            selectedTour: selectedTour ? {
                title: selectedTour.title,
                price: selectedTour.price,
                time: selectedTour.time,
                category: selectedTour.category
            } : null
        };

        // Validate required fields one more time
        if (!formData.fullName || !formData.whatsapp || !formData.email) {
            alert('❌ Nama, WhatsApp, dan Email tidak boleh kosong');
            isSubmitting = false;
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.opacity = '1';
            return;
        }

        console.log('📤 Mengirim data pemesanan...', formData);

        // Send to backend with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

        const response = await fetch('http://localhost:3000/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        const result = await response.json();

        if (response.ok && result.success) {
            console.log('✅ Pemesanan berhasil dibuat:', result);
            
            // Store booking ID and tour data in sessionStorage for success page
            sessionStorage.setItem('bookingId', result.bookingId || 'N/A');
            if (selectedTour) {
                sessionStorage.setItem('lastBookedTour', JSON.stringify(selectedTour));
            }

            // Show detailed success message
            const message = `
✅ PEMESANAN BERHASIL!

Nomor Referensi: ${result.bookingId}
Nama: ${formData.fullName}
Email: ${formData.email}
WhatsApp: ${formData.whatsapp}

📧 Email konfirmasi telah dikirim ke:
   • ${formData.email} (untuk Anda)
   • temantelusur@gmail.com (untuk tim kami)

📱 Tim kami akan menghubungi Anda melalui WhatsApp untuk detail lebih lanjut.

Terima kasih telah memesan dengan Telusur Kota! 🙏
            `;
            
            alert(message);

            // Redirect to beranda (index.html) after 2 seconds
            console.log('⏳ Mengarahkan ke beranda...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);

        } else {
            const errorMsg = result.message || 'Silakan coba lagi';
            console.error('❌ Error pemesanan:', result);
            alert(`❌ Terjadi kesalahan: ${errorMsg}`);
        }

    } catch (error) {
        console.error('⚠️ Network error:', error);
        
        if (error.name === 'AbortError') {
            alert('⏱️ Waktu tunggu habis. Pastikan backend sedang berjalan dan coba lagi.');
        } else {
            alert(`⚠️ Gagal terhubung ke server.\n\nPastikan:\n1. Backend berjalan di http://localhost:3000\n2. Koneksi internet aktif\n3. File .env sudah dikonfigurasi`);
        }
        
    } finally {
        // Re-enable submit button and restore original state
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.opacity = '1';
    }
}

function resetForm() {
    // Clear all form fields
    document.getElementById('tour-bookingForm').reset();
    
    // Clear selections
    selectedCategory = null;
    selectedLocation = null;
    selectedPayment = null;

    // Clear active states
    document.querySelectorAll('.tour-category-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelectorAll('.tour-location-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelectorAll('.tour-payment-method-card').forEach(card => {
        card.classList.remove('active');
    });

    // Reset stepper
    updateStepperUI(1);
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

function logBookingData() {
    const data = {
        fullName: document.getElementById('tour-fullName').value,
        whatsapp: document.getElementById('tour-whatsapp').value,
        email: document.getElementById('tour-email').value,
        cityOrigin: document.getElementById('tour-cityOrigin').value,
        instagram: document.getElementById('tour-instagram').value,
        category: selectedCategory,
        location: selectedLocation || document.getElementById('tour-customRoute').value,
        payment: selectedPayment
    };
    console.table(data);
    return data;
}

// Debug: Log current state when Ctrl+Shift+B is pressed
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyB') {
        console.log('=== Booking System State ===');
        logBookingData();
    }
});
