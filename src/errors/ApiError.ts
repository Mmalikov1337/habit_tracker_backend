export default class ApiError extends Error {
	status: number;
	errors: Array<Error>;

	constructor(status: number, message: string, errors = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static badRequest(message: string, errors = []): ApiError {
		return new ApiError(400, message, errors);
	}
	
	static notAuthorizated(message: string, errors = []): ApiError {
		return new ApiError(401, message, errors);
	}

	override toString() {
		return this.message;
	}
}
