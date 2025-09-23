const axios = require('axios');

module.exports = function(app) {
    async function mediafireDownload(url) {
        try {
            const { data } = await axios.get(`https://api.zenzxz.my.id/downloader/mediafire`, {
                params: { url }
            });
            return data;
        } catch (error) {
            console.error("Error fetching MediaFire download:", error);
            throw error;
        }
    }

    app.get('/download/mediafire', async (req, res) => {
        try {
            const { url } = req.query;
            if (!url) {
                return res.status(400).json({ status: false, error: 'Parameter url harus diisi' });
            }

            const data = await mediafireDownload(url);
            res.status(200).json({
                status: data.status,
                creator: "Alpiann",
                result: data.result
            });

        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};