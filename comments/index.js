const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

const commentByPostId = {};


app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.post('/posts/:id/comments',  async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentByPostId[req.params.id] || [];

    const comment = { id: commentId, content, status: 'pending' };

    comments.push(comment);

    commentByPostId[req.params.id] = comments;

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            ...comment,
            postId: req.params.id,
        }
    });

    res.status(201).send(comments);
});

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentByPostId[req.params.id]);
});

app.post('/events', async (req, res) => {
    console.log('Received event: ', req.body.type);

    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id;
        });

        comment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }

    res.send({});
});

app.listen(4001, () => {
    console.log('Application listening on 4001');
});