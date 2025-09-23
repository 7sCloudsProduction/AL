
const axios = require("axios");

module.exports = function(app) {
  // Search Anime
  app.get("/search/animein", async (req, res) => {
    const { q, limit } = req.query;
    if (!q) {
      return res.status(400).json({ status: false, error: "Param 'q' wajib diisi" });
    }

    try {
      const { data } = await axios.get(
        `https://api.azzamdev.my.id/api/search/anime?q=${encodeURIComponent(q)}&limit=${limit || 5}`
      );

      res.json({
        status: data.status,
        creator: "Alpiann",
        total: data.total,
        results: data.results
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: false,
        error: "Gagal mengambil data anime"
      });
    }
  });
};
