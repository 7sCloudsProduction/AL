// routes/ustadz2.js
const axios = require('axios');

module.exports = function(app) {
  app.get('/maker/ustadz', async (req, res) => {
    const { text } = req.query;
    if (!text) {
      return res.status(400).json({ status: false, error: "Param 'text' wajib diisi" });
    }

    try {
      const { data } = await axios.get(
        `https://api.zenzxz.my.id/maker/ustadz2?text=${encodeURIComponent(text)}`,
        { responseType: 'arraybuffer' }
      );

      res.setHeader('Content-Type', 'image/jpeg');
      res.send(Buffer.from(data, 'binary'));
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: 'Gagal membuat gambar Ustadz' });
    }
  });
};