import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest')({
	beforeLoad: ({ context }) => {
		const { is } = context.auth;
		if (!is.guest) throw redirect({ to: '/' });
	},
});
