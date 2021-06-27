import { NextFunction, Response, Request } from "express";
import ApiError from "../errors/ApiError";
import userService from "../services/userService";

class UserController {
	async register(req: Request, res: Response, next: NextFunction) {
		const { email, username, password, bio } = req.body;

		try {
			const userData = await userService.registerUser(email, username, password, bio);

			res.cookie("refreshToken", userData.refresh, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.status(201).json(userData);
		} catch (e) {
			return next(ApiError.badRequest(e.message));
		}
	}
}

export default new UserController();
