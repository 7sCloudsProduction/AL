const fetch = require("node-fetch");

module.exports = function(app) {
  // SoundCloud Downloader
  app.get("/download/soundcloud", async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ status: false, error: "Param 'url' wajib diisi" });

    try {
      const response = await fetch(`https://api.zenzxz.my.id/downloader/soundcloud?url=${encodeURIComponent(url)}`);
      if (!response.ok) return res.status(500).json({ status: false, error: "Gagal mengambil data dari SoundCloud" });

      const data = await response.json();
      res.json({
        status: true,
        creator: "Alpiann",
        title: data.title,
        author: data.author,
        audio_url: data.audio_url,
        duration: data.duration,
        thumbnail: data.thumbnail,
        source_url: data.source_url
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: false, error: "Terjadi kesalahan saat menghubungi API" });
    }
  });
};