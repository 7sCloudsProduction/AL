// fakefb.js
const axios = require("axios");

module.exports = function(app) {
  app.get("/maker/fakefb", async (req, res) => {
    const { name, comment, ppurl } = req.query;
    if (!name || !comment || !ppurl) {
      return res.status(400).json({ status: false, error: "Param 'name', 'comment', dan 'ppurl' wajib diisi" });
    }

    try {
      const { data } = await axios.get(`https://api.zenzxz.my.id/maker/fakefb?name=${encodeURIComponent(name)}&comment=${encodeURIComponent(comment)}&ppurl=${encodeURIComponent(ppurl)}`, { responseType: "arraybuffer" });
      
      res.setHeader("Content-Type", "image/jpeg");
      res.send(Buffer.from(data, "binary"));
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: "Gagal membuat gambar Fake FB" });
    }
  });
};