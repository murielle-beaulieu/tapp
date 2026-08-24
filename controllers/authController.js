import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

// user sign up
export const userSignUp = async (req, res) => {
  let { email, password, username } = req.body;
  try {
    password = await bcrypt.hash(password, 10);
  } catch {
    console.log(err);
  }
  const newUser = User({ email, password, username });

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
      { expiresIn: "30m" },
    );
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({
    success: true,
    data: {
      token: token,
    },
  });
};

// user sign in
export const userSignIn = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }

  let token;

  try {
    const match = await bcrypt.compare(password, existingUser.password);

    if (match) {
      token = jwt.sign(
        {
          id: existingUser._id,
        },
        `${process.env.JWT_SECRETKEY}`,
        { expiresIn: "30m" },
      );

      return res.status(200).json({
        success: true,
        data: {
          token: token,
        },
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "wrong credentials",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
