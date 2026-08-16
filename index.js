import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./routes/index.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', routes);

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
