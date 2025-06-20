import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/catalog/tags/create';
import { Request as Edit } from '@/api/catalog/tags/edit';
import { Request as Delete } from '@/api/catalog/tags/delete';
import * as api from '@/api/catalog/tags';

export const keys = {
	base: ['tags'] as const,
	create: () => [...keys.base, 'create'] as const,
	edit: () => [...keys.base, 'edit'] as const,
	delete: () => [...keys.base, 'delete'] as const,
};

export const useCreateTag = () =>
	useMutation({
		mutationKey: keys.create(),
		mutationFn: async (params: Create) => (await api.create(params)).data,
	});

export const useEditTag = () =>
	useMutation({
		mutationKey: keys.edit(),
		mutationFn: async (params: Edit) => (await api.edit(params)).data,
	});

export const useDeleteTag = () =>
	useMutation({
		mutationKey: keys.delete(),
		mutationFn: async (params: Delete) => (await api.delete_(params)).data,
	});
