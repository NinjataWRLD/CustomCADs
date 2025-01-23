import { useQuery } from '@tanstack/react-query';
import { uploadCad } from '@/api/orders/ongoing/designer/requests';
import { Request } from '@/api/orders/ongoing/designer/types/upload';

const useUploadOngoingOrderCad = (params: Request) =>
	useQuery({
		queryKey: ['ongoing-order', 'designer', 'upload-cad', params],
		queryFn: async () => (await uploadCad(params)).data,
	});

export default useUploadOngoingOrderCad;
