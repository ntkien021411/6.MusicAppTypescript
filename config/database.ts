//Connect với mongoDB
import mongoose from "mongoose";
// ENV
import dotenv from "dotenv";
dotenv.config();
export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connect Success!");
  } catch (error) {
    console.log("Database Connect Error");
  }
};
