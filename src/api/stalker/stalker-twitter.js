const axios = require("axios");

module.exports = function(app) {
  // Twitter Stalker
  app.get("/stalker/twitter", async (req, res) => {
    const username = req.query.username;
    if (!username) {
      return res.status(400).json({ status: false, error: "Param 'username' wajib diisi" });
    }

    try {
      // Ambil data asli dari API Zenzz
      const { data } = await axios.get(`https://api.zenzxz.my.id/stalker/twitter?username=${encodeURIComponent(username)}`);

      // Gunakan semua field dari API asli, termasuk creator
      res.json({
        status: data.status,
        creator: "Alpiann",  // ini tetap dari API asli
        result: data.data       // hanya ambil objek "data" sebagai result
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: "Gagal mengambil data Twitter" });
    }
  });
};
