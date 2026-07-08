import Course from "../model/course.model.js";
import Lecture from "../model/lectureModel.js";
import User from "../model/user.model.js";
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
const updateData = {
    title,
    category,
    isPublished: isPublished === "true" || isPublished === true
};
if (subtitle) updateData.subtitle = subtitle;
if (description) updateData.description = description;
if (level) updateData.level = level;
if (price !== undefined && price !== "") updateData.price = Number(price);
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

//create lecture

export const createLecture = async (req,res) => {
    try {
        const {lectureTitle}= req.body
        const {courseId} = req.params

        if(!lectureTitle || !courseId){
             return res.status(400).json({message:"Lecture Title required"})
        }
        const lecture = await Lecture.create({lectureTitle})
        const course = await Course.findById(courseId)
        if(course){
            course.lectures.push(lecture._id)
            
        }
        await course.populate("lectures")
        await course.save()
        return res.status(201).json({lecture,course})
        
    } catch (error) {
        return res.status(500).json({message:`Failed to Create Lecture ${error}`})
    }
    
}

export const getCourseLecture = async (req,res) => {
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        await course.populate("lectures")
        await course.save()
        return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({message:`Failed to get Lectures ${error}`})
    }
}

export const editLecture = async (req,res) => {
    try {
        const {lectureId} = req.params
        const {isPreviewFree , lectureTitle} = req.body
        const lecture = await Lecture.findById(lectureId)
          if(!lecture){
            return res.status(404).json({message:"Lecture not found"})
        }
        let videoUrl
        if(req.file){
            videoUrl =await uploadOnCloudinary(req.file.path)
            lecture.videoUrl = videoUrl
                }
        if(lectureTitle){
            lecture.lectureTitle = lectureTitle
        }
        lecture.isPreviewFree = isPreviewFree
        
         await lecture.save()
        return res.status(200).json(lecture)
    } catch (error) {
        return res.status(500).json({message:`Failed to edit Lectures ${error}`})
    }
    
}

export const removeLecture = async (req,res) => {
    try {
        const {lectureId} = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if(!lecture){
             return res.status(404).json({message:"Lecture not found"})
        }
        //remove the lecture from associated course

        await Course.updateOne(
            {lectures: lectureId},
            {$pull:{lectures: lectureId}}
        )
        return res.status(200).json({message:"Lecture Remove Successfully"})
        }
    
     catch (error) {
        return res.status(500).json({message:`Failed to remove Lectures ${error}`})
    }
}



//get Creator data


// controllers/userController.js

export const getCreatorById = async (req, res) => {
  try {
    const {userId} = req.body;

    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json( user );
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "get Creator error" });
  }
};