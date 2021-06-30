import express from "express";
import HabitController from "../controllers/HabitController";
import authentificationHandler from "../middlewares/authentificationHandler";
import authorizationHandler from "../middlewares/authorizationHandler";

const habit = express.Router();

habit.get("/", authentificationHandler, authorizationHandler(1), HabitController.getHabits);

habit.post("/", authentificationHandler, authorizationHandler(1), HabitController.createHabit);

habit.put("/", authentificationHandler, authorizationHandler(1), HabitController.updateHabit);

export default habit;
