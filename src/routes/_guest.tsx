import Cookies from 'js-cookie';
import { createFileRoute, redirect } from '@tanstack/react-router';
import * as auth from '@/utils/auth';

export const Route = createFileRoute('/_guest')({
	beforeLoad: () => {
		const role = Cookies.get('role');
		const is = auth.is({ authn: !!role, authz: role ?? null });
		if (!is.guest) throw redirect({ to: '/' });
	},
});
