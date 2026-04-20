# ⚡ QUICK SETUP CHECKLIST

## 📋 Before Starting
- [ ] Node.js installed (check: `node -v`)
- [ ] Gmail account ready
- [ ] Text editor (VS Code, Notepad++)
- [ ] PowerShell or Command Prompt

---

## 🔐 Step 1: Gmail App Password (5 min)

```
1. Go: https://myaccount.google.com/apppasswords
2. Login with your Gmail
3. Select "Mail" and "Windows Computer"
4. Copy the 16-character password
5. (If not available, enable 2FA first)
```

Save this password - you'll need it soon!

---

## 💻 Step 2: Backend Setup (10 min)

```powershell
# 1. Open PowerShell in backend folder
cd "d:\MAPID ACADEMY\ex\backend"

# 2. Install packages
npm install

# 3. Create .env from template
Copy-Item .env.example .env

# 4. Edit .env with your info
# Open .env in Notepad and fill:
# GMAIL_USER=your-email@gmail.com
# GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
# DEVELOPER_EMAIL=your-email@gmail.com

# 5. Start server
npm start
```

✅ You should see:
```
🚀 Backend server running at http://localhost:3000
✅ Email service ready
```

---

## 🧪 Step 3: Test Frontend

```
1. Open tripbooking.html in browser
2. Fill all fields
3. Choose category (Step 1)
4. Choose payment method (Step 2)
5. Click "Selesai" (Step 3)
6. Check your email (wait 30 sec)
```

You should receive 2 emails:
- **Email 1:** Confirmation to you (peserta)
- **Email 2:** Notification to developer

---

## 📂 Files Created/Modified

**Backend (NEW):**
- `backend/server.js` - Main server
- `backend/routes/bookings.js` - API endpoints
- `backend/config/email.js` - Email config
- `backend/config/emailTemplates.js` - Email templates
- `backend/package.json` - Dependencies
- `backend/.env` - Credentials (keep secret!)
- `backend/data/bookings.json` - Database (auto-created)

**Frontend (MODIFIED):**
- `about/script.js` - Added fetch to backend
- `about/success.html` - Success page (optional)

---

## 🔍 Monitor Data

Check submitted bookings:

```
# File location:
d:\MAPID ACADEMY\ex\backend\data\bookings.json

# Or API endpoint:
GET http://localhost:3000/api/bookings
```

---

## ⚠️ Common Issues

| Problem | Solution |
|---------|----------|
| "Invalid login" error | Check Gmail App Password is correct |
| CORS error | Make sure server is running on localhost:3000 |
| Email not sent | Check terminal for error message |
| Port 3000 in use | Change PORT in .env to 3001 |
| Data not saved | Check `data/` folder has write permission |

---

## 🚀 Production Next

When ready for live:

1. **Get hosting** (Render, Railway, Heroku)
2. **Move database** (MongoDB Atlas free tier)
3. **Set environment variables** on hosting
4. **Update frontend URL** in CORS config
5. **Deploy!**

---

## 📞 Support

Most common issue: **Gmail configuration**

```
1. Go to: https://myaccount.google.com/apppasswords
2. Make sure 2FA is ON
3. Create NEW app password
4. Copy paste (with spaces): xxxx xxxx xxxx xxxx
5. Don't add extra spaces
6. Test again
```

---

**Everything working? Let's celebrate! 🎉**

Next: Add WhatsApp automation, admin dashboard, or payment gateway.
