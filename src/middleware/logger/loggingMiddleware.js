const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFileRequest = path.join(__dirname, '../../../logs/access.log');
const logFileResponse = path.join(__dirname, '../../../logs/access.log');


const loggingMiddleware = (req, res, next) => {
    const waktu = new Date();
    const text = `Time: ${waktu}, Method: ${req.method}, Url: ${req.originalUrl}\n`;

    fs.appendFile(logFileRequest, text, (err) => {
        if (err) console.error('Gagal menulis file');
    });

    res.on('finish', () => {
        const waktuResponse = new Date();
        const durasi = Date.now() - waktu;
        const text = `Time: ${waktuResponse}, Method: ${req.method}, Url: ${req.originalUrl}, Status: ${res.statusCode}, Duration: ${durasi}ms\n`;

        fs.appendFile(logFileResponse, text, (err) => {
            if (err) console.error('Gagal menulis file:', err);
        });
    });

    next();
}

module.exports = loggingMiddleware;