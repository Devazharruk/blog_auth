import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import authroutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use("/api/auth", authroutes);

connectDB();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
