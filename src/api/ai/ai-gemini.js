const axios = require('axios');

module.exports = function(app) {
    // Fungsi untuk panggil API Gemini
    async function geminiAI(text) {
        const { data } = await axios.get('https://api.zenzxz.my.id/ai/gemini', {
            params: { text }
        });
        return data;
    }

    // Route API /ai/hydromind diganti untuk Gemini
    app.get('/ai/gemini', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) {
                return res.status(400).json({ status: false, error: 'Text is required' });
            }

            const response = await geminiAI(text);

            if (!response.status) {
                return res.status(500).json({ status: false, error: 'Gemini API failed' });
            }

            res.status(200).json({
                status: true,
                assistant: response.assistant,
                uid: response.uid,
                creator: "Alpiann"
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
}
