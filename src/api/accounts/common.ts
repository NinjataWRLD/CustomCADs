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

export const ACCOUNTS_BASE_PATH = '/account';
export const ROLES_BASE_PATH = '/roles';
