const axios = require('axios');

module.exports = function(app) {
  // Endpoint Random Papayang
  app.get('/random/pap', async (req, res) => {
    try {
      // Panggil API Finix
      const { data } = await axios.get("https://api.finix-id.my.id/random/papayang", {
        responseType: "arraybuffer" // langsung buffer
      });

      // Set header biar dikirim sebagai file gambar
      res.setHeader("Content-Type", "image/jpeg");
      res.send(Buffer.from(data, "binary"));

    } catch (err) {
      console.error(err);
      res.json({
        status: false,
        msg: "Terjadi kesalahan saat mengambil data"
      });
    }
  });
};
