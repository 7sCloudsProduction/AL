const axios = require("axios");

module.exports = function(app) {
  app.get("/maker/iqc", async (req, res) => {
    const { time, battery, carrier, message } = req.query;

    if (!time || !battery || !carrier || !message) {
      return res.status(400).json({
        status: false,
        error: "Param 'time', 'battery', 'carrier', dan 'message' wajib diisi"
      });
    }

    try {
      const url = `https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(time)}&batteryPercentage=${encodeURIComponent(battery)}&carrierName=${encodeURIComponent(carrier)}&messageText=${encodeURIComponent(message)}&emojiStyle=apple&_t=${Date.now()}`;

      const { data } = await axios.get(url, { responseType: "arraybuffer" });
      res.setHeader("Content-Type", "image/png");
      res.send(Buffer.from(data, "binary"));
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: "Gagal generate iPhone quoted chat" });
    }
  });
};
