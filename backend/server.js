require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(cors({
    origin: [
        'http://localhost:5500',
        'http://localhost:3000',
        'http://127.0.0.1:5500',
        process.env.FRONTEND_URL || '*'
    ],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ===== ROUTES =====
app.get('/', (req, res) => {
    res.json({
        message: '✅ Tour Booking Backend is Running',
        version: '1.0.0',
        endpoints: {
            'POST /api/bookings': 'Create new booking',
            'GET /api/bookings': 'Get all bookings',
            'GET /api/bookings/:id': 'Get booking by ID',
            'PUT /api/bookings/:id': 'Update booking status',
            'DELETE /api/bookings/:id': 'Delete booking'
        }
    });
});

// API Routes
app.use('/api/bookings', bookingRoutes);

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`🚀 Backend server running at http://localhost:${PORT}`);
    console.log(`${'='.repeat(50)}\n`);
});
