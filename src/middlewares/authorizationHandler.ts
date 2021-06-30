import { NextFunction, Response, Request } from "express";
import ClientError from "../errors/ApiError";
import RequestExtended from "../extended/ResponseExtended";
import userService from "../services/userService";

function authorizationHandler(permissionLevel: number) {
	return async function (req: RequestExtended | Request, res: Response, next: NextFunction) {
		try {
			const userDataVerified = (req as RequestExtended).userDataVerified;
			if (!userDataVerified) {
				throw ClientError.forbidden("UserDataVerified is empty");
			}
			const dbUserData = await userService.checkUserPermisstion(
				permissionLevel,
				userDataVerified
			);
			if (!dbUserData) {
				throw ClientError.forbidden("Forbidden.");
			}
			return next();
		} catch (e) {
			return next(e);
		}
	};
}
export default authorizationHandler;
