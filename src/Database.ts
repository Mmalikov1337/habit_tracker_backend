import mysql, { Connection } from "mysql2/promise";
import dotenv from "dotenv";
import UserDTO from "./UserDTO";

dotenv.config();

// const dbConnection = mysql.createConnection({
// 	host: process.env.host,
// 	user: process.env.user,
// 	password: process.env.password,
// 	database: process.env.database
// });

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

	async getUserIdByName(username: string): Promise<number> {
		const [rows]: [mysql.RowDataPacket[], any] = await (
			await this.conn
		).query("SELECT * FROM users WHERE name=?", [username]);
		if (rows[0]) {
			return rows[0].id;
		}
		return -1;
	}

	async getUserIdByEmail(email: string): Promise<number> {
		const [rows]: [mysql.RowDataPacket[], any] = await (
			await this.conn
		).query("SELECT * FROM users WHERE mail=?", [email]);
		if (rows[0]) {
			return rows[0].id;
		}
		return -1;
	}

	async registerUser(
		email: string,
		username: string,
		password: string,
		bio: string
	): Promise<number> {
		// -> id добавленного юзера
		console.log(arguments);

		const a: any = await (
			await this.conn
		).execute("INSERT INTO users (mail, name, password, bio) VALUES (?, ?, ?, ?)", [
			email,
			username,
			password,
			bio,
		]);
		console.log(a[0].insertId);
		return a[0].insertId;
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
	async executeAnyCommand(command: string, args: Array<any>) {
		console.log(arguments);

		(await this.conn).execute(command, args);
	}
}

export default new Database();
