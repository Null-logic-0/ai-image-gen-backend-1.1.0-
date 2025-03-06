import express from "express";
import {
  generateImage,
  getUserImages,
  deleteImage,
} from "../controllers/imageGenController.js";
import { protect } from "../controllers/authControler.js";

export const router = express.Router();
router.use(protect);
router.get("/user-images", getUserImages);
router.post("/generate-image", generateImage);
router.delete("/:imageId", deleteImage);
