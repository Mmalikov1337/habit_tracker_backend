import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ApiError from "../errors/ApiError";
import db from "./../Database";
import TokenPayloadDTO from "../DTO/TokenPayloadDTO";

dotenv.config();

interface IgenerateTokens {
	access: string;
	refresh: string;
}

interface IverifyFerfeshToken {
	id: number;
	iat: number;
	exp: number;
}

class TokenService {
	generateTokens(data: any): IgenerateTokens {
		try {
			const accessKey = process.env.ACCESS_TOKEN_KEY as string;
			const refreshsKey = process.env.REFRESH_TOKEN_KEY as string;
			const access = jwt.sign(data, accessKey, { expiresIn: "10m" });
			const refresh = jwt.sign(data, refreshsKey, { expiresIn: "30d" });
			return {
				access,
				refresh,
			};
		} catch (e) {
			throw new ApiError(500, "Error in TokenService generateTokens");
		}
	}

	verifyFerfeshToken(token: string): IverifyFerfeshToken | null {
		try {
			const userData = jwt.verify(token, process.env.REFRESH_TOKEN_KEY as string);
			console.log(userData);
			return userData as IverifyFerfeshToken;
			// return new TokenPayloadDTO(Number(userData.id));
		} catch (e) {
			console.log(e.message, e.name, e.name == "TokenExpiredError");
			return null;
		}
	}
	async findRefreshToken(refreshToken: string) {
		return await db.findRefreshToken(refreshToken);
	}
}

export default new TokenService();
