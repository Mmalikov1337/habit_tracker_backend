import express from "express";
import { body } from "express-validator";
import UserController from "../controllers/UserController";
import validationHandler from "../middlewares/validationHandler";

const auth = express.Router();

auth.post(
	"/register",
	body("email").isEmail(),
	body("password").isLength({ min: 3, max: 32 }),
	validationHandler,
	UserController.register
);

auth.post("/login", UserController.login);

auth.post("/logout", UserController.logout);

auth.post("/refresh", UserController.refreshTokens);

export default auth;
