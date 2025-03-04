import Replicate from "replicate";
import { catchAsync } from "../utils/catchAsync.js";

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

  if (!prompt || prompt.trim().length === 0) {
    return res.status(400).send({ error: "Invalid prompt" });
  }

  const { image, format } = await imagePrompt(prompt, options);
  res.type(format);
  res.status(201).send(image);
});
