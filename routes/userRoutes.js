import express from "express";

import {
  login,
  logout,
  protect,
  signup,
  updatePassword,
} from "../controllers/authControler.js";
import {
  deleteMe,
  getMe,
  getUser,
  updateMe,
  uploadUserPhoto,
} from "../controllers/userController.js";

export const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

// This is Protected routes
router.use(protect);

router.get("/me", getMe, getUser);
router.patch("/updateMyPassword", updatePassword);
router.patch("/updateMe", uploadUserPhoto, updateMe);
router.delete("/deleteMe", deleteMe);
