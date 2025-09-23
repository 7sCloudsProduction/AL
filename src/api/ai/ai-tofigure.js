const axios = require('axios');
const FormData = require('form-data');

async function uploadToCatbox(buffer) {
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('userhash', '');
    form.append('fileToUpload', buffer, { filename: 'result.png' });

    const { data } = await axios.post('https://catbox.moe/user/api.php', form, {
        headers: form.getHeaders(),
        maxBodyLength: Infinity
    });

    return data;
}

async function tofigureScrape(imageUrl) {
    if (!imageUrl) throw new Error('Parameter imageUrl kosong');

    const { data } = await axios.get('https://api.nekolabs.my.id/ai/convert/tofigure', {
        params: { imageUrl }
    });

    if (!data || !data.status || !data.result) throw new Error('Gagal mendapatkan hasil AI');

    const imgResponse = await axios.get(data.result, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(imgResponse.data);
    const catboxUrl = await uploadToCatbox(buffer);

    return {
        status: true,
        creator: "Alpiann",
        result: catboxUrl
    };
}

module.exports = function(app) {
    app.get('/ai/tofigure', async (req, res) => {
        try {
            const { imageUrl } = req.query;
            const result = await tofigureScrape(imageUrl);
            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: false, error: err.message });
        }
    });
};
