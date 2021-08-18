import mysql, { Connection } from "mysql2/promise";
// import dotenv from "dotenv";
import UserDTO from "./DTO/UserDTO";
import ClientError from "./errors/ClientError";
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

	async getUserByEmail(email: string): Promise<UserDTO | null> {
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
			console.log(e.message);

			throw new ClientError(500, "Error in Database, addUser");
		}
	}

	async getUserByEmailAndPasword(email: string, password: string): Promise<UserDTO> {
		try {
			const [userData]: [mysql.RowDataPacket[], any] = await (
				await this.conn
			).query("SELECT * FROM users WHERE email=? and password=?", [email, password]);
			// console.log("userData", userData);

			return new UserDTO(userData[0]);
		} catch (e) {
			console.log(e.message, e.name);

			throw ClientError.notAuthorizated("User not found");
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
				// console.log("saveToken1",rows);
				
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
			// console.log("saveToken2",rows[0]);

			const a: any = await (
				await this.conn
			).execute("INSERT INTO users_tokens (user_id, refreshToken) VALUES (?, ?)", [
				userId,
				refreshToken,
			]);
			// console.log("saveToken3",a);
			
			return a[0].insertId;
		} catch (e) {
			console.log("db saveToken", e.message,e.name);
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

	async getHabits(userId: number, id?: number): Promise<Array<HabitDTO>> {
		try {
			const queryString = id
				? `SELECT * FROM habits WHERE user_id=? id=?`
				: `SELECT * FROM habits WHERE user_id=?`;
			const queryOptions = id ? [userId, id] : [userId];

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
	async verifyHabit(id: number, userDataVerified: TokenPayloadDTO): Promise<boolean> {
		// свою ли привычку меняет пользователь
		try {
			const [rows]: [mysql.RowDataPacket[], any] = await (
				await this.conn
			).query("SELECT * FROM habits WHERE user_id=? AND id=?", [userDataVerified.id, id]);
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
	async deleteHabit(habitId: number): Promise<boolean> {
		try {
			const a: any = await (await this.conn).execute("DELETE FROM habits WHERE id=?", [habitId]);
			// console.log("deleteHabit", a[0]);

			return !!a[0];
		} catch (e) {
			console.log("db deleteHabit");
			throw e;
		}
	}
}

export default new Database();
