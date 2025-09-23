const axios = require('axios');

module.exports = function(app) {
    async function o3AI(text) {
        try {
            const { data } = await axios.get(`https://api.zenzxz.my.id/ai/o3`, {
                params: { text }
            });
            return data;
        } catch (error) {
            console.error("Error fetching from O3 AI:", error);
            throw error;
        }
    }

    app.get('/ai/o3', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) {
                return res.status(400).json({ status: false, error: 'Text is required' });
            }
            const data = await o3AI(text);
            res.status(200).json({
                status: true,
                creator: "Alpiann",
                model: data.model,
                question: data.question,
                response: data.response
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};