const axios = require("axios");

module.exports = function(app) {
  app.get("/random/loli", async (req, res) => {
    try {
      const { data } = await axios.get("https://rullz-api-sigma.vercel.app/random/loli", { responseType: "arraybuffer" });
      res.setHeader("Content-Type", "image/jpeg");
      res.send(Buffer.from(data, "binary"));
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: "Gagal mengambil gambar loli" });
    }
  });
};
