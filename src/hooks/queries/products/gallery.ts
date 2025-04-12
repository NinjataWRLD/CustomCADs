import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/catalog/products/gallery/all';
import { Request as Download } from '@/api/catalog/products/gallery/download';
import { Request as Single } from '@/api/catalog/products/gallery/single';
import {
	all,
	downloadCad,
	downloadImage,
	single,
	sortings,
} from '@/api/catalog/products/gallery';

export const useGetProducts = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'gallery', 'all', params],
		queryFn: async () => (await all(params)).data,
		enabled,
	});

export const useGetProduct = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'gallery', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});

export const useGetProductSortings = (enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'gallery', 'sortings'],
		queryFn: async () => (await sortings()).data,
		enabled,
	});

export const useDownloadProductCad = (params: Download, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'gallery', 'download-cad', params],
		queryFn: async () => (await downloadCad(params)).data,
		enabled,
	});

export const useDownloadProductImage = (params: Download, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'gallery', 'download-image', params],
		queryFn: async () => (await downloadImage(params)).data,
		enabled,
	});
