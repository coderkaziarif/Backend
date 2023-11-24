import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

// res.status(200).json({
  //     status:"success",
  //     message:"register done"
  // })

  //* =========>Step of implement of user contrller<=========
  //get user details frontend
  //validation -not empty
  //check user all ready exists : email, name
  //check for image of avatar
  //upload img on cloudinary
  //create user object - create enry in db
  //remove password and refresh token field from response
  //check for user creation
  //return response
  //=======================//
const registerUser = asyncHandler(async (req, res) => {
  
  //^<======Get User details from frontend=====>
  const { userName, fullName, email, password } = req.body;
 

  //^ <========Validation=========>
if (
    [fullName, email, password, userName].some((field)=>
    field?.trim() ==="")
) {
    throw new ApiError(400, "All Fields are Required!!!")
};

//^<======Check user Exists or Not========>
const existingUser = await User.findOne({
    $or : [{userName}, {email}]
});
if(existingUser){
    throw new ApiError(409, "UserName or Email aleady Exists")
}
//^<=========File validation=======>
const profileLocalPath = req?.files.profilePic[0]?.path;
const coverImageLocalPath = req?.files.coverPic[0]?.path;

if (!profileLocalPath) {
    throw new ApiError(400, "Profile Pic is required !");
};

//^<======== img file upload in cloudinary=======>
const profile = await uploadOnCloudinary(profileLocalPath);
const cover = await uploadOnCloudinary(coverImageLocalPath);


if (!profile) {
    throw new ApiError(400,"Profile img is required !")
}

//^ <=======Create user obj==========>
const userData = await User.create({
    fullName,
    userName : userName.toLowerCase(),
    email,
    profilePic: profile.url,
    coverPic: cover?.url || "",
    password,
});

//^<===========Remove password & refreshh token from response =======>
const createdUser = await User.findById(userData._id).select(
    "-password -refreshToken"
)

if (!createdUser) {
    throw new ApiError(500, "User Registration not completed !")
}


//^<===========User save or not in DB =======>
return res.status(201).json(
    new ApiResponse(200, createdUser,"User Registered Successfull!!!")
)

});




export { registerUser };
