import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import tokenService from "../services/tokenService";

function authorizationHandler(req: Request, res: Response, next: NextFunction) {
	try {
		const authHeader = req.headers.authorization;
		// console.log("req.headers.authorization", authHeader);
		if (!authHeader) {
			throw ApiError.notAuthorizated("Authorization header is empty.");
		}
		const [authType, accessToken] = authHeader.split(" ");
		// console.log("authType", authType);
		if (authType !== "Bearer") {
			throw ApiError.notAuthorizated("Wrong authorization type.");
		}
		if (!accessToken) {
			throw ApiError.notAuthorizated("Access Token field is empty.");
		}
		const userData = tokenService.verifyAccessToken(accessToken);
		if (!userData) {
			throw ApiError.notAuthorizated("Access token is not valid.");
		}
		next();
	} catch (e) {
		return next(e);
	}
}

export default authorizationHandler;
