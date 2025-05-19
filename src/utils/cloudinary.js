import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // fs mean file system

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudnary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resoure_type: "auto",
    });

    // file has been sucessfully uploaded
    console.log("Files is uploaded sucessfully", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the local saved filed as the uploaded operation
    return null;
  }
};

export { uploadOnCloudinary };
