import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://muriellebeaulieu19_db_user:${process.env.MONGODB_TAPP}@tapp-backend-db.qgliibo.mongodb.net/?appName=tapp-backend-db`,
      )
  } catch (error) {
    console.log("Connection failed: " + err);
  }
};

export default connectDB;
