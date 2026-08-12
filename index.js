import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
// import { Task } from "./schemas/task.schema";
import { Test } from "./schemas/test.schema.js";
import { User } from "./schemas/user.schema.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

// get all non-deleted
app.get("/api/tests", async (req, res) => {
  try {
    // const active = await Test.find({isCompleted: false});
    const active = await Test.find({isDeleted: false, isCompleted: false}).sort({createdAt: -1});
    res.status(200).json(active);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all deleted
app.get("/api/tests/deleted", async (req, res) => {
  try {
    const deleted = await Test.find({deleted: true});
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get test by user
app.get("/api/tests_by_owner/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const found = await User.findById(id);
    const ownedByUser = await Test.find({user: found.id});
    // console.log(res.owner);
    // const owner = await User.findById({id: test.userTest});
    res.status(200).json(ownedByUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one
app.get("/api/test/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const found = await Test.findById(id);
    res.status(200).json(found);
    console.log(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/tests", async (req, res) => {
  try {
    const test = await Test.create(req.body);
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/test_with_user", async (req, res) => {
  try {    
    const test = await Test.create(req.body);
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update
app.put("/api/test/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findByIdAndUpdate(id, req.body);

    if (!test) {
      res.status(404).json({message: "No match found"});
    }

    const updatedTest = await Test.findById(id);
    res.status(200).json(updatedTest);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// soft delete
app.delete("/api/test/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findByIdAndUpdate(id, req.body);

    if (!test) {
      res.status(404).json({message: "No match found"});
    }

    const deletedTest = await Test.findById(id);
    res.status(200).json(deletedTest);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
