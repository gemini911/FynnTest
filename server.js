const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

const POST_PASSWORD = '12345'; // 设置你的密码

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/posts', (req, res) => {
    fs.readFile('posts.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading posts');
        }
        res.json(JSON.parse(data));
    });
});

app.post('/posts', (req, res) => {
    const { content, password } = req.body;
    if (password !== POST_PASSWORD) {
        return res.status(401).send('Unauthorized');
    }

    fs.readFile('posts.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading posts');
        }
        const posts = JSON.parse(data);
        posts.unshift(content);
        fs.writeFile('posts.json', JSON.stringify(posts), (err) => {
            if (err) {
                return res.status(500).send('Error saving post');
            }
            res.status(201).send('Post saved');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});