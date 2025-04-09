import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/categories/categories/create';
import { Request as Edit } from '@/api/categories/categories/edit';
import { Request as Delete } from '@/api/categories/categories/delete';
import { create, edit, delete_ } from '@/api/categories/categories';

export const useCreateCategory = () =>
	useMutation({
		mutationKey: ['categories', 'create'],
		mutationFn: async (params: Create) => (await create(params)).data,
	});

export const useEditCategory = () =>
	useMutation({
		mutationKey: ['categories', 'edit'],
		mutationFn: async (params: Edit) => (await edit(params)).data,
	});

export const useDeleteCategory = () =>
	useMutation({
		mutationKey: ['categories', 'delete'],
		mutationFn: async (params: Delete) => (await delete_(params)).data,
	});
