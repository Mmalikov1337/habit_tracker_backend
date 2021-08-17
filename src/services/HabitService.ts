import ClientError from "../errors/ClientError";
import db from "../Database";
import TokenPayloadDTO from "../DTO/TokenPayloadDTO";
import HabitDTO from "../DTO/HabitDTO";

class HabitService {
	async getHabits(
		userDataVerified: TokenPayloadDTO,
		habitOptions: [{ value: string; option: string }] | null
	) {
		try {
			if(!userDataVerified.id){
				throw ClientError.badRequest("Wrong id getHabits")
			}
			if (!habitOptions) {
				return await db.getHabits(userDataVerified.id, null);
			}

			const values = habitOptions.reduce((acc, cur) => {
				return acc + cur.value + " = " + "?";
			}, " AND ");

			const options = habitOptions.map((it) => {
				return it.option;
			});

			const preparedHabitOptions = { values, options };

			return await db.getHabits(userDataVerified.id, preparedHabitOptions);
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
			if(!newHabit.id){
				throw ClientError.badRequest("Habit must have id.")
			}
			const isVerifyed = await db.verifyHabit(newHabit.id, userDataVerified);
			if(!isVerifyed){
				throw ClientError.badRequest("Habit not found.")
			}

			return await db.updateHabit(newHabit);
		} catch (e) {
			throw e;
		}
	}
	async deleteHabit(habitId: number, userDataVerified: TokenPayloadDTO) {
		try {
			const isVerifyed = await db.verifyHabit(habitId, userDataVerified);
			if(!isVerifyed){
				throw ClientError.badRequest("Habit not found.")
			}
			
			return await db.deleteHabit(habitId);
		} catch (e) {
			throw e;
		}
	}
}

export default new HabitService();
