const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true, // in hours
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Course = mongoose.model('Course', courseSchema);
module.exports=Course;
