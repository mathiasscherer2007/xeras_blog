abstract class Exception extends Error 
{
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class InvalidTokenException extends Exception {
	constructor() {
		super('Invalid token was provided.', 401);
	}
}

export class EmailAlreadyExistsException extends Exception {
    constructor() {
        super('An account with this email address already exists.', 409);
    }
}

export class InvalidCredentialsException extends Exception {
    constructor() {
        super('Invalid email or password.', 401);
    }
}