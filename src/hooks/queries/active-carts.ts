import { useQuery } from '@tanstack/react-query';
import { calculateShipment, single } from '@/api/carts/active';
import { Request as Calculate } from '@/api/carts/active/resources/calculate-shipment';

export const useGetActiveCart = (enabled?: boolean) =>
	useQuery({
		queryKey: ['active-carts', 'single'],
		queryFn: async () => (await single()).data,
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
