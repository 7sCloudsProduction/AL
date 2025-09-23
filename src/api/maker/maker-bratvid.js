const axios = require('axios');

module.exports = function(app) {
  app.get('/maker/bratvid', async (req, res) => {
    try {
      const { text } = req.query;
      if (!text) return res.status(400).json({ status: false, error: 'Parameter text harus diisi' });

      // Ambil sebagai arraybuffer tapi jangan konversi aneh
      const response = await axios.get('https://api.zenzxz.my.id/maker/bratvid', {
        params: { text },
        responseType: 'arraybuffer'
      });

      res.setHeader('Content-Type', 'image/gif'); // GIF biasanya
      res.setHeader('Content-Length', response.data.byteLength);
      res.send(Buffer.from(response.data));

    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: err.message });
    }
  });
};
