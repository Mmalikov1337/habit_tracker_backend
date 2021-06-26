import express from "express";
import db from "./Database";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = express.Router();

auth.post("/register", async (req, res, next) => {
	const { username, email, password, bio } = req.body;
	console.log(req.body, req.path);

	if ((await db.getUserIdByName(username)) > 0) {
		console.log(`USER WITH name ${username} ALREADY EXIST`);
		return res.status(401).json({ error: "Credentials are wrong (name)" }); //!!!
	}

	if ((await db.getUserIdByEmail(email)) > 0) {
		console.log(`USER WITH mail ${email} ALREADY EXIST`);
		return res.status(401).json({ error: "Credentials are wrong (email)" }); //!!!
	}

	const userId = await db.registerUser(email, username, password, bio);

	return res.status(201).json({ message: "registered" });
});
auth.post("/login", async (req, res, next) => {
	console.log(req.body, req.path);
	const { username, password } = req.body;
	const userData = await db.getUserData("name", username);
	if (!userData) {
		console.log(`Credentials are wrong`);
		return res.status(401).json({ error: "Credentials are wrong (???)" }); //!!!
	}
	const token = jwt.sign({ id: userData!!.id }, process.env.ACCESS_TOKEN_KEY as string, { expiresIn: "2d" });

	return res.status(222).json(token);
});
export default auth;
