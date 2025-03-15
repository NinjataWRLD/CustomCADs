import { useMutation } from '@tanstack/react-query';
import { Request as Cancel } from '@/api/delivery/shipments/resources/cancel';
import { cancel } from '@/api/delivery/shipments';

export const useCancelShipment = () =>
	useMutation({
		mutationKey: ['shipments', 'cancel'],
		mutationFn: async (req: Cancel) => (await cancel(req)).data,
	});
