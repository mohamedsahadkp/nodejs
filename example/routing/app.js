
const Joi = require('joi');
const express = require('express');
const app = express();

const log =  require('./middleware/logger')
const course = require('./routes/course');
const home = require('./routes/home');

app.use(express.json());
app.use(log)

app.use('/api/course/', course);
app.use('/', home)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening port ${port}....`);
})