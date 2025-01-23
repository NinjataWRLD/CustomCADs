import { useQuery } from '@tanstack/react-query';
import { downloadCad } from '@/api/orders/completed/client/requests';
import { Request } from '@/api/orders/completed/client/types/download';

const useDownloadCompletedOrderCad = (params: Request) =>
	useQuery({
		queryKey: ['completed-orders', 'client', 'download-cad', params],
		queryFn: async () => (await downloadCad(params)).data,
	});

export default useDownloadCompletedOrderCad;
