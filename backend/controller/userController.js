import User from "../model/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
        // FIX: Match the name used in your isAuth middleware (req.userId)
        if (!req.userId) {
            return res.status(400).json({ message: "No User ID found in request" });
        }

        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user object
        res.status(200).json({ user }); 
    } catch (error) {
        console.log("Controller Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
