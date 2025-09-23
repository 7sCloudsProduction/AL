// spotify.js
const axios = require("axios");

module.exports = function(app) {
  // Spotify Downloader
  app.get("/downloader/spotify", async (req, res) => {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ status: false, error: "Param 'url' wajib diisi" });
    }

    try {
      const { data } = await axios.get(`https://api.zenzxz.my.id/downloader/spotify?url=${encodeURIComponent(url)}`);
      res.json({
        status: true,
        creator: "Alpiann",
        result: data.result
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: "Gagal mengambil data dari Spotify API" });
    }
  });
};