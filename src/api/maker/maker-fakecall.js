// fakecall.js
const axios = require("axios");

module.exports = function(app) {
  app.get("/maker/fakecall", async (req, res) => {
    const { nama, durasi, avatar } = req.query;
    if (!nama || !durasi || !avatar) {
      return res.status(400).json({ status: false, error: "Param 'nama', 'durasi', dan 'avatar' wajib diisi" });
    }

    try {
      const { data } = await axios.get(`https://api.zenzxz.my.id/maker/fakecall?nama=${encodeURIComponent(nama)}&durasi=${encodeURIComponent(durasi)}&avatar=${encodeURIComponent(avatar)}`, { responseType: "arraybuffer" });

      // Cek content type default (biasanya image/jpeg atau video/mp4)
      res.setHeader("Content-Type", "image/jpeg");
      res.send(Buffer.from(data, "binary"));
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: "Gagal membuat Fake Call" });
    }
  });
};