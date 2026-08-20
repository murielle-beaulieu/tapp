import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { createUser } from "./userController.js";

// user sign up

export const userSignUp = async (req, res) => {
  const { userEmail, userPassword, username } = req.body;
  const newUser = User({ userEmail, userPassword, username });
  try {
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userID: newUser._id,
      },
      `${process.env.JWT_SECRETKEY}`,
      { expiresIn: "1h" },
    );
  } catch (error) {
    console.log(error);
  }
  res.status(201).json({
    success: true,
    data: {
      token: token,
    },
  });
};

// user sign in

export const userSignIn = async (req, res) => {
  const { userEmail, userPassword } = await req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ userEmail: userEmail });
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  if (!existingUser || existingUser.userPassword != userPassword) {
    const error = new Error("Email or Password is wrong");
  }
  let token;
  try {
    token = jwt.sign(
      {
        userID: existingUser._id,
      },
      `${process.env.JWT_SECRETKEY}`,
      { expiresIn: "1h" },
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
  }

  res.status(200).json({
    success: true,
    data: {
      token: token,
    },
  });
};

// user sign out
