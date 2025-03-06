import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  imageData: {
    type: Buffer,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Image = mongoose.model("Image", imageSchema);
