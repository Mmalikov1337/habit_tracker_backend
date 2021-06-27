import db from "../Database";
import ApiError from "../errors/ApiError";
import tokenService from "./tokenService";

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

			const payload = {
				id: userId,
			};

			const tokens = tokenService.generateTokens(payload);

			await db.saveToken(userId, tokens.refresh);

			return { ...tokens, userId };
		} catch (e) {
			throw e;
		}
	}
}

export default new UserService();
