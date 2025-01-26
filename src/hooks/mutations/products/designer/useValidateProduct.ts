import { useMutation } from '@tanstack/react-query';
import { validate } from '@/api/catalog/products/designer';
import { Request } from '@/api/catalog/products/designer/resources/validate';

const useValidateProduct = () =>
	useMutation({
		mutationKey: ['products', 'desinger', 'validate'],
		mutationFn: async (params: Request) => (await validate(params)).data,
	});

export default useValidateProduct;
