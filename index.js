const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',       // Ganti jika username-mu berbeda
    host: 'localhost',
    database: 'mahasiswa',  // Nama database yang baru dibuat
    password: 'Morella2006',      // Ganti dengan password PostgreSQL-mu
    port: 5432,
});

app.use (express.json());

// Method GET untuk mengambil data dari tabel biodata
app.get('/biodata', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM biodata');

        res.status(200).json({
            message: "Data berhasil diambil",
            data: result.rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Terjadi kesalahan pada server atau database" });
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});