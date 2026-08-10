import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

mongoose
  .connect(
    `mongodb+srv://muriellebeaulieu19_db_user:${process.env.MONGODB_TAPP}@tapp-backend-db.qgliibo.mongodb.net/?appName=tapp-backend-db`,
  )
  .then(() => {
    console.log("Connected!");
    app.listen(port, () => {
      console.log("server is running");
    });
  })
  .catch((err) => console.log("Connection failed: " + err));
