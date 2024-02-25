import { Request, Response, NextFunction } from "express";
import {uploadToCloudinary} from "../../helpers/uploadToCloudinary"
//upload 1 file ảnh
export const uploadSingle = async (req:Request,res:Response,next:NextFunction) =>{
  try {
    // console.log(req["file"]);
      const result = await uploadToCloudinary(req["file"].buffer);
      req.body[req["file"].fieldname] = result;
      
  } catch (error) {
    console.log(error);
  }
  next();
} 

//upload nhiều file (ảnh , audio)
export const uploadFields= async (req:Request,res:Response,next:NextFunction) =>{
  // console.log(req["files"]);
  for (const key in req["files"]) {
    req.body[key] = [];
    const array = req["files"][key];
    // console.log(key);
    // console.log(req["files"][key]);
    for (const item of array) {
      try {
        const result = await uploadToCloudinary(item.buffer);
        req.body[key].push(result);
      } catch (error) {
        console.log(error);
        
      }
    }
  }
  next();
} 