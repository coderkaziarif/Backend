import app from "./app.js";
import connectDB from "./db/index.js";
// import dotenv from "dotenv";
// import  express  from "express";
// dotenv.config({
//     path:"./env"
// })

// const app = express();

//&<===== call the DB====>
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error:",error)
        throw error
    });
    
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}` )
    })
})
.catch((error)=>{
    console.log(`Mongo DB Connection Failed !!!!`,error)
})


//* <========Old method======>
/*;( async() =>{
    try {
      await mongoose.connect(`${proccess.env.MONGO_URI}/${DB_NAME}`)
        app.on("error",(err)=>{
            console.log("ERROR:", err)
        });

        app.listen(process.env.PORT,()=>{
            console.log(`App is running on Port: ${process.env.PORT}`)
        })
    } catch (error) {
        console.log({error})
        throw error
    }
})()*/
//*===========XXXXX=============


