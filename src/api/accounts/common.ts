export type RoleResponse = {
	name: string;
	description: string;
};

export type AccountResponse = {
	username: string;
	email: string;
	role: string;
	createdAt: string;
	firstName?: string;
	lastName?: string;
};

export const ACCOUNTS_BASE_PATH = '/account';
export const ROLES_BASE_PATH = '/roles';
