import { useQuery } from '@tanstack/react-query';
import { changeImage } from '@/api/catalog/products/creator';
import { Request } from '@/api/catalog/products/creator/resources/change';

const useChangeProductImage = (params: Request) =>
	useQuery({
		queryKey: ['products', 'creator', 'change-image', params],
		queryFn: async () => (await changeImage(params)).data,
	});

export default useChangeProductImage;
