const axios = require('axios');

module.exports = function(app) {
    app.get('/ai/aicustom', async (req, res) => {
        try {
            const { name, logic, message } = req.query;

            if (!message) return res.status(400).send('Parameter message harus diisi');

            // Encode URI agar aman dikirim lewat URL
            const encodedName = name ? encodeURIComponent(name) : '';
            const encodedLogic = logic ? encodeURIComponent(logic) : '';

            const response = await axios.get('https://api.nekolabs.my.id/ai/chatbot', {
                params: {
                    name: encodedName,
                    instruction: encodedLogic,
                    question: message
                }
            });

            res.json({
                status: true,
                creator: 'Alpiann',
                result: response.data.result
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: false,
                creator: 'Alpiann',
                error: err.message
            });
        }
    });
};
