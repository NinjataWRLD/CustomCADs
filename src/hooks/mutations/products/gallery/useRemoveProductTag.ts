import { useMutation } from '@tanstack/react-query';
import { removeTag } from '@/api/catalog/products/gallery';
import { Request } from '@/api/catalog/products/gallery/resources/remove-tag';

const useRemoveProductTag = () =>
	useMutation({
		mutationKey: ['products', 'gallery', 'remove-tag'],
		mutationFn: async (params: Request) => (await removeTag(params)).data,
	});

export default useRemoveProductTag;
