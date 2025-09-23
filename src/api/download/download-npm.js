const axios = require('axios');

module.exports = function(app) {
  // Endpoint NPM Downloader
  app.get('/downloader/npm', async (req, res) => {
    const query = req.query.query;
    if (!query) {
      return res.json({
        status: false,
        msg: "Masukkan parameter query (nama package NPM)"
      });
    }

    try {
      // Panggil API Zenzxz
      const { data } = await axios.get(`https://api.zenzxz.my.id/downloader/npm?query=${encodeURIComponent(query)}`);

      if (!data || !data.status) {
        return res.json({
          status: false,
          msg: "Gagal mengambil data"
        });
      }

      // Bungkus responsenya
      res.json({
        status: true,
        creator: "Alpiann",
        result: data.result
      });

    } catch (err) {
      console.error(err);
      res.json({
        status: false,
        msg: "Terjadi kesalahan server"
      });
    }
  });
};
