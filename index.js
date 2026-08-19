import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", routes);

connectDB();

const port = 3000;
app.listen(port, () => {
  console.log("server is running");
});
