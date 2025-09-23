const fetch = require("node-fetch");

module.exports = function(app) {
  // MCPEDL Search
  app.get("/search/mcpedl", async (req, res) => {
    const q = req.query.q;
    if (!q) return res.status(400).json({ status: false, error: "Param 'q' wajib diisi" });

    try {
      const response = await fetch(`https://rullz-api-sigma.vercel.app/search/mcpedl?q=${encodeURIComponent(q)}`);
      if (!response.ok) return res.status(500).json({ status: false, error: "Gagal mengambil data dari MCPEDL" });

      const data = await response.json();

      res.json({
        status: true,
        creator: "Alpiann",
        result: data.result.map(item => ({
          title: item.title,
          link: item.link,
          image: item.image,
          rating: item.rating
        }))
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: false, error: "Terjadi kesalahan saat menghubungi API MCPEDL" });
    }
  });
};
