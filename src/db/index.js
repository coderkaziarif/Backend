import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined in environment variables");
    }
    const connectionInstane = await mongoose.connect(process.env.MONGO_URI, {
      dbName: DB_NAME,
      //~ old code no need to use this 2 line......
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(
      `\n Mongo DB Connetd !! DB HOST : ${connectionInstane.connection.host}`
    );
  } catch (error) {
    console.log(`Mongo DB connection Failed:`, error);
    process.exit(1);
  }
};

export default connectDB;
