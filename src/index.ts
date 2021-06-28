import express from "express";
import authRouter from "./routers/authRouter";
import test from "./routers/test";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/test", test);
app.use(errorHandler);

const PORT = process.env.PORT ?? 5000;

const start = () => {
	try {
		app.listen(PORT, () => console.log(`Server started on ${PORT}`));
	} catch (e) {
		console.log("Server error", e.type, e.message);
	}
};

start();
