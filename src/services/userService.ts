import db from "../Database";
import ApiError from "../errors/ApiError";
import tokenService from "./tokenService";
import TokenPayloadDTO from "./../DTO/TokenPayloadDTO";
interface IregisterUser {
	access: string;
	refresh: string;
	userId: number;
}

class UserService {
	async registerUser(
		email: string,
		username: string,
		password: string,
		bio: string
	): Promise<IregisterUser> {
		try {
			const userData = await db.getUserIdByEmail(email);
			if (userData) {
				throw ApiError.badRequest(`User with email (${email}) already exists`);
			}
			const userId = await db.addUser(email, username, password, bio);
			const payload = new TokenPayloadDTO(userId).toPlainObject();
			const tokens = tokenService.generateTokens(payload);
			await db.saveToken(userId, tokens.refresh);
			return { ...tokens, userId };
		} catch (e) {
			throw e;
		}
	}
	async loginUser(email: string, password: string) {
		try {
			const user = await db.getUserByMailAndPasword(email, password);
			if (!user) {
				throw ApiError.badRequest("Failed to login");
			}
			if (!user.id) {
				throw ApiError.badRequest("User must have id");
			}
			const payload = new TokenPayloadDTO(Number(user.id)).toPlainObject();
			const tokens = tokenService.generateTokens(payload);
			db.saveToken(Number(user.id), tokens.refresh);
			return { ...tokens, userId: user.id };
		} catch (e) {
			throw e;
		}
	}
}

export default new UserService();
