import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/catalog/products/gallery/all';
import { Request as Download } from '@/api/catalog/products/gallery/download';
import { Request as Single } from '@/api/catalog/products/gallery/single';
import * as api from '@/api/catalog/products/gallery';

export const keys = {
	base: ['products', 'gallery'] as const,
	all: (params: All) => [...keys.base, 'all', params] as const,
	single: (params: Single) => [...keys.base, 'single', params] as const,
	sortings: () => [...keys.base, 'sortings'] as const,
	downloadCad: (params: Download) =>
		[...keys.base, 'download-cad', params] as const,
	downloadImage: (params: Download) =>
		[...keys.base, 'download-image', params] as const,
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

export const useGetProductSortings = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.sortings(),
		queryFn: async () => (await api.sortings()).data,
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
