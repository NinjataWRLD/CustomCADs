import { useMutation } from '@tanstack/react-query';
import { Request as AddTag } from '@/api/catalog/products/gallery/add-tag';
import { Request as RemoveTag } from '@/api/catalog/products/gallery/remove-tag';
import { addTag, removeTag } from '@/api/catalog/products/gallery';

export const useAddProductTag = () =>
	useMutation({
		mutationKey: ['products', 'gallery', 'add-tag'],
		mutationFn: async (params: AddTag) => (await addTag(params)).data,
	});

export const useRemoveProductTag = () =>
	useMutation({
		mutationKey: ['products', 'gallery', 'remove-tag'],
		mutationFn: async (params: RemoveTag) => (await removeTag(params)).data,
	});

export default useAddProductTag;
