import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error in index.js || MongoDB connection failed:", err);
  });

/* 
// Alternative way to connect DB and start server (if you want to try)

// import express from "express";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

// const app = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

//     app.on("error", (error) => {
//       console.error("Server error:", error);
//       throw error;
//     });

//     app.listen(PORT, () => {
//       console.log(`App is listening on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// })();
*/
