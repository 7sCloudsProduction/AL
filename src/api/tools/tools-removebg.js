const axios = require("axios");

module.exports = function(app) {
  // Remove Background
  app.get("/tools/removebg", async (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) {
      return res.status(400).json({ status: false, error: "Param 'url' wajib diisi" });
    }

    try {
      const { data } = await axios.get(`https://api.zenzxz.my.id/tools/removebg?url=${encodeURIComponent(imageUrl)}`);
      res.json({
        status: true,
        creator: "Alpiann",
        result: data.result
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: "Gagal mengambil data removebg" });
    }
  });
};