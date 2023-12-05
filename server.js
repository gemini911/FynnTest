const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(cors());

// 静态文件服务
app.use(express.static('public'));

// API路由
app.get('/check-domain', async (req, res) => {
    const domain = req.query.name;
    const suffix = req.query.suffix || 'com';
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

// 处理根路径
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
