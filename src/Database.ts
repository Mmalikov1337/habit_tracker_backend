import mysql, { Connection } from "mysql2/promise";
import dotenv from "dotenv";
import UserDTO from "./DTO/UserDTO";
import ApiError from "./errors/ApiError";

dotenv.config();

class Database {
	conn: Promise<Connection>;

	constructor() {
		this.conn = mysql.createConnection({
			host: process.env.host,
			user: process.env.user,
			password: process.env.password,
			database: process.env.database,
		});
	}

	async getUserIdByEmail(email: string): Promise<UserDTO | null> {
		const [rows]: [mysql.RowDataPacket[], any] = await (
			await this.conn
		).query("SELECT * FROM users WHERE mail=?", [email]);
		if (rows[0]) {
			return new UserDTO(rows[0]);
		}
		return null;
	}

	async addUser(email: string, username: string, password: string, bio: string): Promise<number> {
		try {
			const a: any = await (
				await this.conn
			).execute("INSERT INTO users (mail, name, password, bio) VALUES (?, ?, ?, ?)", [
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

	async getUserByMailAndPasword(email: string, password: string): Promise<UserDTO> {
		try {
			const [userData]: [mysql.RowDataPacket[], any] = await (
				await this.conn
			).query("SELECT * FROM users WHERE mail=? and password=?", [email, password]);
			return new UserDTO(userData[0]);
		} catch (e) {
			throw new ApiError(500, "Error in Database, getUserByMailAndPasword");
		}
	}

	async getUserData(param: string, userId: number): Promise<UserDTO | null> {
		const [rows]: [mysql.RowDataPacket[], any] = await (
			await this.conn
		).query(`SELECT * FROM users WHERE ${param}=?`, [userId]);
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
			// console.log(
			// 	">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>=",
			// 	rows
			// );
			return rows[0]
		} catch (e) {
			console.log("db findRefreshToken");
			
		}
	}
	async executeAnyCommand(command: string, args: Array<any>) {
		console.log(arguments);
		(await this.conn).execute(command, args);
	}
}

export default new Database();
