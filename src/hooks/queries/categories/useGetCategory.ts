import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/categories/categories';
import { Request } from '@/api/categories/categories/resources/single';

const useGetCategory = (params: Request) =>
	useQuery({
		queryKey: ['categories', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetCategory;
