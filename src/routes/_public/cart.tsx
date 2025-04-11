import Cookies from 'js-cookie';
import { createFileRoute, redirect } from '@tanstack/react-router';
import Cart from '@/app/public/cart';
import * as auth from '@/utils/auth';

export const Route = createFileRoute('/_public/cart')({
	component: Cart,
	beforeLoad: () => {
		const role = Cookies.get('role');
		const is = auth.is({ authn: !!role, authz: role ?? '' });
		if (!is.guest || !is.customer) throw redirect({ to: '/' });
	},
});
