import { Request, Response, NextFunction } from "express";
import {v2 as cloudinary} from "cloudinary"
import streamifier from "streamifier"
import dotenv from "dotenv";
dotenv.config();

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_KEY_CLOUD,
});

//upload lên cloud
let streamUpload = (buffer:any) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream({resource_type:"auto"},(error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

//Upload ảnh lên cloud và trả về 1 url http
export const uploadToCloudinary = async (buffer:any) => {
  let result = await streamUpload(buffer);
  return result["url"];
};
