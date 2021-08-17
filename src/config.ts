import dotenv from "dotenv";

dotenv.config();
// interface Iconfig {
// 	ACCESS_TOKEN_KEY: any;
// 	REFRESH_TOKEN_KEY: any;
// 	host: any;
// 	user: any;
// 	password: any;
// 	database: any;
// }
const config = {
	ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
	REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
	host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	database: process.env.database,
	PORT: process.env.PORT,
	frontendAddress: process.env.FRONTEND_ADDRESS,
};

export default config;
