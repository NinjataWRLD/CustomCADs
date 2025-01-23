import { useMutation } from '@tanstack/react-query';
import { report } from '@/api/orders/ongoing/designer/requests';
import { Request } from '@/api/orders/ongoing/designer/types/report';

const useReportOngoingOrder = () =>
	useMutation({
		mutationKey: ['ongoing-orders', 'designer', 'report'],
		mutationFn: async (params: Request) => (await report(params)).data,
	});

export default useReportOngoingOrder;
