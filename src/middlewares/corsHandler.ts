import { NextFunction, Response, Request } from "express";
import config from "./../config";

export default function corsHandler(req: Request, res: Response, next: NextFunction) {
	try {
		res.setHeader("Access-Control-Allow-Origin", config.frontendAddress ?? "");
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATH, OPTIONS");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		return next();
	} catch (e) {
		next(e);
	}
}
