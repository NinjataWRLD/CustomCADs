import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/customizations/customizations/create';
import { Request as Edit } from '@/api/customizations/customizations/edit';
import { Request as Delete } from '@/api/customizations/customizations/delete';
import { create, edit, delete_ } from '@/api/customizations/customizations';

export const useCreateCustomization = () =>
	useMutation({
		mutationKey: ['customizations', 'create'],
		mutationFn: async (params: Create) => (await create(params)).data,
	});

export const useEditCustomization = () =>
	useMutation({
		mutationKey: ['customizations', 'edit'],
		mutationFn: async (params: Edit) => (await edit(params)).data,
	});

export const useDeleteCustomization = () =>
	useMutation({
		mutationKey: ['customizations', 'delete'],
		mutationFn: async (params: Delete) => (await delete_(params)).data,
	});
