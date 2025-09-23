const fetch = require("node-fetch");

module.exports = function(app) {
  // Screenshot Web
  app.get("/tools/ssweb", async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ status: false, error: "Param 'url' wajib diisi" });

    try {
      const response = await fetch(`https://api.zenzxz.my.id/tools/ssweb?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) return res.status(500).json({ status: false, error: "Gagal mengambil screenshot" });

      const buffer = await response.arrayBuffer(); // ambil buffer
      res.setHeader("Content-Type", "image/png"); // set type image
      res.send(Buffer.from(buffer));
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: false, error: "Terjadi kesalahan saat menghubungi API" });
    }
  });
};