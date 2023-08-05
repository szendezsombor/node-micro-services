const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'https://example.com', allowedHeaders: 'X-PONG'}));

// app.options('/a', (req, res, next) => {
//
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST');
//     res.setHeader('Access-Control-Allow-Headers', 'X-PONG');
//     console.log(res.getHeaders())
//     res.send();
// });

app.post('/a', (req, res) => {

    // res.setHeader('Access-Control-Allow-Origin', 'https://example.com');
    res.setHeader('Access-Control-Allow-Headers', 'X-PONG');
    res.setHeader('X-PONG', 'test-data');
    res.setHeader('Pragma', 'test-data');
    res.send({ success: req.headers });
});

app.listen(3005);