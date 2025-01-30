import { useQuery } from '@tanstack/react-query';
import { sortings } from '@/api/catalog/products/gallery';

const useGetProductSortings = () =>
	useQuery({
		queryKey: ['products', 'gallery', 'sortings'],
		queryFn: async () => (await sortings()).data,
	});

export default useGetProductSortings;
