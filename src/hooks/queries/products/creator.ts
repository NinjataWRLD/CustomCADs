import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/catalog/products/creator/all';
import { Request as Single } from '@/api/catalog/products/creator/single';
import { Request as Recent } from '@/api/catalog/products/creator/recent';
import { Request as Download } from '@/api/catalog/products/creator/download';
import { Request as Upload } from '@/api/catalog/products/creator/upload';
import { Request as Replace } from '@/api/catalog/products/creator/change';
import {
	all,
	downloadCad,
	downloadImage,
	recent,
	replaceCad,
	replaceImage,
	single,
	stats,
	upload,
} from '@/api/catalog/products/creator';

export const useGetProducts = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'creator', 'all', params],
		queryFn: async () => (await all(params)).data,
		enabled,
	});

export const useGetProduct = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'creator', 'single', params],
		queryFn: async () => (await single(params)).data,
		enabled,
	});

export const useGetRecentProducts = (params: Recent, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'creator', 'recent', params],
		queryFn: async () => (await recent(params)).data,
		enabled,
	});

export const useGetProductsStats = (enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'creator', 'stats'],
		queryFn: async () => (await stats()).data,
		enabled,
	});

export const useDownloadProductCad = (params: Download, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'creator', 'download-cad', params],
		queryFn: async () => (await downloadCad(params)).data,
		enabled,
	});

export const useDownloadProductImage = (params: Download, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'creator', 'download-image', params],
		queryFn: async () => (await downloadImage(params)).data,
		enabled,
	});

export const useUploadProductFiles = (params: Upload, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'creator', 'upload-files', params],
		queryFn: async () => (await upload(params)).data,
		enabled,
	});

export const useReplaceProductCad = (params: Replace, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'creator', 'change-cad', params],
		queryFn: async () => (await replaceCad(params)).data,
		enabled,
	});

export const useChangeProductImage = (params: Replace, enabled?: boolean) =>
	useQuery({
		queryKey: ['products', 'creator', 'change-image', params],
		queryFn: async () => (await replaceImage(params)).data,
		enabled,
	});
