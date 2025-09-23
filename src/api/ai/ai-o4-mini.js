const axios = require('axios');

module.exports = function(app) {
    async function o4MiniAI(text) {
        try {
            const { data } = await axios.get(`https://api.zenzxz.my.id/ai/o4-mini`, {
                params: { text }
            });
            return data;
        } catch (error) {
            console.error("Error fetching from O4-Mini AI:", error);
            throw error;
        }
    }

    app.get('/ai/o4-mini', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) {
                return res.status(400).json({ status: false, error: 'Text is required' });
            }

            const data = await o4MiniAI(text);

            res.status(200).json({
                status: data.status,
                creator: "Alpiann",
                model: data.model,
                question: data.question,
                think: data.think,
                response: data.response
            });

        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
