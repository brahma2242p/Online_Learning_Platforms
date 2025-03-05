const Course = require("../models/course.model");

//create course (admin controller)
exports.CreateCourse = async (req,res)=>{
    try {
        const {title, description , duration ,lessons , studentsEnrolled}=req.body;
    
        if(title=="" || description=="" || duration==""){
            return res.status(400).json({
                success:false,
                message:"fields are required"
            })
        }
    
        const coursecreate= new Course({
            title,
            description,
            duration,
            lessons,
            studentsEnrolled,
        })
        await coursecreate.save();
    
        if(!coursecreate){
            return res.status(400).json({
                success:false,
                message:"something went wrong "
            })
        }
        return res.status(200).json({
            success:true,
            message:"Course added"
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:true,
            message:"Internal server error"
        })
    }
}

//get all course 
exports.GetAllCourse= async (req,res)=>{
    try {
        const find=await Course.find().populate("studentsEnrolled").populate("lessons").exec()
        if(!find){
            return res.status(400).json({
                success:false,
                message:"data not found"
            })
        }
        return res.status(200).json({
            success:true,
            Course:find
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:true,
            message:"Internal server error"
        })
    }
}
//get by id
exports.GetById= async(req,res)=>{
    try {
        const find=await Course.findById(req.params.id).populate("studentsEnrolled").populate("lessons").exec()
        if(!find){
            return res.status(400).json({
                success:false,
                message:"data not found"
            })
        }
        return res.status(200).json({
            success:true,
            Course:find
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:true,
            message:"Internal server error"
        })
    }
}

//delete course
exports.DeleteCourse= async(req,res)=>{
    try {
        const find=await Course.findByIdAndDelete(req.params.id)
        if(!find){
            return res.status(400).json({
                success:false,
                message:"data not found"
            })
        }
        return res.status(200).json({
            success:true,
          message:"Course deleted"
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:true,
            message:"Internal server error"
        })
    }
}

//update course
exports.UpdateCourse =async(req,res)=>{
    try {
        const find=await Course.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!find){
            return res.status(400).json({
                success:false,
                message:"data not found"
            })
        }
        return res.status(200).json({
            success:true,
          message:"Course updated"
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:true,
            message:"Internal server error"
        })
    }
}



