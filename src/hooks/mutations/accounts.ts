import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/accounts/accounts/create';
import { Request as Delete } from '@/api/accounts/accounts/delete';
import * as api from '@/api/accounts/accounts';

export const keys = {
	base: ['accounts'] as const,
	create: () => [...keys.base, 'create'] as const,
	delete: () => [...keys.base, 'delete'] as const,
};

export const useCreateAccount = () =>
	useMutation({
		mutationKey: keys.create(),
		mutationFn: async (params: Create) => (await api.create(params)).data,
	});

export const useDeleteAccount = () =>
	useMutation({
		mutationKey: keys.delete(),
		mutationFn: async (params: Delete) => (await api.delete_(params)).data,
	});
