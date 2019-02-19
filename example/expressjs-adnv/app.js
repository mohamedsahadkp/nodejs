const express = require('express');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    console.log("Logging....")
})

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