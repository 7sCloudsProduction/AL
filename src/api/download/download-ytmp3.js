const axios = require('axios');

module.exports = function(app) {
  // Endpoint YTMP3 (scrape dari zenzxz, dibungkus ke result)
  app.get('/download/ytmp3', async (req, res) => {
    const url = req.query.url;
    if (!url) {
      return res.json({
        status: false,
        msg: "Masukkan parameter url YouTube"
      });
    }

    try {
      // Panggil API Zenzxz
      const { data } = await axios.get(`https://api.zenzxz.my.id/downloader/ytmp3?url=${encodeURIComponent(url)}`);

      if (!data || !data.status) {
        return res.json({
          status: false,
          msg: "Gagal mengambil data"
        });
      }

      // Bungkus ke dalam result
      res.json({
        status: true,
        creator: "Alpiann",
        result: {
          title: data.title,
          duration: data.duration,
          thumbnail: data.thumbnail,
          type: data.type,
          format: data.format,
          download_url: data.download_url
        }
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
