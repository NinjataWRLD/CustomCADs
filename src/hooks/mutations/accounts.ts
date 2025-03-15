import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/accounts/accounts/resources/create';
import { Request as Delete } from '@/api/accounts/accounts/resources/delete';
import { create, delete_ } from '@/api/accounts/accounts';

export const useCreateAccount = () =>
	useMutation({
		mutationKey: ['accounts', 'create'],
		mutationFn: async (params: Create) => (await create(params)).data,
	});

export const useDeleteAccount = () =>
	useMutation({
		mutationKey: ['accounts', 'delete'],
		mutationFn: async (params: Delete) => (await delete_(params)).data,
	});
