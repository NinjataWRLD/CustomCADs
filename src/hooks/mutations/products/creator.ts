import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/catalog/products/creator/create';
import { Request as Edit } from '@/api/catalog/products/creator/edit';
import { Request as Delete } from '@/api/catalog/products/creator/delete';
import * as api from '@/api/catalog/products/creator';

export const keys = {
	base: ['products', 'creator'] as const,
	create: () => [...keys.base, 'create'] as const,
	edit: () => [...keys.base, 'edit'] as const,
	delete: () => [...keys.base, 'delete'] as const,
};

export const useCreateProduct = () =>
	useMutation({
		mutationKey: keys.create(),
		mutationFn: async (params: Create) => (await api.create(params)).data,
	});

export const useEditProduct = () =>
	useMutation({
		mutationKey: keys.edit(),
		mutationFn: async (params: Edit) => (await api.edit(params)).data,
	});

export const useDeleteProduct = () =>
	useMutation({
		mutationKey: keys.delete(),
		mutationFn: async (params: Delete) => (await api.delete_(params)).data,
	});
