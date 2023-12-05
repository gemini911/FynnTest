const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/check-domain', async (req, res) => {
    const domain = req.query.name;
    const suffix = req.query.suffix || 'com'; // 默认后缀为 com
    const apiUrl = `https://whois.freeaiapi.xyz/?name=${domain}&suffix=${suffix}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
