const express = require('express')
const app = express()
const cookiearser=require("cookie-parser")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("dotenv").config();
const port = process.env.PORT || 5000; // Default to 5000 if PORT is missing

app.use(cookiearser())
require("./config/db")
const UserRoute=require("./routes/user.route")
const CourseRoute=require("./routes/course.route")
const lessonRoute=require("./routes/lesson.route")
const Enroll=require("./routes/enroll.route")
app.use("/api/v1/auth",UserRoute)
app.use("/api/v1/course",CourseRoute)
app.use("/api/v1/lesson",lessonRoute)
app.use("/api/v1/enroll",Enroll)
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Online_Learning_Platform API',
        version: '1.0.0',
        description: 'API for managing Online_Learning_Platform',
    },
    servers: [
        {
            url: 'http://localhost:3000/api', // Replace with your API base URL
        },
    ],
};

// Options for Swagger JSDoc
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/user.route.js', './routes/course.route.js' ,  './routes/lesson.route.js',  './routes/enroll.route.js'], // Path where API routes are defined
};

// Initialize SwaggerJSDoc
const swaggerSpec = swaggerJsdoc(options);

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/",(req,res)=>{
    res.send("<center><h1>Online_Learning_Platform App All apis</h1><br>Get All Apis Use My Link <a href=https://github.com/Kotak111/Online_Learning_Platform target=_blank>Repository :- Online_Learning_Platform</a></center>")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))