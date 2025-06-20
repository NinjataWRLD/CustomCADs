import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/catalog/products/creator/all';
import { Request as Single } from '@/api/catalog/products/creator/single';
import { Request as Recent } from '@/api/catalog/products/creator/recent';
import { Request as Download } from '@/api/catalog/products/creator/download';
import { Request as Upload } from '@/api/catalog/products/creator/upload';
import { Request as Replace } from '@/api/catalog/products/creator/replace';
import * as api from '@/api/catalog/products/creator';

export const keys = {
	base: ['products', 'creator'] as const,
	all: (params: All) => [...keys.base, 'all', params] as const,
	single: (params: Single) => [...keys.base, 'single', params] as const,
	recent: (params: Recent) => [...keys.base, 'recent', params] as const,
	stats: () => [...keys.base, 'stats'] as const,
	downloadCad: (params: Download) =>
		[...keys.base, 'download-cad', params] as const,
	downloadImage: (params: Download) =>
		[...keys.base, 'download-image', params] as const,
	upload: (params: Upload) => [...keys.base, 'upload', params] as const,
	replaceCad: (params: Replace) =>
		[...keys.base, 'replace-cad', params] as const,
	replaceImage: (params: Replace) =>
		[...keys.base, 'replace-image', params] as const,
};

export const useGetProducts = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(params),
		queryFn: async () => (await api.all(params)).data,
		enabled,
	});

export const useGetProduct = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled,
	});

export const useGetRecentProducts = (params: Recent, enabled?: boolean) =>
	useQuery({
		queryKey: keys.recent(params),
		queryFn: async () => (await api.recent(params)).data,
		enabled,
	});

export const useGetProductsStats = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.stats(),
		queryFn: async () => (await api.stats()).data,
		enabled,
	});

export const useDownloadProductCad = (params: Download, enabled?: boolean) =>
	useQuery({
		queryKey: keys.downloadCad(params),
		queryFn: async () => (await api.downloadCad(params)).data,
		enabled,
	});

export const useDownloadProductImage = (params: Download, enabled?: boolean) =>
	useQuery({
		queryKey: keys.downloadImage(params),
		queryFn: async () => (await api.downloadImage(params)).data,
		enabled,
	});

export const useUploadProductFiles = (params: Upload, enabled?: boolean) =>
	useQuery({
		queryKey: keys.upload(params),
		queryFn: async () => (await api.upload(params)).data,
		enabled,
	});

export const useReplaceProductCad = (params: Replace, enabled?: boolean) =>
	useQuery({
		queryKey: keys.replaceCad(params),
		queryFn: async () => (await api.replaceCad(params)).data,
		enabled,
	});

export const useChangeProductImage = (params: Replace, enabled?: boolean) =>
	useQuery({
		queryKey: keys.replaceImage(params),
		queryFn: async () => (await api.replaceImage(params)).data,
		enabled,
	});
