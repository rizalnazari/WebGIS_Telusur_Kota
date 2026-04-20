# 🚀 Backend Setup - Tour Booking System

## 📋 Persyaratan

Sebelum memulai, pastikan Anda memiliki:
- **Node.js** (v14 atau lebih baru) - Download dari https://nodejs.org/
- **Gmail Account** (untuk email automation)
- **Text Editor** (VS Code, Notepad++, dll)

---

## 🔧 Setup Step-by-Step

### **STEP 1: Setup Gmail App Password**

Gmail tidak mengizinkan aplikasi pihak ketiga menggunakan password biasa. Ikuti langkah ini:

1. Buka https://myaccount.google.com/apppasswords
2. Login dengan akun Gmail Anda
3. Pilih "Mail" dan "Windows Computer"
4. Google akan generate password (16 karakter)
5. **Copy password ini** - kita gunakan nanti

> **Note:** Jika opsi di atas tidak muncul, aktifkan 2-Factor Authentication dulu di https://myaccount.google.com/security

---

### **STEP 2: Setup Backend**

1. **Buka Terminal/PowerShell** di folder `backend/`

```bash
cd "d:\MAPID ACADEMY\ex\backend"
```

2. **Install Dependencies**

```bash
npm install
```

3. **Buat file `.env`** (Copy dari `.env.example`)

```bash
# Windows PowerShell
Copy-Item .env.example .env

# atau manual: Buka `.env.example`, copy semua, buat file baru `.env`, paste
```

4. **Edit file `.env`** dengan info Anda

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
DEVELOPER_EMAIL=your-email@gmail.com
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5500
```

**Contoh:**
```env
GMAIL_USER=budi@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
DEVELOPER_EMAIL=budi@gmail.com
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5500
```

---

### **STEP 3: Jalankan Backend Server**

```bash
npm start
```

Output yang seharusnya muncul:

```
==================================================
🚀 Backend server running at http://localhost:3000
==================================================

✅ Email service ready
```

---

## 📧 Cara Kerja Email

### **Saat Peserta Submit Form:**

1. **Email dikirim ke PESERTA** (Konfirmasi Pendaftaran)
   - Nomor referensi booking
   - Data yang didaftar
   - Instruksi pembayaran
   
2. **Email dikirim ke DEVELOPER** (Notifikasi Pendaftar Baru)
   - Detail pendaftar lengkap
   - Kategori tour yang dipilih
   - Metode pembayaran
   - Action items

### **Data Tersimpan di:**
- `data/bookings.json` - JSON file untuk penyimpanan sederhana
- Email logs bisa dilihat di terminal

---

## 🔗 API Endpoints

### **1. Create Booking (POST)**
```
POST http://localhost:3000/api/bookings
Content-Type: application/json

{
  "fullName": "Budi Santoso",
  "email": "budi@email.com",
  "whatsapp": "821234567890",
  "cityOrigin": "Semarang",
  "instagram": "budi_santoso",
  "selectedCategory": "regular",
  "selectedLocation": "101",
  "selectedPayment": "va"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pendaftaran berhasil! Cek email Anda untuk konfirmasi.",
  "bookingId": "BK1713607890ABCDE",
  "booking": { ... }
}
```

### **2. Get All Bookings (GET)**
```
GET http://localhost:3000/api/bookings
```

**Response:**
```json
{
  "success": true,
  "data": [
    { "bookingId": "BK1713607890ABCDE", ... },
    { "bookingId": "BK1713607891FGHIJ", ... }
  ]
}
```

### **3. Get Booking by ID (GET)**
```
GET http://localhost:3000/api/bookings/BK1713607890ABCDE
```

### **4. Update Booking Status (PUT)**
```
PUT http://localhost:3000/api/bookings/BK1713607890ABCDE
Content-Type: application/json

{
  "status": "confirmed"
}
```

### **5. Delete Booking (DELETE)**
```
DELETE http://localhost:3000/api/bookings/BK1713607890ABCDE
```

---

## 🧪 Testing Backend

### **Dengan Postman:**
1. Download Postman: https://www.postman.com/downloads/
2. Buat POST request ke `http://localhost:3000/api/bookings`
3. Isi body dengan data booking
4. Klik "Send"
5. Cek email untuk verifikasi

### **Dengan Frontend:**
1. Buka `tripbooking.html` di browser
2. Isi semua field
3. Click "Selesai" di Step 3
4. Tunggu email masuk
5. Cek `data/bookings.json` untuk verifikasi

---

## ⚠️ Troubleshooting

### **Email tidak terkirim:**

1. **Error: "Invalid login"**
   - Pastikan Gmail App Password benar (copy paste ulang)
   - Pastikan format: `xxxx xxxx xxxx xxxx` (dengan spasi)
   - Aktifkan 2-Factor Authentication

2. **Error: "CORS error"**
   - Pastikan backend server running di `http://localhost:3000`
   - Konfigurasi CORS sudah sesuai

3. **Error: "Network Error"**
   ```bash
   # Cek apakah port 3000 sudah terpakai
   netstat -ano | findstr :3000
   
   # Jika terbuka, coba gunakan port lain
   # Edit server.js: const PORT = 3001;
   ```

### **Data tidak tersimpan:**
- Cek folder `data/` sudah ada file `bookings.json`
- Check permissions - folder harus bisa write

---

## 📝 File Structure

```
backend/
├── server.js                 # Main server file
├── package.json              # Dependencies
├── .env.example             # Template environment variables
├── .env                     # Environment variables (jangan push ke git!)
├── config/
│   ├── email.js            # Email transporter config
│   └── emailTemplates.js   # Email template HTML
├── routes/
│   └── bookings.js         # API endpoints untuk bookings
└── data/
    └── bookings.json       # Database sederhana (auto-created)
```

---

## 🚀 Next Steps (WhatsApp Automation)

Nanti kita bisa menambahkan:

```javascript
// Kirim WhatsApp notification setelah email
const twilioClient = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

await twilioClient.messages.create({
    from: 'whatsapp:+1234567890',
    to: 'whatsapp:+62821234567890',
    body: `Halo ${fullName}, pendaftaran Anda telah diterima...`
});
```

Cukup update `routes/bookings.js` nanti.

---

## 📞 Support

Jika ada error atau pertanyaan, pastikan:
1. Terminal menunjukkan "✅ Email service ready"
2. .env file sudah di-edit dengan benar
3. npm packages sudah di-install
4. Port 3000 tidak terpakai

---

**Happy Booking! 🎉**
