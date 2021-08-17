import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ClientError from "../errors/ClientError";

const validationHandler = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return next(ClientError.badRequest("Validation error.", errors.array()));
	}
	next();
};

export default validationHandler;
