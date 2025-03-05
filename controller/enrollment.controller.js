const Course = require("../models/course.model");
const Enrollment = require("../models/enrollment.model");
const Lesson = require("../models/lesson.model");

// Enroll a user in a course

exports.EnrollCourse = async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user.id; // The authenticated user's ID
    const { progress , completedLessons} = req.body; // Extracting progress from the request body

    try {
        
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

       
        const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
        if (existingEnrollment) {
            return res.status(400).json({ message: 'User is already enrolled in this course' });
        }

        
        const enrollment = new Enrollment({
            user: userId,
            course: courseId,
            progress: progress || 0,
            completedLessons // Default to 0 if progress is not provided
        });
        await enrollment.save();

        res.status(201).json({ message: 'User successfully enrolled in the course', enrollment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Mark a lesson as completed
 
exports.LessonCompleted= async (req, res) => {
    const { courseId, lessonId } = req.params;
    const userId = req.user.id; // The authenticated user's ID

    try {
       
        const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        
        if (enrollment.completedLessons.includes(lessonId)) {
            return res.status(400).json({ message: 'Lesson is already marked as completed' });
        }

       
        enrollment.completedLessons.push(lessonId);

     
        const totalLessons = await Lesson.countDocuments({ _id: { $in: enrollment.course.lessons } });
        enrollment.progress = Math.min(100, (enrollment.completedLessons.length / totalLessons) * 100);

        // Save the updated enrollment
        await enrollment.save();

        res.status(200).json({ message: 'Lesson marked as completed', enrollment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


