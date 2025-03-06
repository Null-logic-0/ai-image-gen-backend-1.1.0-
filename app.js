import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss";
import compression from "compression";

import { router as userRouter } from "./routes/userRoutes.js";
import { router as imageGenRouter } from "./routes/imageGenRoute.js";
import { globalErrorHandler } from "./controllers/errorController.js";

export const app = express();

// app.enable("trust proxy");
app.use(cors());
app.options("*", cors());
app.use(helmet());

// Global Middlewares
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
  console.log(`App is on ${process.env.NODE_ENV} mode`);
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP,please try again in an hour!",
});

app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitize());

// XSS Middleware
const xssSanitization = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      req.body[key] = xss(req.body[key]);
    });
  }
  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      req.query[key] = xss(req.query[key]);
    });
  }
  if (req.params) {
    Object.keys(req.params).forEach((key) => {
      req.params[key] = xss(req.params[key]);
    });
  }
  next();
};
app.use(compression());
app.use(xssSanitization);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use("/api/v.1/users", userRouter);
app.use("/api/v.1/flux-schnell", imageGenRouter);

// global error
app.use(globalErrorHandler);
