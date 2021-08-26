import { NextFunction, Request, Response } from "express";
import ClientError from "../errors/ClientError";
import RequestExtended from "../types/ResponseExtended";
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
			throw ClientError.notAuthorizated("Authentification header is empty.");
		}
		const [authType, accessToken] = authHeader.split(" ");
		// console.log("authType", authType);
		if (authType !== "Bearer") {
			throw ClientError.notAuthorizated("Wrong authentification type.");
		}
		if (!accessToken) {
			throw ClientError.notAuthorizated("Access Token field is empty.");
		}
		const userDataVerified = tokenService.verifyAccessToken(accessToken);
		if (!userDataVerified) {
			throw ClientError.authenticationTimeout("Access token is not valid.");
		}

		(req as RequestExtended).userDataVerified = userDataVerified;
		return next();
	} catch (e) {
		return next(e);
	}
}

export default authentificationHandler;
