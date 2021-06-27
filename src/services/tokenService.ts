import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ApiError from "../errors/ApiError";

dotenv.config();

interface IgenerateTokens {
	access: string;
	refresh: string;
}

class TokenService {
	generateTokens(data: any): IgenerateTokens {
		try {
			const accessKey = process.env.ACCESS_TOKEN_KEY as string;
			const refreshsKey = process.env.REFRESH_TOKEN_KEY as string;
			const access = jwt.sign(data, accessKey, { expiresIn: "1m" });
			const refresh = jwt.sign(data, refreshsKey, { expiresIn: "2m" });
			return {
				access,
				refresh,
			};
		} catch (e) {
			throw new ApiError(500, "Error in TokenService");
		}
	}
}

export default new TokenService();
