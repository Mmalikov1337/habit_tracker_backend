import mysql, { Connection } from "mysql2/promise";
// import dotenv from "dotenv";
import UserDTO from "./DTO/UserDTO";
import ApiError from "./errors/ApiError";
import config from "./config";

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
			throw new ApiError(500, "Error in Database, addUser");
		}
	}

	async getUserByEmailAndPasword(email: string, password: string): Promise<UserDTO> {
		try {
			const [userData]: [mysql.RowDataPacket[], any] = await (
				await this.conn
			).query("SELECT * FROM users WHERE email=? and password=?", [email, password]);
			return new UserDTO(userData[0]);
		} catch (e) {
			throw new ApiError(500, "Error in Database, getUserByEmailAndPasword");
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
}

export default new Database();
