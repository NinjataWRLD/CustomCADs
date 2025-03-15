import { useMutation } from '@tanstack/react-query';
import { Request as AddTag } from '@/api/catalog/products/gallery/resources/add-tag';
import { Request as RemoveTag } from '@/api/catalog/products/gallery/resources/remove-tag';
import { addTag, removeTag } from '@/api/catalog/products/gallery';

export const useAddProductTag = (params: AddTag) =>
	useMutation({
		mutationKey: ['products', 'gallery', 'add-tag', params],
		mutationFn: async () => (await addTag(params)).data,
	});

export const useRemoveProductTag = (params: RemoveTag) =>
	useMutation({
		mutationKey: ['products', 'gallery', 'remove-tag', params],
		mutationFn: async () => (await removeTag(params)).data,
	});

export default useAddProductTag;
