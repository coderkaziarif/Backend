import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
//* File upload on Cloudinary
const uploadOnCloudinary = async (localFilepath)=> {
    try {
        if(!localFilepath) return null
        const res =  await cloudinary.uploader.upload(localFilepath,{
            resource_type:"auto"
        });
        console.log("File is uploaded on cloudinary:",res.url)
        return res;
    } catch (error) {
        fs.unlinkSync(localFilepath) //* its remove the local file when upload failed!
        return null;
    }
  
}

export {uploadOnCloudinary};

