import { useQuery } from '@tanstack/react-query';
import { Request as Calculate } from '@/api/carts/active/calculate-shipment';
import * as api from '@/api/carts/active';

export const keys = {
	base: ['active-carts'] as const,
	all: () => [...keys.base, 'all'] as const,
	count: () => [...keys.base, 'count'] as const,
	calculateShipment: (params: Calculate) =>
		[...keys.base, 'calculate-shipment', params] as const,
};

export const useGetActiveCartItems = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(),
		queryFn: async () => (await api.all()).data,
		enabled: enabled,
	});

export const useCountActiveCartItems = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.count(),
		queryFn: async () => (await api.count()).data,
		enabled: enabled,
	});

export const useCalculateActiveCartShipment = (
	params: Calculate,
	enabled?: boolean,
) =>
	useQuery({
		queryKey: keys.calculateShipment(params),
		queryFn: async () => (await api.calculateShipment(params)).data,
		enabled,
	});
