import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const today = new Date().toISOString().replace(/[:.]/g, '-'); // full timestamp
        const fileName = `${path.parse(file.originalname).name}${today}${path.extname(file.originalname)}`.toLowerCase();
        cb(null, fileName)
    },
    destination: (req, file, cb) => {
        cb(null, "./src/upload/produts/image")
    }
})


const fileUpload = multer({
    storage: storage
})

export default fileUpload