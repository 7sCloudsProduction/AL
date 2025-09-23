const fetch = require("node-fetch");

module.exports = function(app) {
  // Image Upscale
  app.get("/tools/hd", async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ status: false, error: "Param 'url' wajib diisi" });

    try {
      const response = await fetch(`https://api.zenzxz.my.id/tools/upscale?url=${encodeURIComponent(url)}`);
      if (!response.ok) return res.status(500).json({ status: false, error: "Gagal mengambil data upscale" });

      const data = await response.json();
      // langsung return URL hasil upscale
      res.json({
        status: true,
        creator: "Alpiann",
        result: data.result
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: false, error: "Terjadi kesalahan saat menghubungi API" });
    }
  });
};