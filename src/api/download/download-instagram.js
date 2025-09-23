const axios = require("axios");

module.exports = function (app) {
  app.get("/download/instagram", async (req, res) => {
    let url = req.query.url;
    if (!url) return res.json({ status: false, msg: "Masukkan parameter url" });

    try {
      // hit API pihak ketiga dulu (contoh pakai zenzxz)
      let { data } = await axios.get(`https://api.zenzxz.my.id/downloader/instagram?url=${encodeURIComponent(url)}`);

      // atur ulang response sesuai format
      res.json({
        status: data.status,
        creator: "Alpiann",
        result: {
          name: data.result.name,
          username: data.result.username,
          images: data.result.images || [],
          videos: data.result.videos || []
        }
      });
    } catch (e) {
      res.json({ status: false, msg: "Gagal scrape", error: String(e) });
    }
  });
};
