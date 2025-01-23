import { useMutation } from '@tanstack/react-query';
import { delete_ } from '@/api/catalog/products/creator/requests';
import { Request } from '@/api/catalog/products/creator/types/delete';

const useDeleteProduct = () =>
	useMutation({
		mutationKey: ['products', 'creator', 'delete'],
		mutationFn: async (params: Request) => (await delete_(params)).data,
	});

export default useDeleteProduct;
