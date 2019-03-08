const mongoose = require('mongoose');

mongoose.connect('')
    .then(() => console.log('Connected to MongoDB.....'))
    .catch(err => console.log('Cloud not connect to MongoDB,', err));

const courseSchema = new mongoose.Schema({
    name : String,
    author : String,
    tags : [ String ],
    date : { type : Date , default : Date.now },
    isPublished : Boolean
});

const Course = mongoose.model('Course', courseSchema);


const createCourse = async () => {
    const course  = new Course({
        name : "Angular",
        author : "Sahad",
        tags: ["angular", "backend"],
        isPublished : true
    });
    
    const result = await course.save();
    console.log('Result :', result);
}

const getCourse = async () => {
    const result = await Course.find();
    console.log('Result : ', result);
}

const getCourseByFilter = async () => {
    const result = await Course.fin
}

//createCourse();
getCourse();




