import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/customs/customs/admin/all';
import * as api from '@/api/customs/customs/admin';

export const keys = {
	base: ['customs', 'admin'] as const,
	all: (params: All) => [...keys.base, 'all', params] as const,
};

export const useGetCustoms = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(params),
		queryFn: async () => (await api.all(params)).data,
		enabled,
	});
