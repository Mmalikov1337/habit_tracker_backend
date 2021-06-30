import mysql, { Connection } from "mysql2/promise";
// import dotenv from "dotenv";
import UserDTO from "./DTO/UserDTO";
import ClientError from "./errors/ApiError";
import config from "./config";
import TokenPayloadDTO from "./DTO/TokenPayloadDTO";
import HabitDTO from "./DTO/HabitDTO";

class Database {
	conn: Promise<Connection>;

	constructor() {
		this.conn = mysql.createConnection({
			host: config.host,
			user: config.user,
			password: config.password,
			database: config.database,
		});
	}

	async getUserIdByEmail(email: string): Promise<UserDTO | null> {
		const [rows]: [mysql.RowDataPacket[], any] = await (
			await this.conn
		).query("SELECT * FROM users WHERE email=?", [email]);
		if (rows[0]) {
			return new UserDTO(rows[0]);
		}
		return null;
	}

	async addUser(email: string, username: string, password: string, bio: string): Promise<number> {
		try {
			const a: any = await (
				await this.conn
			).execute("INSERT INTO users (email, name, password, bio) VALUES (?, ?, ?, ?)", [
				email,
				username,
				password,
				bio,
			]);
			return a[0].insertId;
		} catch (e) {
			throw new ClientError(500, "Error in Database, addUser");
		}
	}

	async getUserByEmailAndPasword(email: string, password: string): Promise<UserDTO> {
		try {
			const [userData]: [mysql.RowDataPacket[], any] = await (
				await this.conn
			).query("SELECT * FROM users WHERE email=? and password=?", [email, password]);
			return new UserDTO(userData[0]);
		} catch (e) {
			throw new ClientError(500, "Error in Database, getUserByEmailAndPasword");
		}
	}

	async getUserDataByParam(param: string, userId: Array<number> = []): Promise<UserDTO | null> {
		const [rows]: [mysql.RowDataPacket[], any] = await (
			await this.conn
		).query(`SELECT * FROM users WHERE ${param}=?`, userId);
		if (rows[0]) {
			return new UserDTO(rows[0]);
		}
		return null;
	}

	async saveToken(userId: number, refreshToken: string): Promise<number> {
		try {
			const [rows]: [mysql.RowDataPacket[], any] = await (
				await this.conn
			).query("SELECT * FROM users_tokens WHERE user_id=?", [userId]); //получение токена по id юзера

			if (rows[0]) {
				// Если запись уже есть
				const a: any = await (
					await this.conn
				).execute("UPDATE users_tokens SET refreshToken=? WHERE user_id=?", [
					//обновление токена
					refreshToken,
					userId,
				]);
				return a[0].insertId;
			}

			const a: any = await (
				await this.conn
			).execute("INSERT INTO users_tokens (user_id, refreshToken) VALUES (?, ?)", [
				userId,
				refreshToken,
			]);
			return a[0].insertId;
		} catch (e) {
			return -1;
		}
	}

	async findRefreshToken(refreshToken: string) {
		try {
			const [rows]: [mysql.RowDataPacket[], any] = await (
				await this.conn
			).query("SELECT * FROM users_tokens WHERE refreshToken=?", [refreshToken]);
			return rows[0];
		} catch (e) {
			console.log("db findRefreshToken");
			throw e;
		}
	}

	async deleteRefreshToken(refreshToken: string) {
		try {
			await (
				await this.conn
			).execute("DELETE FROM users_tokens WHERE refreshToken=?", [refreshToken]);
		} catch (e) {
			console.log("db deleteRefreshToken");
			throw e;
		}
	}

	async executeAnyCommand(command: string, args: Array<any>) {
		// console.log(arguments);
		const [a] = await (await this.conn).execute(command, args);
		// console.log("ADDAASDASDASDASDASD", a, "___");
	}

	async getHabits(
		userId: number,
		preparedHabitOptions: { values: string; options: Array<string> } | null
	): Promise<Array<HabitDTO>> {
		try {
			const { values, options } = preparedHabitOptions ?? {};
			const queryString = values
				? `SELECT * FROM habits WHERE user_id=? ${values}`
				: `SELECT * FROM habits WHERE user_id=?`;
			const queryOptions = options ? [userId, ...options] : [userId];

			const [rows]: [mysql.RowDataPacket[], any] = await (
				await this.conn
			).query(queryString, queryOptions);
			return rows.map((it) => {
				return new HabitDTO(it);
			});
		} catch (e) {
			console.log("db getHabits");
			throw e;
		}
	}
	async createHabit(newHabit: HabitDTO): Promise<number> {
		try {
			const params = [
				newHabit.user_id,
				newHabit.title,
				newHabit.priority,
				newHabit.difficulty,
				newHabit.notes,
				newHabit.is_healfully,
				newHabit.value,
				newHabit.photo,
			];
			const a: any = await (
				await this.conn
			).execute(
				"INSERT INTO habits (user_id,title,priority,difficulty,notes,is_healfully,value,photo) VALUES (?,?,?,?,?,?,?,?)",
				params
			);
			return a[0].insertId;
		} catch (e) {
			console.log("db createHabit");
			throw e;
		}
	}
	async verifyHabit(newHabit: HabitDTO, userDataVerified: TokenPayloadDTO): Promise<boolean> {
		// свою ли привычку меняет пользователь
		try {
			const [rows]: [mysql.RowDataPacket[], any] = await (
				await this.conn
			).query("SELECT * FROM habits WHERE user_id=? AND id=?", [
				userDataVerified.id,
				newHabit.id,
			]);
			// console.log("verifyHabit", rows[0]);

			return !!rows[0]; //Если есть то ок, нету - неок
		} catch (e) {
			console.log("db verifyHabit");
			throw e;
		}
	}
	async updateHabit(newHabit: HabitDTO): Promise<boolean> {
		try {
			const params = [
				newHabit.user_id,
				newHabit.title,
				newHabit.priority,
				newHabit.difficulty,
				newHabit.notes,
				newHabit.is_healfully,
				newHabit.value,
				newHabit.photo,
				newHabit.id,
			];
			const a: any = await (
				await this.conn
			).execute(
				"UPDATE habits SET user_id=?, title=?, priority=?, difficulty=?, notes=?, is_healfully=?, value=?, photo=? WHERE id=?;",
				params
			);
			// console.log("updateHabit", a[0]);

			return !!a[0];
		} catch (e) {
			console.log("db updateHabit");
			throw e;
		}
	}
}

export default new Database();
