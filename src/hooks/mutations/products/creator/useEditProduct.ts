import { useMutation } from '@tanstack/react-query';
import { edit } from '@/api/catalog/products/creator';
import { Request } from '@/api/catalog/products/creator/resources/edit';

const useEditProduct = () =>
	useMutation({
		mutationKey: ['products', 'creator', 'edit'],
		mutationFn: async (params: Request) => (await edit(params)).data,
	});

export default useEditProduct;
