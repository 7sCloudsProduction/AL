const axios = require('axios');

module.exports = function (app) {
  /**
   * GET /maker/magicstudio
   * Query: prompt
   * Example:
   * /maker/magicstudio?prompt=cewe+dengan+senja+di+atas+batu+menghadap+ke+lautan
   */
  app.get('/ai/magicstudio', async (req, res) => {
    const { prompt } = req.query;
    if (!prompt) {
      return res.status(400).json({
        status: false,
        error: "Parameter 'prompt' wajib diisi",
        contoh: "/ai/magicstudio?prompt=cewe+dengan+senja+di+atas+batu+menghadap+ke+lautan"
      });
    }

    try {
      // URL scrape ke API zenzxz
      const apiUrl = `https://api.zenzxz.my.id/maker/magicstudio?prompt=${encodeURIComponent(prompt)}`;

      const apiRes = await axios.get(apiUrl, {
        responseType: 'arraybuffer',
        timeout: 120000
      });

      const buffer = Buffer.from(apiRes.data);

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': buffer.length,
        'Content-Disposition': `inline; filename="magicstudio.png"`
      });
      return res.end(buffer);
    } catch (err) {
      console.error('magicstudio error:', err?.message || err);
      return res.status(500).json({
        status: false,
        error: 'Gagal generate gambar dari magicstudio',
        detail: err?.message || String(err)
      });
    }
  });
};
