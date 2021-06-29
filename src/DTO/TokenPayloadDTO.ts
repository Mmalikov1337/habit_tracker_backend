class TokenPayloadDTO {
	id: number;

	constructor(id: number) {
		this.id = id;
		this["id"]
	}
	
	toPlainObject() {
		//Expected "payload" to be a plain object. (TokenService.generateTokens())
		return { ...this };
	}
}

export default TokenPayloadDTO;
