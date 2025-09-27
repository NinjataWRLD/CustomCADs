import { useMutation } from '@tanstack/react-query';
import { Request as SetCategory } from '@/api/customs/customs/admin/category';
import { Request as Status } from '@/api/customs/customs/admin/status';
import * as api from '@/api/customs/customs/admin';

export const keys = {
	base: ['customs', 'admin'] as const,
	category: () => [...keys.base, 'set-category'] as const,
	remove: () => [...keys.base, 'remove'] as const,
};

export const useSetCategoryCustom = () =>
	useMutation({
		mutationKey: keys.category(),
		mutationFn: async (params: SetCategory) =>
			(await api.setCategory(params)).data,
	});

export const useRemoveCustom = () =>
	useMutation({
		mutationKey: keys.remove(),
		mutationFn: async (params: Status) => (await api.remove(params)).data,
	});
