import express from "express";
import { generateImage } from "../controllers/imageGenController.js";
import { protect } from "../controllers/authControler.js";

export const router = express.Router();
router.use(protect);
router.post("/generate-image", generateImage);
