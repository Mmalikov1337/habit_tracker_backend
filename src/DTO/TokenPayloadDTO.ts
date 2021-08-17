import UserDTO from "./UserDTO";

class TokenPayloadDTO {
	id: number | null;
	email: string | null;
	name: string | null;
	stats: string | null;
	rang: string | null;
	bio: string | null;
	permission_lvl: number | null;
	photo: string | null;
	is_email_activated: any;

	constructor(user: UserDTO) {
		this.id = Number(user.id)?? null;
		this.email = user.email ?? null;
		this.name = user.name ?? null;
		this.stats = user.stats ?? null;
		this.rang = user.rang ?? null;
		this.bio = user.bio ?? null;
		this.permission_lvl = user.permission_lvl ?? null;
		this.photo = user.photo ?? null;
		this.is_email_activated = user.is_email_activated ?? null;
	}

	toPlainObject() {
		//Expected "payload" to be a plain object. (TokenService.generateTokens())
		return { ...this };
	}
}

export default TokenPayloadDTO;
