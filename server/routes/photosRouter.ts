// library imports
import express from "express";
import { uploadPhotoByLink, uploadPhotoByFile } from "../controllers/photoController";
import multer from 'multer'

const router = express.Router();
const multerMiddleware = multer({ dest: 'uploads', })

router.post('/upload-by-link', uploadPhotoByLink)
router.post('/upload', multerMiddleware.array('photos', 100), uploadPhotoByFile)


export default router;