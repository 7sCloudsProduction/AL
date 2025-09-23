const axios = require('axios');

module.exports = function(app) {
    async function brat(text) {
        try {
            const response = await axios.get(
                'https://api.zenzxz.my.id/maker/brat',
                {
                    params: { text },
                    responseType: 'arraybuffer'
                }
            );
            return Buffer.from(response.data);
        } catch (error) {
            throw error;
        }
    }

    app.get('/maker/brat', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) {
                return res.status(400).json({
                    status: false,
                    error: 'Parameter text harus diisi, contoh: ?text=hai'
                });
            }

            const buffer = await brat(text);
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