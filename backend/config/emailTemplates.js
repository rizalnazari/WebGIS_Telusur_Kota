// EMAIL TEMPLATES

const generateCustomerEmail = (booking) => {
    const categoryNames = {
        regular: 'Regular Tour',
        special: 'Special Tour',
        private: 'Private Tour',
        education: 'Education Tour'
    };

    const paymentMethods = {
        va: 'Virtual Account (BCA, Mandiri, BNI)',
        qris: 'QRIS / E-Wallet (GoPay, OVO, ShopeePay)'
    };

    return {
        subject: `✓ Pendaftaran Diterima - Telusur Kota [${booking.bookingId}]`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; }
                    .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; }
                    .header { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: #fff; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #fff; padding: 30px; }
                    .section { margin-bottom: 25px; }
                    .section-title { font-size: 14px; font-weight: 700; color: #007bff; text-transform: uppercase; margin-bottom: 12px; }
                    .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
                    .label { color: #666; font-weight: 600; }
                    .value { color: #333; font-weight: 700; }
                    .highlight { background: #e7f3ff; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff; margin: 15px 0; }
                    .footer { background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; }
                    .btn { display: inline-block; background: #007bff; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 15px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>✓ Pendaftaran Diterima</h1>
                        <p>Telusur Kota - City Tour Guide</p>
                    </div>

                    <div class="content">
                        <p>Halo <strong>${booking.fullName}</strong>,</p>
                        <p>Terima kasih telah mendaftar di Telusur Kota! Kami dengan senang hati menerima pendaftaran Anda.</p>

                        <div class="highlight">
                            <strong>Nomor Referensi Booking:</strong> <br>
                            <span style="font-size: 20px; color: #007bff;">${booking.bookingId}</span>
                        </div>

                        <div class="section">
                            <div class="section-title">📋 Data Pendaftaran Anda</div>
                            <div class="info-row">
                                <span class="label">Nama</span>
                                <span class="value">${booking.fullName}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Email</span>
                                <span class="value">${booking.email}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">WhatsApp</span>
                                <span class="value">${booking.whatsapp}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Kota Asal</span>
                                <span class="value">${booking.cityOrigin}</span>
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">🎫 Detail Tur</div>
                            <div class="info-row">
                                <span class="label">Kategori</span>
                                <span class="value">${categoryNames[booking.selectedCategory] || booking.selectedCategory}</span>
                            </div>
                            ${booking.selectedLocation ? `
                            <div class="info-row">
                                <span class="label">Lokasi</span>
                                <span class="value">${booking.selectedLocation}</span>
                            </div>
                            ` : ''}
                            ${booking.customRoute ? `
                            <div class="info-row">
                                <span class="label">Permintaan Khusus</span>
                                <span class="value">${booking.customRoute}</span>
                            </div>
                            ` : ''}
                        </div>

                        <div class="section">
                            <div class="section-title">💳 Metode Pembayaran</div>
                            <div class="info-row">
                                <span class="label">Metode</span>
                                <span class="value">${paymentMethods[booking.selectedPayment] || booking.selectedPayment}</span>
                            </div>
                        </div>

                        <div class="highlight">
                            <strong>⏳ Langkah Selanjutnya:</strong>
                            <ol>
                                <li>Lakukan pembayaran sesuai metode yang dipilih</li>
                                <li>Kirimkan bukti transfer ke WhatsApp kami</li>
                                <li>Tunggu konfirmasi dari tim kami (maksimal 24 jam)</li>
                                <li>Terima detail teknis tur via email/WhatsApp</li>
                            </ol>
                        </div>

                        <div class="section">
                            <div class="section-title">📞 Hubungi Kami</div>
                            <p>Jika ada pertanyaan atau perubahan data, hubungi kami:</p>
                            <p>
                                📱 WhatsApp: <strong>+62 821 XXXX XXXX</strong><br>
                                📧 Email: <strong>info@teasurkota.com</strong>
                            </p>
                        </div>

                        <p style="margin-top: 30px; color: #666;">
                            Terima kasih dan sampai jumpa!<br>
                            <strong>Tim Telusur Kota</strong>
                        </p>
                    </div>

                    <div class="footer">
                        <p>Email ini adalah konfirmasi otomatis dari sistem booking Telusur Kota.</p>
                        <p>Jangan balas email ini. Hubungi kami melalui WhatsApp atau contact form.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };
};

const generateDeveloperEmail = (booking) => {
    const categoryNames = {
        regular: 'Regular Tour',
        special: 'Special Tour',
        private: 'Private Tour',
        education: 'Education Tour'
    };

    return {
        subject: `[📌 BOOKING BARU] ${booking.fullName} - ${categoryNames[booking.selectedCategory]}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; }
                    .container { max-width: 700px; margin: 0 auto; background: #f5f5f5; padding: 20px; }
                    .header { background: #d32f2f; color: #fff; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
                    .content { background: #fff; padding: 20px; }
                    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                    th { background: #f0f0f0; padding: 10px; text-align: left; border: 1px solid #ddd; font-weight: 700; }
                    td { padding: 10px; border: 1px solid #ddd; }
                    .footer { background: #f0f0f0; padding: 15px; text-align: center; font-size: 11px; color: #666; border-radius: 0 0 5px 5px; }
                    .badge { display: inline-block; background: #007bff; color: #fff; padding: 3px 8px; border-radius: 3px; font-size: 12px; font-weight: 700; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>🔔 ADA PENDAFTAR BARU!</h2>
                    </div>

                    <div class="content">
                        <p><strong>Booking ID:</strong> <span class="badge">${booking.bookingId}</span></p>
                        <p><strong>Waktu:</strong> ${new Date(booking.createdAt).toLocaleString('id-ID')}</p>

                        <h3>📋 Data Pendaftar</h3>
                        <table>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                            <tr>
                                <td><strong>Nama Lengkap</strong></td>
                                <td>${booking.fullName}</td>
                            </tr>
                            <tr>
                                <td><strong>Email</strong></td>
                                <td><a href="mailto:${booking.email}">${booking.email}</a></td>
                            </tr>
                            <tr>
                                <td><strong>WhatsApp</strong></td>
                                <td>${booking.whatsapp}</td>
                            </tr>
                            <tr>
                                <td><strong>Kota Asal</strong></td>
                                <td>${booking.cityOrigin}</td>
                            </tr>
                            <tr>
                                <td><strong>Instagram</strong></td>
                                <td>${booking.instagram || '-'}</td>
                            </tr>
                        </table>

                        <h3>🎫 Detail Tur</h3>
                        <table>
                            <tr>
                                <td><strong>Kategori</strong></td>
                                <td>${categoryNames[booking.selectedCategory] || booking.selectedCategory}</td>
                            </tr>
                            <tr>
                                <td><strong>Metode Pembayaran</strong></td>
                                <td>${booking.selectedPayment.toUpperCase()}</td>
                            </tr>
                            ${booking.selectedLocation ? `
                            <tr>
                                <td><strong>Lokasi</strong></td>
                                <td>${booking.selectedLocation}</td>
                            </tr>
                            ` : ''}
                            ${booking.customRoute ? `
                            <tr>
                                <td><strong>Custom Request</strong></td>
                                <td>${booking.customRoute}</td>
                            </tr>
                            ` : ''}
                        </table>

                        <h3>✅ Action Items</h3>
                        <ul>
                            <li>Verifikasi data pendaftar</li>
                            <li>Hubungi via WhatsApp untuk konfirmasi</li>
                            <li>Update status pembayaran</li>
                            <li>Kirim detail teknis tur</li>
                        </ul>

                        <hr>
                        <p><strong>Status:</strong> <span style="background: #fff3cd; padding: 2px 8px; border-radius: 3px;">MENUNGGU KONFIRMASI</span></p>
                    </div>

                    <div class="footer">
                        <p>Email otomatis dari sistem booking Telusur Kota</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };
};

module.exports = {
    generateCustomerEmail,
    generateDeveloperEmail
};
