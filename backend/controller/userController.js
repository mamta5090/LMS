import uploadOnClodinary from "../config/cloudinary.js";
import User from "../model/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(400).json({ message: "No User ID found in request" });
        }
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user }); 
    } catch (error) {
        console.log("Controller Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile=async(req,res)=>{
    try{
       const userId=req.userId
       const {description,name}=req.body
       let photoUrl
       if(req.file){
        photoUrl=await uploadOnClodinary(req.file.path)
       }
       const user=await User.findByIdAndUpdate(userId,{
        name,
        description,
        photoUrl
       })
       if(!user){
        return res.status(404).json({message:"user not found"})
       }
    }catch(error){
        return res.status(500).json({message:"profile is not updated"})
    }
}