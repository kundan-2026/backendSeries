// require("dotenv").config();

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(
      "Error in index.js files || MONGODB connection Failed !!!",
      err
    );
  });

// 2nd ways to connect the data bases
/*
import express from "express";
const app = express()(
  // function connectDB() {}

  // connectDB();

  async () => {
    try {
      await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

      app.on("error", (error) => {
        console.log("Error", error);
        throw error;
      });

      app.listen(process.env.PORT, () => {
        console.log(`App is listening on port ${process.env.PORT}`);
      });
    } catch (error) {
      console.log("ERROR", error);
    }
  }
)();

*/
