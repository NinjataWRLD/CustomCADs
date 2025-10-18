import { useQuery } from '@tanstack/react-query';
import { DownloadRequest } from '@/api/files/presigned';
import { Request as Single } from '@/api/files/images/single';
import * as api from '@/api/files/images';

export const keys = {
	base: ['images'] as const,
	download: (params: DownloadRequest) =>
		[...keys.base, 'download', params] as const,
	single: (params: Single) => [...keys.base, 'single', params] as const,
};

export const useGetImage = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled,
	});

export const useDownloadImageUrl = (
	params: DownloadRequest,
	enabled?: boolean,
) =>
	useQuery({
		queryKey: keys.download(params),
		queryFn: async () => (await api.downloadUrl(params)).data,
		enabled,
	});
