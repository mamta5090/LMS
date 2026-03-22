import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    try {
        // MUST specify .token, otherwise req.cookies is an object {}
        const token = req.cookies?.token; 

        if (!token) {
            return res.status(401).json({ message: "No token found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Ensure you are using the same key (id vs userId) used during login
        req.userId = decoded.id || decoded.userId; 
        
        next();
    } catch (error) {
        console.log("Auth Error:", error.message); // This shows in your TERMINAL
        return res.status(500).json({ message: "Server error in middleware" });
    }
};

export default isAuth;
