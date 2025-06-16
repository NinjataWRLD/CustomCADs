import { useQuery } from '@tanstack/react-query';
import { Request as All } from '@/api/carts/purchased/all';
import { Request as Single } from '@/api/carts/purchased/single';
import { Request as Download } from '@/api/carts/purchased/download';
import * as api from '@/api/carts/purchased';

export const keys = {
	base: ['purchased-carts'] as const,
	all: (params: All) => [...keys.base, 'all', params] as const,
	single: (params: Single) => [...keys.base, 'single', params] as const,
	sortings: () => [...keys.base, 'sortings'] as const,
	paymentStatuses: () => [...keys.base, 'payment-statuses'] as const,
	stats: () => [...keys.base, 'stats'] as const,
	downloadCad: (params: Download) =>
		[...keys.base, 'download-cad', params] as const,
};

export const useGetPurchasedCarts = (params: All, enabled?: boolean) =>
	useQuery({
		queryKey: keys.all(params),
		queryFn: async () => (await api.all(params)).data,
		enabled,
	});

export const useGetPurchasedCart = (params: Single, enabled?: boolean) =>
	useQuery({
		queryKey: keys.single(params),
		queryFn: async () => (await api.single(params)).data,
		enabled,
	});

export const useGetPurchasedCartsSortings = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.sortings(),
		queryFn: async () => (await api.sortings()).data,
		enabled,
	});

export const useGetPurchasedCartsPaymentStatuses = (enabled?: boolean) =>
	useQuery({
		queryKey: keys.paymentStatuses(),
		queryFn: async () => (await api.paymentStatuses()).data,
		enabled,
	});

export const useGetPurchasedCartsStats = (enabled?: boolean) =>
	useQuery({
		queryKey: ['purchased-carts', 'stats'],
		queryFn: async () => (await api.stats()).data,
		enabled,
	});

export const useDownloadPurchasedCartItemCad = (
	params: Download,
	enabled?: boolean,
) =>
	useQuery({
		queryKey: keys.downloadCad(params),
		queryFn: async () => (await api.download(params)).data,
		enabled,
	});
