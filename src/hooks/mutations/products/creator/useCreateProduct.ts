import { useMutation } from '@tanstack/react-query';
import { create } from '@/api/catalog/products/creator';
import { Request } from '@/api/catalog/products/creator/resources/create';

const useCreateProduct = () =>
	useMutation({
		mutationKey: ['products', 'creator', 'create'],
		mutationFn: async (params: Request) => (await create(params)).data,
	});

export default useCreateProduct;
