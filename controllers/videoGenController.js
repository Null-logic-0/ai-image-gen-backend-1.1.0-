import Replicate from "replicate";
import { catchAsync } from "../utils/catchAsync.js";
import { Video } from "../models/videoModel.js";
import { User } from "../models/userModel.js";
import s3 from "../utils/s3Config.js";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const videoPrompt = async (prompt, options) => {
  const input = {
    prompt,
    frame_num: options?.frame_num || 81,
    resolution: options?.resolution || "480p",
    aspect_ratio: options?.aspect_ratio || "16:9",
    sample_shift: 8,
    sample_steps: 29,
    sample_guide_scale: 6,
  };

  const outputStream = await replicate.run("wan-video/wan-2.1-1.3b", { input });

  if (!outputStream || !(outputStream instanceof ReadableStream)) {
    throw new Error("Invalid output from Replicate: Expected a ReadableStream");
  }

  const reader = outputStream.getReader();
  let chunks = [];
  let totalSize = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    totalSize += value.length;
  }

  const videoBuffer = Buffer.concat(chunks, totalSize);

  return { videoBuffer, format: "mp4" };
};

export const generateVideo = catchAsync(async (req, res) => {
  const { prompt, options } = req.body;
  const userId = req.user.id;

  if (!prompt || prompt.trim().length === 0) {
    return res.status(400).send({ error: "Invalid prompt" });
  }

  const { videoBuffer, format } = await videoPrompt(prompt, options);

  const fileName = `user-videos/${userId}/${Date.now()}.${format}`;

  const s3Params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: videoBuffer,
    ContentType: `video/${format}`,
  };

  const command = new PutObjectCommand(s3Params);
  await s3.send(command);

  const videoUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

  const newVideo = await Video.create({
    user: userId,
    videoData: videoUrl,
    format,
  });

  await User.findByIdAndUpdate(userId, {
    $push: { videos: newVideo._id },
  });

  res.status(201).json({ success: true, videoUrl });
});

export const getUserVideos = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId).populate("videos", "videoData");

  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  const videos = user.videos.map((video) => ({
    videoData: video.videoData,
    format: video.format,
    createdAt: video.createdAt,
    _id: video._id,
  }));

  return res.status(200).json({ success: true, videos });
});

export const deleteVideo = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user.id;

  const video = await Video.findById(videoId);

  if (!video) {
    return res.status(404).send({ error: "Video not found" });
  }

  if (video.user.toString() !== userId) {
    return res.status(403).send({ error: "Unauthorized to delete this video" });
  }

  const fileKey = video.videoData.split(".amazonaws.com/")[1];

  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  };

  await s3.send(new DeleteObjectCommand(deleteParams));

  await Video.findByIdAndDelete(videoId);
  await User.findByIdAndUpdate(userId, { $pull: { videos: videoId } });

  res.status(200).send({ message: "Video deleted successfully" });
});
