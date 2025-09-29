const express = require("express");
const multer = require("multer");
const { fileTypeFromBuffer } = require("file-type");
const fetch = require("node-fetch");
const FormData = require("form-data");
const axios = require("axios");

const upload = multer(); // middleware untuk file upload

/* === Fungsi Uploader Cloudku === */
async function uploaderCloudku(buffer) {
  const { ext, mime } = (await fileTypeFromBuffer(buffer)) || {};
  if (!ext || !mime) throw new Error("Format file tidak dikenali");

  const form = new FormData();
  form.append("file", buffer, { filename: `upload.${ext}`, contentType: mime });

  const res = await fetch("https://cloudkuimages.guru/upload.php", {
    method: "POST",
    body: form,
    headers: form.getHeaders(),
  });
  const json = await res.json();
  if (json?.status !== "success" || !json.data?.url)
    throw Error("Upload ke Cloudku gagal");
  return json.data.url;
}

/* === Fungsi Uploader CatBox === */
async function uploaderCatBox(buffer) {
  const { ext, mime } = (await fileTypeFromBuffer(buffer)) || {};
  if (!ext || !mime) throw new Error("Format file tidak dikenali");

  const form = new FormData();
  form.append("reqtype", "fileupload");
  form.append("fileToUpload", buffer, { filename: `upload.${ext}`, contentType: mime });

  const res = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: form,
    headers: form.getHeaders(),
  });
  const text = await res.text();
  if (!text.startsWith("http")) throw Error("Upload ke CatBox gagal");
  return text.trim();
}

/* === Fungsi Uploader ZenZxz === */
async function uploadToZen(buffer, filename) {
  const form = new FormData();
  form.append("file", buffer, { filename });
  const res = await fetch("https://uploader.zenzxz.dpdns.org/upload", {
    method: "POST",
    body: form,
    headers: {
      ...form.getHeaders(),
      "User-Agent": "Mozilla/5.0",
      Origin: "https://uploader.zenzxz.dpdns.org",
      Referer: "https://uploader.zenzxz.dpdns.org/",
    },
  });
  const html = await res.text();
  const match = html.match(/href="(https?:\/\/uploader\.zenzxz\.dpdns\.org\/uploads\/[^"]+)"/);
  if (!match) throw new Error("Error saat mendapatkan link dari ZenZxz");
  return match[1];
}

/* === Fungsi Uploader Yupra === */
async function uploadYupra(buffer, filename) {
  const form = new FormData();
  form.append("files", buffer, { filename });
  const res = await axios.post("https://cdn.yupra.my.id/upload", form, {
    headers: { ...form.getHeaders(), "User-Agent": "Mozilla/5.0" },
    timeout: 120000,
  });
  return res.data?.files?.[0]?.url
    ? `https://cdn.yupra.my.id${res.data.files[0].url}`
    : null;
}

/* === Fungsi Uploader Prexzy === */
async function uploadPrexzy(buffer, filename) {
  const base64 = buffer.toString("base64");
  const up = `https://upload.prexzyvilla.site/api/upload`;
  const res = await axios.post(
    up,
    { filename, data: base64 },
    {
      headers: {
        accept: "*/*",
        "content-type": "application/json",
        origin: "https://upload.prexzyvilla.site",
        referer: "https://upload.prexzyvilla.site/",
        "user-agent": "NB Android/1.0.0",
      },
    }
  );
  const { url, directUrl } = res.data;
  return directUrl || url || null;
}

/* === Router Express === */
module.exports = function (app) {
  app.post("/tools/tourl", upload.single("file"), async (req, res) => {
    if (!req.file) return res.json({ status: false, msg: "File tidak ditemukan" });

    try {
      const buffer = req.file.buffer;
      const { ext } = (await fileTypeFromBuffer(buffer)) || { ext: "bin" };
      const filename = `upload.${ext}`;

      const [cloudUrl, catboxUrl, zenUrl, yupraUrl, prexzyUrl] = await Promise.all([
        uploaderCloudku(buffer).catch(() => null),
        uploaderCatBox(buffer).catch(() => null),
        uploadToZen(buffer, filename).catch(() => null),
        uploadYupra(buffer, filename).catch(() => null),
        uploadPrexzy(buffer, filename).catch(() => null),
      ]);

      if (!cloudUrl && !catboxUrl && !zenUrl && !yupraUrl && !prexzyUrl)
        return res.json({ status: false, msg: "Gagal upload ke semua server" });

      res.json({
        status: true,
        author: "Alpiann",
        result: {
          cloudku: cloudUrl,
          catbox: catboxUrl,
          zenzxz: zenUrl,
          yupra: yupraUrl,
          prexzy: prexzyUrl,
          size_kb: (buffer.length / 1024).toFixed(2),
        },
      });
    } catch (e) {
      res.json({ status: false, msg: "Error upload", error: String(e) });
    }
  });
};
