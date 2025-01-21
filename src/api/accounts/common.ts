export interface RoleResponse {
	name: string;
	description: string;
}

export interface AccountResponse {
	username: string;
	email: string;
	role: string;
	firstName?: string;
	lastName?: string;
}
