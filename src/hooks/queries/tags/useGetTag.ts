import { useQuery } from '@tanstack/react-query';
import { single } from '@/api/catalog/tags';
import { Request } from '@/api/catalog/tags/resources/single';

const useGetTag = (params: Request) =>
	useQuery({
		queryKey: ['catalog', 'tags', 'single', params],
		queryFn: async () => (await single(params)).data,
	});

export default useGetTag;
