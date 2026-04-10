import Course from "../model/course.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
export const createCourse=async (req,res)=>{
    try {
        const {title,category}=req.body;
        if(!title || !category){
            return res.status(400).json({message:"Title and category are required"});
        }
        const course=await Course.create({title,category,creator:req.userId});
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: "Failed to create course" });
    }
}

export const getPublishedCourses=async(req,res)=>{
    try {
        const courses=await Course.find({isPublished:true});
      if(!courses){
        return res.status(400).json({message:"Courses not found"});
      }
      res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch courses" });
    }
}

export const getCreatorCourses=async(req,res)=>{
    try{
        const userId=req.userId;
        const courses=await Course.find({creator:userId});
        if(!courses){
            return res.status(400).json({message:"Courses not found"});
        }
        res.status(200).json(courses);
    }catch(error){
        res.status(500).json({ message: "Failed to fetch creator courses" });
    }
}

export const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, subtitle, description, category, level, isPublished, price } = req.body;
        
        let updateData = { title, subtitle, description, category, level, isPublished, price };

       if (req.file) {
    const uploadResponse = await uploadOnCloudinary(req.file.path);
    updateData.thumbnail = uploadResponse;
}

        const course = await Course.findByIdAndUpdate(
            courseId, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update course" });
    }
}

export const getCourseById=async(req,res)=>{
    try{
        const {courseId}=req.params;
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(400).json({message:"Course not found"});
        }
        res.status(200).json(course);

    }catch(error){
        res.status(500).json({ message: "Failed to fetch course" });
    }
}

export const removeCourse=async(req,res)=>{
    try {
        const {courseId}=req.params;
        let course=await Course.findById(courseId);
        if(!course){
            return res.status(400).json({message:"Course not found"});
        }
       course= await Course.findByIdAndDelete(courseId);
         res.status(200).json({message:"Course removed successfully"});

    } catch (error) {
        return res.status(500).json({ message: "Failed to remove course" });
    }
}