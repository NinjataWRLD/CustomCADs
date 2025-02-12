import { useQuery } from '@tanstack/react-query';
import { all } from '@/api/catalog/tags';

const useGetTags = () =>
	useQuery({
		queryKey: ['catalog', 'tags', 'all'],
		queryFn: async () => (await all()).data,
	});

export default useGetTags;
