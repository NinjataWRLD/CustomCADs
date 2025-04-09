import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/customizations/materials/create';
import { Request as Edit } from '@/api/customizations/materials/edit';
import { Request as Delete } from '@/api/customizations/materials/delete';
import { create, edit, delete_ } from '@/api/customizations/materials';

export const useCreateMaterial = () =>
	useMutation({
		mutationKey: ['materials', 'create'],
		mutationFn: async (params: Create) => (await create(params)).data,
	});

export const useEditMaterial = () =>
	useMutation({
		mutationKey: ['materials', 'edit'],
		mutationFn: async (params: Edit) => (await edit(params)).data,
	});

export const useDeleteMaterial = () =>
	useMutation({
		mutationKey: ['materials', 'delete'],
		mutationFn: async (params: Delete) => (await delete_(params)).data,
	});
