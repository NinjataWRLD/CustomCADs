import { useMutation } from '@tanstack/react-query';
import { report } from '@/api/catalog/products/designer/requests';
import { Request } from '@/api/catalog/products/designer/types/report';

const useReportProduct = () =>
	useMutation({
		mutationKey: ['products', 'desinger', 'report'],
		mutationFn: async (params: Request) => (await report(params)).data,
	});

export default useReportProduct;
