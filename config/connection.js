import mongoose from "mongoose";
import { config } from "dotenv";
config();

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
