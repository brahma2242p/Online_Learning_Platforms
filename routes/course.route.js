const CourseController=require("../controller/course.controller");
const { auth, IsAdmin } = require("../utils/auth");
const router=require("express").Router();
/**
 * @swagger
 * /addcourse:
 *   post:
 *     summary: Create a new course
 *     description: Allows an admin to create a new course. Requires authentication and admin privileges.
 *     tags:
 *       - Course
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
 *                 description: The title of the course
 *                 example: Introduction to JavaScript
 *               description:
 *                 type: string
 *                 description: The course description
 *                 example: Learn the basics of JavaScript programming
 *               duration:
 *                 type: number
 *                 description: The duration of the course in hours
 *                 example: 10
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Bad request, validation error
 *       401:
 *         description: Unauthorized, authentication failed
 *       403:
 *         description: Forbidden, admin access required
 *       500:
 *         description: Server error
 */
router.post("/addcourse",auth,IsAdmin,CourseController.CreateCourse)
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all courses
 *     description: Retrieve a list of all courses.
 *     tags:
 *       - Course
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Server error
 */
router.get("/",CourseController.GetAllCourse)
/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a course by ID
 *     description: Retrieve the details of a course by its ID.
 *     tags:
 *       - Course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The course details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.get("/:id",CourseController.GetById)
/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     description: Allows an admin to delete a course. Requires authentication and admin privileges.
 *     tags:
 *       - Course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the course to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       401:
 *         description: Unauthorized, authentication failed
 *       403:
 *         description: Forbidden, admin access required
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",auth,IsAdmin,CourseController.DeleteCourse)
/**
 * @swagger
 * /{id}:
 *   patch:
 *     summary: Update a course by ID
 *     description: Allows an admin to update a course's details. Requires authentication and admin privileges.
 *     tags:
 *       - Course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the course to update
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
 *                 description: The new title of the course
 *                 example: Advanced JavaScript
 *               description:
 *                 type: string
 *                 description: The new description of the course
 *                 example: Dive deeper into JavaScript programming
 *               duration:
 *                 type: number
 *                 description: The new duration of the course in hours
 *                 example: 15
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Bad request, validation error
 *       401:
 *         description: Unauthorized, authentication failed
 *       403:
 *         description: Forbidden, admin access required
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.patch("/:id",auth,IsAdmin,CourseController.UpdateCourse)
module.exports=router;