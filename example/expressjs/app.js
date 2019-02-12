const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Wolrd')
});

app.get('/api/course', (req, res) => {
    res.send([2, 3, 5]);
})

app.listen(3000, () => {
    console.log('Listen port 3000....');
})