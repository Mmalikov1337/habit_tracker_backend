import { FilterFields } from "./../types/queries";
import { NextFunction, Response, Request } from "express";
import HabitDTO from "../DTO/HabitDTO";
import ClientError from "../errors/ClientError";
import RequestExtended from "../types/ResponseExtended";
import HabitService from "../services/HabitService";
import prepareQueryData from "../helpers/prepareQueryData";

class HabitController {
	async getHabits(req: RequestExtended | Request, res: Response, next: NextFunction) {
		//только привычки конкретного пользователя (одного, данные которого в поле userDataVerified)
		try {
			const habitId = req.params.id ? Number(req.params.id) : undefined;
			const userDataVerified = (req as RequestExtended).userDataVerified;
			const { filterData, paginationData } = prepareQueryData(req.query);
			console.log("filterData, paginationData", filterData, paginationData, "<<<");

			const dbHabits = await HabitService.getHabits(
				userDataVerified,
				habitId,
				filterData,
				paginationData
			);

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
			const habitId = req.params.id ? Number(req.params.id) : undefined;
			const userDataVerified = (req as RequestExtended).userDataVerified;
			const newHabit: HabitDTO = new HabitDTO(req.body.habit);
			if (!newHabit) {
				throw ClientError.badRequest("Wrong habit.");
			}
			if (newHabit.user_id !== userDataVerified.id) {
				console.log(
					"createHabit, newHabit.user_id !== userDataVerified.id",
					newHabit.user_id,
					userDataVerified.id
				);
				newHabit.user_id = userDataVerified.id;
			}
			const insertionId = await HabitService.createHabit(newHabit);
			res.status(200).json({ id: insertionId });
		} catch (e) {
			return next(ClientError.badRequest(e.message));
		}
	}
	async updateHabit(req: RequestExtended | Request, res: Response, next: NextFunction) {
		try {
			const habitId = req.params.id ? Number(req.params.id) : undefined;
			const userDataVerified = (req as RequestExtended).userDataVerified;
			const newHabit: HabitDTO = new HabitDTO(req.body.habit);

			if (!newHabit) {
				throw ClientError.badRequest("Wrong habit.");
			}
			if (newHabit.user_id !== userDataVerified.id) {
				console.log(
					"updateHabit, newHabit.user_id !== userDataVerified.id",
					newHabit.user_id,
					userDataVerified.id
				);
				newHabit.user_id = userDataVerified.id;
			}
			const updationResult = await HabitService.updateHabit(newHabit, userDataVerified);
			if (!updationResult) {
				throw ClientError.badRequest("Habit updation error.");
			}
			res.status(200).json(updationResult);
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
