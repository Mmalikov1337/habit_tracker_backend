class UserDTO {
	id: string | null;
	email: string | null;
	name: string | null;
	password: string | null;
	stats: string | null;
	rang: string | null;
	bio: string | null;
	permission_lvl: number | null;
	photo: string | null;
	is_email_activated: Boolean | null;
	date_of_create: Date | null;

	constructor(dbObject: any) {
		this.id = dbObject.id ?? null;
		this.email = dbObject.email ?? null;
		this.name = dbObject.name ?? null;
		this.password = dbObject.password ?? null;
		this.stats = dbObject.stats ?? null;
		this.rang = dbObject.rang ?? null;
		this.bio = dbObject.bio ?? null;
		this.permission_lvl = dbObject.permission_lvl ?? null;
		this.photo = dbObject.photo ?? null;
		this.is_email_activated = dbObject.is_mail_activated ?? null;
		this.date_of_create = dbObject.date_of_create ?? null;
	}
}

export default UserDTO;
