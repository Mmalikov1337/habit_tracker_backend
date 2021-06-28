import { NextFunction, Response, Request } from "express";
import TokenPayloadDTO from "../DTO/TokenPayloadDTO";
import ApiError from "../errors/ApiError";
import tokenService from "../services/tokenService";
import userService from "../services/userService";
import db from "./../Database";

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
	
	async login(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;
		try {
			const userData = await userService.loginUser(email, password);
			res.cookie("refreshToken", userData.refresh, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.status(201).json(userData);
		} catch (e) {
			return next(ApiError.badRequest(e.message));
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const refreshToken = req.cookies.refreshToken;
			await userService.logoutUser(refreshToken);
			return res.status(201).json({ message: "logged out" });
		} catch (e) {
			return next(ApiError.badRequest(e.message));
		}
	}

	async refreshTokens(req: Request, res: Response, next: NextFunction) {
		try {
			const refreshToken = req.cookies.refreshToken;
			const userData = tokenService.verifyFerfeshToken(refreshToken);
			const dbToken = await tokenService.findRefreshToken(refreshToken); //токен есть => объект из бд. Нет => undefined
			console.log("userData", userData);
			if (!userData || !dbToken) {
				return next(ApiError.badRequest("Invalid refresh token"));
			}
			const payload = new TokenPayloadDTO(userData.id).toPlainObject();
			const tokens = tokenService.generateTokens(payload);
			const d = await db.saveToken(userData.id, tokens.refresh);
			res.cookie("refreshToken", tokens.refresh, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.json({ ...tokens, userId: payload.id });
		} catch (e) {
			return next(ApiError.badRequest(e.message));
		}
	}
}

export default new UserController();
