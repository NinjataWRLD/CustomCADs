import Cookies from 'js-cookie';
import { createFileRoute, redirect } from '@tanstack/react-router';
import * as galleryApi from '@/api/catalog/products/gallery';
import Editor from '@/app/public/editor';
import * as auth from '@/utils/auth';

export const Route = createFileRoute('/_public/editor/$id')({
	component: Editor,
	beforeLoad: () => {
		const role = Cookies.get('role');
		const is = auth.is({ authn: !!role, authz: role ?? '' });
		if (!is.guest && !is.customer) throw redirect({ to: '/' });
	},
	loader: async ({ params }) => {
		const { data: product } = await galleryApi.single(params);
		return { product };
	},
});
