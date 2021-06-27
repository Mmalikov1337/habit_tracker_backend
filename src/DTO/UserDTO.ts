class UserDTO {
	id: string | null;
	mail: string | null;
	name: string | null;
	password: string | null;
	stats: string | null;
	rang: string | null;
	bio: string | null;
	role: number | null;
	photo: string | null;
	is_mail_activated: Boolean | null;
	date_of_create: Date | null;

	constructor(dbObject: any) {
		this.id = dbObject.id ?? null;
		this.mail = dbObject.mail ?? null;
		this.name = dbObject.name ?? null;
		this.password = dbObject.password ?? null;
		this.stats = dbObject.stats ?? null;
		this.rang = dbObject.rang ?? null;
		this.bio = dbObject.bio ?? null;
		this.role = dbObject.role ?? null;
		this.photo = dbObject.photo ?? null;
		this.is_mail_activated = dbObject.is_mail_activated ?? null;
		this.date_of_create = dbObject.date_of_create ?? null;
	}
}

export default UserDTO;
