export default class ServerError extends Error {
	status: number;
	errors: Array<Error>;

	constructor(status: number, message: string, errors: Array<any> = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static serverError(message: string, errors: Array<any> = []): ServerError {
		return new ServerError(500, message, errors);
	}

}
