# 🏛️ TELUSUR KOTA - Heritage Tourism Platform

> Wadah untuk mengenalkan dan memahami sejarah dan budaya melalui pariwisata dalam suatu kota.

![Status](https://img.shields.io/badge/Status-Semi--Dynamic%20%7C%20Production%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## **📌 Overview**

**Telusur Kota** adalah platform webGIS terintegrasi untuk sistem booking dan eksplorasi destinasi pariwisata budaya. Website ini menggabungkan:

- 🗺️ **Interactive Maps** (Leaflet.js + GeoJSON)
- 📱 **Responsive Design** (Mobile-first approach)
- 🎫 **Booking System** (Terintegrasi backend)
- 📧 **Email Notifications** (Nodemailer)
- 💾 **Data Persistence** (JSON + Backend API)

---

## **✨ Features**

### **Frontend Features**
- ✅ Responsive website (Mobile, Tablet, Desktop)
- ✅ Interactive hero slider dengan auto-advance
- ✅ Category selection (Regular, Special, Private, Education)
- ✅ Multi-step booking form dengan stepper indicator
- ✅ Payment method selection
- ✅ Form validation dengan error highlighting
- ✅ Real-time map visualization
- ✅ Destination filtering dan search
- ✅ Story maps dengan GeoJSON data

### **Backend Features**
- ✅ Node.js Express server
- ✅ RESTful API (CRUD operations)
- ✅ Automated email confirmations
- ✅ JSON file storage (bookings.json)
- ✅ CORS enabled
- ✅ Error handling & validation

### **Map Features**
- ✅ Multiple basemap options
- ✅ GeoJSON rendering
- ✅ Custom markers & icons
- ✅ Route calculation (OSRM)
- ✅ Nearby location detection (Turf.js)
- ✅ Distance filtering

---

## **🚀 Quick Start**

### **Prerequisites**
- Node.js v14+ ([Download](https://nodejs.org/))
- Gmail account dengan 2FA enabled
- Text editor (VS Code recommended)

### **Setup Backend (5 minutes)**

```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Edit .env with your Gmail credentials
# - Get App Password from: https://myaccount.google.com/apppasswords
# - Fill GMAIL_USER dan GMAIL_APP_PASSWORD

# 5. Start server
npm start
```

✅ Server akan berjalan di `http://localhost:3000`

### **Test Frontend**

```bash
# 1. Open tripbooking.html in browser
# 2. Fill booking form
# 3. Click "Selesai"
# 4. Check email (inbox + spam folder)
```

---

## **📂 Project Structure**

```
telusur-kota/
│
├── index.html                  # Halaman beranda
├── tematrip.html              # Tema trip dengan pagination
├── map.html                   # Story maps
├── tourismmaps.html           # Tourism maps dengan panel
├── profile.html               # About us page
├── tripbooking.html           # Booking form
├── booking-success.html       # Success page
│
├── script.js                  # Global JavaScript
├── booking.js                 # Booking form logic
├── style.css                  # Main CSS (Responsive)
├── booking-style.css          # Booking form CSS
│
├── SHAPEFILE/                 # GeoJSON data
│   ├── DESTINASI_SPECIAL_PT.geojson
│   └── DWSTINASI_REGULAR_PT.geojson
│
├── DOKUMENTASI/               # Assets (images)
│   ├── BERANDA/
│   └── ABOUT US/
│
├── backend/                   # Node.js Backend
│   ├── server.js              # Express server
│   ├── package.json           # Dependencies
│   ├── .env                   # Configuration (SECRET)
│   ├── .env.example           # Template
│   │
│   ├── routes/
│   │   └── bookings.js        # API endpoints
│   │
│   ├── config/
│   │   ├── email.js           # Email setup
│   │   └── emailTemplates.js  # Email templates
│   │
│   ├── data/
│   │   └── bookings.json      # Stored bookings
│   │
│   └── QUICK_START.md         # Setup guide
│
├── INTEGRATION_GUIDE.md       # Complete integration guide
└── README.md                  # This file
```

---

## **📡 API Endpoints**

### **Base URL:** `http://localhost:3000/api/bookings`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create new booking |
| GET | `/` | Get all bookings |
| GET | `/:id` | Get single booking |
| PUT | `/:id` | Update booking status |
| DELETE | `/:id` | Delete booking |

**Example POST Request:**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "whatsapp": "+6281234567890",
    "cityOrigin": "Semarang",
    "instagram": "johndoe",
    "selectedCategory": "regular",
    "selectedLocation": "",
    "customRoute": "Custom tour request",
    "selectedPayment": "va"
  }'
```

---

## **🎯 Features by Page**

### **1. Beranda (index.html)**
- Hero slider dengan 7 slides
- About Telusur Kota section
- Feature cards (4 kategori tour)
- CTA buttons

### **2. Tema Trip (tematrip.html)**
- Card grid dengan pagination
- Category filter (All/Regular/Special/Private/Education)
- Tour details & pricing
- Booking navigation

### **3. Story Maps (map.html)**
- Interactive Leaflet map
- GeoJSON data visualization
- Basemap switcher
- Side panel dengan kategori filter
- Story cards dengan destinasi info

### **4. Tourism Maps (tourismmaps.html)**
- Full-screen map
- 3 panels: Legend, Route, Nearby
- OSRM routing integration
- Turf.js buffer analysis
- Distance-based filtering

### **5. About (profile.html)**
- Company info
- Vision, Mission, Positioning
- Team gallery
- Feedback form

### **6. Booking (tripbooking.html)**
- 3-step booking form
- Real-time validation
- Category & payment selection
- Email integration

---

## **🛠️ Technologies Used**

### **Frontend**
- HTML5 / CSS3 / JavaScript (Vanilla)
- Leaflet.js - Interactive maps
- Turf.js - Geospatial analysis
- Boxicons - Icon library
- Intl-tel-input - Phone formatting

### **Backend**
- Node.js + Express.js
- Nodemailer - Email service
- UUID - Unique ID generation
- dotenv - Environment variables
- CORS - Cross-origin requests

### **Data**
- GeoJSON - Geographic data
- JSON - Data persistence
- HTML - Email templates

---

## **📊 Booking Flow**

```
User Visit → Browse Tours → Click Booking
                    ↓
            Fill Personal Info
                    ↓
            Select Category
                    ↓
            Choose Payment Method
                    ↓
            Review Summary
                    ↓
            Submit Form → POST to Backend
                    ↓
            Backend Validation → Generate ID → Save to JSON
                    ↓
            Send Email Confirmation (Customer + Developer)
                    ↓
            Success Message → Redirect to Home
```

---

## **🔐 Security Notes**

- `.env` file contains sensitive data - NEVER commit!
- Already added to `.gitignore`
- Use app-specific password (NOT Gmail password)
- CORS configured for localhost development

---

## **🐛 Troubleshooting**

| Error | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` in backend folder |
| "ECONNREFUSED" | Backend not running - execute `npm start` |
| "Email error" | Check `.env` file, verify Gmail 2FA enabled |
| "CORS error" | Ensure FRONTEND_URL in `.env` matches browser |

**Check logs:**
```bash
# Server logs
npm start  # Shows all API errors

# Browser logs
Press F12 → Console → Check for errors
```

---

## **📈 Future Enhancements**

### **Phase 2: Database & Admin**
- [ ] SQLite / MongoDB integration
- [ ] Admin dashboard untuk manage bookings
- [ ] Booking status tracking

### **Phase 3: Payments**
- [ ] Midtrans / Stripe integration
- [ ] Automatic payment confirmation
- [ ] Invoice generation

### **Phase 4: Advanced**
- [ ] User authentication
- [ ] Real-time notifications (WebSocket)
- [ ] Analytics dashboard
- [ ] Multi-language support

---

## **📚 Documentation**

- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Detailed integration & API docs
- **[backend/QUICK_START.md](./backend/QUICK_START.md)** - Backend setup guide
- **[backend/README.md](./backend/README.md)** - Backend documentation

---

## **👥 Team**

**Telusur Kota Development Team**
- Backend: Node.js + Express
- Frontend: Vanilla JS + Leaflet
- Maps: GeoJSON + OpenStreetMap

---

## **📞 Support & Contact**

**Issues?**
1. Check [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
2. Review browser console (F12)
3. Check backend logs
4. Verify `.env` configuration

**Contact:** temantelusur@gmail.com

---

## **📄 License**

This project is open source and available under the MIT License.

---

**Last Updated:** April 21, 2026
**Version:** 1.0.0
**Status:** Production Ready ✅

---

## **🎉 Quick Test Checklist**

- [ ] Backend running: `npm start` in backend folder
- [ ] `.env` configured dengan Gmail credentials
- [ ] Open `tripbooking.html` di browser
- [ ] Fill form dan submit
- [ ] Check email (tunggu 30 detik)
- [ ] Verify 2 emails received (customer + developer)
- [ ] Check `backend/data/bookings.json` untuk data

**All green?** 🎊 Website siap untuk digunakan!

---
