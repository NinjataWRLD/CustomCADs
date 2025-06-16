import { useMutation } from '@tanstack/react-query';
import { Request as AddTag } from '@/api/catalog/products/gallery/add-tag';
import { Request as RemoveTag } from '@/api/catalog/products/gallery/remove-tag';
import * as api from '@/api/catalog/products/gallery';

export const keys = {
	base: ['products', 'gallery'] as const,
	addTag: () => [...keys.base, 'add-tag'] as const,
	removeTag: () => [...keys.base, 'remove-tag'] as const,
};

export const useAddProductTag = () =>
	useMutation({
		mutationKey: keys.addTag(),
		mutationFn: async (params: AddTag) => (await api.addTag(params)).data,
	});

export const useRemoveProductTag = () =>
	useMutation({
		mutationKey: keys.removeTag(),
		mutationFn: async (params: RemoveTag) =>
			(await api.removeTag(params)).data,
	});

export default useAddProductTag;
