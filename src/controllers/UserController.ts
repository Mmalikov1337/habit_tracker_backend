import { NextFunction, Response, Request } from "express";
import TokenPayloadDTO from "../DTO/TokenPayloadDTO";
import UserDTO from "../DTO/UserDTO";
import ClientError from "../errors/ClientError";
import tokenService from "../services/tokenService";
import userService from "../services/userService";
import db from "./../Database";

class UserController {
	async register(req: Request, res: Response, next: NextFunction) {
		const { email, name, password, bio } = req.body;

		try {
			const userData = await userService.registerUser(email, name, password, bio);
			res.cookie("refreshToken", userData.refresh, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.status(201).json(userData);
		} catch (e) {
			return next(ClientError.badRequest(e.message));
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;
		// console.log(email, password);

		try {
			const userData = await userService.loginUser(email, password);
			res.cookie("refreshToken", userData.refresh, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.status(201).json(userData);
		} catch (e) {
			return next(ClientError.badRequest(e.message));
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const refreshToken = req.cookies.refreshToken;
			await userService.logoutUser(refreshToken);
			res.clearCookie("refreshToken")
			return res.status(200).json({ message: "logged out" });
		} catch (e) {
			return next(ClientError.badRequest(e.message));
		}
	}

	async refreshTokens(req: Request, res: Response, next: NextFunction) {
		try {
			const refreshToken = req.cookies.refreshToken;
			const userData = tokenService.verifyFerfeshToken(refreshToken);
			const dbToken = await tokenService.findRefreshToken(refreshToken); //токен есть => объект из бд. Нет => undefined
			// console.log("FINAL PAYLOAD >>>", final,"<<<");
			// console.log("3",{dbToken},{refreshToken});

			// console.log("userData", userData);
			if (!userData || !dbToken) {
				return next(ClientError.badRequest("Invalid refresh token"));
			}
			// console.log("2");
			
			const payload = new TokenPayloadDTO(new UserDTO(userData)).toPlainObject();
			const tokens = tokenService.generateTokens(payload);
			const d = await db.saveToken(Number(userData.id), tokens.refresh);
			// console.log("1");
			res.cookie("refreshToken", tokens.refresh, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			const final = { ...tokens, userData: payload };
			// console.log("FINAL PAYLOAD >>>", final,"<<<");

			res.json(final);
		} catch (e) {
			return next(ClientError.badRequest(e.message));
		}
	}
}

export default new UserController();
