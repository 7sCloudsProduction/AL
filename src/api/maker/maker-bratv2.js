const axios = require("axios");

module.exports = function (app) {
  app.get("/maker/bratv2", async (req, res) => {
    const { text, bg, color } = req.query;
    if (!text || !bg || !color)
      return res.json({
        status: false,
        msg: "Parameter text, bg, dan color wajib diisi",
        contoh: "/maker/bratv2?text=haj&bg=black&color=yellow"
      });

    try {
      // ambil buffer dari API pihak ketiga
      let { data } = await axios.get(
        `https://api.sxtream.xyz/maker/brat?text=${encodeURIComponent(
          text
        )}&background=${encodeURIComponent(bg)}&color=${encodeURIComponent(color)}`,
        { responseType: "arraybuffer" }
      );

      let buffer = Buffer.from(data);

      // kirim buffer langsung
      res.setHeader("Content-Type", "image/png");
      res.send(buffer);
    } catch (e) {
      res.json({ status: false, msg: "Gagal membuat image", error: String(e) });
    }
  });
};
