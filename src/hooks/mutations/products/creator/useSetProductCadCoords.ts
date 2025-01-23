import { useMutation } from '@tanstack/react-query';
import { setCadCoords } from '@/api/catalog/products/creator/requests';
import { Request } from '@/api/catalog/products/creator/types/set-coords';

const useEditProduct = () =>
	useMutation({
		mutationKey: ['products', 'creator', 'edit'],
		mutationFn: async (params: Request) =>
			(await setCadCoords(params)).data,
	});

export default useEditProduct;
