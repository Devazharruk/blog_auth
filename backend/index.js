import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./routes/authroute.js";
import connectDB from "./config/db.js";
import User from "./models/User.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://blog-auth-liart.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// create
app.use("/api/auth", AuthRouter);

// read
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update User
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Returns the updated document
      runValidators: true, // Ensure schema validation
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
