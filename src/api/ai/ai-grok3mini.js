// routes/grok3mini.js
const axios = require("axios");

module.exports = function(app) {
  // AI Grok 3 Mini
  app.get("/ai/grok3mini", async (req, res) => {
    const text = req.query.text;
    if (!text) {
      return res.status(400).json({ 
        status: false, 
        error: "Param 'text' wajib diisi"
      });
    }

    try {
      const { data } = await axios.get(
        `https://api.zenzxz.my.id/ai/grok-3-mini?text=${encodeURIComponent(text)}`
      );

      // langsung return data lengkap
      res.json({
        status: true,
        creator: "Alpiann",
        model: data.model,
        question: data.question,
        think: data.think,
        response: data.response
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ 
        status: false, 
        error: "Gagal mengambil data dari API Grok 3 Mini" 
      });
    }
  });
};