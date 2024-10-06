import express from "express";
import { signup } from "../controlers/authcontroler.js";

const router = express.Router();

router.post("/signup", signup);

export default router;
