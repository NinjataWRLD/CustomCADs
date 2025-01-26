import { useMutation } from '@tanstack/react-query';
import { setCadCoords } from '@/api/catalog/products/creator';
import { Request } from '@/api/catalog/products/creator/resources/set-coords';

const useSetProductCadCoords = () =>
	useMutation({
		mutationKey: ['products', 'creator', 'edit'],
		mutationFn: async (params: Request) =>
			(await setCadCoords(params)).data,
	});

export default useSetProductCadCoords;
