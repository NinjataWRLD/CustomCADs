import z from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import * as identityApi from '@/api/identity/identity';
import Account, { tabs } from '@/app/public/account';

export const Route = createFileRoute('/_public/account')({
	component: Account,
	validateSearch: z.object({
		tab: z.enum(tabs).optional(),
	}),
	loader: async () => {
		try {
			const { data: account } = await identityApi.myAccount();
			return { account };
		} catch {
			await identityApi.refresh();
			const { data: account } = await identityApi.myAccount();
			return { account };
		}
	},
});
