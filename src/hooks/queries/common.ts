import { useQuery } from '@tanstack/react-query';
import * as api from '@/api/common/exchange-rates';

export const keys = {
	base: ['common'] as const,
	all: () => [...keys.base, 'all'] as const,
};

export const useGetExchangeRates = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(),
		queryFn: async () => (await api.all()).data,
		enabled,
	});
