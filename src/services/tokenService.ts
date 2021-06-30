import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
import config from "../config";
import ClientError from "../errors/ApiError";
import db from "../Database";
import TokenPayloadDTO from "../DTO/TokenPayloadDTO";
// import TokenPayloadDTO from "../DTO/TokenPayloadDTO";

// dotenv.config();

interface IgenerateTokens {
	access: string;
	refresh: string;
}

interface IverifyToken extends TokenPayloadDTO {
	// id: number;
	iat: number;
	exp: number;
}

class TokenService {
	generateTokens(data: any): IgenerateTokens {
		try {
			const accessKey = config.ACCESS_TOKEN_KEY as string;
			const refreshsKey = config.REFRESH_TOKEN_KEY as string;
			const access = jwt.sign(data, accessKey, { expiresIn: "10h" });
			const refresh = jwt.sign(data, refreshsKey, { expiresIn: "30d" });
			return {
				access,
				refresh,
			};
		} catch (e) {
			throw new ClientError(500, "Error in TokenService generateTokens");
		}
	}

	verifyFerfeshToken(token: string): IverifyToken | null {
		try {
			const userData = jwt.verify(token, config.REFRESH_TOKEN_KEY as string);
			// console.log(userData);
			return userData as IverifyToken;
		} catch (e) {
			return null;
		}
	}
	
	verifyAccessToken(token: string): IverifyToken | null {
		try {
			const userData = jwt.verify(token, config.ACCESS_TOKEN_KEY as string);
			// console.log(userData);
			return userData as IverifyToken;
		} catch (e) {
			return null;
		}
	}

	async findRefreshToken(refreshToken: string) {
		return await db.findRefreshToken(refreshToken);
	}
}

export default new TokenService();
