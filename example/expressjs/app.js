
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id : 1, name : "Course1" },
    { id : 2, name : "Course2" },
    { id : 3, name : "Course3" }
]

app.get('/', (req, res) => {
    res.send('Hello Wolrd')
});

app.get('/api/course', (req, res) => {
    res.send(courses);
});

app.post('/api/course', (req, res) => {
    // if(!req.body.name || req.body.name.length  < 3) {
    //     res.sendStatus(400).send('Bad Request');
    //     return;
    // }

    // const schema = {
    //     name : Joi.string().min(3).required()
    // }
    // const result = Joi.validate(req.body, schema);
    // if(result.error) {
    //     res.status(400).send(result.error);
    //     return;
    // }

    const { error } = validateCourse(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/course/:id', (req, res) => {
    // Validate 
    // If invalid, return 400
    const { error } = validateCourse(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Look for course
    // If not exsiting, return 404

    // Update course
    // Return updated code.
});

app.get('/api/course/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.sendStatus(404).send("Not Found");
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening port ${port}....`);
})