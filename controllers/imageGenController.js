import Replicate from "replicate";
import { catchAsync } from "../utils/catchAsync.js";
import { Image } from "../models/imageModel.js";
import { User } from "../models/userModel.js";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const imagePrompt = async (prompt, options) => {
  const input = {
    prompt,
    aspect_ratio: options?.aspect_ratio || "1:1",
    output_format: options?.format || "jpg",
    output_quality: +options?.quality || 80,
    safety_tolerance: 2,
    prompt_upsampling: true,
  };

  const output = await replicate.run("black-forest-labs/flux-schnell", {
    input,
  });
  const outputStream = output[0];

  const imageBlob = await outputStream.blob();
  const imageBuffer = await imageBlob.arrayBuffer();
  const image = Buffer.from(imageBuffer);

  return { image, format: imageBlob.type };
};

export const generateImage = catchAsync(async (req, res) => {
  const { prompt, options } = req.body;
  const userId = req.user.id;

  if (!prompt || prompt.trim().length === 0) {
    return res.status(400).send({ error: "Invalid prompt" });
  }

  const { image, format } = await imagePrompt(prompt, options);

  const newImage = await Image.create({
    user: userId,
    imageData: image,
    format,
  });

  await User.findByIdAndUpdate(userId, {
    $push: { images: newImage._id },
  });

  res.type(format);
  res.status(201).send(image);
});

export const getUserImages = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId).populate("images");

  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  const imagesWithBase64 = user.images.map((image) => {
    const base64Image = image.imageData.toString("base64");
    return {
      ...image.toObject(),
      imageData: `data:${image.format};base64,${base64Image}`,
    };
  });

  res.status(200).send(imagesWithBase64);
});

export const deleteImage = catchAsync(async (req, res) => {
  const { imageId } = req.params;
  const userId = req.user.id;

  const image = await Image.findById(imageId);

  if (!image) {
    return res.status(404).send({ error: "Image not found" });
  }

  if (image.user.toString() !== userId) {
    return res.status(403).send({ error: "Unauthorized to delete this image" });
  }

  await Image.findByIdAndDelete(imageId);

  await User.findByIdAndUpdate(userId, {
    $pull: { images: imageId },
  });

  res.status(200).send({ message: "Image deleted successfully" });
});

// export const generateImage = catchAsync(async (req, res) => {
//   const { prompt, options } = req.body;

//   if (!prompt || prompt.trim().length === 0) {
//     return res.status(400).send({ error: "Invalid prompt" });
//   }

//   const { image, format } = await imagePrompt(prompt, options);
//   res.type(format);
//   res.status(201).send(image);
// });

// export const getUserImages = catchAsync(async (req, res) => {
//   const userId = req.user.id;

//   const user = await User.findById(userId).populate("images");

//   if (!user) {
//     return res.status(404).send({ error: "User not found" });
//   }

//   res.status(200).send(user.images);
// });
