import { useMutation } from '@tanstack/react-query';
import { cancel } from '@/api/delivery/shipments/requests';
import { Request } from '@/api/delivery/shipments/types/cancel';

const useCancelShipment = () =>
	useMutation({
		mutationKey: ['shipments', 'cancel'],
		mutationFn: async (req: Request) => (await cancel(req)).data,
	});

export default useCancelShipment;
