import { useMutation } from '@tanstack/react-query';
import { addTag } from '@/api/catalog/products/gallery';
import { Request } from '@/api/catalog/products/gallery/resources/add-tag';

const useAddProductTag = () =>
	useMutation({
		mutationKey: ['products', 'gallery', 'add-tag'],
		mutationFn: async (params: Request) => (await addTag(params)).data,
	});

export default useAddProductTag;
