import express from "express";
import authRouter from "./routers/authRouter";
import test from "./routers/test";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";
import habit from "./routers/habitRouter";
import { NextFunction, Response, Request } from "express";
import corsHandler from "./middlewares/corsHandler";
import config from "./config";

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(corsHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
	console.log("req.path", req.path);
	console.log("req.method", req.method);
	console.log("req.cookies", req.cookies);
	console.log("req.params", req.params);
	// console.log("req.headers", req.headers);
	console.log("req.body", req.body);
	return next()
});
app.use("/auth", authRouter);
app.use("/test", test);
app.use("/habit", habit);
app.use(errorHandler);

const PORT = config.PORT ?? 5000;

const start = () => {
	try {
		app.listen(PORT, () => console.log(`Server started on ${PORT}`));
	} catch (e) {
		console.log("Server error", e.type, e.message);
	}
};

start();
