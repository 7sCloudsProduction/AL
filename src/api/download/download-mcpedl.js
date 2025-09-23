const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

module.exports = function(app) {
  // MCPEDL Download Scraper
  app.get("/download/mcpedl", async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ status: false, error: "Param 'url' wajib diisi" });

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" // pake user-agent biar valid
        }
      });

      if (!response.ok) return res.status(500).json({ status: false, error: "Gagal fetch halaman MCPEDL" });

      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // ambil semua <a> di halaman
      const anchors = [...document.querySelectorAll("a")];
      let downloadLink = null;

      for (let a of anchors) {
        const text = a.textContent?.trim().toLowerCase() || "";
        if (text.includes("download") || a.href.endsWith(".mcaddon") || a.href.endsWith(".mcworld") || a.href.endsWith(".zip")) {
          downloadLink = a.href;
          break;
        }
      }

      if (!downloadLink) {
        return res.status(404).json({ status: false, error: "Link download tidak ditemukan" });
      }

      res.json({
        status: true,
        creator: "Alpiann",
        source: url,
        download: downloadLink
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: "Terjadi kesalahan saat scraping" });
    }
  });
};
