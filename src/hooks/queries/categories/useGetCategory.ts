import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/categories/categories/requests';
import { Request } from '@/api/categories/categories/types/single';

const useGetAccount = (params: Request) =>
	useQuery({
		queryKey: ['categories', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetAccount;
