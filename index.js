import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
// import { Task } from "./schemas/task.schema";
import { Test } from "./schemas/test.schema.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

app.get("/api/tests", async (req, res) => {
   try {
    const tests = await Test.find({});
    res.status(200).json(tests);
    console.log(tests);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});


app.post('/api/test', async (req, res) => {
  try {
    const test = await Test.create(req.body);
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
})

// app.post('/api/tasks', async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(200).json(task);
//   } catch (err) {
//     res.status(500).json({message: err.message});
//   }
// })

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
