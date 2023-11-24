import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
const app = express();

dotenv.config({
    path: "./env"
});

app.set("view engine", "ejs");
//*<======== Middlewares======>
app.use(cors({
    origin:process.env.CORS_ORIGIN, 
    credentials:true

}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


//&<=============import Roters ========>
import userRouter from './routes/user.routes.js';




//^<========Route declaration=========>
app.use('/api/v1/user', userRouter);

//!<====ejs=======>
app.get('/',(req, res)=>{
    res.render("index",{name:"Arif"})
})


export default app;