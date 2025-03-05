const Enrollment=require("../controller/enrollment.controller");
const { auth, IsUser } = require("../utils/auth");
const router=require("express").Router();
/**
 * @swagger
 * /{courseId}/enroll:
 *   post:
 *     summary: Enroll a user in a course
 *     description: Allows an authenticated user to enroll in a specific course.
 *     tags:
 *       - Enrollment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course to enroll in
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: User successfully enrolled in the course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully enrolled in the course
 *                 enrollment:
 *                   $ref: '#/components/schemas/Enrollment'
 *       400:
 *         description: Bad request, the user is already enrolled
 *       401:
 *         description: Unauthorized, authentication failed
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.post("/:courseId/enroll",auth,IsUser,Enrollment.EnrollCourse)

/**
 * @swagger
 * /{courseId}/lessons/{lessonId}/complete:
 *   post:
 *     summary: Mark a lesson as completed
 *     description: Allows an authenticated user to mark a specific lesson as completed within a course.
 *     tags:
 *       - Enrollment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *       - in: path
 *         name: lessonId
 *         required: true
 *         description: The ID of the lesson to mark as completed
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Lesson marked as completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lesson marked as completed
 *       400:
 *         description: Bad request, the user is not enrolled in the course
 *       401:
 *         description: Unauthorized, authentication failed
 *       404:
 *         description: Course or lesson not found
 *       500:
 *         description: Server error
 */
router.post("/:courseId/lessons/:lessonId/complete",auth,IsUser,Enrollment.LessonCompleted)
module.exports=router;