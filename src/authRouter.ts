import express from "express";
import db from "./Database";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserController from "./controllers/UserController";
dotenv.config();

const auth = express.Router();

auth.post("/register", UserController.register);

auth.post("/login", async (req, res, next) => {
	console.log(req.body, req.path);
	const { username, password } = req.body;
	const userData = await db.getUserData("name", username);
	if (!userData) {
		console.log(`Credentials are wrong`);
		return res.status(401).json({ error: "Credentials are wrong (???)" });
	}
	const token = jwt.sign({ id: userData!!.id }, process.env.ACCESS_TOKEN_KEY as string, {
		expiresIn: "2d",
	});

	return res.status(222).json(token);
});

export default auth;
