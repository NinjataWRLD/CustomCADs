import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/accounts/roles/resources/create';
import { Request as Delete } from '@/api/accounts/roles/resources/delete';
import { create, delete_ } from '@/api/accounts/roles';

export const useCreateRole = () =>
	useMutation({
		mutationKey: ['roles', 'create'],
		mutationFn: async (params: Create) => (await create(params)).data,
	});

export const useDeleteRole = () =>
	useMutation({
		mutationKey: ['roles', 'delete'],
		mutationFn: async (params: Delete) => (await delete_(params)).data,
	});
