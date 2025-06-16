import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/customizations/customizations/create';
import { Request as Edit } from '@/api/customizations/customizations/edit';
import { Request as Delete } from '@/api/customizations/customizations/delete';
import * as api from '@/api/customizations/customizations';

export const keys = {
	base: ['customizations'] as const,
	create: () => [...keys.base, 'create'] as const,
	edit: () => [...keys.base, 'edit'] as const,
	delete: () => [...keys.base, 'delete'] as const,
};

export const useCreateCustomization = () =>
	useMutation({
		mutationKey: keys.create(),
		mutationFn: async (params: Create) => (await api.create(params)).data,
	});

export const useEditCustomization = () =>
	useMutation({
		mutationKey: keys.edit(),
		mutationFn: async (params: Edit) => (await api.edit(params)).data,
	});

export const useDeleteCustomization = () =>
	useMutation({
		mutationKey: keys.delete(),
		mutationFn: async (params: Delete) => (await api.delete_(params)).data,
	});
