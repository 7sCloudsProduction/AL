
const axios = require('axios');

module.exports = function(app) {
    async function emojimix(emoji1, emoji2) {
        try {
            // langsung request API Furina dengan responseType arraybuffer
            const response = await axios.get(
                'https://api-furina.vercel.app/random/emojimix',
                {
                    params: { emoji1, emoji2 },
                    responseType: 'arraybuffer'
                }
            );
            return Buffer.from(response.data);
        } catch (error) {
            throw error;
        }
    }

    app.get('/random/emojimix', async (req, res) => {
        try {
            const { emoji1, emoji2 } = req.query;
            if (!emoji1 || !emoji2) {
                return res.status(400).json({
                    status: false,
                    error: 'emoji1 dan emoji2 harus diisi, contoh: ?emoji1=🥵&emoji2=😳'
                });
            }

            const buffer = await emojimix(emoji1, emoji2);
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': buffer.length,
            });
            res.end(buffer);

        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    });
};
