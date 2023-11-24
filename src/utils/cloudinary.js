import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilepath) => {
    try {
        if (!localFilepath) return null;

        const res = await cloudinary.uploader.upload(localFilepath, {
            resource_type: 'auto',
        });

        // Log the Cloudinary upload response
        console.log('File is uploaded on Cloudinary:', res.url);

        return res;
    } catch (error) {
        // Log the error
        console.error('Error uploading to Cloudinary:', error);

        return null;
    } finally {
        // Delete the local file, whether upload succeeded or failed
        if (localFilepath) {
            fs.unlinkSync(localFilepath);
            console.log('Local file deleted:', localFilepath);
        }
    }
};

export { uploadOnCloudinary };
