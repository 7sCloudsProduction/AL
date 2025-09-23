const fetch = require("node-fetch");

module.exports = function(app) {
  // SoundCloud Search
  app.get("/search/soundcloud", async (req, res) => {
    const query = req.query.query;
    if (!query) return res.status(400).json({ status: false, error: "Param 'query' wajib diisi" });

    try {
      const response = await fetch(`https://api.zenzxz.my.id/search/soundcloud?query=${encodeURIComponent(query)}`);
      if (!response.ok) return res.status(500).json({ status: false, error: "Gagal mengambil data dari SoundCloud" });

      const data = await response.json();
      res.json({
        status: true,
        creator: "Alpiann",
        query: data.query,
        count: data.count,
        result: data.result
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: false, error: "Terjadi kesalahan saat menghubungi API" });
    }
  });
};