import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import RequestExtended from "../extended/ResponseExtended";
import tokenService from "../services/tokenService";

function authentificationHandler(
	req: RequestExtended | Request,
	res: Response,
	next: NextFunction
) {
	try {
		const authHeader = req.headers.authorization;
		// console.log("req.headers.authorization", authHeader);
		if (!authHeader) {
			throw ApiError.notAuthorizated("Authentification header is empty.");
		}
		const [authType, accessToken] = authHeader.split(" ");
		// console.log("authType", authType);
		if (authType !== "Bearer") {
			throw ApiError.notAuthorizated("Wrong authentification type.");
		}
		if (!accessToken) {
			throw ApiError.notAuthorizated("Access Token field is empty.");
		}
		const userDataVerified = tokenService.verifyAccessToken(accessToken);
		if (!userDataVerified) {
			throw ApiError.notAuthorizated("Access token is not valid.");
		}

		(req as RequestExtended).userDataVerified = userDataVerified;
		return next();
	} catch (e) {
		return next(e);
	}
}

export default authentificationHandler;
