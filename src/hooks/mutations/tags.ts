import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/catalog/tags/resources/create';
import { Request as Edit } from '@/api/catalog/tags/resources/edit';
import { Request as Delete } from '@/api/catalog/tags/resources/delete';
import { create, edit, delete_ } from '@/api/catalog/tags';

export const useCreateTag = () =>
	useMutation({
		mutationKey: ['tags', 'create'],
		mutationFn: async (params: Create) => (await create(params)).data,
	});

export const useEditTag = () =>
	useMutation({
		mutationKey: ['tags', 'edit'],
		mutationFn: async (params: Edit) => (await edit(params)).data,
	});

export const useDeleteTag = () =>
	useMutation({
		mutationKey: ['tags', 'delete'],
		mutationFn: async (params: Delete) => (await delete_(params)).data,
	});
