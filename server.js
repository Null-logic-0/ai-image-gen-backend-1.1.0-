import { app } from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

const db = process.env.DATABASE;

mongoose
  .connect(db)
  .then(() => console.log("Database conected successfully"))
  .catch((error) => console.error(error.message, "DB conection failed!"));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
