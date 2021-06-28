import express from "express";
import dotenv from "dotenv";
import UserController from "./controllers/UserController";

dotenv.config();

const auth = express.Router();

auth.post("/register", UserController.register);

auth.post("/login", UserController.login);

auth.post("/logout", UserController.logout);

auth.post("/refresh", UserController.refreshTokens);

export default auth;
