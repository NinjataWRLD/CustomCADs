import { useMutation } from '@tanstack/react-query';
import { Request as Create } from '@/api/catalog/products/creator/create';
import { Request as SetCoords } from '@/api/catalog/products/creator/set-coords';
import { Request as Edit } from '@/api/catalog/products/creator/edit';
import { Request as Delete } from '@/api/catalog/products/creator/delete';
import {
	create,
	edit,
	delete_,
	setCadCoords,
} from '@/api/catalog/products/creator';

export const useCreateProduct = () =>
	useMutation({
		mutationKey: ['products', 'creator', 'create'],
		mutationFn: async (params: Create) => (await create(params)).data,
	});

export const useSetProductCadCoords = () =>
	useMutation({
		mutationKey: ['products', 'creator', 'edit'],
		mutationFn: async (params: SetCoords) =>
			(await setCadCoords(params)).data,
	});

export const useEditProduct = () =>
	useMutation({
		mutationKey: ['products', 'creator', 'edit'],
		mutationFn: async (params: Edit) => (await edit(params)).data,
	});

export const useDeleteProduct = () =>
	useMutation({
		mutationKey: ['products', 'creator', 'delete'],
		mutationFn: async (params: Delete) => (await delete_(params)).data,
	});
