import express, { NextFunction, Response, Request } from "express";
import RequestExtended from "../types/ResponseExtended";
import authentificationHandler from "../middlewares/authentificationHandler";
import authorizationHandler from "../middlewares/authorizationHandler";
import db from "./../Database";

const testRoute = express.Router();

testRoute.get(
	"/execute-any",
	authentificationHandler,
	authorizationHandler(2),
	async (req: RequestExtended | Request, res: Response, next: NextFunction) => {
		await db.executeAnyCommand(req.body.command, []);
		return res.status(201).json({ message: "OK" });
	}
);

export default testRoute;
