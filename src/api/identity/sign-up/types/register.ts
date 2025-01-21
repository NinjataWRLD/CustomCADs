export interface Request {
	role: string;
	username: string;
	email: string;
	timeZone: string;
	password: string;
	confirmPassword: string;
	firstName?: string;
	lastName?: string;
}
