import express from "express";
import db from "./Database";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserController from "./controllers/UserController";

dotenv.config();

const auth = express.Router();

auth.post("/register", UserController.register);

auth.post("/login", UserController.login);

export default auth;
