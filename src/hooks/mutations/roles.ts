import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/accounts/roles/create';
import { Request as Delete } from '@/api/accounts/roles/delete';
import * as api from '@/api/accounts/roles';

export const keys = {
	base: ['roles'] as const,
	create: () => [...keys.base, 'create'] as const,
	delete: () => [...keys.base, 'delete'] as const,
};

export const useCreateRole = () =>
	useMutation({
		mutationKey: keys.create(),
		mutationFn: async (params: Create) => (await api.create(params)).data,
	});

export const useDeleteRole = () =>
	useMutation({
		mutationKey: keys.delete(),
		mutationFn: async (params: Delete) => (await api.delete_(params)).data,
	});
