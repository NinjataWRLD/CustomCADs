import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/customizations/materials/create';
import { Request as Edit } from '@/api/customizations/materials/edit';
import { Request as Delete } from '@/api/customizations/materials/delete';
import * as api from '@/api/customizations/materials';

export const keys = {
	base: ['materials'] as const,
	create: () => [...keys.base, 'create'] as const,
	edit: () => [...keys.base, 'edit'] as const,
	delete: () => [...keys.base, 'delete'] as const,
};

export const useCreateMaterial = () =>
	useMutation({
		mutationKey: keys.create(),
		mutationFn: async (params: Create) => (await api.create(params)).data,
	});

export const useEditMaterial = () =>
	useMutation({
		mutationKey: keys.edit(),
		mutationFn: async (params: Edit) => (await api.edit(params)).data,
	});

export const useDeleteMaterial = () =>
	useMutation({
		mutationKey: keys.delete(),
		mutationFn: async (params: Delete) => (await api.delete_(params)).data,
	});
