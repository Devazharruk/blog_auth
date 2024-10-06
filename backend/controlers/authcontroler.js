import bcrypt from "bcryptjs";
import User from "../models/User.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signup = async (req, res) => {
  const { username, fullname, email, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        message: "Username already exists",
        success: false,
      });
    }

    const emailtaken = await User.findOne({ email }); // Add 'await' here
    if (emailtaken) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      fullname,
      email,
      password: hashed,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    console.log("Internal server error:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};
