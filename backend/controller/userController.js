import uploadOnCloudinary  from "../config/cloudinary.js";
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

export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { description, name } = req.body; 
        const updateData = {};
        if (name) updateData.name = name;
        if (description !== undefined) {
            updateData.discription = description; 
        }
        if (req.file) {
            const imageUrl = await uploadOnClodinary(req.file.path);   
            if (imageUrl) {
                updateData.photoUrl = imageUrl; 
            }
        }
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { returnDocument: 'after' } 
        ).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};