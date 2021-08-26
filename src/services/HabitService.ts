import { FilterFields } from "./../types/queries";
import ClientError from "../errors/ClientError";
import db from "../Database";
import TokenPayloadDTO from "../DTO/TokenPayloadDTO";
import HabitDTO from "../DTO/HabitDTO";
import getFilter from "../helpers/getFilter";
import isEmpty from "../helpers/isEmpty";

class HabitService {
	async getHabits(userDataVerified: TokenPayloadDTO, id?: number, filters?: any) {
		try {
			if (!userDataVerified.id) {
				throw ClientError.badRequest("Wrong id getHabits");
			}

			if (!isEmpty(filters)) {
				const filterString = "AND " + Object.keys(filters).map(getFilter).join(" AND "); // Формирование строки для фильтрации
				const filterValues = Object.values(filters); //аргументы для фильтрации
				return await db.getHabits(userDataVerified.id, id, filterString, filterValues);
			}
			return await db.getHabits(userDataVerified.id, id);
		} catch (e) {
			throw e;
		}
	}
	async createHabit(newHabit: HabitDTO) {
		try {
			return await db.createHabit(newHabit);
		} catch (e) {
			throw e;
		}
	}
	async updateHabit(newHabit: HabitDTO, userDataVerified: TokenPayloadDTO) {
		try {
			if (!newHabit.id) {
				throw ClientError.badRequest("Habit must have id.");
			}
			const isVerifyed = await db.verifyHabit(newHabit.id, userDataVerified);
			if (!isVerifyed) {
				throw ClientError.badRequest("Habit not found.");
			}

			return await db.updateHabit(newHabit);
		} catch (e) {
			throw e;
		}
	}
	async deleteHabit(habitId: number, userDataVerified: TokenPayloadDTO) {
		try {
			const isVerifyed = await db.verifyHabit(habitId, userDataVerified);
			if (!isVerifyed) {
				throw ClientError.badRequest("Habit not found.");
			}

			return await db.deleteHabit(habitId);
		} catch (e) {
			throw e;
		}
	}
}

export default new HabitService();
