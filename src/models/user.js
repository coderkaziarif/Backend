import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema (
    {
        userName : {
            type: String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true,
        },
        email : {
            type: String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true,
        },
        fullName : {
            type: String,
            required:true,
            trim:true,
            index:true,
        },
        profilePic: {
            type:String,//Cloudinary url
            required:true
        },

        coverImage:{
            type:String,
        },
        wathHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true, 'Password is reuired']
        },
        refreshToken:{
            type:String
        },
    },
    {
        timestamps:true,
    }
);
//* password encript before save data
userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//* password compareing uer password
userSchema.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password,this.password);
};

//* generate Access token
userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            userName:this.userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

//* generate Refresh token
userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id:this._id,
          
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

export const User = mongoose.model("User", userSchema);