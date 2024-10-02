import express from "express";
import { signupvalidation,signinvalidation } from "../middlewares/authvalidation.js";
import { signup,login } from "../controlers/authcontroler.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", signupvalidation, signup);

AuthRouter.post("/login", signinvalidation, login);

export default AuthRouter;
