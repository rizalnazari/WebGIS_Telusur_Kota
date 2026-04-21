# 🚀 TELUSUR KOTA - FULL STACK INTEGRATION GUIDE

## **📌 Project Status: SEMI-DYNAMIC**

Website ini memiliki fitur booking system yang **SUDAH TERINTEGRASI** dengan backend Node.js. Berikut adalah panduan lengkap untuk setup dan testing.

---

## **🎯 Fitur yang Sudah Integrated:**

✅ **Frontend**
- Booking form dengan 3 steps (Data → Pembayaran → Konfirmasi)
- Form validation
- Category selection (Regular, Special, Private, Education)
- Payment method selection
- Real-time form state management

✅ **Backend (Node.js)**
- Express server
- Booking API endpoints (CREATE, READ, UPDATE, DELETE)
- JSON file storage (bookings.json)
- Email notifications (Nodemailer)
- CORS enabled untuk frontend

✅ **Email System**
- Automated confirmation email ke customer
- Notification email ke developer
- HTML template emails

---

## **🔧 SETUP INSTRUCTIONS**

### **Step 1: Configure Gmail (REQUIRED)**

**⚠️ PENTING: Backend tidak akan bekerja tanpa ini!**

1. Buka: https://myaccount.google.com/apppasswords
2. Login dengan akun Gmail yang akan digunakan
3. Jika belum punya 2FA, enable dulu di Security settings
4. Pilih "Mail" dan "Windows Computer"
5. Google akan generate 16-character password
6. Copy password tersebut

**Contoh:**
```
gmailuser@gmail.com
Generated password: xxxx xxxx xxxx xxxx (copy yang ini tanpa spasi)
```

### **Step 2: Setup .env File**

Buka file: `backend/.env`

```bash
PORT=3000
NODE_ENV=development

# Dari Step 1
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx

# Email yang akan menerima notifikasi booking baru
DEVELOPER_EMAIL=your-email@gmail.com

# Frontend origin (untuk CORS)
FRONTEND_URL=http://localhost:5500
```

**Simpan file!**

### **Step 3: Start Backend Server**

```powershell
# Buka PowerShell/Terminal di folder backend
cd "d:\MAPID ACADEMY\Final Project - Telusur Kota\backend"

# Install dependencies (hanya perlu 1x)
npm install

# Jalankan server
npm start
```

✅ Jika berhasil, akan muncul:
```
🚀 Backend server running at http://localhost:3000
✅ Email service ready
```

### **Step 4: Test Frontend**

1. Buka file `tripbooking.html` di browser
2. Isi semua fields:
   - Nama Lengkap
   - Nomor WhatsApp
   - Email
   - Kota Asal
   - Instagram
3. Pilih kategori tour (Step 1)
4. Pilih metode pembayaran (Step 2)
5. Klik "Selesai" (Step 3)

### **Step 5: Verify Email**

✉️ Cek inbox email yang terdaftar di `.env`:

Anda akan menerima **2 email**:
1. **Email to Customer** - Konfirmasi pendaftaran
2. **Email to Developer** - Notifikasi booking baru

---

## **📡 API ENDPOINTS**

### **Base URL:**
```
http://localhost:3000/api/bookings
```

### **1. Create Booking (POST)**
```
POST /api/bookings
Content-Type: application/json

{
  "fullName": "Nama Peserta",
  "email": "peserta@email.com",
  "whatsapp": "+6281234567890",
  "cityOrigin": "Semarang",
  "instagram": "username_ig",
  "selectedCategory": "regular",
  "selectedLocation": "hotel-mutiara",
  "customRoute": "Optional custom request",
  "selectedPayment": "va"
}

Response:
{
  "success": true,
  "bookingId": "BK1703492834XYZ12",
  "message": "Pendaftaran berhasil! Cek email Anda untuk konfirmasi."
}
```

### **2. Get All Bookings (GET)**
```
GET /api/bookings

Response:
{
  "success": true,
  "data": [
    {
      "bookingId": "BK1703492834XYZ12",
      "fullName": "Nama Peserta",
      "email": "peserta@email.com",
      "status": "pending",
      "createdAt": "2024-01-01T10:00:00Z"
    }
  ]
}
```

### **3. Get Single Booking (GET)**
```
GET /api/bookings/BK1703492834XYZ12

Response:
{
  "success": true,
  "data": { ...booking details... }
}
```

### **4. Update Booking Status (PUT)**
```
PUT /api/bookings/BK1703492834XYZ12
Content-Type: application/json

{
  "status": "confirmed"
}

Response:
{
  "success": true,
  "message": "Status updated"
}
```

### **5. Delete Booking (DELETE)**
```
DELETE /api/bookings/BK1703492834XYZ12

Response:
{
  "success": true,
  "message": "Booking deleted"
}
```

---

## **💾 Data Storage**

Semua bookings disimpan di: `backend/data/bookings.json`

Format:
```json
[
  {
    "bookingId": "BK1703492834XYZ12",
    "fullName": "Nama Peserta",
    "email": "peserta@email.com",
    "whatsapp": "+6281234567890",
    "cityOrigin": "Semarang",
    "instagram": "username_ig",
    "selectedCategory": "regular",
    "selectedLocation": "hotel-mutiara",
    "customRoute": "",
    "selectedPayment": "va",
    "createdAt": "2024-01-01T10:00:00Z",
    "status": "pending"
  }
]
```

---

## **🧪 Testing dengan Tools**

### **Postman / Insomnia**

Import collection ini:

```bash
POST http://localhost:3000/api/bookings

Headers:
- Content-Type: application/json

Body:
{
  "fullName": "Test User",
  "email": "test@gmail.com",
  "whatsapp": "+6281234567890",
  "cityOrigin": "Semarang",
  "instagram": "testuser",
  "selectedCategory": "regular",
  "selectedLocation": "",
  "customRoute": "Test route",
  "selectedPayment": "va"
}
```

### **Browser Console**

```javascript
// Test API
fetch('http://localhost:3000/api/bookings')
  .then(r => r.json())
  .then(data => console.log(data))
```

---

## **⚠️ TROUBLESHOOTING**

### **"Cannot find module 'express'"**
```bash
# Solution: Install dependencies
cd backend
npm install
```

### **"Error: ECONNREFUSED - Connection refused"**
- ✅ Backend belum dijalankan
- ✅ Jalankan: `npm start` di folder backend

### **"Email configuration error"**
- ✅ .env file salah/kosong
- ✅ Gmail password tidak valid
- ✅ 2FA belum diaktifkan di Gmail

**Solution:**
```bash
# Verifikasi .env file sudah benar
cat backend/.env

# Restart server
npm start
```

### **"CORS Error"**
- ✅ Pastikan frontend URL sesuai dengan FRONTEND_URL di .env
- ✅ Check browser console untuk detail error

---

## **📊 Frontend → Backend Flow**

```
User fills booking form
        ↓
Click "Selesai" button
        ↓
JavaScript validates data
        ↓
Send POST to http://localhost:3000/api/bookings
        ↓
Backend receives data
        ↓
Generate Booking ID
        ↓
Save to bookings.json
        ↓
Send 2 emails (customer + developer)
        ↓
Return success response
        ↓
Frontend shows success message
        ↓
Redirect to index.html
```

---

## **🔐 Security Notes**

- ⚠️ **Never commit .env file** - Sudah di .gitignore
- ⚠️ **App password ≠ Gmail password** - Gunakan app-specific password
- ⚠️ **CORS configured** - Hanya localhost yang accepted untuk development

---

## **📚 File Structure**

```
backend/
├── server.js               # Main server
├── package.json            # Dependencies
├── .env                    # Configuration (SECRET)
├── .env.example            # Template
├── QUICK_START.md          # Setup guide
├── config/
│   ├── email.js            # Email configuration
│   └── emailTemplates.js   # Email templates
├── routes/
│   └── bookings.js         # API endpoints
└── data/
    └── bookings.json       # Stored bookings

frontend/
├── tripbooking.html        # Booking form
├── booking.js              # Form logic + API calls
├── booking-style.css       # Styling
├── booking-success.html    # Success page (optional)
└── script.js               # Global functions
```

---

## **🎯 Next Steps**

### **Phase 1: Current (DONE)**
- ✅ Static website dengan responsive design
- ✅ Booking system terintegrasi dengan backend
- ✅ Email notifications
- ✅ Data persistence (JSON)

### **Phase 2: Improvements**
- 🔲 Database upgrade (SQLite / MongoDB)
- 🔲 Admin dashboard untuk manage bookings
- 🔲 Payment gateway integration (Midtrans/Stripe)
- 🔲 Real-time notifications (WebSocket)
- 🔲 Authentication system

### **Phase 3: Advanced**
- 🔲 Deployment (Vercel, Heroku, AWS)
- 🔲 Analytics dashboard
- 🔲 Multi-language support
- 🔲 Mobile app (React Native)

---

## **📞 Support**

Jika ada error:
1. Cek console browser (F12)
2. Cek server terminal logs
3. Verify .env configuration
4. Check email settings

**Questions?** Buka issue di repository.

---

**Last Updated:** April 21, 2026
