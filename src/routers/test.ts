import express from "express";
import authorizationHandler from "../middlewares/authorizationHandler";
import db from "./../Database";
const testRoute = express.Router();

testRoute.get("/execute-any", authorizationHandler, async (req, res, next) => {
	await db.executeAnyCommand(req.body.command, []);
    return res.status(201).json({message:"OK"})
});

export default testRoute;
