const Lesson = require("../models/lesson.model");

//create lesson 
exports.CreateLesson =async (req,res)=>{
    try {
        const {title , content , course}=req.body;
          
        if(title=="" || content=="" || course==""){
            return res.status(400).json({
                success:false,
                message:"fields are required"
            })
        }
    
        const lessoncreate= new Lesson({
            title,
            content,
            course
        })
        await lessoncreate.save()
        if(!lessoncreate){
            return res.status(400).json({
                success:false,
                message:"something went wrong "
            })
        }
        return res.status(200).json({
            success:true,
            message:"lesson added"
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:true,
            message:"Internal server error"
        })
    }
}

//get lesson 
exports.getlesson= async(req,res)=>{
   try {
     const find = await Lesson.find();
     if(!find){
         return res.status(400).json({
             success:false,
             message:"no data found"
         })
     }
     return res.status(200).json({
         success:true,
         Leeson:find
     })
   } catch (error) {
    console.log(error);
        
        return res.status(500).json({
            success:true,
            message:"Internal server error"
        })
   }
}

//update lesson
exports.UpdateLeeson = async (req,res)=>{
   try {
     const user= await Lesson.findByIdAndUpdate(req.params.id , req.body , {new:true})
     if(!user){
         return res.status(400).json({
             success:false,
             message:"No data found"
         })
     }
     return res.status(200).json({
         success:true,
         message:"Lesson Update"
     })
   } catch (error) {
    console.log(error);
        
    return res.status(500).json({
        success:true,
        message:"Internal server error"
    })
   }
}