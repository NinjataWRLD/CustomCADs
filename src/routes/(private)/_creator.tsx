import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(private)/_creator')({
	beforeLoad: ({ context }) => {
		const { is } = context.auth;
		if (!is.contributor) throw redirect({ to: '/login' });
	},
});
