import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/customs/customs/designer/all';
import { Request as Single } from '@/api/customs/customs/designer/single';
import { Request as Upload } from '@/api/customs/customs/designer/upload';
import { all, single, uploadCad } from '@/api/customs/customs/designer';

export const useGetCustoms = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'designer', 'all', params],
		queryFn: async () => (await all(params)).data,
		enabled,
	});

export const useGetCustom = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'designer', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});

export const useUploadCustomCad = (params: Upload, enabled?: boolean) =>
	useQuery({
		queryKey: ['customs', 'designer', 'upload-cad', params],
		queryFn: async () => (await uploadCad(params)).data,
		enabled,
	});
