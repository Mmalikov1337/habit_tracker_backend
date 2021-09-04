class HabitDTO {
	id: number | null;
	user_id: number | null;
	title: string | null;
	priority: number | null;
	difficulty: number | null;
	notes: string | null;
	dynamics: string | null;
	is_healfully: boolean | null;
	value: number | null;
	photo: string | null;
	date_of_create: Date | null;

	constructor(dbObject: any) {
		this.id = dbObject.id ?? null;
		this.user_id = dbObject.user_id ?? null;
		this.title = dbObject.title ?? null;
		this.priority = dbObject.priority ?? null;
		this.difficulty = dbObject.difficulty ?? null;
		this.notes = dbObject.notes ?? null;
		this.dynamics = dbObject.dynamics ?? null;
		this.is_healfully = dbObject.is_healfully ?? null;
		this.value = dbObject.value ?? null;
		this.photo = dbObject.photo ?? null;
		this.date_of_create = dbObject.date_of_create ?? null;
	}
}

export default HabitDTO;
