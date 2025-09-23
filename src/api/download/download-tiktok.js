const axios = require('axios');

module.exports = function(app) {
    async function tiktokDownload(url) {
        try {
            const { data } = await axios.get(`https://api.zenzxz.my.id/downloader/tiktok`, {
                params: { url }
            });
            return data;
        } catch (error) {
            console.error("Error fetching TikTok download:", error);
            throw error;
        }
    }

    app.get('/download/tiktok', async (req, res) => {
        try {
            const { url } = req.query;
            if (!url) return res.status(400).json({ status: false, error: 'Parameter url harus diisi' });

            const data = await tiktokDownload(url);
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