import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
import config from "../config";
import ApiError from "../errors/ApiError";
import db from "../Database";
import TokenPayloadDTO from "../DTO/TokenPayloadDTO";
// import TokenPayloadDTO from "../DTO/TokenPayloadDTO";

// dotenv.config();

// interface IgenerateTokens {
// 	access: string;
// 	refresh: string;
// }

// interface IverifyToken extends TokenPayloadDTO {
// 	// id: number;
// 	iat: number;
// 	exp: number;
// }

class HabitService {
	async getHabits(
		userDataVerified: TokenPayloadDTO,
		habitOptions: [{ value: string; option: string }] | null
	) {
		try {
			if (!habitOptions) {
				return await db.getHabits(userDataVerified.id, null);
			}
			
			const values = habitOptions.reduce((acc, cur) => {
				return acc + cur.value + " = " + "?";
			}, " AND ");

			const options = habitOptions.map((it) => {
				return it.option;
			});

			const preparedHabitOptions = { values, options };

			return await db.getHabits(userDataVerified.id, preparedHabitOptions);
		} catch (e) {
			throw e;
		}
	}
}

export default new HabitService();
