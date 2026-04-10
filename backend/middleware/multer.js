import multer from 'multer';
import fs from 'fs';

// Ensure the public folder exists so the server doesn't crash
if (!fs.existsSync("./public")) {
    fs.mkdirSync("./public");
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public"); // Files will be saved here temporarily
    },
    filename: (req, file, cb) => {
        // Create a unique filename to prevent overwriting
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

export default upload;