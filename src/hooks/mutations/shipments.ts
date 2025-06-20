import { useMutation } from '@tanstack/react-query';
import { Request as Cancel } from '@/api/delivery/shipments/cancel';
import * as api from '@/api/delivery/shipments';

export const keys = {
	base: ['shipments'] as const,
	cancel: () => [...keys.base, 'cancel'] as const,
};

export const useCancelShipment = () =>
	useMutation({
		mutationKey: keys.cancel(),
		mutationFn: async (req: Cancel) => (await api.cancel(req)).data,
	});
