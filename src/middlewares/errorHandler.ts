import { NextFunction, Request, Response } from "express";

import ApiError from "./../errors/ApiError";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error("err.name: (", err.name, ")", "message: (", err.message, ")");
	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message, errors: err.errors });
	}
	return res.status(500).json({ message: "Server error" });
};

export default errorHandler;
