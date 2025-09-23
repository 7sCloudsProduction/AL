// routes/ytcomment.js
const axios = require('axios');

module.exports = function(app) {
  app.get('/maker/ytcomment', async (req, res) => {
    const { text, avatar, username } = req.query;
    if (!text || !avatar || !username) {
      return res.status(400).json({ status: false, error: "Param 'text', 'avatar', dan 'username' wajib diisi" });
    }

    try {
      const { data } = await axios.get(
        `https://api.zenzxz.my.id/maker/ytcomment?text=${encodeURIComponent(text)}&avatar=${encodeURIComponent(avatar)}&username=${encodeURIComponent(username)}`,
        { responseType: 'arraybuffer' }
      );

      res.setHeader('Content-Type', 'image/jpeg');
      res.send(Buffer.from(data, 'binary'));
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: 'Gagal membuat gambar komentar YouTube' });
    }
  });
};