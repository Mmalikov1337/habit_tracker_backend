import { NextFunction, Response, Request } from "express";
import ApiError from "../errors/ApiError";
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
				throw ApiError.badRequest("Failed to get habits");
			}
			return res.status(200).json(dbHabits);
		} catch (e) {
			return next(ApiError.badRequest(e.message));
		}
	}
}

export default new HabitController();
