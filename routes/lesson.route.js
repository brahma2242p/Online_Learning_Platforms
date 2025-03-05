const LessonController=require("../controller/lesson.controller");
const { auth, IsAdmin } = require("../utils/auth");
const router=require("express").Router();
/**
 * @swagger
 * /lessonadd:
 *   post:
 *     summary: Create a new lesson
 *     description: Allows an admin to create a new lesson. Requires authentication and admin privileges.
 *     tags:
 *       - Lesson
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the lesson
 *                 example: Introduction to Variables
 *               content:
 *                 type: string
 *                 description: The content of the lesson
 *                 example: Learn about variables in JavaScript...
 *     responses:
 *       201:
 *         description: Lesson created successfully
 *       400:
 *         description: Bad request, validation error
 *       401:
 *         description: Unauthorized, authentication failed
 *       403:
 *         description: Forbidden, admin access required
 *       500:
 *         description: Server error
 */
router.post("/lessonadd",auth,IsAdmin,LessonController.CreateLesson)
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all lessons
 *     description: Retrieve a list of all lessons.
 *     tags:
 *       - Lesson
 *     responses:
 *       200:
 *         description: A list of lessons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lesson'
 *       500:
 *         description: Server error
 */
router.get("/",LessonController.getlesson)
/**
 * @swagger
 * /{id}:
 *   patch:
 *     summary: Update a lesson by ID
 *     description: Allows an admin to update a lesson's details. Requires authentication and admin privileges.
 *     tags:
 *       - Lesson
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the lesson to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the lesson
 *                 example: Advanced Variables
 *               content:
 *                 type: string
 *                 description: The new content of the lesson
 *                 example: Learn about variable scoping in JavaScript...
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       400:
 *         description: Bad request, validation error
 *       401:
 *         description: Unauthorized, authentication failed
 *       403:
 *         description: Forbidden, admin access required
 *       404:
 *         description: Lesson not found
 *       500:
 *         description: Server error
 */
router.patch("/:id",auth,IsAdmin,LessonController.UpdateLeeson)
module.exports=router;