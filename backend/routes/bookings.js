const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');
const transporter = require('../config/email');
const { generateCustomerEmail, generateDeveloperEmail } = require('../config/emailTemplates');

const router = express.Router();
const dataFile = path.join(__dirname, '../data/bookings.json');

// Pastikan file data ada
const ensureDataFile = async () => {
    try {
        await fs.access(dataFile);
    } catch {
        await fs.writeFile(dataFile, JSON.stringify([], null, 2));
    }
};

// GET - Semua booking (untuk admin/developer)
router.get('/', async (req, res) => {
    try {
        await ensureDataFile();
        const data = await fs.readFile(dataFile, 'utf-8');
        const bookings = JSON.parse(data);
        res.json({ success: true, data: bookings });
    } catch (error) {
        console.error('Error reading bookings:', error);
        res.status(500).json({ success: false, message: 'Error reading data' });
    }
});

// GET - Detail booking by ID
router.get('/:id', async (req, res) => {
    try {
        await ensureDataFile();
        const data = await fs.readFile(dataFile, 'utf-8');
        const bookings = JSON.parse(data);
        const booking = bookings.find(b => b.bookingId === req.params.id);
        
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking tidak ditemukan' });
        }
        
        res.json({ success: true, data: booking });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error' });
    }
});

// POST - Tambah booking baru + kirim email
router.post('/', async (req, res) => {
    try {
        const {
            fullName,
            email,
            whatsapp,
            cityOrigin,
            instagram,
            selectedCategory,
            selectedLocation,
            customRoute,
            selectedPayment
        } = req.body;

        // Validasi input
        if (!fullName || !email || !whatsapp || !selectedCategory || !selectedPayment) {
            return res.status(400).json({ 
                success: false, 
                message: 'Data tidak lengkap' 
            });
        }

        // Generate booking ID
        const bookingId = `BK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

        // Buat object booking
        const booking = {
            bookingId,
            fullName,
            email,
            whatsapp,
            cityOrigin,
            instagram: instagram || '',
            selectedCategory,
            selectedLocation: selectedLocation || '',
            customRoute: customRoute || '',
            selectedPayment,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };

        // Simpan ke JSON file
        await ensureDataFile();
        const data = await fs.readFile(dataFile, 'utf-8');
        const bookings = JSON.parse(data);
        bookings.push(booking);
        await fs.writeFile(dataFile, JSON.stringify(bookings, null, 2));

        // 1️⃣ Kirim email ke PESERTA
        const customerEmail = generateCustomerEmail(booking);
        await transporter.sendMail({
            from: `"Telusur Kota" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: customerEmail.subject,
            html: customerEmail.html
        });

        // 2️⃣ Kirim email ke DEVELOPER
        const developerEmail = generateDeveloperEmail(booking);
        await transporter.sendMail({
            from: `"Telusur Kota" <${process.env.GMAIL_USER}>`,
            to: process.env.DEVELOPER_EMAIL,
            subject: developerEmail.subject,
            html: developerEmail.html
        });

        console.log(`✅ Booking ${bookingId} created and emails sent`);

        res.status(201).json({
            success: true,
            message: 'Pendaftaran berhasil! Cek email Anda untuk konfirmasi.',
            bookingId: bookingId,
            booking: booking
        });

    } catch (error) {
        console.error('Error creating booking:', error);
        
        // Error handling untuk email
        if (error.message.includes('Invalid login')) {
            return res.status(500).json({
                success: false,
                message: 'Error email configuration. Silakan hubungi developer.'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Terjadi error. Silakan coba lagi.'
        });
    }
});

// PUT - Update status booking (untuk developer)
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;

        await ensureDataFile();
        const data = await fs.readFile(dataFile, 'utf-8');
        let bookings = JSON.parse(data);

        const bookingIndex = bookings.findIndex(b => b.bookingId === req.params.id);
        if (bookingIndex === -1) {
            return res.status(404).json({ success: false, message: 'Booking tidak ditemukan' });
        }

        bookings[bookingIndex].status = status;
        bookings[bookingIndex].updatedAt = new Date().toISOString();

        await fs.writeFile(dataFile, JSON.stringify(bookings, null, 2));

        res.json({ success: true, message: 'Status updated', data: bookings[bookingIndex] });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error' });
    }
});

// DELETE - Hapus booking (untuk developer)
router.delete('/:id', async (req, res) => {
    try {
        await ensureDataFile();
        const data = await fs.readFile(dataFile, 'utf-8');
        let bookings = JSON.parse(data);

        bookings = bookings.filter(b => b.bookingId !== req.params.id);

        await fs.writeFile(dataFile, JSON.stringify(bookings, null, 2));

        res.json({ success: true, message: 'Booking deleted' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error' });
    }
});

module.exports = router;
