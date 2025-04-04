import { useQuery } from '@tanstack/react-query';
import { calculateShipment, all } from '@/api/carts/active';
import { Request as Calculate } from '@/api/carts/active/calculate-shipment';

export const useGetActiveCartItems = (enabled?: boolean) =>
	useQuery({
		queryKey: ['active-carts', 'all'],
		queryFn: async () => (await all()).data,
		enabled: enabled,
	});

export const useCalculateActiveCartShipment = (
	params: Calculate,
	enabled?: boolean,
) =>
	useQuery({
		queryKey: ['active-carts', 'calculate-shipment', params],
		queryFn: async () => (await calculateShipment(params)).data,
		enabled,
	});
