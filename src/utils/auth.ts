interface IsProps {
	authn: boolean;
	authz: string | null;
}

export const is = ({ authn, authz }: IsProps) => {
	const roles = {
		guest: !authn,
		customer: authn && authz === 'Customer',
		contributor: authn && authz === 'Contributor',
		designer: authn && authz === 'Designer',
		admin: authn && authz === 'Admin',
	};

	return {
		...roles,
		creator: roles.contributor || roles.designer,
	};
};
