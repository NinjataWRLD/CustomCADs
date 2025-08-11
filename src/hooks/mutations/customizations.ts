import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/printing/customizations/create';
import { Request as Edit } from '@/api/printing/customizations/edit';
import * as api from '@/api/printing/customizations';

export const keys = {
	base: ['customizations'] as const,
	create: () => [...keys.base, 'create'] as const,
	edit: () => [...keys.base, 'edit'] as const,
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
