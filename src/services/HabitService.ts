import { FilterFields } from "./../types/queries";
import ClientError from "../errors/ClientError";
import db from "../Database";
import TokenPayloadDTO from "../DTO/TokenPayloadDTO";
import HabitDTO from "../DTO/HabitDTO";
import getFilterString from "../helpers/getFilterString";
import isEmpty from "../helpers/isEmpty";
import getFilterValue from "../helpers/getFilterValue";
import createFilterValue from "../helpers/createFilterValues";
import createFilterString from "../helpers/createFilterString";

class HabitService {
	async getHabits(userDataVerified: TokenPayloadDTO, id?: number, filters?: any, pagination?: any) {
		try {
			if (!userDataVerified.id) {
				throw ClientError.badRequest("Wrong id getHabits");
			}
			const filterString = createFilterString(filters);
			const filterValues = createFilterValue(filters);
			const paginationString = pagination ? `LIMIT ? OFFSET ?` : undefined;
			console.log("pagination", pagination);
			const paginationValues = pagination ? [pagination.limit, pagination.offset] : undefined;

			return await db.getHabits(
				userDataVerified.id,
				paginationString,
				paginationValues,
				id,
				filterString,
				filterValues
			);
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
