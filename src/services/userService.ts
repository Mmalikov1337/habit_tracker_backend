import db from "../Database";
import ClientError from "../errors/ClientError";
import tokenService from "./tokenService";
import TokenPayloadDTO from "../DTO/TokenPayloadDTO";
import UserDTO from "../DTO/UserDTO";

interface IAuthUserData {
	access: string;
	refresh: string;
	userData:TokenPayloadDTO;
}

class UserService {
	async registerUser(
		email: string,
		name: string,
		password: string,
		bio: string
	): Promise<IAuthUserData> {
		try {
			const userData = await db.getUserByEmail(email);
			if (userData) {
				throw ClientError.badRequest(`User with email (${email}) already exists.`);
			}
			const userId = await db.addUser(email, name, password, bio);
			const payload = new TokenPayloadDTO(new UserDTO({ id: userId, email, name, password, bio }));
			const tokens = tokenService.generateTokens(payload.toPlainObject());
			await db.saveToken(userId, tokens.refresh);
			return { ...tokens, userData:payload };
		} catch (e) {
			throw e;
		}
	}

	async logoutUser(refreshToken: string) {
		try {
			if (!refreshToken) {
				throw ClientError.badRequest("RefreshToken is null.");
			}
			const dbRefreshToken = await db.findRefreshToken(refreshToken);
			if (!dbRefreshToken) {
				throw ClientError.badRequest("RefreshToken not found.");
			}
			await db.deleteRefreshToken(refreshToken);
		} catch (e) {
			throw e;
		}
	}

	async loginUser(email: string, password: string):Promise<IAuthUserData> {
		try {
			const user = await db.getUserByEmailAndPasword(email, password);
			if (!user) {
				throw ClientError.badRequest("Failed to login.");
			}
			if (!user.id) {
				throw ClientError.badRequest("User must have id.");
			}
			const payload = new TokenPayloadDTO(user);
			const tokens = tokenService.generateTokens(payload.toPlainObject());
			db.saveToken(Number(user.id), tokens.refresh);
			return { ...tokens, userData:payload };
		} catch (e) {
			throw e;
		}
	}
	async checkUserPermisstion(
		permissionLevel: number,
		userDataVerified: TokenPayloadDTO
	): Promise<Boolean> {
		try {
			const dbUserData = await db.getUserDataByParam("id", [userDataVerified.id!!]);
			// console.log("dbUserData", dbUserData);
			if (!dbUserData) {
				throw ClientError.forbidden("User not found.");
			}
			if (!dbUserData.permission_lvl) {
				throw ClientError.forbidden("User dont have permissions.");
			}
			return dbUserData.permission_lvl >= permissionLevel;
		} catch (e) {
			throw e;
		}
	}
}

export default new UserService();
