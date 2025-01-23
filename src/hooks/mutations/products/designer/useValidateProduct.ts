import { useMutation } from '@tanstack/react-query';
import { validate } from '@/api/catalog/products/designer/requests';
import { Request } from '@/api/catalog/products/designer/types/validate';

const useValidateProduct = () =>
	useMutation({
		mutationKey: ['products', 'desinger', 'validate'],
		mutationFn: async (params: Request) => (await validate(params)).data,
	});

export default useValidateProduct;
