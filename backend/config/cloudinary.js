import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config(); // Ensure variables are loaded

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary  = async (filePath) => {
    try {
        if (!filePath) return null;

        // Upload the file
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
            folder: "profile_pics" // Optional: organizes images in Cloudinary
        });

        // Delete local file after success
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        return uploadResult.secure_url;
    } catch (error) {
        // Delete local file even if upload fails to prevent clutter
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        console.error("Cloudinary Upload Error Detail:", error);
        return null;
    }
};

export default uploadOnCloudinary ;