import express from "express";
import authRouter from "./authRouter";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

const PORT = process.env.PORT ?? 5000;

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server started on ${PORT}`));
    }
    catch (e) {
        console.log("Server error", e.type, e.message);
    }
}

start()