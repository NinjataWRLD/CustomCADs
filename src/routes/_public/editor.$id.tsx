import Cookies from 'js-cookie';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { AppError } from '@/types/errors';
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

		const isPrintable = product.tags.includes('Printable');
		if (!isPrintable)
			throw new AppError({
				title: 'Unprintable CAD!',
				message:
					"The Product you're tryig to customize is not printable.",
				tip: 'Please go back to the Gallery or your Cart and avoid such actions.',
			});

		return { product };
	},
});
