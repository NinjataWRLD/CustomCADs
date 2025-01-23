import { useQuery } from '@tanstack/react-query';
import { changeCad } from '@/api/catalog/products/creator/requests';
import { Request } from '@/api/catalog/products/creator/types/change';

const useChangeProductCad = (params: Request) =>
	useQuery({
		queryKey: ['products', 'creator', 'change-cad', params],
		queryFn: async () => (await changeCad(params)).data,
	});

export default useChangeProductCad;
