const express = require('express');
const route = express.Router();

const courses = [
    { id : 1, name : "Course1" },
    { id : 2, name : "Course2" },
    { id : 3, name : "Course3" }
]

route.get('/', (req, res) => {
    res.send(courses);
})

route.post('/', (req, res) => {
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
    if(error) return res.status(400).send(error.details[0].message);
    
    const course = {
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(course);
    res.send(course);
});

route.put('/:id', (req, res) => {
    // Validate course
    // If invalid, return 400
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Look for course
    // If not exsiting, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Not Found")

    // Update course
    // Return updated code.
    course.name = req.body.name;
    res.send(course);
});

route.get('/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.sendStatus(404).send("Not Found");
    res.send(course);
});

route.delete('/:id', (req, res) => {
    // Look for course
    // If not exsiting, return 404.
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Not Found")

    // Delete
    // Return deleted code
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course)
});

function validateCourse(course) {
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

module.exports = route;