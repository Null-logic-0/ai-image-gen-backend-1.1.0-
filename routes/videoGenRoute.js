import express from "express";
import { protect } from "../controllers/authControler.js";
import {
  deleteVideo,
  generateVideo,
  getUserVideos,
} from "../controllers/videoGenController.js";

export const router = express.Router();

router.use(protect);
router.get("/user-videos", getUserVideos);
router.post("/generate-video", generateVideo);
router.delete("/:videoId", deleteVideo);
