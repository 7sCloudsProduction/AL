const axios = require("axios");

module.exports = function(app) {
  // AI Gemma2
  app.get("/ai/gemma2", async (req, res) => {
    const { text } = req.query;
    if (!text) {
      return res.status(400).json({ status: false, error: "Param 'text' wajib diisi" });
    }

    try {
      const { data } = await axios.get(`https://api.azzamdev.my.id/api/ai/gemma2?text=${encodeURIComponent(text)}`);
      res.json({
        status: data.status,
        creator: "Alpiann",
        result: data.result,
        result_id: data.result_id
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: "Gagal mengambil response dari Gemma2" });
    }
  });
};
