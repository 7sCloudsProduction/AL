const axios = require('axios');

module.exports = function(app) {
    app.get('/maker/carbon', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) return res.status(400).send('Parameter text harus diisi');

            // Panggil API Carbonara
            const response = await axios({
                url: 'https://carbonara.solopov.dev/api/cook',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                data: { code: text },
                responseType: 'arraybuffer' // ambil sebagai buffer agar bisa kirim PNG
            });

            const buffer = Buffer.from(response.data);

            // Kirim langsung sebagai image
            res.set({
                'Content-Type': 'image/png',
                'Content-Length': buffer.length
            });
            res.send(buffer);

        } catch (err) {
            console.error(err);
            res.status(500).json({ status: false, error: err.message });
        }
    });
};
