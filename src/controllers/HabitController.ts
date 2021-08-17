import { NextFunction, Response, Request } from "express";
import HabitDTO from "../DTO/HabitDTO";
import ClientError from "../errors/ClientError";
import RequestExtended from "../extended/ResponseExtended";
import HabitService from "../services/HabitService";

class HabitController {
	async getHabits(req: RequestExtended | Request, res: Response, next: NextFunction) {
		//только привычки конкретного пользователя (одного, данные которого в поле userDataVerified)
		try {
			const userDataVerified = (req as RequestExtended).userDataVerified;

			const habitOptions: [{ value: string; option: string }] = req.body.habitOptions;

			const dbHabits = await HabitService.getHabits(userDataVerified, habitOptions);

			if (!dbHabits) {
				throw ClientError.badRequest("Failed to get habits");
			}
			return res.status(200).json(dbHabits);
		} catch (e) {
			return next(ClientError.badRequest(e.message));
		}
	}
	async createHabit(req: RequestExtended | Request, res: Response, next: NextFunction) {
		try {
			const userDataVerified = (req as RequestExtended).userDataVerified;
			const newHabit: HabitDTO = new HabitDTO(req.body.habit);
			if (!newHabit) {
				throw ClientError.badRequest("Wrong habit.");
			}
			newHabit.user_id = userDataVerified.id;
			const insertionId = await HabitService.createHabit(newHabit);
			res.status(200).json({ id: insertionId });
		} catch (e) {
			return next(ClientError.badRequest(e.message));
		}
	}
	async updateHabit(req: RequestExtended | Request, res: Response, next: NextFunction) {
		try {
			const userDataVerified = (req as RequestExtended).userDataVerified;
			const newHabit: HabitDTO = new HabitDTO(req.body.habit);

			if (!newHabit) {
				throw ClientError.badRequest("Wrong habit.");
			}
			const updationResult = await HabitService.updateHabit(newHabit, userDataVerified);
			if (!updationResult) {
				throw ClientError.badRequest("Habit updation error.");
			}
			res.status(200).json({ mesage: "OK" });
		} catch (e) {
			return next(ClientError.badRequest(e.message));
		}
	}
	async deleteHabit(req: RequestExtended | Request, res: Response, next: NextFunction) {
		try {
			const userDataVerified = (req as RequestExtended).userDataVerified;
			const habitId: number = Number(req.body.habitId);
			console.log(habitId);

			if (typeof habitId != "number" || isNaN(habitId)) {
				throw ClientError.badRequest("Wrong habit id");
			}
			const deletionResult = await HabitService.deleteHabit(habitId, userDataVerified);
			if (!deletionResult) {
				throw ClientError.badRequest("Habit updation error.");
			}
			res.status(200).json({ mesage: "OK" });
		} catch (e) {
			return next(ClientError.badRequest(e.message));
		}
	}
}

export default new HabitController();
