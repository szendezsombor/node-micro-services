const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentCreated') {
        const { content } = data;
        const status = content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://localhost:4005/events', { type: 'CommentModerated', data: { ...data, status } });
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('Application listening on port 4003');
})