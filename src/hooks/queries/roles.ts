import { useQuery } from '@tanstack/react-query';
import { Request as Single } from '@/api/accounts/roles/resources/single';
import { all, single } from '@/api/accounts/roles';

export const useGetRoles = (enabled?: boolean) =>
	useQuery({
		queryKey: ['roles', 'all'],
		queryFn: async () => (await all()).data,
		enabled,
	});

const useGetRole = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['roles', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});

export default useGetRole;
