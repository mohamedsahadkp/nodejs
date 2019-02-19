const helmet = require('helmet');
const express = require('express');
const app = express();

const log = require('./logger');

app.use(helmet());
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended : true })); // 
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log("Logging...");
    next();
});

app.use(log);

const movies = [
    { id : 1, name : "Movie1" },
    { id : 2, name : "Movie2" },
    { id : 3, name : "Movie3" }
];

app.get('/api/movies', (req, res) => {
    res.send(movies);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening Port : ${PORT}`);
})