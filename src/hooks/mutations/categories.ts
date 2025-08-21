import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/catalog/categories/create';
import { Request as Edit } from '@/api/catalog/categories/edit';
import { Request as Delete } from '@/api/catalog/categories/delete';
import * as api from '@/api/catalog/categories';

export const keys = {
	base: ['categories'] as const,
	create: () => [...keys.base, 'create'] as const,
	edit: () => [...keys.base, 'edit'] as const,
	delete: () => [...keys.base, 'delete'] as const,
};

export const useCreateCategory = () =>
	useMutation({
		mutationKey: keys.create(),
		mutationFn: async (params: Create) => (await api.create(params)).data,
	});

export const useEditCategory = () =>
	useMutation({
		mutationKey: keys.edit(),
		mutationFn: async (params: Edit) => (await api.edit(params)).data,
	});

export const useDeleteCategory = () =>
	useMutation({
		mutationKey: keys.delete(),
		mutationFn: async (params: Delete) => (await api.delete_(params)).data,
	});
