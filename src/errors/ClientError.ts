export default class ClientError extends Error {
	status: number;
	errors: Array<Error>;

	constructor(status: number, message: string, errors: Array<any> = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static badRequest(message: string, errors: Array<any> = []): ClientError {
		return new ClientError(400, message, errors);
	}

	static notAuthorizated(message: string, errors: Array<any> = []): ClientError {
		return new ClientError(401, message, errors);
	}
	static forbidden(message: string, errors: Array<any> = []): ClientError {
		return new ClientError(403, message, errors);
	}
	override toString() {
		return this.message;
	}
}
